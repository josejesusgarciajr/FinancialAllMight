// material ui
import {
    Grid,
    Paper,
    Typography,
} from '@mui/material'

type MetricCardProps = {
    title: string;
    titleColor: string;
    description: string;
}

export const MetricCard = ({title, titleColor, description}: MetricCardProps) => {
    return (
        <Grid size={{ xs: 12, sm: 6 }}>
            <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: titleColor, mb: 0.5 }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {description}
                </Typography>
            </Paper>
        </Grid>
    )
} 