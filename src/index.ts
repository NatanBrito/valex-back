import "express-async-errors";
import express, { json } from "express";
import dotenv from "dotenv";

import router from "./routes/index.js";
dotenv.config();

const app = express();
app.use(json());
app.use(router);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000} 🐱‍👤`);
});
