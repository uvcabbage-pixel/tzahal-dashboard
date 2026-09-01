import { Router } from "express";
import { authenticate, requireManager } from "../middleware/auth.middleware";
import { withAuth } from "../utils/withAuth";
import { getCars, createCar } from "../controllers/car.controller";

export const carRouter = Router();

carRouter.use(authenticate);

carRouter.get("/", withAuth(getCars));
carRouter.post("/", requireManager, withAuth(createCar));