import type { Response, NextFunction } from "express";
import { CarModel } from "../models/car.model";
import { toCarDTO } from "../utils/mapper";
import { AppError } from "../middleware/errorHandler";
import type { AuthedRequest } from "../types/auth.types";
import type { CreateCarInput } from "../validators/car.validator";

export const getCars = async (
    req: AuthedRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { isManager, gdud } = req.user;

        // Managers see everything; regular users only their own battalion.
        // gdud comes from the verified token, never from the request.
        const filter = isManager ? {} : { gdud };

        const docs = await CarModel.find(filter).lean();
        res.json(docs.map(toCarDTO));
    } catch (error) {
        next(error);
    }
};

export const createCar = async (
    req: AuthedRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const input = req.body as CreateCarInput;

        const exists = await CarModel.exists({ carNumber: input.carNumber });
        if (exists) throw new AppError(409, "צ' זה כבר קיים במערכת");

        const created = await CarModel.create({
            carNumber: input.carNumber,
            makat: input.makat,
            kshirot: input.kshirot === 1 ? "1" : "0",
            gdud: input.gdud,
        });

        res.status(201).json(toCarDTO(created.toObject()));
    } catch (error) {
        next(error);
    }
};