import type { Request } from "express";
import type { AuthUser } from "./domain.types";

export type JwtPayloadData = AuthUser;

export interface AuthedRequest extends Request {
    user: JwtPayloadData;
}