import { Router } from "express";

import testRouter from "./xxRoute.js";
const router = Router();

router.use(testRouter);

export default router;
