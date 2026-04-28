import { useState, useEffect } from 'react'
import {
    Box,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    InputAdornment,
} from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { useFinance } from '../context/FinanceContext'

export const Income = () => {
    const { income, addIncome } = useFinance()
    const [draft, setDraft] = useState<string>(income != null ? income.toString() : '')

    const handleSave = () => {
        const parsed = Number(draft)
        if (!isNaN(parsed) && parsed >= 0) addIncome(parsed)
    }

    const formatted = (income != null && income > 0)
        ? `$${income.toLocaleString('en-US')}`
        : '—'

    useEffect(() => {
        handleSave()
    }, [draft])

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            {/* Page Header */}
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
                                p: 1.25,
                                borderRadius: 2,
                                bgcolor: 'rgba(0, 200, 150, 0.1)',
                                border: '1px solid rgba(0, 200, 150, 0.25)',
                                display: 'inline-flex',
                            }}
                        >
                            <AttachMoneyIcon sx={{ fontSize: '1.75rem', color: 'secondary.main' }} />
                        </Box>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #F0F2F5 50%, #4F8EF7 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            Income
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, lineHeight: 1.7 }}>
                        Track every dollar coming in. Monitor salary, side income, dividends, and cash flow trends to understand what you actually earn.
                    </Typography>
                </Container>
            </Box>

            {/* Content */}
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
                <Grid container spacing={3}>
                    {/* Current Income Summary */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3.5,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                                Current Income
                            </Typography>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    background: 'linear-gradient(135deg, #00C896, #33D9A8)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: 1.1,
                                    my: 1,
                                }}
                            >
                                {formatted}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                {(income != null && income > 0)
                                    ? 'Your current income on record. Update it below any time.'
                                    : 'No income recorded yet. Add your income using the form.'}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Update Income Form */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper elevation={0} sx={{ p: 3.5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
                                Update Income
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                                Enter your total income amount. This will update your net worth on the dashboard.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                <TextField
                                    type="number"
                                    label="Income Amount"
                                    placeholder="0"
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>$</Typography>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    sx={{
                                        flex: 1,
                                        minWidth: 200,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'rgba(79, 142, 247, 0.25)' },
                                            '&:hover fieldset': { borderColor: 'rgba(79, 142, 247, 0.5)' },
                                            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                        },
                                    }}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
