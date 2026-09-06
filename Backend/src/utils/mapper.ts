import type { CarDocument } from "../models/car.model";
import type { UserDocument } from "../models/user.model";
import type { Car, AuthUser } from "../../../shared/domain.types";
export const toCarDTO = (doc: CarDocument): Car => ({
    carNumber: doc.carNumber,
    makat: doc.makat,
    // DB stores '0' / '1' as strings; the domain model uses a boolean.
    kshirot: doc.kshirot === "1",
    gdud: doc.gdud,
});

/** Spec encodes 0 = manager, 1 = regular user. Inverted on purpose. */
export const toAuthUser = (doc: UserDocument): AuthUser => ({
    pernr: doc.pernr,
    gdud: doc.gdud,
    isManager: doc.isManager === "0",
});