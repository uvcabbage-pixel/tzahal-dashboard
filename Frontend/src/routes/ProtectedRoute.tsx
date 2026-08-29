import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactElement;
    managerOnly?: boolean;
}

export const ProtectedRoute = ({ children, managerOnly = false }: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: "4rem" }}>
                <CircularProgress />
            </Box>
        );
    }
    if (!user) return <Navigate to="/login" replace />;
    if (managerOnly && !user.isManager) return <Navigate to="/dashboard" replace />;

    return children;
};