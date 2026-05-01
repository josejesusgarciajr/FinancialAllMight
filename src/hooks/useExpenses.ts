// react
import { useState } from 'react'

// expenses
import type { Expense } from '../types/expense'
import { getExpenses, saveExpense, removeExpense as removeExpenseFromStorage  } from '../utils/expenses'

export function useExpenses() {
    const [expenses, setExpenses] = useState<Expense[]>(getExpenses)

    function addExpense(newExpense: Expense) {
        saveExpense(newExpense)
        setExpenses(prev => [...prev, newExpense])
    }

    function removeExpense(id: string) {
        removeExpenseFromStorage(id)
        setExpenses(prev => prev.filter(expense => expense.id !== id))
    }

    return {
        expenses, addExpense, removeExpense
    }
}