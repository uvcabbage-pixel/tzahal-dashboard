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
import { useEffect } from "react";



interface AuthContextValue {
    user: AuthUser | null;
    isLoading: boolean;
    login: (pernr: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
    const restore = async (): Promise<void> => {
        const token = tokenStorage.get();
        if (!token) {
            setIsLoading(false);
            return;
        }
        try {
            const { data } = await api.get<{ user: AuthUser }>("/auth/me");
            setUser(data.user);
        } catch {
            tokenStorage.clear();
        } finally {
            setIsLoading(false);
        }
    };
    void restore();
    }, []);
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const login = useCallback(async (pernr: string): Promise<void> => {
        setIsLoading(true);
        try {
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