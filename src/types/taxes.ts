export type TaxBracket = {
    min: number
    max: number
    rate: number
}

export type StateTaxInfo = {
    name: string
    hasTax: boolean
    brackets: TaxBracket[]
    standardDeduction: number
}

export type TaxBreakdown = {
    grossIncome: number
    federalIncomeTax: number
    socialSecurity: number
    medicare: number
    stateTax: number
    totalTax: number
    takeHome: number
    effectiveRate: number
    traditional401K: number
    roth401K: number
}
