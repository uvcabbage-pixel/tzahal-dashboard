import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Paper,
    Stack,
    Typography,
    TextField,
    Button,
    Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
    const [pernr, setPernr] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setError("");

        if (!pernr.trim()) {
            setError("יש להזין מספר אישי");
            return;
        }

        setIsSubmitting(true);
        try {
            await login(pernr.trim());
            navigate("/dashboard");
        } catch {
            setError("מספר אישי לא נמצא במערכת");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: "6rem" }}>
            <Paper sx={{ p: "2rem" }} elevation={3}>
                <Stack component="form" onSubmit={handleSubmit} spacing="1.25rem">
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                        התחברות למערכת
                    </Typography>

                    <TextField
                        label="מספר אישי"
                        value={pernr}
                        onChange={(e) => setPernr(e.target.value)}
                        error={Boolean(error)}
                        helperText={error || " "}
                        slotProps={{
                            htmlInput: { inputMode: "numeric" },
                        }}
                        autoFocus
                        fullWidth
                    />

                    {error && <Alert severity="error">{error}</Alert>}

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        fullWidth
                    >
                        {isSubmitting ? "מתחבר..." : "כניסה"}
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};