// material ui
import {
    Box,
    Container,
    Grid,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'

// finances
import { useFinance } from '../context/FinanceContext'
import { AddExpenseForm } from '../components/Expenses/AddExpenseForm'
import { ExpenseList } from '../components/Expenses/ExpenseList'
import { ExpenseOptions, type ExpenseCategory, type Frequency } from '../types/expense'
import { toMonthly } from '../utils/expenses'

// react
import { useState, useMemo } from 'react'
import { ExpenseMetricCard } from '../components/Expenses/ExpenseMetricCard'

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
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #070B14 0%, #0A1628 50%, #0F1923 100%)',
                    borderBottom: '1px solid rgba(79, 142, 247, 0.15)',
                    py: { xs: 5, md: 7 },
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                        <Box
                            sx={{
                                p: 1.25, borderRadius: 2,
                                bgcolor: 'rgba(255, 77, 109, 0.1)',
                                border: '1px solid rgba(255, 77, 109, 0.25)',
                                display: 'inline-flex',
                            }}
                        >
                            <ReceiptLongIcon sx={{ fontSize: '1.75rem', color: '#FF4D6D' }} />
                        </Box>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #F0F2F5 50%, #FF4D6D 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            Expenses
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, lineHeight: 1.7 }}>
                        Track and categorize your recurring expenses to understand where your money goes.
                    </Typography>
                </Container>
            </Box>

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
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                <ToggleButtonGroup
                    value={category}
                    exclusive
                    onChange={(_, val) => { if (val !== null) setCategory(val as ExpenseCategory | 'All') }}
                    size="small"
                    aria-label="expense category filter"
                    sx={{
                        flexWrap: 'wrap',
                        gap: 0.5,
                        bgcolor: '#0F1923',
                        border: '1px solid rgba(255,77,109,0.15)',
                        borderRadius: 2,
                        p: 0.5,
                        '& .MuiToggleButtonGroup-grouped': {
                            border: 'none !important',
                            borderRadius: '6px !important',
                        },
                    }}
                >
                    {categories.map((cat) => (
                        <ToggleButton
                            key={cat}
                            value={cat}
                            sx={{
                                px: 2,
                                py: 0.6,
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                textTransform: 'capitalize',
                                color: 'text.secondary',
                                letterSpacing: '0.04em',
                                transition: 'all 0.15s ease',
                                '&.Mui-selected': {
                                    color: '#FF4D6D',
                                    bgcolor: 'rgba(255,77,109,0.12)',
                                    boxShadow: '0 0 0 1px rgba(255,77,109,0.35)',
                                },
                                '&.Mui-selected:hover': {
                                    bgcolor: 'rgba(255,77,109,0.18)',
                                },
                                '&:hover': {
                                    bgcolor: 'rgba(255,77,109,0.06)',
                                    color: '#FF4D6D',
                                },
                            }}
                        >
                            {cat}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
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
