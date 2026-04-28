import { createContext, useContext, type ReactNode } from 'react'
import { useIncome } from '../hooks/useIncome'

interface FinanceContextType {
    income: number | null
    addIncome: (amount: number) => void
}

const FinanceContext = createContext<FinanceContextType | null>(null)

export function FinanceProvider({ children }: { children: ReactNode }) {
    const { income, addIncome } = useIncome()

    return (
        <FinanceContext.Provider value={{ income, addIncome }}>
            {children}
        </FinanceContext.Provider>
    )
}

export function useFinance() {
    const context = useContext(FinanceContext)
    if (!context) throw new Error('useFinance must be used within FinanceProvider')
    return context
}