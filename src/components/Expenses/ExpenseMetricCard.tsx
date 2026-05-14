// material ui
import {
    Grid,
    Paper,
    Typography,
} from '@mui/material'

type ExpenseMetricCardProps = {
    title: string,
    total: number,
}

export const ExpenseMetricCard = ({ title, total } : ExpenseMetricCardProps) => {
    return (
        <Grid size={{ xs: 12, sm: 6 }}>
            <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#FF4D6D', mb: 0.5 }}>
                    ${total.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {title}
                </Typography>
            </Paper>
        </Grid>
    )
}