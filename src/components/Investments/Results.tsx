// material ui
import {
    Box,
    Chip,
    Divider,
    Grid,
    Pagination,
    Paper,
    Typography,
} from '@mui/material'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import AddIcon from '@mui/icons-material/Add'

// finances
import type { Investment } from '../../types/investment'
import { riskConfig } from '../../types/investment'

type ResultsProps = {
    filteredInvestments: Investment[];
    paginatedResults: Investment[];
    pageCount: number;
    searchPage: number;
    setSearchPage: (page: number) => void;
    handleAddInvestment: (investment: Investment) => void;
    savedSymbols: Set<string>;
}

export const Results = ({
    filteredInvestments,
    paginatedResults,
    pageCount, 
    searchPage,
    setSearchPage,
    handleAddInvestment,
    savedSymbols,
}: ResultsProps) => {
    return (
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
    )
}