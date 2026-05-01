import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Income', path: '/income' },
    { label: 'Retirement', path: '/retirement' },
    { label: 'Expenses', path: '/expenses' }
]

const ticker = [
    { symbol: 'SPY', price: '547.32', change: '+1.24%', up: true },
    { symbol: 'AAPL', price: '213.45', change: '+0.82%', up: true },
    { symbol: 'TSLA', price: '183.92', change: '-0.41%', up: false },
    { symbol: 'BTC', price: '97,432', change: '+3.12%', up: true },
    { symbol: 'ETH', price: '3,241', change: '+1.74%', up: true },
    { symbol: 'NVDA', price: '875.23', change: '+2.31%', up: true },
    { symbol: 'AMZN', price: '189.45', change: '-0.18%', up: false },
    { symbol: 'GOOGL', price: '178.90', change: '+0.93%', up: true },
    { symbol: 'MSFT', price: '421.10', change: '+0.47%', up: true },
    { symbol: 'GLD', price: '224.18', change: '+0.65%', up: true },
]

export const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const handleNav = (path: string) => {
        navigate(path)
        setDrawerOpen(false)
    }

    return (
        <>
            <AppBar position="sticky" elevation={0}>
                <Toolbar>
                    <ShowChartIcon sx={{ color: 'primary.main', mr: 1, fontSize: '1.5rem' }} />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 800,
                            cursor: 'pointer',
                            mr: 3,
                            background: 'linear-gradient(135deg, #4F8EF7, #93C5FD)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '0.05em',
                            userSelect: 'none',
                        }}
                        onClick={() => handleNav('/')}
                    >
                        {import.meta.env.VITE_APP_NAME ?? 'FINANCIAL ALL MIGHT'}
                    </Typography>

                    {isMobile ? (
                        <>
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton
                                color="inherit"
                                edge="end"
                                onClick={() => setDrawerOpen(true)}
                                aria-label="open navigation menu"
                            >
                                <MenuIcon />
                            </IconButton>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                            {navLinks.map((link) => (
                                <Button
                                    key={link.path}
                                    onClick={() => handleNav(link.path)}
                                    sx={{
                                        fontWeight: location.pathname === link.path ? 700 : 400,
                                        color: location.pathname === link.path ? 'primary.main' : 'text.secondary',
                                        borderBottom: '2px solid',
                                        borderColor: location.pathname === link.path ? 'primary.main' : 'transparent',
                                        borderRadius: 0,
                                        px: 1.5,
                                        '&:hover': {
                                            color: 'primary.light',
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </Box>
                    )}
                </Toolbar>

                {/* Live Market Ticker Strip */}
                <Box
                    sx={{
                        overflow: 'hidden',
                        bgcolor: 'rgba(79, 142, 247, 0.04)',
                        borderTop: '1px solid rgba(79, 142, 247, 0.12)',
                        py: 0.5,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 5,
                            animation: 'ticker-scroll 40s linear infinite',
                            width: 'max-content',
                            '@keyframes ticker-scroll': {
                                '0%': { transform: 'translateX(0)' },
                                '100%': { transform: 'translateX(-50%)' },
                            },
                            '&:hover': { animationPlayState: 'paused' },
                        }}
                    >
                        {[...ticker, ...ticker].map((item, i) => (
                            <Box key={`${item.symbol}-${i}`} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, whiteSpace: 'nowrap' }}>
                                <Typography sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.68rem', letterSpacing: '0.06em' }}>
                                    {item.symbol}
                                </Typography>
                                <Typography sx={{ color: 'text.primary', fontSize: '0.68rem' }}>
                                    ${item.price}
                                </Typography>
                                {item.up
                                    ? <TrendingUpIcon sx={{ fontSize: '0.85rem', color: 'secondary.main' }} />
                                    : <TrendingDownIcon sx={{ fontSize: '0.85rem', color: 'error.main' }} />
                                }
                                <Typography sx={{ color: item.up ? 'secondary.main' : 'error.main', fontSize: '0.68rem', fontWeight: 600 }}>
                                    {item.change}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </AppBar>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            bgcolor: 'background.paper',
                            borderLeft: '1px solid rgba(79, 142, 247, 0.2)',
                        },
                    },
                }}
            >
                <Box sx={{ width: 240 }} role="presentation">
                    <Box sx={{ p: 2, borderBottom: '1px solid rgba(79, 142, 247, 0.12)' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: '0.05em' }}>
                            Navigation
                        </Typography>
                    </Box>
                    <List>
                        {navLinks.map((link) => (
                            <ListItem key={link.path} disablePadding>
                                <ListItemButton
                                    selected={location.pathname === link.path}
                                    onClick={() => handleNav(link.path)}
                                    sx={{
                                        '&.Mui-selected': {
                                            bgcolor: 'rgba(79, 142, 247, 0.08)',
                                            '& .MuiListItemText-primary': { color: 'primary.main', fontWeight: 700 },
                                        },
                                        '&:hover': { bgcolor: 'rgba(79, 142, 247, 0.05)' },
                                    }}
                                >
                                    <ListItemText primary={link.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}
