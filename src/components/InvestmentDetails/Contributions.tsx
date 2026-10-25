import type { Investment, ReoccurringContribution } from '../../types/investment'
import { Box, Chip, Divider, IconButton, Stack, Typography } from '@mui/material'
import RepeatIcon from '@mui/icons-material/Repeat'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'

type ContributionsProps = {
    investment: Investment;
    openDeleteDialog: (contribution: ReoccurringContribution) => void;
    setEditMode: (editMode: boolean) => void;
    setEditContribution: (contribution: ReoccurringContribution) => void;
}

export const Contributions = ({ investment, openDeleteDialog, setEditMode, setEditContribution }: ContributionsProps) => {

    function handleEditContribution(contribution: ReoccurringContribution) {
        setEditContribution(contribution);
        setEditMode(true);
    }

    return (
        <Stack divider={<Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />} spacing={2}>
            {investment?.contributionDetails?.reoccurringContributions?.map((contribution) => (
                <Stack key={contribution.id} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Box sx={{
                        p: 1, borderRadius: 1.5, display: 'inline-flex', flexShrink: 0,
                        bgcolor: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)',
                    }}>
                        <RepeatIcon sx={{ color: '#4F8EF7' }} />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Chip
                            label={contribution.frequency}
                            size="small"
                            sx={{
                                bgcolor: 'rgba(79,142,247,0.08)',
                                color: '#4F8EF7',
                                border: '1px solid rgba(79,142,247,0.2)',
                                fontWeight: 600, fontSize: '0.68rem',
                            }}
                        />
                    </Box>

                    <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                            ${contribution.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </Typography>
                    </Box>

                    <IconButton
                        size="small"
                        onClick={() => handleEditContribution(contribution)}
                        sx={{
                            color: 'rgba(79,142,247,0.4)',
                            '&:hover': { color: '#4F8EF7', bgcolor: 'rgba(79,142,247,0.08)' },
                        }}
                    >
                        <DriveFileRenameOutlineIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => openDeleteDialog(contribution)}
                        sx={{
                            color: 'rgba(255,77,109,0.4)',
                            '&:hover': { color: '#FF4D6D', bgcolor: 'rgba(255,77,109,0.08)' },
                        }}
                    >
                        <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                </Stack>
            ))}
        </Stack>
    )
}
