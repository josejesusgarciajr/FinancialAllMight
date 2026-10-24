import type { ContributionFequency, Investment } from '../types/investment'

export type GrowthPoint = {
    year: number
    totalValue: number
    totalContributions: number
}

const CONTRIBUTIONS_PER_YEAR: Record<ContributionFequency, number> = {
    Daily: 365,
    Weekly: 52,
    Biweekly: 26,
    Monthly: 12,
    Quarterly: 4,
    Annually: 1,
}

function toMonthlyContribution(amount: number, frequency: ContributionFequency): number {
    return (amount * CONTRIBUTIONS_PER_YEAR[frequency]) / 12
}

type GrowthTrack = {
    value: number
    contributed: number
    monthlyRate: number
    monthlyContribution: number
}

function projectTracks(tracks: GrowthTrack[], years: number, startYear: number): GrowthPoint[] {
    const points: GrowthPoint[] = [{
        year: startYear,
        totalValue: tracks.reduce((sum, t) => sum + t.value, 0),
        totalContributions: tracks.reduce((sum, t) => sum + t.contributed, 0),
    }]

    for (let month = 1; month <= years * 12; month++) {
        tracks.forEach(t => {
            t.value = t.value * (1 + t.monthlyRate) + t.monthlyContribution
            t.contributed += t.monthlyContribution
        })

        if (month % 12 === 0) {
            points.push({
                year: startYear + month / 12,
                totalValue: tracks.reduce((sum, t) => sum + t.value, 0),
                totalContributions: tracks.reduce((sum, t) => sum + t.contributed, 0),
            })
        }
    }

    return points
}

function investmentTracks(investments: Investment[]): GrowthTrack[] {
    return investments
        .filter(inv => inv.contributionDetails)
        .map(inv => ({
            value: inv.contributionDetails!.currentValue,
            contributed: inv.contributionDetails!.currentValue,
            monthlyRate: Math.pow(1 + inv.averageYearlyReturn / 100, 1 / 12) - 1,
            monthlyContribution: inv.contributionDetails!.reoccurringContributions.reduce(
                (sum, c) => sum + toMonthlyContribution(c.amount, c.frequency),
                0
            ),
        }))
}

function retirementTrack(balance: number, annualContribution: number, yearlyReturn: number): GrowthTrack[] {
    if (balance <= 0 && annualContribution <= 0) return []
    return [{
        value: balance,
        contributed: balance,
        monthlyRate: Math.pow(1 + yearlyReturn / 100, 1 / 12) - 1,
        monthlyContribution: annualContribution / 12,
    }]
}

export function projectPortfolioGrowth(investments: Investment[], years: number, startDate: Date): GrowthPoint[] {
    return projectTracks(investmentTracks(investments), years, startDate.getFullYear())
}

export function project401KGrowth(
    balance: number, annualContribution: number, yearlyReturn: number, years: number, startDate: Date
): GrowthPoint[] {
    return projectTracks(retirementTrack(balance, annualContribution, yearlyReturn), years, startDate.getFullYear())
}

export function projectCombinedGrowth(
    investments: Investment[],
    retirement: { balance: number; annualContribution: number; yearlyReturn: number } | null,
    years: number,
    startDate: Date
): GrowthPoint[] {
    const tracks = [
        ...investmentTracks(investments),
        ...(retirement ? retirementTrack(retirement.balance, retirement.annualContribution, retirement.yearlyReturn) : []),
    ]
    return projectTracks(tracks, years, startDate.getFullYear())
}
