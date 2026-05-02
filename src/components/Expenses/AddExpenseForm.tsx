// react
import React, { useState, useEffect } from 'react'

// material ui
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

// finance
import { ExpenseFrequencyOptions, ExpenseOptions, type Expense, type ExpenseCategory, type Frequency } from '../../types/expense'
import { DropDownSelect } from '../DropDownSelect'

type AddExpenseFormProps = {
    addUpdateExpense: (expense: string, amount: number, frequency: Frequency, category: ExpenseCategory) => void
    updatingExpense: Expense | null;
}

export const AddExpenseForm = ({ addUpdateExpense, updatingExpense }: AddExpenseFormProps) => {
    const [expense,   setExpense]   = useState('')
    const [amount,    setAmount]    = useState('')
    const [frequency, setFrequency] = useState<Frequency | ''>('')
    const [category,  setCategory]  = useState<ExpenseCategory | ''>('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const parsed = parseFloat(amount)
        if (!expense || !parsed || !frequency || !category) return

        addUpdateExpense(expense, parsed, frequency as Frequency, category as ExpenseCategory)
        setExpense('')
        setAmount('')
        setFrequency('')
        setCategory('')
    }

    useEffect(() => {
        if (!updatingExpense) return;

        setExpense(updatingExpense.name)
        setAmount(String(updatingExpense.amount))
        setCategory(updatingExpense.category)
        setFrequency(updatingExpense.frequency)
    }, [updatingExpense])

    return (
        <Paper elevation={0} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
                {updatingExpense ? 'Update Expense' : 'Add Expense'}
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                    <TextField
                        label="Expense Name"
                        value={expense}
                        onChange={(e) => setExpense(e.target.value)}
                        fullWidth
                        size="small"
                        placeholder="e.g. Rent, Netflix, Groceries"
                    />
                    <TextField
                        label="Amount ($)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                        size="small"
                        type="number"
                        slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                        placeholder="0.00"
                    />
                    <DropDownSelect
                        label="Category"
                        value={category}
                        options={ExpenseOptions}
                        onChange={(val) => setCategory(val as ExpenseCategory)}
                    />
                    <DropDownSelect
                        label="Frequency"
                        value={frequency}
                        options={ExpenseFrequencyOptions}
                        onChange={(val) => setFrequency(val as Frequency)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        startIcon={<AddIcon />}
                        sx={{
                            py: 1.25,
                            fontWeight: 700,
                            bgcolor: '#FF4D6D',
                            '&:hover': { bgcolor: '#E03358' },
                        }}
                    >
                        {updatingExpense ? 'Update Expense' : 'Add Expense'}
                    </Button>
                </Stack>
            </Box>
        </Paper>
    )
}
