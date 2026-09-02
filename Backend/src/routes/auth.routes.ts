import { Router } from "express";
import { login, me } from "../controllers/auth.controller";
import { validateBody } from "../middleware/validate.middleware";
import { validateLogin } from "../validators/auth.validator";
import { authenticate } from "../middleware/auth.middleware";
import { withAuth } from "../utils/withAuth";

export const authRouter = Router();

authRouter.post("/login", validateBody(validateLogin), login);
authRouter.get("/me", authenticate, withAuth(me)); 