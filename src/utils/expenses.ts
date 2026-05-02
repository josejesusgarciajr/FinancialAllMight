import type { Expense } from '../types/expense'

export function getExpenses() : Expense[] {
    const expenses = localStorage.getItem('expenses')

    return expenses ? JSON.parse(expenses) : []
}

export function getExpense(id: string) : Expense | undefined {
    const existing = getExpenses()

    return existing.find(e => e.id === id)
}

export function saveExpense(expense: Expense) {
    const existing = getExpenses()
    const updated = [...existing, expense]
    localStorage.setItem('expenses', JSON.stringify(updated))
}

export function removeExpense(id: string) {
    const existing = getExpenses()
    const updated = existing.filter((expense: Expense) => expense.id !== id)
    localStorage.setItem('expenses', JSON.stringify(updated))
}

export function updateExpense(expense: Expense) {
    const existing = getExpenses()
    const updatedExpenses = existing.map((e) => e.id === expense.id ? expense : e)
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses))
}