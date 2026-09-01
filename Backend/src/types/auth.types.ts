import type { Request } from "express";

export interface JwtPayloadData {
    pernr: string;
    gdud: string;
    isManager: boolean;
}

/** A request that has passed through `authenticate`. */
export interface AuthedRequest extends Request {
    user: JwtPayloadData;
}
