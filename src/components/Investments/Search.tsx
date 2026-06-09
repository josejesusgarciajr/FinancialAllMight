// material ui
import {
    Box,
    InputAdornment,
    TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

// finances
import type { Investment } from '../../types/investment'

type SearchProps = {
    filteredInvestments: Investment[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    setSearchPage: (page: number) => void;
}

export const Search = ({filteredInvestments, searchTerm, setSearchTerm, setSearchPage}: SearchProps) => {
    return (
        <Box sx={{ mb: filteredInvestments.length > 0 ? 3 : 5 }}>
            <TextField
                type="text"
                label="Search by Symbol or Vendor"
                placeholder="e.g. FXAIX, Fidelity…"
                fullWidth
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setSearchPage(1) }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(0, 200, 150, 0.25)' },
                        '&:hover fieldset': { borderColor: 'rgba(0, 200, 150, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
                    },
                }}
            />
        </Box>
    )
}