import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import type { MakatStat } from "../../types/domain.types";
import { KSHIRUT_THRESHOLDS } from "../../theme/theme";

interface KshirutBarChartProps {
    stats: MakatStat[];
}

export const KshirutBarChart = ({ stats }: KshirutBarChartProps) => {
    const theme = useTheme();

    const barColor = (percentage: number): string => {
        if (percentage < KSHIRUT_THRESHOLDS.low) return theme.palette.error.main;
        if (percentage < KSHIRUT_THRESHOLDS.medium) return theme.palette.warning.main;
        return theme.palette.success.main;
    };

    const data = {
        labels: stats.map((s) => s.makat),
        datasets: [
            {
                label: "אחוז כשירות",
                data: stats.map((s) => s.percentage),
                backgroundColor: stats.map((s) => barColor(s.percentage)),
                borderRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    afterLabel: (ctx: { dataIndex: number }): string => {
                        const stat = stats[ctx.dataIndex];
                        return `${stat.fit} מתוך ${stat.total} כלים`;
                    },
                },
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: { callback: (value: string | number) => `${value}%` },
                grid: { color: theme.palette.divider },
            },
            x: { grid: { display: false } },
        },
    };

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    כשירות לפי מק&quot;ט
                </Typography>
                <Box sx={{ height: "20rem" }}>
                    <Bar data={data} options={options} />
                </Box>
            </CardContent>
        </Card>
    );
};