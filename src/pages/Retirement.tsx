import { useState } from 'react'
import {
    Box,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    InputAdornment,
    Chip,
    Alert,
    LinearProgress,
} from '@mui/material'
import SavingsIcon from '@mui/icons-material/Savings'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

import { useFinance } from '../context/FinanceContext'
import { useRetirement } from '../hooks/useRetirement'
import { calculate401KContribution } from '../utils/retirement'

const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const IRS_LIMIT_2025 = 23_500

export const Retirement = () => {
    const { income } = useFinance()
    const { _401K, handle401KChange, roth401K, handleRoth401KChange } = useRetirement()

    const [traditionalDraft, setTraditionalDraft] = useState(_401K.toString())
    const [rothDraft, setRothDraft] = useState(roth401K.toString())

    const traditionalAmount = income && _401K > 0 ? calculate401KContribution(income, _401K) : 0
    const rothAmount = income && roth401K > 0 ? calculate401KContribution(income, roth401K) : 0
    const totalRetirement = traditionalAmount + rothAmount
    const limitPct = Math.min((totalRetirement / IRS_LIMIT_2025) * 100, 100)
    const isOverLimit = totalRetirement > IRS_LIMIT_2025
    const hasAnyContribution = _401K > 0 || roth401K > 0

    const inputFieldSx = (color: string) => ({
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: `${color}40` },
            '&:hover fieldset': { borderColor: `${color}80` },
            '&.Mui-focused fieldset': { borderColor: color },
        },
    })

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
                                bgcolor: 'rgba(79, 142, 247, 0.1)',
                                border: '1px solid rgba(79, 142, 247, 0.25)',
                                display: 'inline-flex',
                            }}
                        >
                            <SavingsIcon sx={{ fontSize: '1.75rem', color: 'primary.main' }} />
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
                            Retirement Planning
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, lineHeight: 1.7 }}>
                        Maximize your tax-advantaged retirement savings. The 2025 combined 401(k) limit is{' '}
                        <strong style={{ color: '#4F8EF7' }}>{fmt(IRS_LIMIT_2025)}</strong> across Traditional and Roth contributions.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>

                {!income && (
                    <Alert
                        severity="info"
                        sx={{
                            mb: 3,
                            bgcolor: 'rgba(79,142,247,0.08)',
                            border: '1px solid rgba(79,142,247,0.2)',
                            color: 'primary.light',
                            '& .MuiAlert-icon': { color: 'primary.main' },
                        }}
                    >
                        Set your income on the Income tab to see dollar contribution amounts.
                    </Alert>
                )}

                <Grid container spacing={3}>

                    {/* ── Traditional 401(k) ──────────────────────────────────── */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3.5,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2.5,
                                borderColor: _401K > 0 ? 'rgba(79,142,247,0.3)' : undefined,
                                transition: 'border-color 0.2s',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <AccountBalanceIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                            Traditional 401(k)
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        Pre-tax contributions that reduce your taxable income today.
                                    </Typography>
                                </Box>
                                <Chip
                                    label="Pre-Tax"
                                    size="small"
                                    sx={{
                                        bgcolor: 'rgba(79,142,247,0.1)',
                                        color: 'primary.light',
                                        border: '1px solid rgba(79,142,247,0.2)',
                                        fontWeight: 600,
                                        flexShrink: 0,
                                        ml: 1,
                                    }}
                                />
                            </Box>

                            <TextField
                                type="number"
                                label="Contribution Rate"
                                value={traditionalDraft}
                                onChange={(e) => {
                                    setTraditionalDraft(e.target.value)
                                    const v = parseFloat(e.target.value)
                                    if ((v >= 0 && v <= 100) || isNaN(v)) handle401KChange(v)
                                }}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>%</Typography>
                                            </InputAdornment>
                                        ),
                                    },
                                    htmlInput: { min: 0, max: 100, step: 0.5 },
                                }}
                                sx={inputFieldSx('#4F8EF7')}
                            />

                            {income ? (
                                <Box
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: _401K > 0 ? 'rgba(79,142,247,0.06)' : 'rgba(255,255,255,0.02)',
                                        border: '1px solid',
                                        borderColor: _401K > 0 ? 'rgba(79,142,247,0.2)' : 'rgba(79,142,247,0.06)',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 800,
                                            color: _401K > 0 ? 'primary.main' : 'text.disabled',
                                            lineHeight: 1.1,
                                            mb: 0.75,
                                        }}
                                    >
                                        {_401K > 0 ? fmt(traditionalAmount) : '—'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {_401K > 0
                                            ? `${_401K}% of ${fmt(income)} · ${fmt(traditionalAmount / 26)}/paycheck (biweekly)`
                                            : 'Enter a contribution rate above'}
                                    </Typography>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        p: 2, borderRadius: 2,
                                        bgcolor: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(79,142,247,0.06)',
                                    }}
                                >
                                    <Typography variant="body2" color="text.disabled">
                                        Set your income on the Income tab to see dollar amounts.
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                    </Grid>

                    {/* ── Roth 401(k) ─────────────────────────────────────────── */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3.5,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2.5,
                                borderColor: roth401K > 0 ? 'rgba(0,200,150,0.3)' : undefined,
                                transition: 'border-color 0.2s',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <TrendingUpIcon sx={{ color: 'secondary.main', fontSize: '1.25rem' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                            Roth 401(k)
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        After-tax contributions that grow and withdraw tax-free.
                                    </Typography>
                                </Box>
                                <Chip
                                    label="After-Tax"
                                    size="small"
                                    sx={{
                                        bgcolor: 'rgba(0,200,150,0.1)',
                                        color: 'secondary.main',
                                        border: '1px solid rgba(0,200,150,0.2)',
                                        fontWeight: 600,
                                        flexShrink: 0,
                                        ml: 1,
                                    }}
                                />
                            </Box>

                            <TextField
                                type="number"
                                label="Contribution Rate"
                                value={rothDraft}
                                onChange={(e) => {
                                    setRothDraft(e.target.value)
                                    const v = parseFloat(e.target.value)
                                    if ((v >= 0 && v <= 100) || isNaN(v)) handleRoth401KChange(v)
                                }}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>%</Typography>
                                            </InputAdornment>
                                        ),
                                    },
                                    htmlInput: { min: 0, max: 100, step: 0.5 },
                                }}
                                sx={inputFieldSx('#00C896')}
                            />

                            {income ? (
                                <Box
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: roth401K > 0 ? 'rgba(0,200,150,0.06)' : 'rgba(255,255,255,0.02)',
                                        border: '1px solid',
                                        borderColor: roth401K > 0 ? 'rgba(0,200,150,0.2)' : 'rgba(79,142,247,0.06)',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 800,
                                            color: roth401K > 0 ? 'secondary.main' : 'text.disabled',
                                            lineHeight: 1.1,
                                            mb: 0.75,
                                        }}
                                    >
                                        {roth401K > 0 ? fmt(rothAmount) : '—'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {roth401K > 0
                                            ? `${roth401K}% of ${fmt(income)} · ${fmt(rothAmount / 26)}/paycheck (biweekly)`
                                            : 'Enter a contribution rate above'}
                                    </Typography>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        p: 2, borderRadius: 2,
                                        bgcolor: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(79,142,247,0.06)',
                                    }}
                                >
                                    <Typography variant="body2" color="text.disabled">
                                        Set your income on the Income tab to see dollar amounts.
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                    </Grid>

                    {/* ── IRS Limit Summary ────────────────────────────────────── */}
                    {(hasAnyContribution && !!income) && (
                        <Grid size={{ xs: 12 }}>
                            <Paper elevation={0} sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                            2025 IRS Contribution Limit
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Combined Traditional + Roth 401(k) annual limit
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 700, color: isOverLimit ? 'error.main' : 'secondary.main' }}
                                        >
                                            {fmt(totalRetirement)} / {fmt(IRS_LIMIT_2025)}
                                        </Typography>
                                        {isOverLimit && (
                                            <Typography variant="caption" color="error.main">
                                                Over limit by {fmt(totalRetirement - IRS_LIMIT_2025)}
                                            </Typography>
                                        )}
                                        {!isOverLimit && (
                                            <Typography variant="caption" color="text.secondary">
                                                {fmt(IRS_LIMIT_2025 - totalRetirement)} remaining
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>

                                <LinearProgress
                                    variant="determinate"
                                    value={limitPct}
                                    sx={{
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: 'rgba(79,142,247,0.06)',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: isOverLimit ? 'error.main' : limitPct > 85 ? '#F5A623' : 'secondary.main',
                                            borderRadius: 4,
                                            transition: 'width 0.4s ease',
                                        },
                                    }}
                                />

                                <Box sx={{ display: 'flex', gap: 3, mt: 1.5, flexWrap: 'wrap' }}>
                                    {[
                                        { label: 'Traditional 401(k)', color: '#4F8EF7', value: traditionalAmount },
                                        { label: 'Roth 401(k)', color: '#00C896', value: rothAmount },
                                        { label: 'Remaining Limit', color: 'rgba(255,255,255,0.25)', value: Math.max(0, IRS_LIMIT_2025 - totalRetirement) },
                                    ].map(({ label, color, value }) => (
                                        <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color }} />
                                            <Typography variant="caption" color="text.secondary">
                                                {label}: <strong style={{ color }}>{fmt(value)}</strong>
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Paper>
                        </Grid>
                    )}

                </Grid>
            </Container>
        </Box>
    )
}
