import dotenv from "dotenv";
dotenv.config();

interface Env {
    port: number;
    mongoUri: string;
    jwtSecret: string;
    jwtExpiresIn: string;
}

const required = (key: string): string => {
    const value = process.env[key];
    if (!value) throw new Error(`Missing required env variable: ${key}`);
    return value;
};

export const env: Env = {
    port: Number(process.env.PORT ?? 3000),
    mongoUri: required("MONGO_URI"),
    jwtSecret: required("JWT_SECRET"),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "8h",
};