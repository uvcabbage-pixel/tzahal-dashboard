import { TopBar } from "../componets/layout/TopBar.tsx";

const DashboardPage = () => {
    return <>
    <TopBar />
    <div>dashboard</div>;
    </>
};

export default DashboardPage;

/*
import { Container, Grid, CircularProgress, Alert } from "@mui/material";
import { TopBar } from "../components/layout/TopBar";
import { StatLabel } from "../components/dashboard/StatLabel";
import { KshirutBarChart } from "../components/dashboard/KshirutBarChart";
import { KshirutPieChart } from "../components/dashboard/KshirutPieChart";
import { CarsTable } from "../components/dashboard/CarsTable";
import { useCars } from "../hooks/useCars";
export const DashboardPage = () => {
    const { cars, stats, isLoading, error } = useCars();

    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <>
            <TopBar />
            <Container maxWidth="lg" sx={{ py: "2rem" }}>
                <Grid container spacing="1.25rem">
                    <Grid item xs={12} md={4}>
                        <StatLabel variant="percentage" title="אחוז כשירות" value={overallPct} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatLabel variant="count" title="כלים כשירים" value={fitCount} unit="כלים" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatLabel variant="text" title="סטטוס כללי" value={statusText} />
                    </Grid>

                    <Grid item xs={12} md={8}><KshirutBarChart stats={stats} /></Grid>
                    <Grid item xs={12} md={4}><KshirutPieChart fit={fitCount} unfit={unfitCount} /></Grid>
                    <Grid item xs={12}><CarsTable cars={cars} /></Grid>
                </Grid>
            </Container>
        </>
    );
};*/