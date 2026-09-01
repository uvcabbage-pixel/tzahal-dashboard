import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { JwtPayloadData, AuthedRequest } from "../types/auth.types";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const payload = jwt.verify(header.slice(7), env.jwtSecret) as JwtPayloadData;
        (req as AuthedRequest).user = payload;
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const requireManager = (req: Request, res: Response, next: NextFunction): void => {
    const { user } = req as AuthedRequest;
    if (!user.isManager) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }
    next();
};