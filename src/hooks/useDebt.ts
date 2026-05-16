// react
import { useState } from 'react'

// finances
import type { Debt } from '../types/debt'
import { deleteDebtFromLocalStorage, getDebtsFromLocalStorage, saveDebtToLocalStorage, updateDebtInLocalStorage } from '../utils/debt'

export function useDebt() {
    const [debts, setDebts] = useState<Debt[]>(() => getDebtsFromLocalStorage())
    const [activeDebt, setActiveDebt] = useState<Debt | null>(null)

    function addDebt(newDebt: Debt) {
        if (!newDebt) return

        saveDebtToLocalStorage(newDebt)
        setDebts(prev => [...prev, newDebt])
    }

    function removeDebt(debtId: string) {
        if (!debtId) return

        deleteDebtFromLocalStorage(debtId)
        setDebts(prev => prev.filter(d => d.id !== debtId))
    }

    function updateDebt(updatedDebt: Debt) {
        if (!updatedDebt) return

        updateDebtInLocalStorage(updatedDebt)
        setDebts(prev => prev.map(d => d.id === updatedDebt.id ? updatedDebt : d))
    }

    return {
        debts, addDebt, removeDebt, updateDebt,
        activeDebt, setActiveDebt,
    }
}