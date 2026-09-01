import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { validateBody } from "../middleware/validate.middleware";
import { validateLogin } from "../validators/auth.validator";

export const authRouter = Router();

authRouter.post("/login",validateBody(validateLogin) ,login);