import type { Request } from "express";
import type { AuthUser } from "../../../shared/domain.types";

export type JwtPayloadData = AuthUser;

export interface AuthedRequest extends Request {
    user: JwtPayloadData;
}