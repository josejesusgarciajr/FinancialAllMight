// material ui
import {
    Box,
    Container,
    Typography,
    type SxProps,
    type Theme,
} from '@mui/material'

type PageHeaderProps = {
    icon: React.ReactNode,
    iconSx: SxProps<Theme>,
    title: string,
    titleLinearGradient: string;
    description: React.ReactNode,
}

export const PageHeader = ({icon, iconSx, title, titleLinearGradient, description}: PageHeaderProps) => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #070B14 0%, #0A1628 50%, #0F1923 100%)',
                borderBottom: '1px solid rgba(79, 142, 247, 0.15)',
                py: { xs: 2, md: 4 },
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                    <Box
                        sx={iconSx}
                    >
                        {icon}
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            background: titleLinearGradient,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, lineHeight: 1.7 }}>
                    {description}
                </Typography>
            </Container>
        </Box>
    )
}