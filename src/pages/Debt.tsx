// material ui
import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard'

// finances
import { useFinance } from '../context/FinanceContext'
import { AddDebtForm } from '../components/Debt/AddDebtForm'
import { DebtDisplayList } from '../components/Debt/DebtDisplayList'
import { PageHeader } from '../components/PageHeader'
import type { DebtCategory } from '../types/debt'

const FORM_HEIGHT = 420

export const DebtPage = () => {
    const { debts, addDebt, removeDebt, updateDebt, activeDebt, setActiveDebt } = useFinance()

    function handleAddUpdateDebt(name: string, amount: number, interestRate: number, category: DebtCategory) {
        if (activeDebt) {
            updateDebt({ id: activeDebt.id, name, amount, interestRate, category })
            setActiveDebt(null)
            return
        }

        addDebt({ id: crypto.randomUUID(), name, amount, interestRate, category })
    }

    const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0)
    const avgRate = debts.length
        ? debts.reduce((sum, d) => sum + d.interestRate, 0) / debts.length
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

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>

                {/* Summary Strip */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#FF4D6D', mb: 0.5 }}>
                                ${totalDebt.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                Total Debt
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#4F8EF7', mb: 0.5 }}>
                                {avgRate.toFixed(2)}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                Avg. Interest Rate
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Form + List */}
                <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>

                    <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex' }}>
                        <AddDebtForm
                            addUpdateDebt={handleAddUpdateDebt}
                            updatingDebt={activeDebt}
                            height={FORM_HEIGHT}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex' }}>
                        <DebtDisplayList
                            debts={debts}
                            setActiveDebt={setActiveDebt}
                            removeDebt={removeDebt}
                            maxHeight={FORM_HEIGHT}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
