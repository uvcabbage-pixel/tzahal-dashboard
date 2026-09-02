import express, { type Express } from "express";
import cors from "cors";
import { router } from "./routes/index";
import {notFound,  errorHandler} from "./middleware/errorHandler";
export const createApp = (): Express => {
    console.log(">>> createApp() running - build ID 12345");
    const app = express();

    app.use(cors());
    app.use(express.json({ limit: "100kb" }));
    app.use((req, _res, next) => {
    console.log(`→ ${req.method} ${req.originalUrl}`, req.body);
    next();
    });
    app.get("/api/health", (_req, res) => res.json({ ok: true }));
    app.use("/api", router);
    app.use(notFound);
    app.use(errorHandler);
    return app;
};