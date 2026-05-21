// material ui
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
} from '@mui/material'

// react router
import { useNavigate } from 'react-router-dom'

type FeatureProps = {
    features: { icon: React.ReactNode; iconBg: string; iconBorder: string; title: string; description: string; navigationPath: string; }[]
}

export const Features = ({features} : FeatureProps) => {
    const navigate = useNavigate()

    return (
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

            <Grid container spacing={2.5}>
                {features.map((feature) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.title}>
                        <Paper
                            elevation={0}
                            onClick={() => navigate(feature.navigationPath)}
                            sx={{
                                p: 3,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: 2,
                                cursor: 'pointer',
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
                                    bgcolor: feature.iconBg,
                                    border: `1px solid ${feature.iconBorder}`,
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
    )
}