import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";
import { useThemeMode } from "../../context/ThemeModeContext";

export const TopBar = () => {
    const { user, logout } = useAuth();
    const { mode, toggleMode } = useThemeMode();

    return (
        <AppBar position="static" elevation={1}>
            <Toolbar sx={{ gap: "1rem" }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    אפלקצית dashboard
                </Typography>

                {user && (
                    <Stack direction="row" spacing="0.75rem" sx={{alignItems: "center"}}>
                        <Typography variant="body2">
                            {user.pernr} · {user.gdud}
                        </Typography>
                        {user.isManager && (
                            <Chip label="מנהל" size="small" color="secondary" />
                        )}
                    </Stack>
                )}

                <IconButton
                    onClick={toggleMode}
                    color="inherit"
                    aria-label="החלף ערכת נושא"
                >
                    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>

                {user?.isManager && (
                    <Button color="inherit" component={RouterLink} to="/cars/new">
                        הוספת צ&apos;
                    </Button>
                )}

                {user && (
                    <Button
                        color="inherit"
                        onClick={logout}
                        startIcon={<LogoutIcon />}
                    >
                        התנתקות
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};