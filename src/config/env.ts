import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.NEON_DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
};