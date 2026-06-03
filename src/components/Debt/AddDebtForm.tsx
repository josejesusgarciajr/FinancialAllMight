// react
import { useState, useEffect } from 'react'

// material ui
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// finances
import { DebtCategoryOptions, type Debt, type DebtCategory } from '../../types/debt'
import { DropDownSelect } from '../DropDownSelect'

type AddDebtFormProps = {
    deleteDialogOpen: boolean;
    addUpdateDebt: (name: string, amount: number, interestRate: number, category: DebtCategory) => void;
    updatingDebt: Debt | null;
    height: number;
}

export const AddDebtForm = ({ deleteDialogOpen, addUpdateDebt, updatingDebt, height }: AddDebtFormProps) => {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [category, setCategory] = useState<DebtCategory | ''>('')

    useEffect(() => {
        if (!updatingDebt) 
        {
            setName('')
            setAmount('')
            setInterestRate('')
            setCategory('')
            return
        }

        setName(updatingDebt.name)
        setAmount(String(updatingDebt.amount))
        setInterestRate(String(updatingDebt.interestRate))
        setCategory(updatingDebt.category)
    }, [updatingDebt])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const parsedAmount = parseFloat(amount)
        const parsedRate = parseFloat(interestRate)

        if (!name || parsedAmount <= 0 || isNaN(parsedAmount) || parsedRate < 0 || isNaN(parsedRate) || !category) return

        addUpdateDebt(name, parsedAmount, parsedRate, category as DebtCategory)
        setName('')
        setAmount('')
        setInterestRate('')
        setCategory('')
    }

    const isEditing = !!updatingDebt

    return (
        <Paper elevation={0} sx={{ p: 3, width: '100%', height }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
                {
                    deleteDialogOpen ? 'Delete Debt' :
                    isEditing ? 'Update Debt' : 
                    'Add Debt'}
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                    <TextField
                        label="Debt Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        size="small"
                        placeholder="e.g. Chase Sapphire, Student Loan"
                    />
                    <TextField
                        label="Balance ($)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                        size="small"
                        type="number"
                        slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                        placeholder="0.00"
                    />
                    <TextField
                        label="Interest Rate (%)"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        fullWidth
                        size="small"
                        type="number"
                        slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                        placeholder="e.g. 24.99"
                    />
                    <DropDownSelect
                        label="Category"
                        value={category}
                        options={DebtCategoryOptions}
                        onChange={(val) => setCategory(val as DebtCategory)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        startIcon={
                            deleteDialogOpen ? <DeleteIcon /> :
                            isEditing ? <EditIcon /> :
                            <AddIcon />
                        }
                        sx={{
                            py: 1.25,
                            fontWeight: 700,
                            bgcolor: '#4F8EF7',
                            '&:hover': { bgcolor: '#3A7AE3' },
                        }}
                    >
                        {
                            deleteDialogOpen ? 'Delete Debt' :
                            isEditing ? 'Update Debt' 
                            : 'Add Debt'
                        }
                    </Button>
                </Stack>
            </Box>
        </Paper>
    )
}
