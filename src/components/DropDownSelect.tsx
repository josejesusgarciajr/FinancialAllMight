import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material'

type DropDownSelectProps = {
    label: string
    options: string[]
    value?: string
    onChange: (value: string) => void
    placeholder?: string
}

export const DropDownSelect = ({ label, options, value, onChange, placeholder = 'Select…' }: DropDownSelectProps) => {
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
                MenuProps={{
                    slotProps: {
                        paper: {
                            sx: {
                                maxHeight: 320,
                                bgcolor: 'background.paper',
                                border: '1px solid rgba(79, 142, 247, 0.15)',
                            },
                        },
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(79, 142, 247, 0.25)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(79, 142, 247, 0.5)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                }}
            >
                <MenuItem value="" disabled>
                    <em>{placeholder}</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
