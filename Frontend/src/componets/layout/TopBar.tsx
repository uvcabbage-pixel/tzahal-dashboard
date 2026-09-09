import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";
import { useThemeMode } from "../../context/ThemeModeContext";
import type { AuthUser } from "@shared/domain.types";

interface UserSectionProps {
    user: AuthUser;
    onLogout: () => void;
}

const UserSection = ({ user, onLogout }: UserSectionProps) => (
    <>
        <Stack direction="row" spacing="0.75rem" sx={{alignItems:"center"}} >
            <Typography variant="body2">
                {user.pernr} · {user.gdud}
            </Typography>
            {user.isManager && <Chip label="מנהל" size="small" color="secondary" />}
        </Stack>

        {user.isManager && (
            <Button color="inherit" component={RouterLink} to="/cars/new">
                הוספת צ&apos;
            </Button>
        )}

        <Button color="inherit" onClick={onLogout} startIcon={<LogoutIcon />}>
            התנתקות
        </Button>
    </>
);

export const TopBar = () => {
    const { user, logout } = useAuth();
    const { mode, toggleMode } = useThemeMode();

    return (
        <AppBar position="static" elevation={1}>
            <Toolbar sx={{ gap: "1rem" }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    דשבורד כשירות
                </Typography>

                <IconButton onClick={toggleMode} color="inherit" aria-label="החלף ערכת נושא">
                    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>

                {user !== null && <UserSection user={user} onLogout={logout} />}
            </Toolbar>
        </AppBar>
    );
};