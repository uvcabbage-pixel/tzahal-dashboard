import { createTheme, type Theme } from "@mui/material/styles";

export type ThemeMode = "light" | "dark";

export const KSHIRUT_THRESHOLDS = { low: 70, medium: 80 } as const;

export const buildTheme = (mode: ThemeMode): Theme =>
    createTheme({
        direction: "rtl",
        palette: {
            mode,
            primary: { main: mode === "light" ? "#2563eb" : "#60a5fa" },
            success: { main: "#16a34a" },
            warning: { main: "#eab308" },
            error: { main: "#dc2626" },
            background: {
                default: mode === "light" ? "#f8fafc" : "#0f172a",
            },
            secondary:{main: mode === "light" ? "#3fca11" : "#064216"}
        },
        typography: { fontFamily: "Inter, system-ui, sans-serif" },
        shape: { borderRadius: 12 },
    });