// material ui
import {
    Box,
    Chip,
    Typography,
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

// finances
import type { Investment } from '../../types/investment'

type PorfolioBannerProps = {
    investments: Investment[];
}

export const PortfolioBanner = ({investments}: PorfolioBannerProps) => {
    return (
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
    )
}