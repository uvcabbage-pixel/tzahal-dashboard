import { isRecord, isNonEmptyString, isBinary } from "../utils/guards";
import type { ValidationResult, ValidationError } from "./auth.validator";

export interface CreateCarInput {
    carNumber: string;
    makat: string;
    kshirot: 0 | 1;
    gdud: string;
}

export const validateCreateCar = (body: unknown): ValidationResult<CreateCarInput> => {
    const errors: ValidationError[] = [];

    if (!isRecord(body)) {
        return { success: false, errors: [{ field: "body", message: "גוף הבקשה אינו תקין" }] };
    }

    const { carNumber, makat, kshirot, gdud } = body;

    if (!isNonEmptyString(carNumber, 20)) {
        errors.push({ field: "carNumber", message: "צ' הכלי אינו תקין" });
    }
    if (!isNonEmptyString(makat, 50)) {
        errors.push({ field: "makat", message: "מק\"ט אינו תקין" });
    }
    if (!isBinary(kshirot)) {
        errors.push({ field: "kshirot", message: "כשירות חייבת להיות 0 או 1" });
    }
    if (!isNonEmptyString(gdud, 50)) {
        errors.push({ field: "gdud", message: "גדוד אינו תקין" });
    }

    if (errors.length > 0) return { success: false, errors };

    return {
        success: true,
        data: {
            carNumber: (carNumber as string).trim(),
            makat: (makat as string).trim(),
            kshirot: kshirot as 0 | 1,
            gdud: (gdud as string).trim(),
        },
    };
};