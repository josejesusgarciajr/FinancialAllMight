// react
import React from 'react'

// material ui
import {
    Box,
    Chip,
    Divider,
    IconButton,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import SchoolIcon from '@mui/icons-material/School'
import HomeIcon from '@mui/icons-material/Home'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

// finances
import type { Debt, DebtCategory } from '../../types/debt'

type DebtDisplayListProps = {
    debts: Debt[];
    setActiveDebt: (debt: Debt | null) => void;
    setDeleteDialogOpen: (open: boolean) => void;
    maxHeight: number;
}

const categoryConfig: Record<DebtCategory, { icon: React.ReactNode; color: string; bg: string; border: string }> = {
    'Credit Card':   { icon: <CreditCardIcon />,      color: '#4F8EF7', bg: 'rgba(79,142,247,0.08)',   border: 'rgba(79,142,247,0.2)' },
    'Student Loan':  { icon: <SchoolIcon />,           color: '#A78BFA', bg: 'rgba(167,139,250,0.08)',  border: 'rgba(167,139,250,0.2)' },
    'Mortgage':      { icon: <HomeIcon />,             color: '#00C896', bg: 'rgba(0,200,150,0.08)',    border: 'rgba(0,200,150,0.2)' },
    'Personal Loan': { icon: <AccountBalanceIcon />,   color: '#FFB547', bg: 'rgba(255,181,71,0.08)',   border: 'rgba(255,181,71,0.2)' },
    'Auto Loan':     { icon: <DirectionsCarIcon />,    color: '#FF8C42', bg: 'rgba(255,140,66,0.08)',   border: 'rgba(255,140,66,0.2)' },
    'Other':         { icon: <MoreHorizIcon />,        color: '#94A3B8', bg: 'rgba(148,163,184,0.08)',  border: 'rgba(148,163,184,0.2)' },
}

export const DebtDisplayList = ({ debts, setActiveDebt, setDeleteDialogOpen, maxHeight }: DebtDisplayListProps) => {

    function handleDeleteClick(debt: Debt) {
        setActiveDebt(debt)
        setDeleteDialogOpen(true)
    }

    return (
        <Paper elevation={0} sx={{
            p: 3,
            width: '100%',
            maxHeight,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5, color: 'text.primary', flexShrink: 0 }}>
                {debts.length === 0
                    ? 'No debts yet'
                    : `${debts.length} Debt${debts.length !== 1 ? 's' : ''}`}
            </Typography>

            {debts.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    Add your first debt using the form.
                </Typography>
            ) : (
                <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0, mr: -3, pr: 3 }}>
                    <Stack divider={<Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />} spacing={2}>
                        {debts.map((debt) => {
                            const cfg = categoryConfig[debt.category]

                            return (
                                <Stack key={debt.id} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                                    <Box sx={{
                                        p: 1, borderRadius: 1.5, display: 'inline-flex', flexShrink: 0,
                                        bgcolor: cfg.bg, border: `1px solid ${cfg.border}`,
                                    }}>
                                        <Box sx={{ color: cfg.color, display: 'flex' }}>{cfg.icon}</Box>
                                    </Box>

                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }} noWrap>
                                            {debt.name}
                                        </Typography>
                                        <Stack direction="row" spacing={0.75} sx={{ mt: 0.5 }}>
                                            <Chip label={debt.category} size="small" sx={{
                                                bgcolor: cfg.bg, color: cfg.color,
                                                border: `1px solid ${cfg.border}`,
                                                fontWeight: 600, fontSize: '0.68rem',
                                            }} />
                                            <Chip
                                                label={`${debt.interestRate}% APR`}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'rgba(255,255,255,0.04)',
                                                    color: debt.interestRate === 0 ? '#00C896' : '#FF4D6D',
                                                    fontSize: '0.68rem',
                                                    fontWeight: 600,
                                                }}
                                            />
                                        </Stack>
                                    </Box>

                                    <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 700, color: '#FF4D6D' }}>
                                            ${debt.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </Typography>
                                    </Box>

                                    <IconButton
                                        size="small"
                                        onClick={() => setActiveDebt(debt)}
                                        sx={{
                                            color: 'rgba(79,142,247,0.4)',
                                            '&:hover': { color: '#4F8EF7', bgcolor: 'rgba(79,142,247,0.08)' },
                                        }}
                                    >
                                        <DriveFileRenameOutlineIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDeleteClick(debt)}
                                        sx={{
                                            color: 'rgba(255,77,109,0.4)',
                                            '&:hover': { color: '#FF4D6D', bgcolor: 'rgba(255,77,109,0.08)' },
                                        }}
                                    >
                                        <DeleteOutlinedIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            )
                        })}
                    </Stack>
                </Box>
            )}
        </Paper>
    )
}
