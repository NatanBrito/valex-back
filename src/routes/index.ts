import { Router } from "express";

import cardRouter from "./CardRoute.js";
const router = Router();

router.use(cardRouter);

export default router;
