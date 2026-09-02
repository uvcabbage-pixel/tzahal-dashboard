import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Container,
    Paper,
    Stack,
    Typography,
    TextField,
    Button,
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

        const trimmed = pernr.trim();
        if (!trimmed) {
            setError("יש להזין מספר אישי");
            return;
        }

        setIsSubmitting(true);
        try {
            await login(trimmed);
            navigate("/dashboard", { replace: true });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    setError("מספר אישי לא נמצא במערכת");
                } else if (err.response?.status === 400) {
                    setError("מספר אישי חייב להכיל ספרות בלבד");
                } else {
                    setError("שגיאת תקשורת עם השרת");
                }
            } else {
                setError("שגיאה לא צפויה");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: "6rem" }}>
            <Paper sx={{ p: "2rem" }} elevation={3}>
                <Stack component="form" onSubmit={handleSubmit} spacing="1.25rem">
                    <Typography variant="h5" sx={{textAlign: "center"}}>
                        התחברות למערכת
                    </Typography>

                    <TextField
                        label="מספר אישי"
                        value={pernr}
                        onChange={(e) => setPernr(e.target.value)}
                        error={Boolean(error)}
                        helperText={error || " "}
                        slotProps={{
                            htmlInput: {
                                inputMode: "numeric",
                                maxLength: 20,
                            },
                        }}
                        autoFocus
                        fullWidth
                        disabled={isSubmitting}
                    />

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