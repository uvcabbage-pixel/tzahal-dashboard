import { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Chip,
} from "@mui/material";
import type { Car } from "../../types/domain.types";

interface CarsTableProps {
    cars: Car[];
}

const ROWS_PER_PAGE = 10; 

export const CarsTable = ({ cars }: CarsTableProps) => {
    const [page, setPage] = useState<number>(0);

    const visible = cars.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    רשימת כלים
                </Typography>

                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>צ&apos; הכלי</TableCell>
                                <TableCell>מק&quot;ט</TableCell>
                                <TableCell align="center">כשירות</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visible.map((car) => (
                                <TableRow key={car.carNumber} hover>
                                    <TableCell>{car.carNumber}</TableCell>
                                    <TableCell>{car.makat}</TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={car.kshirot === 1 ? "כשיר" : "לא כשיר"}
                                            color={car.kshirot === 1 ? "success" : "error"}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={cars.length}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    rowsPerPage={ROWS_PER_PAGE}
                    rowsPerPageOptions={[ROWS_PER_PAGE]}
                    labelRowsPerPage="שורות בעמוד"
                />
            </CardContent>
        </Card>
    );
};