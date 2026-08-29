import axios from "axios";

const TOKEN_KEY = "auth_token";

export const tokenStorage = {
    get: (): string | null => localStorage.getItem(TOKEN_KEY),
    set: (token: string): void => localStorage.setItem(TOKEN_KEY, token),
    clear: (): void => localStorage.removeItem(TOKEN_KEY),
};

export const api = axios.create({
    baseURL: "/api",
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = tokenStorage.get();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        // TODO: on 401 -> clear token and redirect to /login
        return Promise.reject(error);
    },
);