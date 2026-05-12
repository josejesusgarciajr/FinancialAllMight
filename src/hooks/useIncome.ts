// react
import { useState } from 'react'

// finance
import { getIncome, saveIncome, getPayRate, savePayRate, calculateIncomePerPayRate, getIncomeRate, saveIncomeRate } from '../utils/income'
import type { PayRate } from '../types/income'

export function useIncome() {
    const [payRate, setPayRate] = useState<PayRate | ''>(() => getPayRate())
    const [incomeRate, setIncomeRate] = useState<number | null>(() => getIncomeRate())
    const [income, setIncome] = useState<number | null>(() => getIncome())

    function handlePayRateChange(newPayCycle: PayRate | '') {
        setPayRate(newPayCycle)
        savePayRate(newPayCycle)
    }

    function handleIncomeRateChange(newIncomeRate: number | null) {
        setIncomeRate(newIncomeRate)
        saveIncomeRate(newIncomeRate)
        addIncome(newIncomeRate)
    }

    function addIncome(amount: number | null) {
        if (!payRate) return

        const calculatedIncome = calculateIncomePerPayRate(amount ?? 0, payRate as PayRate)
        setIncome(calculatedIncome)
        saveIncome(calculatedIncome)
    }

    return {
        payRate, handlePayRateChange,
        incomeRate, handleIncomeRateChange,
        income
    }
}