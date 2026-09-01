import type { Request, Response } from "express";

export const login = (_req: Request, res: Response): void => {
    res.status(501).json({ message: "Not implemented yet" });
};