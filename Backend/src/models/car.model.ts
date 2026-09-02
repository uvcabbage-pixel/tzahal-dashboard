import { Schema, model, type InferSchemaType } from "mongoose";

const carSchema = new Schema(
    {
        carNumber: { type: String, required: true, unique: true },
        makat: { type: String, required: true },
        kshirot: { type: String, required: true, enum: ["0", "1"] },
        gdud: { type: String, required: true },
    },
    { collection: "carDatas", versionKey: false },
);

carSchema.index({ gdud: 1 });

export type CarDocument = InferSchemaType<typeof carSchema>;
export const CarModel = model("Car", carSchema, "carDatas");