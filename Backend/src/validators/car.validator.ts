import { isRecord, isDigitsOnly, isBoolean } from "../utils/guards";
import type { ValidationResult, ValidationError } from "./auth.validator";

export interface CreateCarInput { //זה שונה מdomain.type כי זה מיצג את תשובת new cars
    carNumber: string;
    makat: string;
    kshirot: boolean;
    gdud: string;
}

export const validateCreateCar = (body: unknown): ValidationResult<CreateCarInput> => {
    const errors: ValidationError[] = [];

    if (!isRecord(body)) {
        return { success: false, errors: [{ field: "body", message: "גוף הבקשה אינו תקין" }] };
    }

    const { carNumber, makat, kshirot, gdud } = body;

    if (!isDigitsOnly(carNumber)) {
        errors.push({ field: "carNumber", message: "צ' הכלי חייב להכיל ספרות בלבד" });
    }
    if (!isDigitsOnly(makat)) {
        errors.push({ field: "makat", message: 'מק"ט חייב להכיל ספרות בלבד' });
    }
    if (!isDigitsOnly(gdud)) {
        errors.push({ field: "gdud", message: "גדוד חייב להכיל ספרות בלבד" });
    }
    if (!isBoolean(kshirot)) {
        errors.push({ field: "kshirot", message: "כשירות חייבת להיות ערך בוליאני" });
    }

    if (errors.length > 0) return { success: false, errors };

    return {
        success: true,
        data: {
            carNumber: (carNumber as string).trim(),
            makat: (makat as string).trim(),
            kshirot: kshirot as boolean,
            gdud: (gdud as string).trim(),
        },
    };
};