import { createContext, useContext, type ReactNode } from 'react'
import { useIncome } from '../hooks/useIncome'
import { useTaxes } from '../hooks/useTaxes'
import { useExpenses } from '../hooks/useExpenses';
import type { Expense } from '../types/expense';
import { useRetirement } from '../hooks/useRetirement';

interface FinanceContextType {
    // income
    income: number | null;
    addIncome: (amount: number | null) => void;
    // taxes
    filingState: string;
    updateFilingState: (filingState: string) => void;
    // retirement
    _401K: number; 
    handle401KChange: (newValue: number) => void; 
    roth401K: number;
    handleRoth401KChange: (newValue: number) => void;
    // expenses
    expenses: Expense[];
    addExpense: (newExpense: Expense) => void;
    removeExpense: (id: string) => void;
    updateExpense: (expense: Expense) => void;
    activeExpense: Expense | null;
    setActiveExpense: (expense: Expense | null) => void;
}

const FinanceContext = createContext<FinanceContextType | null>(null)

export function FinanceProvider({ children }: { children: ReactNode }) {
    const { income, addIncome } = useIncome()
    const { filingState, updateFilingState } = useTaxes()
    const { _401K, handle401KChange, roth401K, handleRoth401KChange } = useRetirement()
    const {
        expenses, addExpense, removeExpense,
        updateExpense, activeExpense, setActiveExpense
    } = useExpenses()

    return (
        <FinanceContext.Provider value={{
                // income
                income, addIncome,
                // taxes
                filingState, updateFilingState,
                // retirement
                _401K, handle401KChange, roth401K, handleRoth401KChange,
                // expenses
                expenses, addExpense, removeExpense, updateExpense, activeExpense, setActiveExpense,
             }}>
            {children}
        </FinanceContext.Provider>
    )
}

export function useFinance() {
    const context = useContext(FinanceContext)
    if (!context) throw new Error('useFinance must be used within FinanceProvider')
    return context
}