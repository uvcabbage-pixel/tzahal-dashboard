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
    FormControlLabel,
    Switch,
    Alert,
} from "@mui/material";
import { TopBar } from "../componets/layout/TopBar";
import { api } from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import type { Car } from "@shared/domain.types";

interface FormState {
    carNumber: string;
    makat: string;
    kshirot: boolean;
    gdud: string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
    carNumber: "",
    makat: "",
    kshirot: true,
    gdud: "",
};

export const AddCarPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState<FormState>({ ...EMPTY_FORM, gdud: user?.gdud ?? "" });
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [generalError, setGeneralError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const updateField = <K extends keyof FormState>(key: K, value: FormState[K]): void => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
        setSuccess("");
    };

    const validate = (): FieldErrors => {
        const errors: FieldErrors = {};
        if (!form.carNumber.trim()) errors.carNumber = "יש להזין צ' כלי";
        if (!form.makat.trim()) errors.makat = 'יש להזין מק"ט';
        if (!form.gdud.trim()) errors.gdud = "יש להזין גדוד";
        return errors;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setGeneralError("");
        setSuccess("");

        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post<Car>("/cars", {
                carNumber: form.carNumber.trim(),
                makat: form.makat.trim(),
                kshirot: form.kshirot,
                gdud: form.gdud.trim(),
            });
            setSuccess(`הכלי ${form.carNumber.trim()} נוסף בהצלחה`);
            setForm({ ...EMPTY_FORM, gdud: user?.gdud ?? "" });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 409) {
                    setFieldErrors({ carNumber: "צ' זה כבר קיים במערכת" });
                } else if (err.response?.status === 403) {
                    setGeneralError("אין לך הרשאה להוסיף כלים");
                } else if (err.response?.status === 400) {
                    setGeneralError("אחד השדות אינו תקין");
                } else {
                    setGeneralError("שגיאת תקשורת עם השרת");
                }
            } else {
                setGeneralError("שגיאה לא צפויה");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <TopBar />
            <Container maxWidth="sm" sx={{ mt: "3rem" }}>
                <Paper sx={{ p: "2rem" }} elevation={3}>
                    <Stack component="form" onSubmit={handleSubmit} spacing="1.25rem">
                        <Typography variant="h5" sx={{textAlign: "center"}}>
                            הוספת כלי חדש
                        </Typography>

                        <TextField
                            label="צ' הכלי"
                            value={form.carNumber}
                            onChange={(e) => updateField("carNumber", e.target.value)}
                            error={Boolean(fieldErrors.carNumber)}
                            helperText={fieldErrors.carNumber || " "}
                            slotProps={{ htmlInput: { maxLength: 20 } }}
                            disabled={isSubmitting}
                            autoFocus
                            fullWidth
                        />

                        <TextField
                            label='מק"ט'
                            value={form.makat}
                            onChange={(e) => updateField("makat", e.target.value)}
                            error={Boolean(fieldErrors.makat)}
                            helperText={fieldErrors.makat || " "}
                            slotProps={{ htmlInput: { maxLength: 50 } }}
                            disabled={isSubmitting}
                            fullWidth
                        />

                        <TextField
                            label="גדוד"
                            value={form.gdud}
                            onChange={(e) => updateField("gdud", e.target.value)}
                            error={Boolean(fieldErrors.gdud)}
                            helperText={fieldErrors.gdud || " "}
                            slotProps={{ htmlInput: { maxLength: 50 } }}
                            disabled={isSubmitting}
                            fullWidth
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.kshirot}
                                    onChange={(e) => updateField("kshirot", e.target.checked)}
                                    disabled={isSubmitting}
                                />
                            }
                            label={form.kshirot ? "כשיר" : "לא כשיר"}
                        />

                        {generalError && <Alert severity="error">{generalError}</Alert>}
                        {success && <Alert severity="success">{success}</Alert>}

                        <Stack direction="row" spacing="0.75rem">
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                                fullWidth
                            >
                                {isSubmitting ? "מוסיף..." : "הוספה"}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/dashboard")}
                                disabled={isSubmitting}
                                fullWidth
                            >
                                חזרה
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
};