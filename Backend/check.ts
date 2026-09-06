import { connectDB } from "./src/config/db";
import { CarModel } from "./src/models/car.model";

const run = async (): Promise<void> => {
    await connectDB();
    process.exit(0);
};
void run();