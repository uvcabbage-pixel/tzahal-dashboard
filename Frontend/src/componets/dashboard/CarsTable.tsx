import { useState, useMemo } from "react";
import {
    Autocomplete,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
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

const uniqueSorted = (values: string[]): string[] =>
    Array.from(new Set(values)).sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true }),
    );

export const CarsTable = ({ cars }: CarsTableProps) => {
    // --- filter state ---
    const [carNumberQuery, setCarNumberQuery] = useState<string>("");
    const [makatFilters, setMakatFilters] = useState<string[]>([]);
    const [makatInput, setMakatInput] = useState<string>("");
    const [status, setStatus] = useState<StatusFilter>("all");

    // --- sort / pagination state ---
    const [sortKey, setSortKey] = useState<SortableKey>("carNumber");
    const [direction, setDirection] = useState<SortDirection>("asc");
    const [page, setPage] = useState<number>(0);

    // Suggestion lists are derived from the data, so they stay in sync
    // automatically when a manager adds a vehicle.
    const carNumberOptions = useMemo(
        () => uniqueSorted(cars.map((c) => c.carNumber)),
        [cars],
    );
    const makatOptions = useMemo(() => uniqueSorted(cars.map((c) => c.makat)), [cars]);

    const handleSort = (key: SortableKey): void => {
        if (key === sortKey) {
            setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setDirection("asc");
        }
        setPage(0);
    };

    const clearFilters = (): void => {
        setCarNumberQuery("");
        setMakatFilters([]);
        setMakatInput("");
        setStatus("all");
        setPage(0);
    };

    const hasActiveFilters =
        carNumberQuery.trim().length > 0 ||
        makatFilters.length > 0 ||
        makatInput.trim().length > 0 ||
        status !== "all";

    const processed = useMemo(() => {
        const carQuery = carNumberQuery.trim().toLowerCase();
        const typedMakat = makatInput.trim().toLowerCase();

        // Committed chips are OR'd together; uncommitted typing also counts,
        // so the table narrows while the user is still typing.
        const matchesMakat = (car: Car): boolean => {
            if (makatFilters.length === 0 && typedMakat.length === 0) return true;
            const value = car.makat.toLowerCase();
            const chipHit = makatFilters.some((f) => value.includes(f.toLowerCase()));
            const typedHit = typedMakat.length > 0 && value.includes(typedMakat);
            return chipHit || typedHit;
        };

        const filtered = cars.filter(
            (c) =>
                c.carNumber.toLowerCase().includes(carQuery) &&
                matchesMakat(c) &&
                matchesStatus(c, status),
        );

        // filter() already returned a new array, so sorting in place is safe here.
        filtered.sort((a, b) => {
            const result = compare(a, b, sortKey);
            return direction === "asc" ? result : -result;
        });

        return filtered;
    }, [cars, carNumberQuery, makatFilters, makatInput, status, sortKey, direction]);

    const visible = processed.slice(
        page * ROWS_PER_PAGE,
        page * ROWS_PER_PAGE + ROWS_PER_PAGE,
    );

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    רשימת כלים
                </Typography>

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing="1rem"
                    sx={{ mb: "1rem", alignItems:"flex-start" }}
                >
                    <Autocomplete
                        freeSolo
                        options={carNumberOptions}
                        inputValue={carNumberQuery}
                        onInputChange={(_, value) => {
                            setCarNumberQuery(value);
                            setPage(0);
                        }}
                        filterOptions={(options, state) =>
                            state.inputValue.trim().length === 0
                                ? []
                                : options
                                      .filter((o) => o.includes(state.inputValue.trim()))
                                      .slice(0, 50)
                        }
                        fullWidth
                        renderInput={(params) => (
                            <TextField {...params} label="חיפוש לפי צ'" size="small" />
                        )}
                    />

                    <Autocomplete
                        multiple
                        freeSolo
                        options={makatOptions}
                        value={makatFilters}
                        onChange={(_, next) => {
                            setMakatFilters(next as string[]);
                            setPage(0);
                        }}
                        inputValue={makatInput}
                        onInputChange={(_, value) => {
                            setMakatInput(value);
                            setPage(0);
                        }}
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='חיפוש לפי מק"ט'
                                size="small"
                                placeholder={
                                    makatFilters.length === 0 ? 'הקלד או בחר מק"ט' : ""
                                }
                            />
                        )}
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

                <Stack
                    direction="row"
                    spacing="0.75rem"
                    sx={{ mb: "0.75rem", alignItems: "center" }}
                >
                    <Typography variant="body2" color="text.secondary">
                        מציג {processed.length} מתוך {cars.length} כלים
                    </Typography>
                    {hasActiveFilters && (
                        <Button size="small" onClick={clearFilters}>
                            נקה סינון
                        </Button>
                    )}
                </Stack>

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
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ py: "1.5rem" }}
                                        >
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