import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

export const TEST_EMAIL = process.env.TEST_EMAIL || "teste@exemplo.com";
export const TEST_PASSWORD = process.env.TEST_PASSWORD || "Teste@1234";
