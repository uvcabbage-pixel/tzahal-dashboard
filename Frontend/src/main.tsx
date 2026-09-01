// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CacheProvider } from "@emotion/react";
import "./charts/registerCharts";
import { ThemeModeProvider } from "./context/ThemeModeContext";
import { AuthProvider } from "./context/AuthContext";
import { rtlCache } from "./theme/rtlCache";
import App from "./App";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CacheProvider value={rtlCache}>
            <ThemeModeProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AuthProvider>
            </ThemeModeProvider>
        </CacheProvider>
    </StrictMode>,
);