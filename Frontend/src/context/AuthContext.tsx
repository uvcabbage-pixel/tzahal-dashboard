import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    type ReactNode,
} from "react";
import type { AuthUser } from "../types/domain.types";
import { api, tokenStorage } from "../api/axiosInstance";

// Flip to false once the backend login route exists.
const USE_MOCK_AUTH = true;

interface AuthContextValue {
    user: AuthUser | null;
    isLoading: boolean;
    login: (pernr: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = useCallback(async (pernr: string): Promise<void> => {
        setIsLoading(true);
        try {
            if (USE_MOCK_AUTH) {
                // Any pernr ending in 0 is treated as a manager, for testing.
                setUser({ pernr, gdud: "גדוד 100", isManager: pernr.endsWith("0") });
                return;
            }
            const { data } = await api.post<{ token: string; user: AuthUser }>(
                "/auth/login",
                { pernr },
            );
            tokenStorage.set(data.token);
            setUser(data.user);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback((): void => {
        tokenStorage.clear();
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({ user, isLoading, login, logout }),
        [user, isLoading, login, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
//TODO: מאבד גישה אחרי רענון