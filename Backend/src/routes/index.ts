import { Router } from "express";
import { authRouter } from "./auth.routes";
import { carRouter } from "./car.routes";

export const router = Router();

router.use("/auth", authRouter);
router.use("/cars", carRouter);