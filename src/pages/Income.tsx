import { useState, useEffect, useMemo } from 'react'
import {
    Box,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    InputAdornment,
    Divider,
    Chip,
} from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SavingsIcon from '@mui/icons-material/Savings'
import PercentIcon from '@mui/icons-material/Percent'

import { useFinance } from '../context/FinanceContext'
import { DropDownSelect } from '../components/DropDownSelect'
import { MetricCard } from '../components/MetricCard'
import { US_STATES, calculateTaxes, stateHasTax } from '../utils/taxes'
import { useRetirement } from '../hooks/useRetirement'
import { calculate401KContribution } from '../utils/retirement'

const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const pct = (n: number) => `${(n * 100).toFixed(1)}%`

// ─── Page ────────────────────────────────────────────────────────────────────

export const Income = () => {
    const { income, addIncome, filingState, updateFilingState } = useFinance()
    const [draft, setDraft] = useState<string>(income != null ? income.toString() : '')

    useEffect(() => {
        const parsed = Number(draft)
        if (!isNaN(parsed) && parsed >= 0) addIncome(parsed)
    }, [draft, addIncome])

    const hasIncome = income != null && income > 0
    const hasState = filingState.length > 0

    const taxes = useMemo(
        () => (hasIncome && hasState ? calculateTaxes(income!, filingState) : null),
        [income, filingState],
    )

    const formattedIncome = hasIncome ? fmt(income!) : '—'
    const noStateTax = hasState && !stateHasTax(filingState)

    // retirement
    const { _401K, roth401K } = useRetirement()
    const traditionalAmount = income && _401K > 0 ? calculate401KContribution(income, _401K) : 0
    const rothAmount = income && roth401K > 0 ? calculate401KContribution(income, roth401K) : 0
    const hasRetirement = _401K > 0 || roth401K > 0

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
                        Track every dollar coming in and see exactly what you keep after federal, FICA, and state taxes.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
                <Grid container spacing={3}>

                    {/* ── Current Income ──────────────────────────────────── */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Paper elevation={0} sx={{ p: 3.5, height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}
                            >
                                Gross Income
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
                                {formattedIncome}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                {hasIncome
                                    ? 'Your annual gross income before taxes.'
                                    : 'No income recorded yet. Enter it using the form.'}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* ── Update Income + State Selector ──────────────────── */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper elevation={0} sx={{ p: 3.5, display: 'flex', flexDirection: 'column', gap: 3 }}>

                            {/* Income input */}
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                    Update Income
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                                    Enter your total annual income.
                                </Typography>
                                <TextField
                                    type="number"
                                    label="Annual Income"
                                    placeholder="0"
                                    fullWidth
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { const p = Number(draft); if (!isNaN(p) && p >= 0) addIncome(p) } }}
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
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'rgba(79, 142, 247, 0.25)' },
                                            '&:hover fieldset': { borderColor: 'rgba(79, 142, 247, 0.5)' },
                                            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                        },
                                    }}
                                />
                            </Box>

                            <Divider sx={{ borderColor: 'rgba(79,142,247,0.1)' }} />

                            {/* State selector */}
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <LocationOnIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        Filing State
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                                    Select your state to include state income tax in the breakdown.
                                </Typography>
                                <DropDownSelect
                                    label="State"
                                    options={US_STATES}
                                    value={filingState}
                                    onChange={updateFilingState}
                                    placeholder="Select your state…"
                                />
                                {hasState && noStateTax && (
                                    <Chip
                                        label={`${filingState} has no state income tax`}
                                        size="small"
                                        sx={{
                                            mt: 1.5,
                                            bgcolor: 'rgba(0,200,150,0.1)',
                                            color: 'secondary.main',
                                            border: '1px solid rgba(0,200,150,0.25)',
                                            fontWeight: 600,
                                        }}
                                    />
                                )}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* ── Tax Breakdown ────────────────────────────────────── */}
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 0.5 }}>
                            <AccountBalanceIcon sx={{ color: 'primary.main' }} />
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                Estimated Tax Breakdown
                            </Typography>
                            <Chip
                                label="2025 Single Filer"
                                size="small"
                                sx={{ bgcolor: 'rgba(79,142,247,0.1)', color: 'primary.light', border: '1px solid rgba(79,142,247,0.2)' }}
                            />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {!hasIncome && !hasState
                                ? 'Enter your income and select a state to see your tax breakdown.'
                                : !hasIncome
                                ? 'Enter your income above to see the breakdown.'
                                : !hasState
                                ? 'Select your filing state above to include state taxes.'
                                : 'Estimates based on 2025 federal and state rates for a single filer.'}
                        </Typography>
                    </Grid>

                    {/* Federal Income Tax */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <MetricCard
                            label="Federal Income Tax"
                            amount={taxes ? fmt(taxes.federalIncomeTax) : '—'}
                            subtitle={taxes ? `${pct(taxes.federalIncomeTax / taxes.grossIncome)} of gross · std. deduction $15,000` : 'Marginal rate up to 37%'}
                            icon={<AccountBalanceIcon fontSize="small" />}
                            accentColor="#4F8EF7"
                            dim={!taxes}
                        />
                    </Grid>

                    {/* FICA */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <MetricCard
                            label="FICA"
                            amount={taxes ? fmt(taxes.socialSecurity + taxes.medicare) : '—'}
                            subtitle={
                                taxes
                                    ? `Social Security ${fmt(taxes.socialSecurity)} · Medicare ${fmt(taxes.medicare)}`
                                    : 'Social Security 6.2% + Medicare 1.45%'
                            }
                            icon={<PercentIcon fontSize="small" />}
                            accentColor="#93C5FD"
                            dim={!taxes}
                        />
                    </Grid>

                    {/* State Tax */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <MetricCard
                            label={`${hasState ? filingState : 'State'} Tax`}
                            amount={
                                !taxes
                                    ? '—'
                                    : noStateTax
                                    ? '$0'
                                    : fmt(taxes.stateTax)
                            }
                            subtitle={
                                !hasState
                                    ? 'Select your state above'
                                    : noStateTax
                                    ? 'No state income tax'
                                    : taxes
                                    ? `${pct(taxes.stateTax / taxes.grossIncome)} of gross`
                                    : ''
                            }
                            icon={<LocationOnIcon fontSize="small" />}
                            accentColor={noStateTax ? '#00C896' : '#F5A623'}
                            dim={!taxes}
                        />
                    </Grid>

                    {/* Take-Home */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                opacity: taxes ? 1 : 0.45,
                                transition: 'opacity 0.2s',
                                background: taxes
                                    ? 'linear-gradient(135deg, rgba(0,200,150,0.08) 0%, rgba(0,153,112,0.04) 100%)'
                                    : undefined,
                                borderColor: taxes ? 'rgba(0,200,150,0.25)' : 'rgba(79,142,247,0.06)',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <SavingsIcon sx={{ color: 'secondary.main', fontSize: '1.1rem' }} />
                                <Typography
                                    variant="caption"
                                    sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}
                                >
                                    Take-Home Pay
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', lineHeight: 1.1 }}>
                                {taxes ? fmt(taxes.takeHome) : '—'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                                {taxes
                                    ? `${pct(taxes.takeHome / taxes.grossIncome)} of gross · effective rate ${pct(taxes.effectiveRate)}`
                                    : 'What you actually keep'}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Retirement — full-width horizontal card */}
                    {(income && hasRetirement) && (
                        <Grid size={{ xs: 12 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    background: 'linear-gradient(135deg, rgba(0,200,150,0.07) 0%, rgba(79,142,247,0.04) 100%)',
                                    borderColor: 'rgba(0,200,150,0.25)',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                                    <SavingsIcon sx={{ color: 'secondary.main', fontSize: '1.1rem' }} />
                                    <Typography
                                        variant="caption"
                                        sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}
                                    >
                                        Retirement Contributions
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: { xs: 3, sm: 0 } }}>
                                    {_401K > 0 && (
                                        <Box sx={{ flex: 1, minWidth: 160 }}>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                Traditional 401(k)
                                            </Typography>
                                            <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1.1, mt: 0.5 }}>
                                                {fmt(traditionalAmount)}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                {_401K}% of gross · Pre-tax
                                            </Typography>
                                        </Box>
                                    )}

                                    {_401K > 0 && roth401K > 0 && (
                                        <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(0,200,150,0.15)', mx: { xs: 0, sm: 4 } }} />
                                    )}

                                    {roth401K > 0 && (
                                        <Box sx={{ flex: 1, minWidth: 160 }}>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                Roth 401(k)
                                            </Typography>
                                            <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', lineHeight: 1.1, mt: 0.5 }}>
                                                {fmt(rothAmount)}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                {roth401K}% of gross · After-tax
                                            </Typography>
                                        </Box>
                                    )}

                                    {_401K > 0 && roth401K > 0 && (
                                        <>
                                            <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(0,200,150,0.15)', mx: { xs: 0, sm: 4 } }} />
                                            <Box sx={{ minWidth: 160 }}>
                                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                    Total
                                                </Typography>
                                                <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', lineHeight: 1.1, mt: 0.5 }}>
                                                    {fmt(traditionalAmount + rothAmount)}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                    {(_401K + roth401K).toFixed(1)}% of gross combined
                                                </Typography>
                                            </Box>
                                        </>
                                    )}
                                </Box>
                            </Paper>
                        </Grid>
                    )}

                    {/* Effective Rate Bar */}
                    {taxes && (
                        <Grid size={{ xs: 12 }}>
                            <Paper elevation={0} sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                        Total Tax Burden
                                    </Typography>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'error.main' }}>
                                            {fmt(taxes.totalTax)} · {pct(taxes.effectiveRate)} effective rate
                                        </Typography>
                                        {hasRetirement && income && (
                                            <Typography variant="caption" color="text.secondary">
                                                Retirement savings: <strong style={{ color: '#00C896' }}>{fmt(traditionalAmount + rothAmount)}</strong>
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>

                                {/* Stacked bar */}
                                <Box sx={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', bgcolor: 'rgba(79,142,247,0.06)' }}>
                                    {[
                                        { value: taxes.federalIncomeTax, color: '#4F8EF7' },
                                        { value: taxes.socialSecurity + taxes.medicare, color: '#93C5FD' },
                                        { value: taxes.stateTax, color: '#F5A623' },
                                        { value: traditionalAmount, color: '#00C896' },
                                        { value: rothAmount, color: '#5BE6BC' },
                                    ].map(({ value, color }, i) => (
                                        <Box
                                            key={i}
                                            sx={{
                                                width: `${(value / taxes.grossIncome) * 100}%`,
                                                bgcolor: color,
                                                transition: 'width 0.4s ease',
                                            }}
                                        />
                                    ))}
                                </Box>

                                <Box sx={{ display: 'flex', gap: 3, mt: 1.5, flexWrap: 'wrap' }}>
                                    {[
                                        { label: 'Federal', color: '#4F8EF7', value: taxes.federalIncomeTax },
                                        { label: 'FICA', color: '#93C5FD', value: taxes.socialSecurity + taxes.medicare },
                                        { label: 'State', color: '#F5A623', value: taxes.stateTax },
                                        ...(_401K > 0 ? [{ label: 'Traditional 401(k)', color: '#00C896', value: traditionalAmount }] : []),
                                        ...(roth401K > 0 ? [{ label: 'Roth 401(k)', color: '#5BE6BC', value: rothAmount }] : []),
                                        { label: 'Take-Home', color: '#F0F2F5', value: taxes.takeHome - traditionalAmount - rothAmount },
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
