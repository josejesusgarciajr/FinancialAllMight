// react
import { useState } from 'react'

// material ui
import { Box, Chip, Container, Divider, Grid, Paper, Typography } from '@mui/material'
import TimelineIcon from '@mui/icons-material/Timeline'
import SavingsIcon from '@mui/icons-material/Savings'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PercentIcon from '@mui/icons-material/Percent'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

// finances
import { useInvestments } from '../hooks/useInvestments'
import { riskConfig } from '../types/investment'
import { PageHeader } from '../components/PageHeader'
import { MetricCard } from '../components/MetricCard'
import { GrowthChart } from '../components/PortfolioAnalysis/GrowthChart'
import { projectPortfolioGrowth } from '../utils/investmentGrowth'

const PROJECTION_YEARS = 30

const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export const PortfolioAnalysis = () => {
    const { investments } = useInvestments()
    const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)

    const startDate = new Date()
    const startYear = startDate.getFullYear()
    const endYear = startYear + PROJECTION_YEARS

    const funded = investments.filter(inv => inv.contributionDetails)
    const selectedInvestment = selectedSymbol
        ? funded.find(inv => inv.symbol === selectedSymbol) ?? null
        : null

    const activeInvestments = selectedInvestment ? [selectedInvestment] : investments
    const activeFunded = selectedInvestment ? [selectedInvestment] : funded

    const growthData = projectPortfolioGrowth(activeInvestments, PROJECTION_YEARS, startDate)

    const final = growthData[growthData.length - 1]
    const projectedValue = final?.totalValue ?? 0
    const totalContributions = final?.totalContributions ?? 0
    const growthFromReturns = projectedValue - totalContributions

    const avgReturn = activeFunded.length
        ? activeFunded.reduce((sum, inv) => sum + inv.averageYearlyReturn, 0) / activeFunded.length
        : 0

    function handleSelectHolding(symbol: string) {
        setSelectedSymbol(prev => prev === symbol ? null : symbol)
    }

    function handleShowAll() {
        setSelectedSymbol(null)
    }

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <PageHeader
                icon={<TimelineIcon sx={{ fontSize: '1.75rem', color: 'secondary.main' }} />}
                iconSx={{
                    p: 1.25, borderRadius: 2,
                    bgcolor: 'rgba(0, 200, 150, 0.1)',
                    border: '1px solid rgba(0, 200, 150, 0.25)',
                    display: 'inline-flex',
                }}
                title="Portfolio Analysis"
                titleLinearGradient="linear-gradient(135deg, #F0F2F5 50%, #00C896 100%)"
                description={`See how your current holdings and recurring contributions could grow over the next ${PROJECTION_YEARS} years.`}
            />

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>

                {funded.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            textAlign: 'center',
                            border: '1px dashed rgba(79, 142, 247, 0.2)',
                            background: 'rgba(79, 142, 247, 0.02)',
                        }}
                    >
                        <ShowChartIcon sx={{ fontSize: '2.5rem', color: 'rgba(79, 142, 247, 0.3)', mb: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                            No projections yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Add a current value or recurring contribution to an investment on its details page to see a {PROJECTION_YEARS}-year growth projection here.
                        </Typography>
                    </Paper>
                ) : (
                    <>
                        {/* Selection banner */}
                        {selectedInvestment && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
                                <Chip
                                    icon={<ArrowBackIcon fontSize="small" />}
                                    label="All Investments"
                                    onClick={handleShowAll}
                                    sx={{
                                        cursor: 'pointer',
                                        bgcolor: 'rgba(79, 142, 247, 0.08)',
                                        color: 'primary.main',
                                        border: '1px solid rgba(79, 142, 247, 0.25)',
                                        fontWeight: 600,
                                        '&:hover': { bgcolor: 'rgba(79, 142, 247, 0.15)' },
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Showing the {PROJECTION_YEARS}-year projection for{' '}
                                    <strong style={{ color: '#00C896' }}>{selectedInvestment.symbol}</strong> only
                                </Typography>
                            </Box>
                        )}

                        {/* Summary Strip */}
                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <MetricCard
                                    label={selectedInvestment ? `${selectedInvestment.symbol} Value (${PROJECTION_YEARS} yrs)` : `Projected Value (${PROJECTION_YEARS} yrs)`}
                                    amount={fmt(projectedValue)}
                                    subtitle={`By ${endYear}`}
                                    icon={<TrendingUpIcon fontSize="small" />}
                                    accentColor="#00C896"
                                    linearGradient="linear-gradient(135deg, rgba(0,200,150,0.08) 0%, rgba(0,153,112,0.04) 100%)"
                                    borderColor="rgba(0,200,150,0.25)"
                                    labelColor="secondary.main"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <MetricCard
                                    label="Total Contributions"
                                    amount={fmt(totalContributions)}
                                    subtitle="Principal you put in"
                                    icon={<SavingsIcon fontSize="small" />}
                                    accentColor="#4F8EF7"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <MetricCard
                                    label="Growth From Returns"
                                    amount={fmt(growthFromReturns)}
                                    subtitle="Projected value minus contributions"
                                    icon={<ShowChartIcon fontSize="small" />}
                                    accentColor="#93C5FD"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <MetricCard
                                    label={selectedInvestment ? 'Avg. Return' : 'Blended Avg. Return'}
                                    amount={`${avgReturn.toFixed(1)}%`}
                                    subtitle={selectedInvestment ? selectedInvestment.vender : `Across ${funded.length} funded holding${funded.length === 1 ? '' : 's'}`}
                                    icon={<PercentIcon fontSize="small" />}
                                    accentColor="#F5A623"
                                />
                            </Grid>
                        </Grid>

                        {/* Growth Chart */}
                        <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
                            <GrowthChart
                                data={growthData}
                                title={selectedInvestment ? `Projected ${selectedInvestment.symbol} Growth` : 'Projected Portfolio Growth'}
                                description={
                                    selectedInvestment
                                        ? `${startYear} → ${endYear}, assuming ${selectedInvestment.symbol} keeps its ${selectedInvestment.averageYearlyReturn}% average yearly return and recurring contributions.`
                                        : `${startYear} → ${endYear}, assuming each investment keeps its average yearly return and recurring contributions.`
                                }
                            />
                        </Paper>

                        {/* Per-Investment Breakdown */}
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                Holdings Breakdown
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Select a holding to see its individual projection above.
                            </Typography>
                        </Box>
                        <Grid container spacing={2}>
                            {funded.map(inv => {
                                const risk = riskConfig[inv.riskLevel]
                                const projection = projectPortfolioGrowth([inv], PROJECTION_YEARS, startDate)
                                const projectedInvValue = projection[projection.length - 1].totalValue
                                const contributionCount = inv.contributionDetails?.reoccurringContributions.length ?? 0
                                const isSelected = inv.symbol === selectedSymbol

                                return (
                                    <Grid key={inv.symbol} size={{ xs: 12, sm: 6, md: 4 }}>
                                        <Paper
                                            elevation={0}
                                            onClick={() => handleSelectHolding(inv.symbol)}
                                            sx={{
                                                p: 2.5, height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5,
                                                cursor: 'pointer',
                                                transition: 'border-color 0.2s, background 0.2s',
                                                ...(isSelected && {
                                                    borderColor: 'rgba(0, 200, 150, 0.5)',
                                                    background: 'linear-gradient(135deg, rgba(0,200,150,0.08) 0%, rgba(79,142,247,0.03) 100%)',
                                                }),
                                                '&:hover': {
                                                    borderColor: isSelected ? 'rgba(0, 200, 150, 0.6)' : 'rgba(79, 142, 247, 0.3)',
                                                },
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'secondary.main', lineHeight: 1 }}>
                                                        {inv.symbol}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {inv.vender}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{
                                                    px: 1, py: 0.25, borderRadius: '6px',
                                                    bgcolor: risk.bg, color: risk.color, border: `1px solid ${risk.border}`,
                                                    fontSize: '0.7rem', fontWeight: 700,
                                                }}>
                                                    {inv.riskLevel}
                                                </Box>
                                            </Box>

                                            <Divider sx={{ borderColor: 'rgba(0, 200, 150, 0.1)' }} />

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                        Current Value
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                                        {fmt(inv.contributionDetails?.currentValue ?? 0)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                        In {PROJECTION_YEARS} Years
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                                                        {fmt(projectedInvValue)}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Typography variant="caption" color="text.secondary">
                                                {contributionCount > 0
                                                    ? `${contributionCount} recurring contribution${contributionCount === 1 ? '' : 's'} · ${inv.averageYearlyReturn}% avg. return`
                                                    : `No recurring contributions · ${inv.averageYearlyReturn}% avg. return`}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </>
                )}
            </Container>
        </Box>
    )
}
