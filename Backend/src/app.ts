import express, { type Express } from "express";
import cors from "cors";
import { router } from "./routes/index";
import {notFound,  errorHandler} from "./middleware/errorHandler";
export const createApp = (): Express => {
    const app = express();

    app.use(cors());
    app.use(express.json({ limit: "100kb" }));

    app.get("/api/health", (_req, res) => res.json({ ok: true }));
    app.use("/api", router);
    app.use(notFound);
    app.use(errorHandler);
    return app;
};