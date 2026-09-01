import { createApp } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

const start = async (): Promise<void> => {
    await connectDB();
    createApp().listen(env.port, () => {
        console.log(`Server listening on port ${env.port}`);
    });
};

void start();