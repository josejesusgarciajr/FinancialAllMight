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
import HomeIcon from '@mui/icons-material/Home'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

// finances
import { toMonthly } from '../../utils/expenses';
import type { Expense, ExpenseCategory } from '../../types/expense';

// react
import React from 'react'

type ExpenseListProps = {
    expenses: Expense[];
    setActiveExpense: (expense: Expense) => void;
    setOpenConfirmDialog: (open: boolean) => void;
    maxHeight: number;
}

const categoryConfig: Record<ExpenseCategory, { icon: React.ReactNode; color: string; bg: string; border: string }> = {
    housing:        { icon: <HomeIcon />,          color: '#FF4D6D', bg: 'rgba(255,77,109,0.08)',   border: 'rgba(255,77,109,0.2)' },
    food:           { icon: <RestaurantIcon />,     color: '#00C896', bg: 'rgba(0,200,150,0.08)',    border: 'rgba(0,200,150,0.2)' },
    transportation: { icon: <DirectionsCarIcon />,  color: '#4F8EF7', bg: 'rgba(79,142,247,0.08)',   border: 'rgba(79,142,247,0.2)' },
    utilities:      { icon: <ElectricBoltIcon />,   color: '#FFB547', bg: 'rgba(255,181,71,0.08)',   border: 'rgba(255,181,71,0.2)' },
    entertainment:  { icon: <SportsEsportsIcon />,  color: '#A78BFA', bg: 'rgba(167,139,250,0.08)',  border: 'rgba(167,139,250,0.2)' },
    healthcare:     { icon: <LocalHospitalIcon />,  color: '#FF4D6D', bg: 'rgba(255,77,109,0.08)',   border: 'rgba(255,77,109,0.2)' },
    other:          { icon: <MoreHorizIcon />,      color: '#94A3B8', bg: 'rgba(148,163,184,0.08)',  border: 'rgba(148,163,184,0.2)' },
}

export const ExpenseList = ({ expenses, setActiveExpense, setOpenConfirmDialog, maxHeight }: ExpenseListProps) => {

    function handleOpenDeleteDialog(expense: Expense) {
        setActiveExpense(expense)
        setOpenConfirmDialog(true)
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
                {expenses.length === 0
                    ? 'No expenses yet'
                    : `${expenses.length} Expense${expenses.length !== 1 ? 's' : ''}`}
            </Typography>

            {expenses.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    Add your first expense using the form.
                </Typography>
            ) : (
                <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0, mr: -3, pr: 3 }}>
                    <Stack divider={<Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />} spacing={2}>
                        {expenses.map((expense) => {
                            const cfg     = categoryConfig[expense.category]
                            const monthly = toMonthly(expense.amount, expense.frequency)

                            return (
                                <Stack key={expense.id} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                                    <Box sx={{
                                        p: 1, borderRadius: 1.5, display: 'inline-flex', flexShrink: 0,
                                        bgcolor: cfg.bg, border: `1px solid ${cfg.border}`,
                                    }}>
                                        <Box sx={{ color: cfg.color, display: 'flex' }}>{cfg.icon}</Box>
                                    </Box>

                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }} noWrap>
                                            {expense.name}
                                        </Typography>
                                        <Stack direction="row" spacing={0.75} sx={{ mt: 0.5 }}>
                                            <Chip label={expense.category} size="small" sx={{
                                                bgcolor: cfg.bg, color: cfg.color,
                                                border: `1px solid ${cfg.border}`,
                                                fontWeight: 600, fontSize: '0.68rem',
                                            }} />
                                            <Chip label={expense.frequency} size="small" sx={{
                                                bgcolor: 'rgba(255,255,255,0.04)',
                                                color: 'text.secondary',
                                                fontSize: '0.68rem',
                                            }} />
                                        </Stack>
                                    </Box>

                                    <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 700, color: '#FF4D6D' }}>
                                            ${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </Typography>
                                        {expense.frequency !== 'monthly' && (
                                            <Typography variant="caption" color="text.secondary">
                                                ${monthly.toFixed(2)}/mo
                                            </Typography>
                                        )}
                                    </Box>

                                    <IconButton
                                        size="small"
                                        onClick={() => setActiveExpense(expense)}
                                        sx={{
                                            color: 'rgba(79,142,247,0.4)',
                                            '&:hover': { color: '#4F8EF7', bgcolor: 'rgba(79,142,247,0.08)' },
                                        }}
                                    >
                                        <DriveFileRenameOutlineIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDeleteDialog(expense)}
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