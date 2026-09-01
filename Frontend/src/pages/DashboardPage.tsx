import { Box, Container, CircularProgress, Alert } from "@mui/material";
import { TopBar } from "../componets/layout/TopBar";
import { StatLabel } from "../componets/dashboard/StatLabel";
import { KshirutBarChart } from "../componets/dashboard/KshirutBarChart";
import { KshirutPieChart } from "../componets/dashboard/KshirutPieChart";
import { CarsTable } from "../componets/dashboard/CarsTable";
import { useCars } from "../hooks/useCars";
import { KSHIRUT_THRESHOLDS } from "../theme/theme";

const statusText = (percentage: number): string => {
    if (percentage < KSHIRUT_THRESHOLDS.low) return "נדרש טיפול";
    if (percentage < KSHIRUT_THRESHOLDS.medium) return "תקין חלקית";
    return "כשירות מלאה";
};

export const DashboardPage = () => {
    const { cars, summary, isLoading, error } = useCars();

    return (
        <>
            <TopBar />
            <Container maxWidth="lg" sx={{ py: "2rem" }}>
                {isLoading && (
                    <Box sx={{ display: "flex", justifyContent: "center", py: "4rem" }}>
                        <CircularProgress />
                    </Box>
                )}

                {!isLoading && error && <Alert severity="error">{error}</Alert>}

                {!isLoading && !error && (
                    <Box sx={{ display: "grid", gap: "1.25rem" }}>
                        <Box
                            sx={{
                                display: "grid",
                                gap: "1.25rem",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    md: "repeat(3, 1fr)",
                                },
                            }}
                        >
                            <StatLabel
                                variant="percentage"
                                title="אחוז כשירות כולל"
                                value={summary.percentage}
                            />
                            <StatLabel
                                variant="count"
                                title="כלים כשירים"
                                value={summary.fit}
                                unit="כלים"
                            />
                            <StatLabel
                                variant="text"
                                title="סטטוס כללי"
                                value={statusText(summary.percentage)}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: "grid",
                                gap: "1.25rem",
                                gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
                            }}
                        >
                            <KshirutBarChart stats={summary.byMakat} />
                            <KshirutPieChart fit={summary.fit} unfit={summary.unfit} />
                        </Box>

                        <CarsTable cars={cars} />
                    </Box>
                )}
            </Container>
        </>
    );
};