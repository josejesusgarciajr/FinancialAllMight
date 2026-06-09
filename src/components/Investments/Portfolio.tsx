// material ui
import {
    Box,
    Chip,
    Divider,
    Grid,
    IconButton,
    Paper,
    Typography,
} from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

// finances
import type { Investment } from '../../types/investment'
import { riskConfig } from '../../types/investment'

type PortfolioProps = {
    investments: Investment[];
    handleOpenDeleteDialog: (investment: Investment) => void;
}

export const Portfolio = ({investments, handleOpenDeleteDialog}: PortfolioProps) => {

    if (investments.length === 0) {
        return (
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
        )
    }

    return (
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
    )
}