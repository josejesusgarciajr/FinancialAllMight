// material ui
import {
    Box,
    Container,
    Grid,
} from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'

// react
import { useState, useMemo } from 'react'

// finances
import { PageHeader } from '../components/PageHeader'
import { useInvestments } from '../hooks/useInvestments'
import { investmentData, type Investment } from '../types/investment'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { MetricCard } from '../components/Investments/MetricCard'
import { Search } from '../components/Investments/Search'
import { Results } from '../components/Investments/Results'
import { PortfolioBanner } from '../components/Investments/PorfolioBanner'
import { Portfolio } from '../components/Investments/Portfolio'

const PAGE_SIZE = 9

export const Investments = () => {
    const { investments, addInvestment, deleteInvestment } = useInvestments()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [searchPage, setSearchPage] = useState<number>(1)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
    const [investmentToDelete, setInvestmentToDelete] = useState<string>('')

    const filteredInvestments = useMemo(() => {
        if (!searchTerm || searchTerm.trim() === '') return []

        const lowerSearchTerm = searchTerm.toLowerCase()
        return investmentData.filter(inv =>
            inv.symbol.toLowerCase().includes(lowerSearchTerm) ||
            inv.vender.toLowerCase().includes(lowerSearchTerm)
        )
    }, [searchTerm])

    const pageCount = Math.ceil(filteredInvestments.length / PAGE_SIZE)
    const paginatedResults = filteredInvestments.slice(
        (searchPage - 1) * PAGE_SIZE,
        searchPage * PAGE_SIZE
    )

    const savedSymbols = useMemo(() => new Set(investments.map(i => i.symbol)), [investments])

    const avgReturn = investments.length
        ? investments.reduce((sum, i) => sum + i.averageYearlyReturn, 0) / investments.length
        : 0

    function handleAddInvestment(investment: Investment) {
        addInvestment(investment)
        setSearchTerm('')
    }

    function handleOpenDeleteDialog(investment: Investment) {
        setDeleteDialogOpen(true)
        setInvestmentToDelete(investment.symbol)
    }

    function handleDeleteInvestment(deleteItem: boolean) {
        if (deleteItem && investmentToDelete.trim() !== '') {
            deleteInvestment(investmentToDelete)
        }

        setDeleteDialogOpen(false)
        setInvestmentToDelete('')
    }

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>

            <PageHeader
                icon={<CurrencyExchangeIcon sx={{ fontSize: '1.75rem', color: 'secondary.main' }} />}
                iconSx={{
                    p: 1.25, borderRadius: 2,
                    bgcolor: 'rgba(0, 200, 150, 0.1)',
                    border: '1px solid rgba(0, 200, 150, 0.25)',
                    display: 'inline-flex',
                }}
                title="Investments"
                titleLinearGradient="linear-gradient(135deg, #F0F2F5 50%, #00C896 100%)"
                description="Search for investments, add them to your portfolio, and track your average returns over time."
            />

            <ConfirmDialog
                open={deleteDialogOpen}
                handleClose={handleDeleteInvestment}
            />

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>

                {/* Summary Strip */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    <MetricCard
                        title={investments.length > 0 ? `${investments.length}` : '—'}
                        titleColor='secondary.main'
                        description="Holdings"
                    />
                    <MetricCard
                        title={investments.length > 0 ? `${avgReturn.toFixed(1)}%` : '—'}
                        titleColor='#4F8EF7'
                        description="Avg. Yearly Return"
                    />
                </Grid>

                {/* Search */}
                <Search
                    filteredInvestments={filteredInvestments}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setSearchPage={setSearchPage}
                />

                {/* Search Results */}
                {filteredInvestments.length > 0 && (
                    <Results
                        filteredInvestments={filteredInvestments}
                        paginatedResults={paginatedResults}
                        pageCount={pageCount}
                        searchPage={searchPage}
                        setSearchPage={setSearchPage}
                        savedSymbols={savedSymbols}
                        handleAddInvestment={handleAddInvestment}
                    />
                 )}

                {/* My Portfolio */}
                <PortfolioBanner 
                    investments={investments} 
                />
                <Portfolio 
                    investments={investments} 
                    handleOpenDeleteDialog={handleOpenDeleteDialog}
                />

            </Container>
        </Box>
    )
}
