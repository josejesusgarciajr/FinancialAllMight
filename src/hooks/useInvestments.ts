// react
import { useState } from 'react'

// finances
import type { Investment } from '../types/investment'
import { getInvestmentsFromStorage, saveInvestmentsToStorage } from '../utils/investments'

export function useInvestments() {
    const [investments, setInvestments] = useState<Investment[]>(getInvestmentsFromStorage())

    function addInvestment(investment: Investment) {
        const updatedInvestments = [...investments, investment]
        setInvestments(prev => [...prev, investment])
        saveInvestmentsToStorage(updatedInvestments)
    }

    function deleteInvestment(symbol: string) {
        const updatedInvestments = investments.filter(inv => inv.symbol !== symbol)
        setInvestments(updatedInvestments)
        saveInvestmentsToStorage(updatedInvestments)
    }

    return {
        investments,
        addInvestment,
        deleteInvestment,
    }
}