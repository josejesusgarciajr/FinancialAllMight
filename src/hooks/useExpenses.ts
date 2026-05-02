// react
import { useState } from 'react'

// expenses
import type { Expense } from '../types/expense'
import { getExpenses, saveExpense, removeExpense as removeExpenseFromStorage, updateExpense as updateExpenseFromStorage  } from '../utils/expenses'

export function useExpenses() {
    const [expenses, setExpenses] = useState<Expense[]>(getExpenses)
    const [activeExpense, setActiveExpense] = useState<Expense | null>(null)

    function addExpense(newExpense: Expense) {
        saveExpense(newExpense)
        setExpenses(prev => [...prev, newExpense])
    }

    function removeExpense(id: string) {
        removeExpenseFromStorage(id)
        setExpenses(prev => prev.filter(expense => expense.id !== id))
    }

    function updateExpense(expense: Expense) {
        updateExpenseFromStorage(expense)
        setExpenses(prev => prev.map(e => e.id === expense.id ? expense : e))
    }

    return {
        expenses, addExpense, removeExpense,
        updateExpense, activeExpense, setActiveExpense
    }
}