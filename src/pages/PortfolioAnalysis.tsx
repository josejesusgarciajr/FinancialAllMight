// react
import { useState } from 'react'

// material ui
import { Box, Chip, Container, Divider, Grid, Paper, Typography } from '@mui/material'
import TimelineIcon from '@mui/icons-material/Timeline'
import SavingsIcon from '@mui/icons-material/Savings'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PercentIcon from '@mui/icons-material/Percent'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

// finances
import { useInvestments } from '../hooks/useInvestments'
import { investmentData, riskConfig } from '../types/investment'
import { PageHeader } from '../components/PageHeader'
import { MetricCard } from '../components/MetricCard'
import { GrowthChart } from '../components/PortfolioAnalysis/GrowthChart'
import { project401KGrowth, projectCombinedGrowth, projectPortfolioGrowth } from '../utils/investmentGrowth'
import { useFinance } from '../context/FinanceContext'
import { calculate401KContribution, calculateEmployerMatch } from '../utils/retirement'

const PROJECTION_YEARS = 30
const DEFAULT_RETIREMENT_RETURN = 7
const RETIREMENT_KEY = '__401K__'

const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export const PortfolioAnalysis = () => {
    const { investments } = useInvestments()
    const { income, _401K, roth401K, employerMatch, balance401K, symbol401K } = useFinance()
    const retirementFund = investmentData.find(i => i.symbol === symbol401K)
    const RETIREMENT_RETURN = retirementFund?.averageYearlyReturn ?? DEFAULT_RETIREMENT_RETURN
    const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)

    const startDate = new Date()
    const startYear = startDate.getFullYear()
    const endYear = startYear + PROJECTION_YEARS

    const funded = investments.filter(inv => inv.contributionDetails)

    const annual401KContribution = income
        ? (_401K > 0 ? calculate401KContribution(income, _401K) : 0) +
          (roth401K > 0 ? calculate401KContribution(income, roth401K) : 0) +
          (employerMatch > 0 ? calculateEmployerMatch(income, employerMatch) : 0)
        : 0
    const has401K = balance401K > 0 || annual401KContribution > 0
    const retirement = has401K
        ? { balance: balance401K, annualContribution: annual401KContribution, yearlyReturn: RETIREMENT_RETURN }
        : null

    const is401KSelected = has401K && selectedSymbol === RETIREMENT_KEY
    const selectedInvestment = selectedSymbol && !is401KSelected
        ? funded.find(inv => inv.symbol === selectedSymbol) ?? null
        : null

    const activeFunded = selectedInvestment ? [selectedInvestment] : funded

    const growthData = is401KSelected
        ? project401KGrowth(balance401K, annual401KContribution, RETIREMENT_RETURN, PROJECTION_YEARS, startDate)
        : selectedInvestment
            ? projectPortfolioGrowth([selectedInvestment], PROJECTION_YEARS, startDate)
            : projectCombinedGrowth(investments, retirement, PROJECTION_YEARS, startDate)

    const selectedLabel = is401KSelected ? '401(k)' : selectedInvestment?.symbol ?? null

    const final = growthData[growthData.length - 1]
    const projectedValue = final?.totalValue ?? 0
    const totalContributions = final?.totalContributions ?? 0
    const growthFromReturns = projectedValue - totalContributions

    const returns = is401KSelected
        ? [RETIREMENT_RETURN]
        : [...activeFunded.map(inv => inv.averageYearlyReturn), ...(!selectedInvestment && has401K ? [RETIREMENT_RETURN] : [])]
    const avgReturn = returns.length ? returns.reduce((sum, v) => sum + v, 0) / returns.length : 0
    const accountCount = returns.length

    function handleSelectHolding(symbol: string) {
        setSelectedSymbol(prev => prev === symbol ? null : symbol)
    }

    function handleShowAll() {
        setSelectedSymbol(null)
    }

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <PageHeader
                icon={<TimelineIcon sx={{ fontSize: '1.75rem', color: 'secondary.main' }} />}
                iconSx={{
                    p: 1.25, borderRadius: 2,
                    bgcolor: 'rgba(0, 200, 150, 0.1)',
                    border: '1px solid rgba(0, 200, 150, 0.25)',
                    display: 'inline-flex',
                }}
                title="Portfolio Analysis"
                titleLinearGradient="linear-gradient(135deg, #F0F2F5 50%, #00C896 100%)"
                description={`See how your current holdings and recurring contributions could grow over the next ${PROJECTION_YEARS} years.`}
            />

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>

                {funded.length === 0 && !has401K ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            textAlign: 'center',
                            border: '1px dashed rgba(79, 142, 247, 0.2)',
                            background: 'rgba(79, 142, 247, 0.02)',
                        }}
                    >
                        <ShowChartIcon sx={{ fontSize: '2.5rem', color: 'rgba(79, 142, 247, 0.3)', mb: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                            No projections yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Add a current value or recurring contribution to an investment on its details page, or enter your 401(k) balance on the Retirement tab, to see a {PROJECTION_YEARS}-year growth projection here.
                        </Typography>
                    </Paper>
                ) : (
                    <>
                        {/* Selection banner */}
                        {selectedLabel && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
                                <Chip
                                    icon={<ArrowBackIcon fontSize="small" />}
                                    label="All Accounts"
                                    onClick={handleShowAll}
                                    sx={{
                                        cursor: 'pointer',
                                        bgcolor: 'rgba(79, 142, 247, 0.08)',
                                        color: 'primary.main',
                                        border: '1px solid rgba(79, 142, 247, 0.25)',
                                        fontWeight: 600,
                                        '&:hover': { bgcolor: 'rgba(79, 142, 247, 0.15)' },
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Showing the {PROJECTION_YEARS}-year projection for{' '}
                                    <strong style={{ color: '#00C896' }}>{selectedLabel}</strong> only
                                </Typography>
                            </Box>
                        )}

                        {/* Summary Strip */}
                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <MetricCard
                                    label={selectedLabel ? `${selectedLabel} Value (${PROJECTION_YEARS} yrs)` : `Projected Value (${PROJECTION_YEARS} yrs)`}
                                    amount={fmt(projectedValue)}
                                    subtitle={`By ${endYear}`}
                                    icon={<TrendingUpIcon fontSize="small" />}
                                    accentColor="#00C896"
                                    linearGradient="linear-gradient(135deg, rgba(0,200,150,0.08) 0%, rgba(0,153,112,0.04) 100%)"
                                    borderColor="rgba(0,200,150,0.25)"
                                    labelColor="secondary.main"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <MetricCard
                                    label="Total Contributions"
                                    amount={fmt(totalContributions)}
                                    subtitle="Principal you put in"
                                    icon={<SavingsIcon fontSize="small" />}
                                    accentColor="#4F8EF7"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <MetricCard
                                    label="Growth From Returns"
                                    amount={fmt(growthFromReturns)}
                                    subtitle="Projected value minus contributions"
                                    icon={<ShowChartIcon fontSize="small" />}
                                    accentColor="#93C5FD"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <MetricCard
                                    label={selectedLabel ? 'Avg. Return' : 'Blended Avg. Return'}
                                    amount={`${avgReturn.toFixed(1)}%`}
                                    subtitle={selectedInvestment ? selectedInvestment.vender : is401KSelected ? `${symbol401K} avg. return` : `Across ${accountCount} account${accountCount === 1 ? '' : 's'}`}
                                    icon={<PercentIcon fontSize="small" />}
                                    accentColor="#F5A623"
                                />
                            </Grid>
                        </Grid>

                        {/* Growth Chart */}
                        <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
                            <GrowthChart
                                data={growthData}
                                title={selectedLabel ? `Projected ${selectedLabel} Growth` : 'Projected Portfolio Growth'}
                                description={
                                    is401KSelected
                                        ? `${startYear} → ${endYear}, assuming ${symbol401K}'s ${RETIREMENT_RETURN}% average yearly return on your current balance plus your Traditional, Roth and employer contributions.`
                                        : selectedInvestment
                                        ? `${startYear} → ${endYear}, assuming ${selectedInvestment.symbol} keeps its ${selectedInvestment.averageYearlyReturn}% average yearly return and recurring contributions.`
                                        : `${startYear} → ${endYear}, assuming each investment keeps its average yearly return and recurring contributions${has401K ? `, combined with your 401(k) in ${symbol401K} at ${RETIREMENT_RETURN}%` : ''}.`
                                }
                            />
                        </Paper>

                        {/* Per-Investment Breakdown */}
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                Holdings Breakdown
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Select a holding or your 401(k) to see its individual projection above.
                            </Typography>
                        </Box>
                        <Grid container spacing={2}>
                            {has401K && (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Paper
                                        elevation={0}
                                        onClick={() => handleSelectHolding(RETIREMENT_KEY)}
                                        sx={{
                                            p: 2.5, height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5,
                                            cursor: 'pointer',
                                            transition: 'border-color 0.2s, background 0.2s',
                                            ...(is401KSelected && {
                                                borderColor: 'rgba(0, 200, 150, 0.5)',
                                                background: 'linear-gradient(135deg, rgba(0,200,150,0.08) 0%, rgba(79,142,247,0.03) 100%)',
                                            }),
                                            '&:hover': {
                                                borderColor: is401KSelected ? 'rgba(0, 200, 150, 0.6)' : 'rgba(79, 142, 247, 0.3)',
                                            },
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 800, color: 'secondary.main', lineHeight: 1 }}>
                                                401(k)
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Traditional + Roth
                                            </Typography>
                                        </Box>

                                        <Divider sx={{ borderColor: 'rgba(0, 200, 150, 0.1)' }} />

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                    Current Value
                                                </Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                                    {fmt(balance401K)}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'right' }}>
                                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                    In {PROJECTION_YEARS} Years
                                                </Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                                                    {fmt(project401KGrowth(balance401K, annual401KContribution, RETIREMENT_RETURN, PROJECTION_YEARS, startDate).at(-1)?.totalValue ?? 0)}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Typography variant="caption" color="text.secondary">
                                            {fmt(annual401KContribution)}/yr contributions (incl. employer match) · {symbol401K} · {RETIREMENT_RETURN}% avg. return
                                        </Typography>
                                    </Paper>
                                </Grid>
                            )}
                            {funded.map(inv => {
                                const risk = riskConfig[inv.riskLevel]
                                const projection = projectPortfolioGrowth([inv], PROJECTION_YEARS, startDate)
                                const projectedInvValue = projection[projection.length - 1].totalValue
                                const contributionCount = inv.contributionDetails?.reoccurringContributions.length ?? 0
                                const isSelected = inv.symbol === selectedSymbol

                                return (
                                    <Grid key={inv.symbol} size={{ xs: 12, sm: 6, md: 4 }}>
                                        <Paper
                                            elevation={0}
                                            onClick={() => handleSelectHolding(inv.symbol)}
                                            sx={{
                                                p: 2.5, height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5,
                                                cursor: 'pointer',
                                                transition: 'border-color 0.2s, background 0.2s',
                                                ...(isSelected && {
                                                    borderColor: 'rgba(0, 200, 150, 0.5)',
                                                    background: 'linear-gradient(135deg, rgba(0,200,150,0.08) 0%, rgba(79,142,247,0.03) 100%)',
                                                }),
                                                '&:hover': {
                                                    borderColor: isSelected ? 'rgba(0, 200, 150, 0.6)' : 'rgba(79, 142, 247, 0.3)',
                                                },
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'secondary.main', lineHeight: 1 }}>
                                                        {inv.symbol}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {inv.vender}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{
                                                    px: 1, py: 0.25, borderRadius: '6px',
                                                    bgcolor: risk.bg, color: risk.color, border: `1px solid ${risk.border}`,
                                                    fontSize: '0.7rem', fontWeight: 700,
                                                }}>
                                                    {inv.riskLevel}
                                                </Box>
                                            </Box>

                                            <Divider sx={{ borderColor: 'rgba(0, 200, 150, 0.1)' }} />

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                        Current Value
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                                        {fmt(inv.contributionDetails?.currentValue ?? 0)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                        In {PROJECTION_YEARS} Years
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                                                        {fmt(projectedInvValue)}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Typography variant="caption" color="text.secondary">
                                                {contributionCount > 0
                                                    ? `${contributionCount} recurring contribution${contributionCount === 1 ? '' : 's'} · ${inv.averageYearlyReturn}% avg. return`
                                                    : `No recurring contributions · ${inv.averageYearlyReturn}% avg. return`}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </>
                )}
            </Container>
        </Box>
    )
}
