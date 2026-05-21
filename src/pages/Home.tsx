// material ui
import {
    Box,
    Container,
    Grid,
    Stack,
    Typography,
    Chip,
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import BoltIcon from '@mui/icons-material/Bolt'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import DiamondIcon from '@mui/icons-material/Diamond'
import SavingsIcon from '@mui/icons-material/Savings'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'

// react
import { useMemo } from 'react'

// finance
import { useFinance } from '../context/FinanceContext'
import { calculateTaxes } from '../utils/taxes'
import { calculate401KContribution } from '../utils/retirement'
import { toMonthly } from '../utils/expenses'
import { Features } from '../components/Home/Features'

export const Home = () => {

    const { 
        income,
        filingState,
        expenses,
        _401K, roth401K,
        debts
    } = useFinance()

    const traditionalAmount = income && _401K > 0 ? calculate401KContribution(income, _401K) : 0
    const rothAmount = income && roth401K > 0 ? calculate401KContribution(income, roth401K) : 0
    const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0)

    const taxes = useMemo(
        () => income && income > 0 && filingState
            ? calculateTaxes(income, filingState, traditionalAmount, rothAmount)
            : null,
        [income, filingState, traditionalAmount, rothAmount]
    )

    const monthlyExpenses = useMemo(
        () => expenses.reduce((sum, e) => sum + toMonthly(e.amount, e.frequency), 0),
        [expenses]
    )

    const netMonthlyCashFlow = taxes ? taxes.takeHome / 12 - monthlyExpenses : null
    const directionPositive = netMonthlyCashFlow != null && netMonthlyCashFlow >= 0
    const directionValue = netMonthlyCashFlow != null
        ? `${directionPositive ? '+' : ''}${netMonthlyCashFlow.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}/mo`
        : '—'

    const stats: { value: string; label: string; accentColor?: string }[] = [
        { value: (income != null && income > 0) ? `$${income.toLocaleString('en-US')}` : '—', label: 'Gross Income' },
        { value: (totalDebt != null && totalDebt > 0) ? `$${totalDebt.toLocaleString('en-US')}` : '-', label: 'Total Debt' },
        { value: '-', label: 'Avg. Annual Return' },
        { value: directionValue, label: 'Direction', accentColor: netMonthlyCashFlow != null ? (directionPositive ? '#00C896' : '#FF4D6D') : undefined },
    ]

    const features = [
        {
            icon: <AttachMoneyIcon fontSize="large" sx={{ color: '#00C896' }} />,
            iconBg: 'rgba(0, 200, 150, 0.08)',
            iconBorder: 'rgba(0, 200, 150, 0.2)',
            title: 'Income',
            description: 'Track every dollar coming in. Monitor salary, side income, dividends, and cash flow trends to understand what you actually earn.',
            navigationPath: '/income',
        },
        {
            icon: <SavingsIcon fontSize="large" sx={{ color: '#00C896' }} />,
            iconBg: 'rgba(0, 200, 150, 0.08)',
            iconBorder: 'rgba(0, 200, 150, 0.2)',
            title: 'Retirement',
            description: 'Maximize your 401(k). Set Traditional and Roth contribution rates, track IRS limits, and visualize your path to financial freedom.',
            navigationPath: '/retirement',
        },
        {
            icon: <ReceiptLongIcon fontSize="large" sx={{ color: '#FF4D6D' }} />,
            iconBg: 'rgba(255, 77, 109, 0.08)',
            iconBorder: 'rgba(255, 77, 109, 0.2)',
            title: 'Expenses',
            description: 'See where your money goes. Categorize spending, identify trends, and find opportunities to save with clear visualizations.',
            navigationPath: '/expenses',
        },
        {
            icon: <CreditCardIcon fontSize="large" sx={{ color: '#FF4D6D' }} />,
            iconBg: 'rgba(255, 77, 109, 0.08)',
            iconBorder: 'rgba(255, 77, 109, 0.2)',
            title: 'Debt',
            description: 'See all your balances in one place. Track loans, credit cards, and mortgages — with payoff timelines and interest cost breakdowns.',
            navigationPath: '/debt',
        },
        {
            icon: <AutoGraphIcon fontSize="large" sx={{ color: '#4F8EF7' }} />,
            iconBg: 'rgba(79, 142, 247, 0.08)',
            iconBorder: 'rgba(79, 142, 247, 0.2)',
            title: 'Investments',
            description: 'Grow your wealth with purpose. Monitor stocks, ETFs, and retirement accounts with clear performance and allocation breakdowns.',
            navigationPath: '/investments',
        },
        {
            icon: <TrendingUpIcon fontSize="large" sx={{ color: '#4F8EF7' }} />,
            iconBg: 'rgba(79, 142, 247, 0.08)',
            iconBorder: 'rgba(79, 142, 247, 0.2)',
            title: 'Portfolio Analytics',
            description: 'Track every asset in real time. Visualize performance, allocation, and growth across all your accounts.',
            navigationPath: '/portfolio-analytics',
        },
    ]

    return (
        <Box>
            {/* Hero */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #070B14 0%, #0A1628 50%, #0F1923 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    py: { xs: 8, md: 12 },
                    textAlign: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '10%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '700px',
                        height: '700px',
                        background: 'radial-gradient(circle, rgba(79, 142, 247, 0.07) 0%, transparent 65%)',
                        pointerEvents: 'none',
                    },
                }}
            >
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Chip
                        icon={<DiamondIcon sx={{ fontSize: '0.85rem !important', color: '#4F8EF7 !important' }} />}
                        label="Institutional-Grade Tools for Retail Investors"
                        size="small"
                        sx={{
                            mb: 3,
                            bgcolor: 'rgba(79, 142, 247, 0.08)',
                            border: '1px solid rgba(79, 142, 247, 0.3)',
                            color: 'primary.main',
                            fontWeight: 600,
                            fontSize: '0.72rem',
                            letterSpacing: '0.03em',
                        }}
                    />
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            mb: 2.5,
                            background: 'linear-gradient(135deg, #F0F2F5 40%, #4F8EF7 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: 1.1,
                        }}
                    >
                        Grow Your Wealth<br />Intelligently
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            opacity: 0.65,
                            mb: 5,
                            color: 'text.secondary',
                            maxWidth: '560px',
                            mx: 'auto',
                            fontWeight: 400,
                            lineHeight: 1.6,
                        }}
                    >
                        Professional-grade portfolio analytics, real-time market intelligence, and automated insights — all in one platform.
                    </Typography>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        sx={{ justifyContent: 'center' }}
                    >
                        {/* <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<ShowChartIcon />}
                            sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
                        >
                            Start Investing Smarter
                        </Button> */}
                    </Stack>
                </Container>
            </Box>

            {/* Stats Strip */}
            <Box
                sx={{
                    borderTop: '1px solid rgba(79, 142, 247, 0.15)',
                    borderBottom: '1px solid rgba(79, 142, 247, 0.15)',
                    bgcolor: 'rgba(79, 142, 247, 0.03)',
                    py: 4,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {stats.map((stat) => (
                            <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 800,
                                            ...(stat.accentColor
                                                ? { color: stat.accentColor }
                                                : {
                                                    background: 'linear-gradient(135deg, #4F8EF7, #93C5FD)',
                                                    backgroundClip: 'text',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                }),
                                            mb: 0.5,
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Features */}
            <Features features={features} />          

            {/* CTA */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #0A1628 0%, #0D1A2E 50%, #0F1923 100%)',
                    borderTop: '1px solid rgba(79, 142, 247, 0.15)',
                    py: { xs: 2, md: 4 },
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-100px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '500px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(79, 142, 247, 0.05) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    },
                }}
            >
                <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            bgcolor: 'rgba(79, 142, 247, 0.1)',
                            border: '1px solid rgba(79, 142, 247, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                        }}
                    >
                        <BoltIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                        Ready to Build<br />Generational Wealth?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.75 }}>
                        Become the Pillar of hope for your family and community. Start your journey to financial freedom with tools designed to help you win.
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}
