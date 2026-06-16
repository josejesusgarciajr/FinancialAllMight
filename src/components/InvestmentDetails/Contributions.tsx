import type { ReoccurringContribution } from '../../types/investment'
import { Box, Chip, Typography } from '@mui/material'
import RepeatIcon from '@mui/icons-material/Repeat'

type ContributionsProps = {
    reoccuringContributions: ReoccurringContribution[];
}

export const Contributions = ({ reoccuringContributions }: ContributionsProps) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {reoccuringContributions.map((contribution, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(79, 142, 247, 0.05)',
                        border: '1px solid rgba(79, 142, 247, 0.15)',
                    }}
                >
                    <Chip
                        icon={<RepeatIcon sx={{ fontSize: '0.9rem' }} />}
                        label={contribution.frequency}
                        size="small"
                        sx={{
                            bgcolor: 'rgba(79, 142, 247, 0.1)',
                            color: '#4F8EF7',
                            border: '1px solid rgba(79, 142, 247, 0.25)',
                            fontWeight: 600,
                            '& .MuiChip-icon': { color: '#4F8EF7' },
                        }}
                    />
                    <Typography sx={{ color: 'secondary.main', fontWeight: 700, fontSize: '1rem' }}>
                        ${contribution.amount.toLocaleString()}
                    </Typography>
                </Box>
            ))}
        </Box>
    )
}
