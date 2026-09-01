import type { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype); //stops errors of with a built in class from crushing the backend
    }
}

export const notFound = (req: Request, res: Response): void => {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

export const errorHandler = (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
    }

    console.error("Unhandled error:", error);
    res.status(500).json({ message: "Internal server error" });
};

//דוגמא ל:ERROR
// throw new AppError(404, "User not found");