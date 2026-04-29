import type { StateTaxInfo, TaxBracket, TaxBreakdown } from '../types/taxes'

// ─── Federal 2025 (single filer) — IRS Rev. Proc. 2024-61 ────────────────────
const FEDERAL_STANDARD_DEDUCTION = 15_000

const FEDERAL_BRACKETS: TaxBracket[] = [
    { min: 0,        max: 11_925,  rate: 0.10 },
    { min: 11_925,   max: 48_475,  rate: 0.12 },
    { min: 48_475,   max: 103_350, rate: 0.22 },
    { min: 103_350,  max: 197_300, rate: 0.24 },
    { min: 197_300,  max: 250_525, rate: 0.32 },
    { min: 250_525,  max: 626_350, rate: 0.35 },
    { min: 626_350,  max: Infinity, rate: 0.37 },
]

// FICA 2025
const SS_RATE = 0.062
const SS_WAGE_BASE = 176_100          // up from $168,600 in 2024
const MEDICARE_RATE = 0.0145
const ADDITIONAL_MEDICARE_RATE = 0.009
const ADDITIONAL_MEDICARE_THRESHOLD = 200_000

// ─── State income tax data 2025 (single filer, for planning purposes) ─────────
// States that conform to the federal standard deduction use $15,000.
// State-specific deductions that are set independently retain their own values.
const NO_TAX: Pick<StateTaxInfo, 'hasTax' | 'brackets' | 'standardDeduction'> = {
    hasTax: false,
    brackets: [],
    standardDeduction: 0,
}

const STATE_TAX_DATA: Record<string, StateTaxInfo> = {
    'Alabama': {
        name: 'Alabama', hasTax: true, standardDeduction: 2_500,
        brackets: [
            { min: 0,     max: 500,    rate: 0.02 },
            { min: 500,   max: 3_000,  rate: 0.04 },
            { min: 3_000, max: Infinity, rate: 0.05 },
        ],
    },
    'Alaska': { name: 'Alaska', ...NO_TAX },
    'Arizona': {
        // Conforms to federal standard deduction
        name: 'Arizona', hasTax: true, standardDeduction: 15_000,
        brackets: [{ min: 0, max: Infinity, rate: 0.025 }],
    },
    'Arkansas': {
        name: 'Arkansas', hasTax: true, standardDeduction: 2_200,
        brackets: [
            { min: 0,     max: 4_999,  rate: 0.02 },
            { min: 4_999, max: 8_899,  rate: 0.04 },
            { min: 8_899, max: Infinity, rate: 0.044 },
        ],
    },
    'California': {
        name: 'California', hasTax: true, standardDeduction: 5_202,
        brackets: [
            { min: 0,          max: 10_412,    rate: 0.01 },
            { min: 10_412,     max: 24_684,    rate: 0.02 },
            { min: 24_684,     max: 38_959,    rate: 0.04 },
            { min: 38_959,     max: 54_081,    rate: 0.06 },
            { min: 54_081,     max: 68_350,    rate: 0.08 },
            { min: 68_350,     max: 349_137,   rate: 0.093 },
            { min: 349_137,    max: 418_961,   rate: 0.103 },
            { min: 418_961,    max: 698_274,   rate: 0.113 },
            { min: 698_274,    max: 1_000_000, rate: 0.123 },
            { min: 1_000_000,  max: Infinity,  rate: 0.133 },
        ],
    },
    'Colorado': {
        // Conforms to federal standard deduction
        name: 'Colorado', hasTax: true, standardDeduction: 15_000,
        brackets: [{ min: 0, max: Infinity, rate: 0.044 }],
    },
    'Connecticut': {
        name: 'Connecticut', hasTax: true, standardDeduction: 15_000,
        brackets: [
            { min: 0,       max: 10_000,  rate: 0.03 },
            { min: 10_000,  max: 50_000,  rate: 0.05 },
            { min: 50_000,  max: 100_000, rate: 0.055 },
            { min: 100_000, max: 200_000, rate: 0.06 },
            { min: 200_000, max: 250_000, rate: 0.065 },
            { min: 250_000, max: 500_000, rate: 0.069 },
            { min: 500_000, max: Infinity, rate: 0.0699 },
        ],
    },
    'Delaware': {
        name: 'Delaware', hasTax: true, standardDeduction: 3_250,
        brackets: [
            { min: 0,      max: 2_000,  rate: 0 },
            { min: 2_000,  max: 5_000,  rate: 0.022 },
            { min: 5_000,  max: 10_000, rate: 0.039 },
            { min: 10_000, max: 20_000, rate: 0.048 },
            { min: 20_000, max: 25_000, rate: 0.052 },
            { min: 25_000, max: 60_000, rate: 0.0555 },
            { min: 60_000, max: Infinity, rate: 0.066 },
        ],
    },
    'Florida': { name: 'Florida', ...NO_TAX },
    'Georgia': {
        name: 'Georgia', hasTax: true, standardDeduction: 12_000,
        brackets: [{ min: 0, max: Infinity, rate: 0.0549 }],
    },
    'Hawaii': {
        name: 'Hawaii', hasTax: true, standardDeduction: 2_200,
        brackets: [
            { min: 0,       max: 2_400,   rate: 0.014 },
            { min: 2_400,   max: 4_800,   rate: 0.032 },
            { min: 4_800,   max: 9_600,   rate: 0.055 },
            { min: 9_600,   max: 14_400,  rate: 0.064 },
            { min: 14_400,  max: 19_200,  rate: 0.068 },
            { min: 19_200,  max: 24_000,  rate: 0.072 },
            { min: 24_000,  max: 36_000,  rate: 0.076 },
            { min: 36_000,  max: 48_000,  rate: 0.079 },
            { min: 48_000,  max: 150_000, rate: 0.0825 },
            { min: 150_000, max: 175_000, rate: 0.09 },
            { min: 175_000, max: 200_000, rate: 0.10 },
            { min: 200_000, max: Infinity, rate: 0.11 },
        ],
    },
    'Idaho': {
        // Conforms to federal standard deduction
        name: 'Idaho', hasTax: true, standardDeduction: 15_000,
        brackets: [{ min: 0, max: Infinity, rate: 0.058 }],
    },
    'Illinois': {
        name: 'Illinois', hasTax: true, standardDeduction: 2_425,
        brackets: [{ min: 0, max: Infinity, rate: 0.0495 }],
    },
    'Indiana': {
        // Rate reduced from 3.05% to 3.0% in 2025
        name: 'Indiana', hasTax: true, standardDeduction: 1_000,
        brackets: [{ min: 0, max: Infinity, rate: 0.030 }],
    },
    'Iowa': {
        // Conforms to federal standard deduction
        name: 'Iowa', hasTax: true, standardDeduction: 15_000,
        brackets: [{ min: 0, max: Infinity, rate: 0.038 }],
    },
    'Kansas': {
        name: 'Kansas', hasTax: true, standardDeduction: 3_500,
        brackets: [
            { min: 0,      max: 15_000, rate: 0.031 },
            { min: 15_000, max: 30_000, rate: 0.0525 },
            { min: 30_000, max: Infinity, rate: 0.057 },
        ],
    },
    'Kentucky': {
        name: 'Kentucky', hasTax: true, standardDeduction: 3_160,
        brackets: [{ min: 0, max: Infinity, rate: 0.04 }],
    },
    'Louisiana': {
        name: 'Louisiana', hasTax: true, standardDeduction: 4_500,
        brackets: [
            { min: 0,      max: 12_500, rate: 0.0185 },
            { min: 12_500, max: 50_000, rate: 0.035 },
            { min: 50_000, max: Infinity, rate: 0.0425 },
        ],
    },
    'Maine': {
        // Conforms to federal standard deduction
        name: 'Maine', hasTax: true, standardDeduction: 15_000,
        brackets: [
            { min: 0,      max: 24_500, rate: 0.058 },
            { min: 24_500, max: 58_050, rate: 0.0675 },
            { min: 58_050, max: Infinity, rate: 0.0715 },
        ],
    },
    'Maryland': {
        name: 'Maryland', hasTax: true, standardDeduction: 2_400,
        brackets: [
            { min: 0,       max: 1_000,   rate: 0.02 },
            { min: 1_000,   max: 2_000,   rate: 0.03 },
            { min: 2_000,   max: 3_000,   rate: 0.04 },
            { min: 3_000,   max: 100_000, rate: 0.0475 },
            { min: 100_000, max: 125_000, rate: 0.05 },
            { min: 125_000, max: 150_000, rate: 0.0525 },
            { min: 150_000, max: 250_000, rate: 0.055 },
            { min: 250_000, max: Infinity, rate: 0.0575 },
        ],
    },
    'Massachusetts': {
        name: 'Massachusetts', hasTax: true, standardDeduction: 4_400,
        brackets: [{ min: 0, max: Infinity, rate: 0.05 }],
    },
    'Michigan': {
        name: 'Michigan', hasTax: true, standardDeduction: 5_600,
        brackets: [{ min: 0, max: Infinity, rate: 0.0425 }],
    },
    'Minnesota': {
        // Mirrors federal standard deduction
        name: 'Minnesota', hasTax: true, standardDeduction: 15_000,
        brackets: [
            { min: 0,       max: 30_070,  rate: 0.0535 },
            { min: 30_070,  max: 98_760,  rate: 0.068 },
            { min: 98_760,  max: 183_340, rate: 0.0785 },
            { min: 183_340, max: Infinity, rate: 0.0985 },
        ],
    },
    'Mississippi': {
        // Rate reduced from 4.7% to 4.4% in 2025 (ongoing phase-down)
        name: 'Mississippi', hasTax: true, standardDeduction: 2_300,
        brackets: [{ min: 0, max: Infinity, rate: 0.044 }],
    },
    'Missouri': {
        // Conforms to federal standard deduction
        name: 'Missouri', hasTax: true, standardDeduction: 15_000,
        brackets: [
            { min: 0,     max: 1_121,  rate: 0 },
            { min: 1_121, max: 2_242,  rate: 0.02 },
            { min: 2_242, max: 3_363,  rate: 0.025 },
            { min: 3_363, max: 4_484,  rate: 0.03 },
            { min: 4_484, max: 5_605,  rate: 0.035 },
            { min: 5_605, max: 6_726,  rate: 0.04 },
            { min: 6_726, max: 7_847,  rate: 0.045 },
            { min: 7_847, max: Infinity, rate: 0.048 },
        ],
    },
    'Montana': {
        name: 'Montana', hasTax: true, standardDeduction: 5_080,
        brackets: [
            { min: 0,      max: 20_500, rate: 0.047 },
            { min: 20_500, max: Infinity, rate: 0.059 },
        ],
    },
    'Nebraska': {
        name: 'Nebraska', hasTax: true, standardDeduction: 7_900,
        brackets: [
            { min: 0,      max: 36_000, rate: 0.0436 },
            { min: 36_000, max: 72_750, rate: 0.0501 },
            { min: 72_750, max: Infinity, rate: 0.0584 },
        ],
    },
    'Nevada': { name: 'Nevada', ...NO_TAX },
    'New Hampshire': { name: 'New Hampshire', ...NO_TAX },
    'New Jersey': {
        name: 'New Jersey', hasTax: true, standardDeduction: 1_000,
        brackets: [
            { min: 0,         max: 20_000,    rate: 0.014 },
            { min: 20_000,    max: 35_000,    rate: 0.0175 },
            { min: 35_000,    max: 40_000,    rate: 0.035 },
            { min: 40_000,    max: 75_000,    rate: 0.05525 },
            { min: 75_000,    max: 500_000,   rate: 0.0637 },
            { min: 500_000,   max: 1_000_000, rate: 0.0897 },
            { min: 1_000_000, max: Infinity,  rate: 0.1075 },
        ],
    },
    'New Mexico': {
        name: 'New Mexico', hasTax: true, standardDeduction: 15_000,
        brackets: [
            { min: 0,       max: 5_500,   rate: 0.017 },
            { min: 5_500,   max: 11_000,  rate: 0.032 },
            { min: 11_000,  max: 16_000,  rate: 0.047 },
            { min: 16_000,  max: 210_000, rate: 0.049 },
            { min: 210_000, max: Infinity, rate: 0.059 },
        ],
    },
    'New York': {
        name: 'New York', hasTax: true, standardDeduction: 8_000,
        brackets: [
            { min: 0,          max: 8_500,      rate: 0.04 },
            { min: 8_500,      max: 11_700,     rate: 0.045 },
            { min: 11_700,     max: 13_900,     rate: 0.0525 },
            { min: 13_900,     max: 21_400,     rate: 0.0585 },
            { min: 21_400,     max: 80_650,     rate: 0.0625 },
            { min: 80_650,     max: 215_400,    rate: 0.0685 },
            { min: 215_400,    max: 1_077_550,  rate: 0.0965 },
            { min: 1_077_550,  max: 5_000_000,  rate: 0.103 },
            { min: 5_000_000,  max: Infinity,   rate: 0.109 },
        ],
    },
    'North Carolina': {
        // Rate reduced from 4.5% to 4.25% in 2025
        name: 'North Carolina', hasTax: true, standardDeduction: 12_750,
        brackets: [{ min: 0, max: Infinity, rate: 0.0425 }],
    },
    'North Dakota': {
        // Conforms to federal standard deduction
        name: 'North Dakota', hasTax: true, standardDeduction: 15_000,
        brackets: [
            { min: 0,      max: 44_725, rate: 0.0195 },
            { min: 44_725, max: Infinity, rate: 0.025 },
        ],
    },
    'Ohio': {
        name: 'Ohio', hasTax: true, standardDeduction: 2_400,
        brackets: [
            { min: 0,       max: 26_050,  rate: 0 },
            { min: 26_050,  max: 100_000, rate: 0.0275 },
            { min: 100_000, max: 115_300, rate: 0.035 },
            { min: 115_300, max: Infinity, rate: 0.0375 },
        ],
    },
    'Oklahoma': {
        name: 'Oklahoma', hasTax: true, standardDeduction: 6_350,
        brackets: [
            { min: 0,     max: 1_000, rate: 0.0025 },
            { min: 1_000, max: 2_500, rate: 0.0075 },
            { min: 2_500, max: 3_750, rate: 0.0175 },
            { min: 3_750, max: 4_900, rate: 0.0275 },
            { min: 4_900, max: 7_200, rate: 0.0375 },
            { min: 7_200, max: Infinity, rate: 0.0475 },
        ],
    },
    'Oregon': {
        name: 'Oregon', hasTax: true, standardDeduction: 2_420,
        brackets: [
            { min: 0,       max: 18_400,  rate: 0.0475 },
            { min: 18_400,  max: 46_200,  rate: 0.0675 },
            { min: 46_200,  max: 250_000, rate: 0.0875 },
            { min: 250_000, max: Infinity, rate: 0.099 },
        ],
    },
    'Pennsylvania': {
        name: 'Pennsylvania', hasTax: true, standardDeduction: 0,
        brackets: [{ min: 0, max: Infinity, rate: 0.0307 }],
    },
    'Rhode Island': {
        name: 'Rhode Island', hasTax: true, standardDeduction: 10_550,
        brackets: [
            { min: 0,       max: 73_450,  rate: 0.0375 },
            { min: 73_450,  max: 166_950, rate: 0.0475 },
            { min: 166_950, max: Infinity, rate: 0.0599 },
        ],
    },
    'South Carolina': {
        // Conforms to federal standard deduction
        name: 'South Carolina', hasTax: true, standardDeduction: 15_000,
        brackets: [
            { min: 0,      max: 3_460,  rate: 0 },
            { min: 3_460,  max: 17_330, rate: 0.03 },
            { min: 17_330, max: Infinity, rate: 0.064 },
        ],
    },
    'South Dakota': { name: 'South Dakota', ...NO_TAX },
    'Tennessee': { name: 'Tennessee', ...NO_TAX },
    'Texas': { name: 'Texas', ...NO_TAX },
    'Utah': {
        name: 'Utah', hasTax: true, standardDeduction: 0,
        brackets: [{ min: 0, max: Infinity, rate: 0.0465 }],
    },
    'Vermont': {
        name: 'Vermont', hasTax: true, standardDeduction: 7_000,
        brackets: [
            { min: 0,       max: 45_400,  rate: 0.0335 },
            { min: 45_400,  max: 110_050, rate: 0.066 },
            { min: 110_050, max: 229_550, rate: 0.076 },
            { min: 229_550, max: Infinity, rate: 0.0875 },
        ],
    },
    'Virginia': {
        name: 'Virginia', hasTax: true, standardDeduction: 8_000,
        brackets: [
            { min: 0,      max: 3_000,  rate: 0.02 },
            { min: 3_000,  max: 5_000,  rate: 0.03 },
            { min: 5_000,  max: 17_000, rate: 0.05 },
            { min: 17_000, max: Infinity, rate: 0.0575 },
        ],
    },
    'Washington': { name: 'Washington', ...NO_TAX },
    'Washington D.C.': {
        name: 'Washington D.C.', hasTax: true, standardDeduction: 12_950,
        brackets: [
            { min: 0,         max: 10_000,    rate: 0.04 },
            { min: 10_000,    max: 40_000,    rate: 0.06 },
            { min: 40_000,    max: 60_000,    rate: 0.065 },
            { min: 60_000,    max: 250_000,   rate: 0.085 },
            { min: 250_000,   max: 500_000,   rate: 0.0925 },
            { min: 500_000,   max: 1_000_000, rate: 0.0975 },
            { min: 1_000_000, max: Infinity,  rate: 0.1075 },
        ],
    },
    'West Virginia': {
        name: 'West Virginia', hasTax: true, standardDeduction: 2_000,
        brackets: [
            { min: 0,      max: 10_000, rate: 0.0236 },
            { min: 10_000, max: 25_000, rate: 0.0315 },
            { min: 25_000, max: 40_000, rate: 0.0354 },
            { min: 40_000, max: 60_000, rate: 0.0472 },
            { min: 60_000, max: Infinity, rate: 0.0512 },
        ],
    },
    'Wisconsin': {
        name: 'Wisconsin', hasTax: true, standardDeduction: 12_760,
        brackets: [
            { min: 0,       max: 13_810,  rate: 0.035 },
            { min: 13_810,  max: 27_630,  rate: 0.044 },
            { min: 27_630,  max: 304_170, rate: 0.053 },
            { min: 304_170, max: Infinity, rate: 0.0765 },
        ],
    },
    'Wyoming': { name: 'Wyoming', ...NO_TAX },
}

// ─── Exports ──────────────────────────────────────────────────────────────────
export const US_STATES = Object.keys(STATE_TAX_DATA).sort()

export function getFilingState(): string {
    return localStorage.getItem('filingState') ?? ''
}

export function saveFilingState(state: string): void {
    localStorage.setItem('filingState', state)
}

function applyBrackets(taxableIncome: number, brackets: TaxBracket[]): number {
    let tax = 0
    for (const bracket of brackets) {
        if (taxableIncome <= bracket.min) break
        tax += (Math.min(taxableIncome, bracket.max) - bracket.min) * bracket.rate
    }
    return tax
}

export function calculateTaxes(grossIncome: number, stateName: string): TaxBreakdown {
    const federalTaxable = Math.max(0, grossIncome - FEDERAL_STANDARD_DEDUCTION)
    const federalIncomeTax = applyBrackets(federalTaxable, FEDERAL_BRACKETS)

    const socialSecurity = Math.min(grossIncome, SS_WAGE_BASE) * SS_RATE
    const medicare =
        grossIncome * MEDICARE_RATE +
        Math.max(0, grossIncome - ADDITIONAL_MEDICARE_THRESHOLD) * ADDITIONAL_MEDICARE_RATE

    const stateInfo = STATE_TAX_DATA[stateName]
    let stateTax = 0
    if (stateInfo?.hasTax) {
        const stateTaxable = Math.max(0, grossIncome - stateInfo.standardDeduction)
        stateTax = applyBrackets(stateTaxable, stateInfo.brackets)
    }

    const totalTax = federalIncomeTax + socialSecurity + medicare + stateTax
    const takeHome = grossIncome - totalTax
    const effectiveRate = grossIncome > 0 ? totalTax / grossIncome : 0

    return { grossIncome, federalIncomeTax, socialSecurity, medicare, stateTax, totalTax, takeHome, effectiveRate }
}

export function stateHasTax(stateName: string): boolean {
    return STATE_TAX_DATA[stateName]?.hasTax ?? false
}
