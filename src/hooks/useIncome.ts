// react
import { useState } from 'react'

// finance
import { getIncome, saveIncome } from '../utils/income'

export function useIncome() {
    const [income, setIncome] = useState<number | null>(() => getIncome())

    function addIncome(amount: number) {
        setIncome(amount)
        saveIncome(amount)
    }

    return {
        income,
        addIncome
    }
}