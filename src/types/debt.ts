export const DebtCategoryOptions: string[] = [
    'Credit Card',
    'Student Loan',
    'Mortgage',
    'Personal Loan',
    'Auto Loan',
    'Other',
]

export type DebtCategory = 'Credit Card' | 'Student Loan' | 'Mortgage' | 'Personal Loan' | 'Auto Loan' | 'Other'

export type Debt = {
    id: string;
    name: string;
    amount: number;
    interestRate: number;
    category: DebtCategory;
    createdAt?: Date
}