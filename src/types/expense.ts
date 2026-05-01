export type Expense = {
    id: string;
    name: string;
    amount: number;
    frequency: Frequency;
    category: ExpenseCategory;
}

export type Frequency  = 'monthly' | 'yearly' | 'weekly'
export type ExpenseCategory = 'housing' | 'food' | 'transportation' | 'utilities' | 'entertainment' | 'healthcare' | 'other'

export const ExpenseOptions = [
    'housing',
    'food', 'transportation',
    'utilities',
    'entertainment',
    'healthcare',
    'other'
]

export const ExpenseFrequencyOptions = [
    'monthly',
    'yearly',
    'weekly'
]