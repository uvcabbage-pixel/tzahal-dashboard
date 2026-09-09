import { useState, useMemo } from "react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    Chip,
    InputAdornment,
    IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import type { Car } from "@shared/domain.types";

interface CarsTableProps {
    cars: Car[];
}

type SortableKey = "carNumber" | "makat" | "kshirot";
type SortDirection = "asc" | "desc";
type StatusFilter = "all" | "fit" | "unfit";

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

const matchesStatus = (car: Car, filter: StatusFilter): boolean => {
    if (filter === "all") return true;
    return filter === "fit" ? car.kshirot : !car.kshirot;
};

export const CarsTable = ({ cars }: CarsTableProps) => {
    const [carNumberQuery, setCarNumberQuery] = useState<string>("");
    const [makatQuery, setMakatQuery] = useState<string>("");
    const [status, setStatus] = useState<StatusFilter>("all");

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

    const processed = useMemo(() => {
        const car = carNumberQuery.trim().toLowerCase();
        const makat = makatQuery.trim().toLowerCase();

        const filtered = cars.filter(
            (c) =>
                c.carNumber.toLowerCase().includes(car) &&
                c.makat.toLowerCase().includes(makat) &&
                matchesStatus(c, status),
        );

        filtered.sort((a, b) => {
            const result = compare(a, b, sortKey);
            return direction === "asc" ? result : -result;
        });

        return filtered;
    }, [cars, carNumberQuery, makatQuery, status, sortKey, direction]);

    const visible = processed.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE);


    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    רשימת כלים
                </Typography>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing="1rem"
                    sx={{ mb: "1.25rem", alignItems: "center" }}
                >
                    <TextField
                        label="חיפוש לפי צ'"
                        size="small"
                        value={carNumberQuery}
                        onChange={(e) => {
                            setCarNumberQuery(e.target.value);
                            setPage(0);
                        }}
                        slotProps={{
                            input: {
                                endAdornment: carNumberQuery ? (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={() => setCarNumberQuery("")}
                                            aria-label="נקה חיפוש"
                                        >
                                            <ClearIcon fontSize="inherit" />
                                        </IconButton>
                                    </InputAdornment>
                                ) : undefined,
                            },
                        }}
                        fullWidth
                    />

                    <TextField
                        label='חיפוש לפי מק"ט'
                        size="small"
                        value={makatQuery}
                        onChange={(e) => {
                            setMakatQuery(e.target.value);
                            setPage(0);
                        }}
                        slotProps={{
                            input: {
                                endAdornment: makatQuery ? (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={() => setMakatQuery("")}
                                            aria-label="נקה חיפוש"
                                        >
                                            <ClearIcon fontSize="inherit" />
                                        </IconButton>
                                    </InputAdornment>
                                ) : undefined,
                            },
                        }}
                        fullWidth
                    />

                    <ToggleButtonGroup
                        value={status}
                        exclusive
                        size="small"
                        onChange={(_, next: StatusFilter | null) => {
                            if (next !== null) {
                                setStatus(next);
                                setPage(0);
                            }
                        }}
                    >
                        <ToggleButton value="all">הכל</ToggleButton>
                        <ToggleButton value="fit">כשיר</ToggleButton>
                        <ToggleButton value="unfit">לא כשיר</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ mb: "0.75rem" }}>
                    מציג {processed.length} מתוך {cars.length} כלים
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
                            {visible.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={COLUMNS.length} align="center">
                                        <Typography variant="body2" color="text.secondary" sx={{ py: "1.5rem" }}>
                                            לא נמצאו כלים התואמים לסינון
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                visible.map((car) => (
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
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={processed.length}
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