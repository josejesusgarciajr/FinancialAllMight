import { Box, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts/LineChart'
import type { GrowthPoint } from '../../utils/investmentGrowth'

type GrowthChartProps = {
    data: GrowthPoint[]
    title: string
    description: string
}

const fmtCompact = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 })

const fmtFull = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export const GrowthChart = ({ data, title, description }: GrowthChartProps) => {
    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.25 }}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {description}
            </Typography>

            <LineChart
                dataset={data}
                xAxis={[{
                    dataKey: 'year',
                    valueFormatter: (year: number) => String(year),
                    tickMinStep: 1,
                }]}
                yAxis={[{
                    valueFormatter: (value: number) => fmtCompact(value),
                }]}
                series={[
                    {
                        dataKey: 'totalValue',
                        label: 'Total Value',
                        color: '#009970',
                        curve: 'monotoneX',
                        showMark: false,
                        valueFormatter: (value: number | null) => value == null ? '' : fmtFull(value),
                    },
                    {
                        dataKey: 'totalContributions',
                        label: 'Total Contributions',
                        color: '#4F8EF7',
                        curve: 'monotoneX',
                        showMark: false,
                        valueFormatter: (value: number | null) => value == null ? '' : fmtFull(value),
                    },
                ]}
                height={420}
                grid={{ horizontal: true }}
                margin={{ left: 70, right: 20, top: 40, bottom: 40 }}
                slotProps={{
                    legend: {
                        direction: 'horizontal',
                        position: { vertical: 'top', horizontal: 'center' },
                    },
                }}
                sx={{
                    '& .MuiChartsAxis-tickLabel': { fill: '#7A8FA6', fontSize: '0.72rem' },
                    '& .MuiChartsAxis-line': { stroke: 'rgba(79, 142, 247, 0.15)' },
                    '& .MuiChartsAxis-tick': { stroke: 'rgba(79, 142, 247, 0.15)' },
                    '& .MuiChartsGrid-line': { stroke: 'rgba(79, 142, 247, 0.08)' },
                    '& .MuiChartsLegend-series text': { fill: '#F0F2F5 !important', fontSize: '0.8rem' },
                    '& .MuiLineElement-root': { strokeWidth: 2 },
                }}
            />
        </Box>
    )
}
