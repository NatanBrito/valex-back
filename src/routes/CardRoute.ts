import { Router } from "express";
import { activeCard } from "../controller/ActiveCardController.js";

import { CreateCard } from "../controller/CreateCardController.js";
import schemaValidateMiddleware from "../middlewares/SchemaValidateMiddleware.js";
import { bodySchema } from "../schemas/CreateSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/create-card",
  schemaValidateMiddleware(bodySchema),
  CreateCard
);
cardRouter.post("/activecard", activeCard);
export default cardRouter;
