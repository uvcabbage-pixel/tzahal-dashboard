import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
    {
        pernr: { type: String, required: true, unique: true },
        gdud: { type: String, required: true },
        isManager: { type: Number, required: true, enum: [0, 1] },
    },
    { collection: "users", versionKey: false },
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const UserModel = model("User", userSchema, "users");