// finances
import { useInvestments } from '../hooks/useInvestments'
import type { ContributionFequency, IContributionDetails, ReoccurringContribution } from '../types/investment'
import { ContributionFrequencyOptions, riskConfig } from '../types/investment'
import { PageHeader } from '../components/PageHeader'
import { DropDownSelect } from '../components/DropDownSelect'
import { Contributions } from '../components/InvestmentDetails/Contributions'

// react
import { useParams } from 'react-router-dom'
import { useState } from 'react'

// mui
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import { ConfirmDialog } from '../components/ConfirmDialog'

const FORM_HEIGHT = 420

const inputSx = {
    '& .MuiOutlinedInput-root': {
        color: 'text.primary',
        '& fieldset': { borderColor: 'rgba(79, 142, 247, 0.25)' },
        '&:hover fieldset': { borderColor: 'rgba(79, 142, 247, 0.5)' },
        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
    },
    '& .MuiInputLabel-root': { color: 'text.secondary' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
}

export const InvestmentsDetails = () => {
    const { getMyInvestmentBySymbol, updateInvestment } = useInvestments()
    const { symbol } = useParams<{ symbol: string }>()
    const investment = getMyInvestmentBySymbol(symbol ?? '')
    const IContribution = investment?.contributionDetails ?? null
    const [contributionFrequency, setContributionFrequency] = useState<ContributionFequency | null>(null)
    const [contributionAmount, setContributionAmount] = useState<number | null>(null)

    // delete contribution dialog
    const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState<boolean>(false);
    const [contributionToDelete, setContributionToDelete] = useState<ReoccurringContribution | null>(null);

    function handleCurrentValueChange(value: number) {
        if (!investment) return

        const updatedContribution: IContributionDetails = {
            currentValue: value,
            reoccurringContributions: IContribution?.reoccurringContributions ?? [],
        }

        updateInvestment({ ...investment, contributionDetails: updatedContribution })
    }

    function handleContributionFrequencySelect(frequencyString: string) {
        setContributionFrequency(frequencyString as ContributionFequency)
    }

    function handleContributionAmountChange(amount: number) {
        setContributionAmount(amount)
    }

    function handleAddContribution() {
        if (!investment || !contributionAmount || !contributionFrequency) return

        const existingIds = investment.contributionDetails?.reoccurringContributions?.map(c => c.id) ?? []
        const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 1

        const newContribution: ReoccurringContribution = {
            id: nextId,
            amount: contributionAmount,
            frequency: contributionFrequency,
        }

        const updatedContribution: IContributionDetails = {
            currentValue: IContribution?.currentValue ?? 0,
            reoccurringContributions: [
                ...(IContribution?.reoccurringContributions ?? []),
                newContribution,
            ],
        }

        updateInvestment({ ...investment, contributionDetails: updatedContribution })
        setContributionAmount(null)
        setContributionFrequency(null)
    }

    function handleOpenDeleteDialog(contribution: ReoccurringContribution) {
        setContributionToDelete(contribution);
        setShowDeleteConfirmationDialog(true)
    }

    function handleConfirmModalClose(deleteContribution = false) {
        if (!investment) return

        if (!deleteContribution) {
            setShowDeleteConfirmationDialog(false)
            return;
        }

        if (!contributionToDelete) {
            return;
        }

        const updatedContribution: IContributionDetails = {
            currentValue: investment.contributionDetails?.currentValue ?? 0,
            reoccurringContributions: (investment.contributionDetails?.reoccurringContributions ?? [])
                .filter(contribution => contribution.id !== contributionToDelete.id),
        }

        updateInvestment({ ...investment, contributionDetails: updatedContribution })

        setContributionToDelete(null);
        setShowDeleteConfirmationDialog(false);
    }

    const risk = investment ? riskConfig[investment.riskLevel] : null

    const stats = [
        {
            label: 'Current Value',
            value: IContribution?.currentValue != null ? `$${IContribution.currentValue.toLocaleString()}` : '—',
            color: 'secondary.main',
        },
        {
            label: 'Market Price',
            value: investment ? `$${investment.price.toLocaleString()}` : '—',
            color: '#4F8EF7',
        },
        {
            label: 'Avg. Yearly Return',
            value: investment ? `${investment.averageYearlyReturn}%` : '—',
            color: 'secondary.main',
        },
        {
            label: 'Risk Level',
            value: investment?.riskLevel ?? '—',
            color: risk?.color ?? 'text.secondary',
        },
    ]

    return (
        <>
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
                <PageHeader
                    icon={<ShowChartIcon sx={{ fontSize: '1.75rem', color: 'primary.main' }} />}
                    iconSx={{
                        p: 1.25, borderRadius: 2,
                        bgcolor: 'rgba(79, 142, 247, 0.1)',
                        border: '1px solid rgba(79, 142, 247, 0.25)',
                        display: 'inline-flex',
                    }}
                    title={investment?.symbol ?? symbol ?? ''}
                    titleLinearGradient="linear-gradient(135deg, #F0F2F5 50%, #4F8EF7 100%)"
                    description={investment?.vender ?? ''}
                />

                <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>

                    {/* Stats Strip */}
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                        {stats.map(({ label, value, color }) => (
                            <Grid key={label} size={{ xs: 12, sm: 6, md: 3 }}>
                                <Box sx={{
                                    p: 2.5, borderRadius: 2,
                                    bgcolor: 'background.paper',
                                    border: '1px solid rgba(79, 142, 247, 0.1)',
                                }}>
                                    <Typography variant="h5" sx={{ color, fontWeight: 700 }}>
                                        {value}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                                        {label}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Form + Contributions */}
                    <Grid container spacing={3}>

                        {/* Left: Form */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{
                                p: 3, borderRadius: 2,
                                bgcolor: 'background.paper',
                                border: '1px solid rgba(79, 142, 247, 0.1)',
                                height: FORM_HEIGHT,
                                display: 'flex', flexDirection: 'column', gap: 2.5,
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Portfolio Details
                                </Typography>

                                <TextField
                                    label="Current Value ($)"
                                    type="number"
                                    value={IContribution?.currentValue ?? ''}
                                    onChange={(e) => handleCurrentValueChange(Number(e.target.value))}
                                    fullWidth
                                    sx={inputSx}
                                />

                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    Add Recurring Contribution
                                </Typography>

                                <DropDownSelect
                                    label="Contribution Frequency"
                                    options={ContributionFrequencyOptions}
                                    value={contributionFrequency ?? ''}
                                    onChange={handleContributionFrequencySelect}
                                    placeholder="Select frequency…"
                                />

                                <TextField
                                    label="Contribution Amount ($)"
                                    type="number"
                                    value={contributionAmount ?? ''}
                                    onChange={(e) => handleContributionAmountChange(Number(e.target.value))}
                                    fullWidth
                                    sx={inputSx}
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                                    <Button
                                        variant="outlined"
                                        onClick={handleAddContribution}
                                        disabled={!contributionAmount || !contributionFrequency}
                                        sx={{
                                            borderColor: 'secondary.main',
                                            color: 'secondary.main',
                                            '&:hover': { bgcolor: 'rgba(0, 200, 150, 0.08)', borderColor: 'secondary.main' },
                                            '&.Mui-disabled': { borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' },
                                        }}
                                    >
                                        + Add Contribution
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Right: Contributions list */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{
                                p: 3, borderRadius: 2,
                                bgcolor: 'background.paper',
                                border: '1px solid rgba(79, 142, 247, 0.1)',
                                height: FORM_HEIGHT,
                                overflowY: 'auto',
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Recurring Contributions
                                </Typography>

                                {investment?.contributionDetails?.reoccurringContributions?.length ? (
                                    <Contributions 
                                        investment={investment}
                                        openDeleteDialog={handleOpenDeleteDialog}
                                    />
                                ) : (
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        No contributions added yet.
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Delete Confirmation Modal */}
            <ConfirmDialog
                open={showDeleteConfirmationDialog}
                handleClose={handleConfirmModalClose}
            />
        </>
    )
}
