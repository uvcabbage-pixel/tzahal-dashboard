import type { CarDocument } from "../models/car.model";
import type { UserDocument } from "../models/user.model";
import type { Car, AuthUser } from "../types/domain.types";

export const toCarDTO = (doc: CarDocument): Car => ({
    carNumber: doc.carNumber,
    makat: doc.makat,
    // Stored as a string; normalise to a number for the API.
    kshirot: Number(doc.kshirot) === 1 ? 1 : 0,
    gdud: doc.gdud,
});

/** Spec encodes 0 = manager, 1 = regular user. Inverted on purpose. */
export const toAuthUser = (doc: UserDocument): AuthUser => ({
    pernr: doc.pernr,
    gdud: doc.gdud,
    isManager: doc.isManager === "0",
});