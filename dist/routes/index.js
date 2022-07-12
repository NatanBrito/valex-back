import { Router } from "express";
import cardRouter from "./CardRoute.js";
import handleErrorMiddleware from "../middlewares/handlerErrorMiddleware.js";
var router = Router();
router.use(cardRouter);
router.use(handleErrorMiddleware);
export default router;
