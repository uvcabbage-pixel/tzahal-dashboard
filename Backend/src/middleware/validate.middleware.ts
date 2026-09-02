// src/middleware/validate.middleware.ts
import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ValidationResult } from "../validators/auth.validator";

type Validator<T> = (body: unknown) => ValidationResult<T>;

export const validateBody = <T>(validator: Validator<T>): RequestHandler =>
    (req: Request, res: Response, next: NextFunction): void => {
        const result = validator(req.body);
        console.log("validation:", result.success ? "passed" : result.errors);
        if (!result.success) {
            res.status(400).json({ message: "Validation failed", errors: result.errors });
            return;
        }
        req.body = result.data;
        next();
    };