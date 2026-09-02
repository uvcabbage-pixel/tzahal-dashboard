import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { env } from "../config/env";
import { toAuthUser } from "../utils/mapper";
import type { LoginInput } from "../validators/auth.validator";
import type { AuthedRequest, JwtPayloadData } from "../types/auth.types";

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { pernr } = req.body as LoginInput;

        const doc = await UserModel.findOne({ pernr }).lean();
        if (!doc) {
            res.status(401).json({ message: "מספר אישי לא נמצא במערכת" });
            return;
        }

        const user = toAuthUser(doc);

        const payload: JwtPayloadData = {
            pernr: user.pernr,
            gdud: user.gdud,
            isManager: user.isManager,
        };

        const token = jwt.sign(payload, env.jwtSecret, {
            expiresIn: env.jwtExpiresIn,
        } as jwt.SignOptions);

        res.json({ token, user });
    } catch (error) {
        next(error);
    }
};

export const me = (req: AuthedRequest, res: Response): void => {
    res.json({ user: req.user });
};