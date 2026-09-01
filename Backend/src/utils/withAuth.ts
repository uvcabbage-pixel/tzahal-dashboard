import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { AuthedRequest } from "../types/auth.types";

type AuthedHandler = (
    req: AuthedRequest,
    res: Response,
    next: NextFunction,
) => void | Promise<void>;

/**
 * Adapts a handler that requires `req.user` into a plain Express RequestHandler.
 * Safe only on routes mounted behind `authenticate`, which guarantees `user` exists.
 * Also forwards rejected promises to the error handler.
 */
export const withAuth =
    (handler: AuthedHandler): RequestHandler =>
    (req: Request, res: Response, next: NextFunction): void => {
        void Promise.resolve(handler(req as AuthedRequest, res, next)).catch(next);
    };