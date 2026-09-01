import { Pie } from "react-chartjs-2";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";

interface KshirutPieChartProps {
    fit: number;
    unfit: number;
}

export const KshirutPieChart = ({ fit, unfit }: KshirutPieChartProps) => {
    const theme = useTheme();

    const data = {
        labels: ["כשיר", "לא כשיר"],
        datasets: [
            {
                data: [fit, unfit],
                backgroundColor: [theme.palette.success.main, theme.palette.error.main],
                borderColor: theme.palette.background.paper,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: { color: theme.palette.text.primary },
            },
        },
    };

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    התפלגות כשירות
                </Typography>
                <Box sx={{ height: "20rem" }}>
                    <Pie data={data} options={options} />
                </Box>
            </CardContent>
        </Card>
    );
};