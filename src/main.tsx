import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import './index.css'
import App from './App'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#4F8EF7',
            dark: '#2563EB',
            light: '#93C5FD',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#00C896',
            dark: '#009970',
            light: '#33D9A8',
            contrastText: '#ffffff',
        },
        error: {
            main: '#FF4D6D',
        },
        success: {
            main: '#00C896',
        },
        background: {
            default: '#070B14',
            paper: '#0F1923',
        },
        text: {
            primary: '#F0F2F5',
            secondary: '#7A8FA6',
        },
        divider: 'rgba(79, 142, 247, 0.15)',
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 800, letterSpacing: '-0.02em' },
        h2: { fontWeight: 800, letterSpacing: '-0.02em' },
        h3: { fontWeight: 700, letterSpacing: '-0.01em' },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
    },
    shape: { borderRadius: 10 },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#4F8EF7 #0F1923',
                    '&::-webkit-scrollbar': { width: '6px' },
                    '&::-webkit-scrollbar-track': { background: '#0F1923' },
                    '&::-webkit-scrollbar-thumb': { background: '#4F8EF7', borderRadius: '3px' },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#070B14',
                    backgroundImage: 'none',
                    borderBottom: '1px solid rgba(79, 142, 247, 0.2)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: '1px solid rgba(79, 142, 247, 0.1)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    background: 'linear-gradient(135deg, #2563EB 0%, #4F8EF7 50%, #93C5FD 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #4F8EF7 100%)',
                        boxShadow: '0 0 24px rgba(79, 142, 247, 0.35)',
                    },
                },
                outlined: {
                    borderColor: 'rgba(79, 142, 247, 0.5)',
                    color: '#4F8EF7',
                    '&:hover': {
                        borderColor: '#4F8EF7',
                        backgroundColor: 'rgba(79, 142, 247, 0.06)',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: '6px',
                },
            },
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>
)
