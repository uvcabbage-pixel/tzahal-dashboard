import { Router } from "express";
import { authenticate, requireManager } from "../middleware/auth.middleware";
import { withAuth } from "../utils/withAuth";
import { getCars, createCar } from "../controllers/car.controller";
import { validateBody } from "../middleware/validate.middleware";

import { validateCreateCar } from "../validators/car.validator";

export const carRouter = Router();

carRouter.use(authenticate);

carRouter.get("/", withAuth(getCars));
carRouter.post("/", validateBody(validateCreateCar) ,requireManager, withAuth(createCar));