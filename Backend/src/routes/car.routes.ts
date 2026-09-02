// src/routes/car.routes.ts
import { Router } from "express";
import { authenticate, requireManager } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { validateCreateCar } from "../validators/car.validator";
import { withAuth } from "../utils/withAuth";
import { getCars, createCar } from "../controllers/car.controller";

export const carRouter = Router();

// Applies to every route below — new routes are protected by default.
carRouter.use(authenticate);

carRouter.get("/", withAuth(getCars));
carRouter.post("/", requireManager, validateBody(validateCreateCar), withAuth(createCar));