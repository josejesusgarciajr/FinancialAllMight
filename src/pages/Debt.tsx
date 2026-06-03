// material ui
import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard'

// finances
import { useFinance } from '../context/FinanceContext'
import { AddDebtForm } from '../components/Debt/AddDebtForm'
import { DebtDisplayList } from '../components/Debt/DebtDisplayList'
import { PageHeader } from '../components/PageHeader'
import { DebtCategoryOptions, type DebtCategory } from '../types/debt'
import { DropDownSelect } from '../components/DropDownSelect'
import { ConfirmDialog } from '../components/ConfirmDialog'

// react
import { useState, useMemo } from 'react'

const FORM_HEIGHT = 420
const debtCategories: (DebtCategory | 'All')[] = ['All', ...DebtCategoryOptions]

export const DebtPage = () => {
    const { debts, addDebt, removeDebt, updateDebt, activeDebt, setActiveDebt } = useFinance()
    const [selectedCategory, setSelectedCategory] = useState<DebtCategory | 'All'>('All')
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

    function handleAddUpdateDebt(name: string, amount: number, interestRate: number, category: DebtCategory) {
        if (activeDebt) {
            updateDebt({ id: activeDebt.id, name, amount, interestRate, category })
            setActiveDebt(null)
            return
        }

        addDebt({ id: crypto.randomUUID(), name, amount, interestRate, category })
    }

    function handleDeleteDialogClose(deleteItem: boolean) {
        if (deleteItem && activeDebt) {
            removeDebt(activeDebt.id)
            setActiveDebt(null)
            setDeleteDialogOpen(false)
            return;
        }

        setDeleteDialogOpen(false)
        setActiveDebt(null)
    }

    const filteredDebts = useMemo(() => {
        return (
            debts.filter(d => selectedCategory === 'All' || d.category === selectedCategory)
        )
    }, [selectedCategory, debts])

    const totalDebt = filteredDebts.reduce((sum, d) => sum + d.amount, 0)
    const avgRate = filteredDebts.length
        ? filteredDebts.reduce((sum, d) => sum + d.interestRate, 0) / filteredDebts.length
        : 0

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>

            <PageHeader
                icon={<CreditCardIcon sx={{ fontSize: '1.75rem', color: '#FF4D6D' }} />}
                iconSx={{
                    p: 1.25, borderRadius: 2,
                    bgcolor: 'rgba(79, 142, 247, 0.1)',
                    border: '1px solid rgba(79, 142, 247, 0.25)',
                    display: 'inline-flex',
                }}
                title="Debt Management"
                titleLinearGradient="linear-gradient(135deg, #F0F2F5 50%, #FF4D6D 100%)"
                description="Track and manage your debts effectively. Add new debts, view existing ones, and stay on top of your financial obligations."
            />

            {/* Delete Cofirmation Dialog */}
            <ConfirmDialog
                open={deleteDialogOpen}
                handleClose={handleDeleteDialogClose}
            />

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>

                {/* Summary Strip */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#FF4D6D', mb: 0.5 }}>
                            {filteredDebts.length > 0
                                ? `$${totalDebt.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
                                : '-'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                Total Debt
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#4F8EF7', mb: 0.5 }}>
                                {filteredDebts.length > 0 ? `${avgRate.toFixed(2)}%` : '-'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                Avg. Interest Rate
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Category Selectors */}
                <Box sx={{ mb: 3 }}>
                    <DropDownSelect
                        label="Filter by Category"
                        options={debtCategories}
                        value={selectedCategory}
                        onChange={(value) => setSelectedCategory(value as DebtCategory | 'All')}
                        placeholder='Select a Category'
                    />
                </Box>

                {/* Form + List */}
                <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>

                    <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex' }}>
                        <AddDebtForm
                            deleteDialogOpen={deleteDialogOpen}
                            addUpdateDebt={handleAddUpdateDebt}
                            updatingDebt={activeDebt}
                            height={FORM_HEIGHT}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex' }}>
                        <DebtDisplayList
                            debts={filteredDebts}
                            setActiveDebt={setActiveDebt}
                            setDeleteDialogOpen={setDeleteDialogOpen}
                            maxHeight={FORM_HEIGHT}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
