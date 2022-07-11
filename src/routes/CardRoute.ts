import { Router } from "express";

import { CreateCard } from "../controller/CreateCardController.js";
import schemaValidateMiddleware from "../middlewares/SchemaValidateMiddleware.js";
import { bodySchema } from "../schemas/CreateSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/create-card",
  // schemaValidateMiddleware(bodySchema),
  CreateCard
);
export default cardRouter;
