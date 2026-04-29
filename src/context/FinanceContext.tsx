import { createContext, useContext, type ReactNode } from 'react'
import { useIncome } from '../hooks/useIncome'
import { useTaxes } from '../hooks/useTaxes'

interface FinanceContextType {
    income: number | null;
    addIncome: (amount: number) => void;
    filingState: string;
    updateFilingState: (filingState: string) => void;
}

const FinanceContext = createContext<FinanceContextType | null>(null)

export function FinanceProvider({ children }: { children: ReactNode }) {
    const { income, addIncome } = useIncome()
    const { filingState, updateFilingState } = useTaxes()

    return (
        <FinanceContext.Provider value={{ 
                income, addIncome,
                filingState, updateFilingState
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