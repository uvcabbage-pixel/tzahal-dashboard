import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    type ReactNode,
} from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { buildTheme, type ThemeMode } from "../theme/theme";

interface ThemeModeContextValue {
    mode: ThemeMode;
    toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>("light");

    const toggleMode = useCallback(() => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    }, []);

    const theme = useMemo(() => buildTheme(mode), [mode]);
    const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

    return (
        <ThemeModeContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
};

export const useThemeMode = (): ThemeModeContextValue => {
    const ctx = useContext(ThemeModeContext);
    if (!ctx) throw new Error("useThemeMode must be used within ThemeModeProvider");
    return ctx;
};