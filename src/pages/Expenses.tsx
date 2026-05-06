// material ui
import {
    Box,
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'

// finances
import { useFinance } from '../context/FinanceContext'
import { AddExpenseForm } from '../components/Expenses/AddExpenseForm'
import type { ExpenseCategory, Frequency } from '../types/expense'
import { toMonthly } from '../utils/expenses'

// react
import { ExpenseList } from '../components/Expenses/ExpenseList'

const FORM_HEIGHT = 420;

export const Expenses = () => {
    const { expenses, addExpense, removeExpense, updateExpense, activeExpense, setActiveExpense } = useFinance()

    const totalMonthly = expenses.reduce((sum, e) => sum + toMonthly(e.amount, e.frequency), 0)
    const totalYearly  = totalMonthly * 12

    function handleAddUpdateExpense(name: string, amount: number, frequency: Frequency, category: ExpenseCategory) {
        if (activeExpense) {
            updateExpense({ id: activeExpense.id, name, amount, frequency, category })
            setActiveExpense(null)
            return
        }

        addExpense({ id: crypto.randomUUID(), name, amount, frequency, category })
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>

            {/* Header */}
            <Box sx={{ mb: 5 }}>
                <Stack direction="row" spacing={1.5} sx={{ mb: 1, alignItems: 'center' }}>
                    <Box sx={{
                        p: 1, borderRadius: 2, display: 'inline-flex',
                        bgcolor: 'rgba(255,77,109,0.08)',
                        border: '1px solid rgba(255,77,109,0.2)',
                    }}>
                        <ReceiptLongIcon sx={{ color: '#FF4D6D' }} />
                    </Box>
                    <Typography variant="h4" sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #F0F2F5 50%, #FF4D6D 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Expenses
                    </Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary" sx={{ ml: 7 }}>
                    Track and categorize your recurring expenses.
                </Typography>
            </Box>

            {/* Summary Strip */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#FF4D6D', mb: 0.5 }}>
                            ${totalMonthly.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Monthly Total
                        </Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#FF4D6D', mb: 0.5 }}>
                            ${totalYearly.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Yearly Total
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Form + List */}
            <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>

                {/* Add Expense Form */}
                <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex' }}>
                    <AddExpenseForm addUpdateExpense={handleAddUpdateExpense} updatingExpense={activeExpense} height={FORM_HEIGHT} />
                </Grid>

                {/* Expense List */}
                <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex' }}>
                    <ExpenseList
                        expenses={expenses}
                        setActiveExpense={setActiveExpense}
                        removeExpense={removeExpense}
                        maxHeight={FORM_HEIGHT}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}
