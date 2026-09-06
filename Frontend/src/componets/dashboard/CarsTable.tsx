import { useState, useMemo } from "react";
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
    TableSortLabel,
    TablePagination,
    Chip,
} from "@mui/material";
import type { Car } from "@shared/domain.types";

interface CarsTableProps {
    cars: Car[];
}

type SortableKey = "carNumber" | "makat" | "kshirot";
type SortDirection = "asc" | "desc";

interface ColumnConfig {
    key: SortableKey;
    label: string;
    align: "left" | "center";
}

const COLUMNS: ColumnConfig[] = [
    { key: "carNumber", label: "צ' הכלי", align: "left" },
    { key: "makat", label: 'מק"ט', align: "left" },
    { key: "kshirot", label: "כשירות", align: "center" },
];

const ROWS_PER_PAGE = 10;

const compare = (a: Car, b: Car, key: SortableKey): number => {
    if (key === "kshirot") return Number(a.kshirot) - Number(b.kshirot);
    return a[key].localeCompare(b[key], undefined, { numeric: true });
};

export const CarsTable = ({ cars }: CarsTableProps) => {
    const [sortKey, setSortKey] = useState<SortableKey>("carNumber");
    const [direction, setDirection] = useState<SortDirection>("asc");
    const [page, setPage] = useState<number>(0);

    const handleSort = (key: SortableKey): void => {
        if (key === sortKey) {
            setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setDirection("asc");
        }
        setPage(0);
    };

    const sorted = useMemo(() => {
        const copy = [...cars];
        copy.sort((a, b) => {
            const result = compare(a, b, sortKey);
            return direction === "asc" ? result : -result;
        });
        return copy;
    }, [cars, sortKey, direction]);

    const visible = sorted.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE);

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
                                {COLUMNS.map((col) => (
                                    <TableCell
                                        key={col.key}
                                        align={col.align}
                                        sortDirection={sortKey === col.key ? direction : false}
                                    >
                                        <TableSortLabel
                                            active={sortKey === col.key}
                                            direction={sortKey === col.key ? direction : "asc"}
                                            onClick={() => handleSort(col.key)}
                                        >
                                            {col.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {visible.map((car) => (
                                <TableRow key={car.carNumber} hover>
                                    <TableCell>{car.carNumber}</TableCell>
                                    <TableCell>{car.makat}</TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={car.kshirot ? "כשיר" : "לא כשיר"}
                                            color={car.kshirot ? "success" : "error"}
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
                    count={sorted.length}
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