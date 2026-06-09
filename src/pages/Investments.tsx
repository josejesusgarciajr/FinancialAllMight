// material ui
import {
    Box,
    Chip,
    Container,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Pagination,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

// react
import { useState, useMemo } from 'react'

// finances
import { PageHeader } from '../components/PageHeader'
import { useInvestments } from '../hooks/useInvestments'
import { investmentData, type Investment } from '../types/investment'
import { ConfirmDialog } from '../components/ConfirmDialog'

const riskConfig = {
    Low:    { color: '#00C896', bg: 'rgba(0, 200, 150, 0.1)',  border: 'rgba(0, 200, 150, 0.25)' },
    Medium: { color: '#F5A623', bg: 'rgba(245, 166, 35, 0.1)', border: 'rgba(245, 166, 35, 0.25)' },
    High:   { color: '#FF4D6D', bg: 'rgba(255, 77, 109, 0.1)', border: 'rgba(255, 77, 109, 0.25)' },
}

export const Investments = () => {
    const PAGE_SIZE = 12

    const { investments, addInvestment, deleteInvestment } = useInvestments()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [searchPage, setSearchPage] = useState<number>(1)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
    const [investmentToDelete, setInvestmentToDelete] = useState<string>('')

    const filteredInvestments = useMemo(() => {
        if (!searchTerm || searchTerm.trim() === '') return []

        const lowerSearchTerm = searchTerm.toLowerCase()
        return investmentData.filter(inv =>
            inv.symbol.toLowerCase().includes(lowerSearchTerm) ||
            inv.vender.toLowerCase().includes(lowerSearchTerm)
        )
    }, [searchTerm])

    const pageCount = Math.ceil(filteredInvestments.length / PAGE_SIZE)
    const paginatedResults = filteredInvestments.slice(
        (searchPage - 1) * PAGE_SIZE,
        searchPage * PAGE_SIZE
    )

    const savedSymbols = useMemo(() => new Set(investments.map(i => i.symbol)), [investments])

    const avgReturn = investments.length
        ? investments.reduce((sum, i) => sum + i.averageYearlyReturn, 0) / investments.length
        : 0

    function handleAddInvestment(investment: Investment) {
        addInvestment(investment)
        setSearchTerm('')
    }

    function handleOpenDeleteDialog(investment: Investment) {
        setDeleteDialogOpen(true)
        setInvestmentToDelete(investment.symbol)
    }

    function handleDeleteInvestment(deleteItem: boolean) {
        if (deleteItem && investmentToDelete.trim() !== '') {
            deleteInvestment(investmentToDelete)
        }

        setDeleteDialogOpen(false)
        setInvestmentToDelete('')
    }

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>

            <PageHeader
                icon={<CurrencyExchangeIcon sx={{ fontSize: '1.75rem', color: 'secondary.main' }} />}
                iconSx={{
                    p: 1.25, borderRadius: 2,
                    bgcolor: 'rgba(0, 200, 150, 0.1)',
                    border: '1px solid rgba(0, 200, 150, 0.25)',
                    display: 'inline-flex',
                }}
                title="Investments"
                titleLinearGradient="linear-gradient(135deg, #F0F2F5 50%, #00C896 100%)"
                description="Search for investments, add them to your portfolio, and track your average returns over time."
            />

            <ConfirmDialog
                open={deleteDialogOpen}
                handleClose={handleDeleteInvestment}
            />

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>

                {/* Summary Strip */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
                                {investments.length > 0 ? investments.length : '—'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                Holdings
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#4F8EF7', mb: 0.5 }}>
                                {investments.length > 0 ? `${avgReturn.toFixed(1)}%` : '—'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                Avg. Yearly Return
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Search */}
                <Box sx={{ mb: filteredInvestments.length > 0 ? 3 : 5 }}>
                    <TextField
                        type="text"
                        label="Search by Symbol or Vendor"
                        placeholder="e.g. FXAIX, Fidelity…"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setSearchPage(1) }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'rgba(0, 200, 150, 0.25)' },
                                '&:hover fieldset': { borderColor: 'rgba(0, 200, 150, 0.5)' },
                                '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
                            },
                        }}
                    />
                </Box>

                {/* Search Results */}
                {filteredInvestments.length > 0 && (
                    <Box sx={{ mb: 5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <ShowChartIcon sx={{ color: 'secondary.main', fontSize: '1.1rem' }} />
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                Search Results
                            </Typography>
                            <Chip
                                label={`${filteredInvestments.length} found`}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(0, 200, 150, 0.1)',
                                    color: 'secondary.main',
                                    border: '1px solid rgba(0, 200, 150, 0.25)',
                                    fontWeight: 600,
                                }}
                            />
                        </Box>

                        {pageCount > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                <Pagination
                                    count={pageCount}
                                    page={searchPage}
                                    onChange={(_, value) => setSearchPage(value)}
                                    shape="rounded"
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            color: 'text.secondary',
                                            '&.Mui-selected': {
                                                bgcolor: 'rgba(0, 200, 150, 0.15)',
                                                color: 'secondary.main',
                                                border: '1px solid rgba(0, 200, 150, 0.4)',
                                                '&:hover': { bgcolor: 'rgba(0, 200, 150, 0.25)' },
                                            },
                                        },
                                    }}
                                />
                            </Box>
                        )}

                        <Grid container spacing={2}>
                            {paginatedResults.map(inv => {
                                const risk = riskConfig[inv.riskLevel]
                                const alreadyAdded = savedSymbols.has(inv.symbol)
                                return (
                                    <Grid key={inv.symbol} size={{ xs: 12, sm: 6, md: 4 }}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 2.5,
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1.5,
                                                ...(alreadyAdded && {
                                                    border: '1px solid rgba(0, 200, 150, 0.3)',
                                                    background: 'linear-gradient(135deg, rgba(0,200,150,0.03) 0%, rgba(79,142,247,0.02) 100%)',
                                                }),
                                                transition: 'border-color 0.2s',
                                                '&:hover': {
                                                    borderColor: alreadyAdded
                                                        ? 'rgba(0, 200, 150, 0.5)'
                                                        : 'rgba(79, 142, 247, 0.3)',
                                                },
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1 }}>
                                                        {inv.symbol}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                                        {inv.vender}
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    label={inv.riskLevel}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: risk.bg,
                                                        color: risk.color,
                                                        border: `1px solid ${risk.border}`,
                                                        fontWeight: 700,
                                                        fontSize: '0.7rem',
                                                    }}
                                                />
                                            </Box>

                                            <Divider sx={{ borderColor: 'rgba(79,142,247,0.08)' }} />

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                        Price
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                                        ${inv.price}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                        Avg. Return
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                                                        {inv.averageYearlyReturn}%
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Box sx={{ mt: 'auto', pt: 0.5 }}>
                                                {alreadyAdded ? (
                                                    <Chip
                                                        label="In Portfolio"
                                                        size="small"
                                                        sx={{
                                                            width: '100%',
                                                            bgcolor: 'rgba(0, 200, 150, 0.08)',
                                                            color: 'secondary.main',
                                                            border: '1px solid rgba(0, 200, 150, 0.2)',
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                ) : (
                                                    <Chip
                                                        icon={<AddIcon />}
                                                        label="Add to Portfolio"
                                                        size="small"
                                                        onClick={() => handleAddInvestment(inv)}
                                                        sx={{
                                                            width: '100%',
                                                            cursor: 'pointer',
                                                            bgcolor: 'rgba(79, 142, 247, 0.08)',
                                                            color: 'primary.main',
                                                            border: '1px solid rgba(79, 142, 247, 0.25)',
                                                            fontWeight: 600,
                                                            '&:hover': { bgcolor: 'rgba(79, 142, 247, 0.15)' },
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </Paper>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                )}

                {/* My Portfolio */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <TrendingUpIcon sx={{ color: 'secondary.main', fontSize: '1.1rem' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        My Portfolio
                    </Typography>
                    {investments.length > 0 && (
                        <Chip
                            label={`${investments.length} holding${investments.length !== 1 ? 's' : ''}`}
                            size="small"
                            sx={{
                                bgcolor: 'rgba(0, 200, 150, 0.1)',
                                color: 'secondary.main',
                                border: '1px solid rgba(0, 200, 150, 0.25)',
                                fontWeight: 600,
                            }}
                        />
                    )}
                </Box>

                {investments.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            textAlign: 'center',
                            border: '1px dashed rgba(79, 142, 247, 0.2)',
                            background: 'rgba(79, 142, 247, 0.02)',
                        }}
                    >
                        <CurrencyExchangeIcon sx={{ fontSize: '2.5rem', color: 'rgba(79, 142, 247, 0.3)', mb: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                            No investments yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Search for a symbol or vendor above to find and add investments to your portfolio.
                        </Typography>
                    </Paper>
                ) : (
                    <Grid container spacing={2}>
                        {investments.map(inv => {
                            const risk = riskConfig[inv.riskLevel]
                            return (
                                <Grid key={inv.symbol} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2.5,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1.5,
                                            border: '1px solid rgba(0, 200, 150, 0.15)',
                                            background: 'linear-gradient(135deg, rgba(0,200,150,0.03) 0%, rgba(79,142,247,0.02) 100%)',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 800, color: 'secondary.main', lineHeight: 1 }}>
                                                    {inv.symbol}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                                    {inv.vender}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Chip
                                                    label={inv.riskLevel}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: risk.bg,
                                                        color: risk.color,
                                                        border: `1px solid ${risk.border}`,
                                                        fontWeight: 700,
                                                        fontSize: '0.7rem',
                                                    }}
                                                />
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleOpenDeleteDialog(inv)}
                                                    sx={{
                                                        color: 'rgba(255,77,109,0.4)',
                                                        '&:hover': { color: '#FF4D6D', bgcolor: 'rgba(255,77,109,0.08)' },
                                                    }}
                                                >
                                                    <DeleteOutlinedIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>

                                        <Divider sx={{ borderColor: 'rgba(0, 200, 150, 0.1)' }} />

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                    Price
                                                </Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                                    ${inv.price}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'right' }}>
                                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                    Avg. Return
                                                </Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                                                    {inv.averageYearlyReturn}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                )}

            </Container>
        </Box>
    )
}
