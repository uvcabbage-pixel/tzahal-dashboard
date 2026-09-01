import { isRecord, isDigitsOnly } from "../utils/guards";

export interface LoginInput {
    pernr: string;
}

export interface ValidationError {
    field: string;
    message: string;
}

export type ValidationResult<T> =
    | { success: true; data: T }
    | { success: false; errors: ValidationError[] };

export const validateLogin = (body: unknown): ValidationResult<LoginInput> => {
    const errors: ValidationError[] = [];

    if (!isRecord(body)) {
        return { success: false, errors: [{ field: "body", message: "גוף הבקשה אינו תקין" }] };
    }

    if (!isDigitsOnly(body.pernr)) {
        errors.push({ field: "pernr", message: "מספר אישי חייב להכיל ספרות בלבד" });
    }

    if (errors.length > 0) return { success: false, errors };

    // Safe: the guards above proved the shape.
    return { success: true, data: { pernr: (body.pernr as string).trim() } };
};