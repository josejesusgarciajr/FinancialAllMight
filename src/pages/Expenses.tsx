import {
    Box,
    Chip,
    Container,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import HomeIcon from '@mui/icons-material/Home'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import { AddExpenseForm } from '../components/Expenses/AddExpenseForm'
import { useExpenses } from '../hooks/useExpenses'
import type { Expense, ExpenseCategory, Frequency } from '../types/expense'

const categoryConfig: Record<ExpenseCategory, { icon: React.ReactNode; color: string; bg: string; border: string }> = {
    housing:        { icon: <HomeIcon />,          color: '#FF4D6D', bg: 'rgba(255,77,109,0.08)',   border: 'rgba(255,77,109,0.2)' },
    food:           { icon: <RestaurantIcon />,     color: '#00C896', bg: 'rgba(0,200,150,0.08)',    border: 'rgba(0,200,150,0.2)' },
    transportation: { icon: <DirectionsCarIcon />,  color: '#4F8EF7', bg: 'rgba(79,142,247,0.08)',   border: 'rgba(79,142,247,0.2)' },
    utilities:      { icon: <ElectricBoltIcon />,   color: '#FFB547', bg: 'rgba(255,181,71,0.08)',   border: 'rgba(255,181,71,0.2)' },
    entertainment:  { icon: <SportsEsportsIcon />,  color: '#A78BFA', bg: 'rgba(167,139,250,0.08)',  border: 'rgba(167,139,250,0.2)' },
    healthcare:     { icon: <LocalHospitalIcon />,  color: '#FF4D6D', bg: 'rgba(255,77,109,0.08)',   border: 'rgba(255,77,109,0.2)' },
    other:          { icon: <MoreHorizIcon />,      color: '#94A3B8', bg: 'rgba(148,163,184,0.08)',  border: 'rgba(148,163,184,0.2)' },
}

function toMonthly(amount: number, frequency: Frequency): number {
    if (frequency === 'monthly') return amount
    if (frequency === 'weekly')  return amount * (52 / 12)
    return amount / 12
}

import React from 'react'

export const Expenses = () => {
    const { expenses, addExpense, removeExpense } = useExpenses()

    const totalMonthly = expenses.reduce((sum, e) => sum + toMonthly(e.amount, e.frequency), 0)
    const totalYearly  = totalMonthly * 12

    function handleAddExpense(name: string, amount: number, frequency: Frequency, category: ExpenseCategory) {
        const newExpense: Expense = { id: crypto.randomUUID(), name, amount, frequency, category }
        addExpense(newExpense)
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
                <Grid size={{ xs: 12, md: 5 }}>
                    <AddExpenseForm addExpense={handleAddExpense} />
                </Grid>

                {/* Expense List */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper elevation={0} sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5, color: 'text.primary' }}>
                            {expenses.length === 0
                                ? 'No expenses yet'
                                : `${expenses.length} Expense${expenses.length !== 1 ? 's' : ''}`}
                        </Typography>

                        {expenses.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">
                                Add your first expense using the form.
                            </Typography>
                        ) : (
                            <Stack divider={<Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />} spacing={2}>
                                {expenses.map((expense) => {
                                    const cfg     = categoryConfig[expense.category]
                                    const monthly = toMonthly(expense.amount, expense.frequency)

                                    return (
                                        <Stack key={expense.id} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                                            <Box sx={{
                                                p: 1, borderRadius: 1.5, display: 'inline-flex', flexShrink: 0,
                                                bgcolor: cfg.bg, border: `1px solid ${cfg.border}`,
                                            }}>
                                                <Box sx={{ color: cfg.color, display: 'flex' }}>{cfg.icon}</Box>
                                            </Box>

                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography variant="body1" sx={{ fontWeight: 600 }} noWrap>
                                                    {expense.name}
                                                </Typography>
                                                <Stack direction="row" spacing={0.75} sx={{ mt: 0.5 }}>
                                                    <Chip label={expense.category} size="small" sx={{
                                                        bgcolor: cfg.bg, color: cfg.color,
                                                        border: `1px solid ${cfg.border}`,
                                                        fontWeight: 600, fontSize: '0.68rem',
                                                    }} />
                                                    <Chip label={expense.frequency} size="small" sx={{
                                                        bgcolor: 'rgba(255,255,255,0.04)',
                                                        color: 'text.secondary',
                                                        fontSize: '0.68rem',
                                                    }} />
                                                </Stack>
                                            </Box>

                                            <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                                                <Typography variant="body1" sx={{ fontWeight: 700, color: '#FF4D6D' }}>
                                                    ${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </Typography>
                                                {expense.frequency !== 'monthly' && (
                                                    <Typography variant="caption" color="text.secondary">
                                                        ${monthly.toFixed(2)}/mo
                                                    </Typography>
                                                )}
                                            </Box>

                                            <IconButton
                                                size="small"
                                                onClick={() => removeExpense(expense.id)}
                                                sx={{
                                                    color: 'rgba(255,77,109,0.4)',
                                                    '&:hover': { color: '#FF4D6D', bgcolor: 'rgba(255,77,109,0.08)' },
                                                }}
                                            >
                                                <DeleteOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    )
                                })}
                            </Stack>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
