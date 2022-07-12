import "express-async-errors";
import express, { json } from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
dotenv.config();
var app = express();
app.use(json());
app.use(router);
app.listen(+process.env.PORT || 5000, function () {
    console.log("Server is running on port ".concat(process.env.PORT || 5000, " \uD83D\uDC31\u200D\uD83D\uDC64"));
});
