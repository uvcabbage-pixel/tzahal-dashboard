import type { Response } from "express";
import { AuthedRequest } from "../types/auth.types";

export const getCars = async (_req: AuthedRequest , res: Response): Promise<void> => {
    res.status(501).json({ message: "Not implemented yet" });
};

export const createCar = async (_req: AuthedRequest , res: Response): Promise<void> => {
    res.status(501).json({ message: "Not implemented yet" });
};