import { Pool } from "pg";
import { env } from "./env";

const pool = new Pool({
  connectionString: env.DB_URL,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Neon PostgreSQL Connected");
    client.release();
  } catch (err) {
    console.error("❌ Database Connection Error", err);
    process.exit(1);
  }
};

export default pool;
