// material ui
import {
    Box,
    Container,
    Grid,
} from '@mui/material'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'

// finances
import { useFinance } from '../context/FinanceContext'
import { DropDownSelect } from '../components/DropDownSelect'
import { AddExpenseForm } from '../components/Expenses/AddExpenseForm'
import { ExpenseList } from '../components/Expenses/ExpenseList'
import { ExpenseOptions, type ExpenseCategory, type Frequency } from '../types/expense'
import { toMonthly } from '../utils/expenses'

// react
import { useState, useMemo } from 'react'
import { ExpenseMetricCard } from '../components/Expenses/ExpenseMetricCard'
import { PageHeader } from '../components/PageHeader'

const FORM_HEIGHT = 420;
const categories: ('All' | ExpenseCategory)[] = ['All', ...ExpenseOptions]

export const Expenses = () => {
    const { expenses, addExpense, removeExpense, updateExpense, activeExpense, setActiveExpense } = useFinance()
    const [category, setCategory] = useState<ExpenseCategory | 'All'>('All');

    function handleAddUpdateExpense(name: string, amount: number, frequency: Frequency, category: ExpenseCategory) {
        if (activeExpense) {
            updateExpense({ id: activeExpense.id, name, amount, frequency, category })
            setActiveExpense(null)
            return
        }

        addExpense({ id: crypto.randomUUID(), name, amount, frequency, category })
    }

    const expensesByCategory = useMemo(() => {
        return (
            expenses.filter((expense) => {
                return (
                    expense.category === category || category === 'All'
                )
            })
        )
    }, [category, expenses])

    const totalMonthly = expensesByCategory.reduce((sum, e) => sum + toMonthly(e.amount, e.frequency), 0)
    const totalYearly  = totalMonthly * 12

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>

            {/* ── Page Header ──────────────────────────────────────────────── */}
            <PageHeader
                icon={<ReceiptLongIcon sx={{ fontSize: '1.75rem', color: '#FF4D6D' }} />}
                iconSx={{
                    p: 1.25, borderRadius: 2,
                    bgcolor: 'rgba(255, 77, 109, 0.1)',
                    border: '1px solid rgba(255, 77, 109, 0.25)',
                    display: 'inline-flex',
                }}
                title="Expenses"
                titleLinearGradient="linear-gradient(135deg, #F0F2F5 50%, #FF4D6D 100%)"
                description={
                    <>
                        Track and categorize your recurring expenses to understand where your money goes.
                    </>
                }
            />

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>

            {/* Summary Strip */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <ExpenseMetricCard 
                    title="Monthly Total" 
                    total={totalMonthly}
                />
                <ExpenseMetricCard 
                    title="Yearly Total" 
                    total={totalYearly}
                />
            </Grid>

            {/* Categories Options */}
            <Box sx={{ mb: 3 }}>
                <DropDownSelect
                    options={categories}
                    value={category}
                    onChange={(val) => setCategory(val as ExpenseCategory | 'All')}
                    label="Filter by Category"
                    placeholder='Select a Category'
                />
            </Box>

            {/* Form + List */}
            <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>

                {/* Add Expense Form */}
                <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex' }}>
                    <AddExpenseForm addUpdateExpense={handleAddUpdateExpense} updatingExpense={activeExpense} height={FORM_HEIGHT} />
                </Grid>

                {/* Expense List */}
                <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex' }}>
                    <ExpenseList
                        expenses={expensesByCategory}
                        setActiveExpense={setActiveExpense}
                        removeExpense={removeExpense}
                        maxHeight={FORM_HEIGHT}
                    />
                </Grid>
            </Grid>
            </Container>
        </Box>
    )
}
