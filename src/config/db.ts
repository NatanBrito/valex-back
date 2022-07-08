import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const db = new Pool({
  ssl: { rejectUnauthorized: false },
  connectionString: process.env.DATABASE_URL,
});
console.log("DATABASE TA DE PE PAPAI");
export default db;
