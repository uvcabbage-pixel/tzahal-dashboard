import { connectDB } from "./src/config/db";
import { CarModel } from "./src/models/car.model";

const run = async (): Promise<void> => {
    await connectDB();
    console.log("count:", await CarModel.countDocuments());
    console.log("sample:", await CarModel.findOne().lean());
    process.exit(0);
};
void run();