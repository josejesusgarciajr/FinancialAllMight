import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
    Chip,
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import SecurityIcon from '@mui/icons-material/Security'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import DiamondIcon from '@mui/icons-material/Diamond'

const features = [
    {
        icon: <NotificationsActiveIcon fontSize="large" sx={{ color: '#00C896' }} />,
        title: 'Income',
        description: 'Never miss a market-moving event. Get instant notifications on price targets, earnings, and risk thresholds.',
    },
    {
        icon: <SecurityIcon fontSize="large" sx={{ color: '#4F8EF7' }} />,
        title: 'Debt',
        description: 'Protect your downside with smart hedging signals, portfolio stress tests, and volatility tracking.',
    },
    {
        icon: <AccountBalanceIcon fontSize="large" sx={{ color: '#00C896' }} />,
        title: 'Investments',
        description: 'Maximize after-tax returns with automated tax-loss harvesting insights and year-round planning tools.',
    },
    {
        icon: <TrendingUpIcon fontSize="large" sx={{ color: '#4F8EF7' }} />,
        title: 'Portfolio Analytics',
        description: 'Track every asset in real time. Visualize performance, allocation, and growth across all your accounts.',
    },
]

const stats = [
    { value: '$284,129', label: 'Net Worth' },
    { value: '389', label: 'Total Debt' },
    { value: '18.7%', label: 'Avg. Annual Return' },
    { value: '50+', label: 'Direction' },
]

export const Home = () => {
    return (
        <Box>
            {/* Hero */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #070B14 0%, #0A1628 50%, #0F1923 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    py: { xs: 10, md: 16 },
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
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<ShowChartIcon />}
                            sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
                        >
                            Start Investing Smarter
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
                        >
                            View Demo
                        </Button>
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
                                            background: 'linear-gradient(135deg, #4F8EF7, #93C5FD)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
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
            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            background: 'linear-gradient(135deg, #F0F2F5 50%, #4F8EF7 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Everything You Need to Win the Market
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '500px', mx: 'auto', lineHeight: 1.7 }}>
                        From portfolio tracking to tax optimization — tools that hedge funds use, at a fraction of the cost.
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {features.map((feature) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={feature.title}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3.5,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    gap: 2,
                                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                                    '&:hover': {
                                        transform: 'translateY(-6px)',
                                        boxShadow: '0 16px 48px rgba(79, 142, 247, 0.12)',
                                        borderColor: 'rgba(79, 142, 247, 0.35)',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 2,
                                        bgcolor: 'rgba(79, 142, 247, 0.07)',
                                        border: '1px solid rgba(79, 142, 247, 0.15)',
                                        display: 'inline-flex',
                                    }}
                                >
                                    {feature.icon}
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                                    {feature.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #0A1628 0%, #0D1A2E 50%, #0F1923 100%)',
                    borderTop: '1px solid rgba(79, 142, 247, 0.15)',
                    py: { xs: 8, md: 12 },
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
                        <TrendingUpIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                        Ready to Build<br />Generational Wealth?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.75 }}>
                        Join thousands of investors who trust Financial Mutant to manage, grow, and protect their portfolios.
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}
