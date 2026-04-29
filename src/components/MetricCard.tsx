import { Box, Paper, Typography } from '@mui/material'

export type MetricCardProps = {
    label: string
    amount: string
    subtitle: string
    icon: React.ReactNode
    accentColor: string
    dim?: boolean
}

export const MetricCard = ({ label, amount, subtitle, icon, accentColor, dim = false }: MetricCardProps) => (
    <Paper
        elevation={0}
        sx={{
            p: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            opacity: dim ? 0.45 : 1,
            transition: 'opacity 0.2s',
            borderColor: dim ? 'rgba(79,142,247,0.06)' : 'rgba(79,142,247,0.12)',
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Box sx={{ color: accentColor, display: 'flex', fontSize: '1.1rem' }}>{icon}</Box>
            <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
                {label}
            </Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 800, color: accentColor, lineHeight: 1.1 }}>
            {amount}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
            {subtitle}
        </Typography>
    </Paper>
)
