import { Router } from "express";

import { activeCard } from "../controller/ActiveCardController.js";
import { blockCard } from "../controller/BlockCardController.js";
import { CreateCard } from "../controller/CreateCardController.js";
import schemaValidateMiddleware from "../middlewares/SchemaValidateMiddleware.js";
import { ActiveCardSchema } from "../schemas/activeCardSchema.js";
import { BlockCardSchema } from "../schemas/blockCardSchema.js";
import { bodySchema } from "../schemas/CreateSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/create-card",
  schemaValidateMiddleware(bodySchema),
  CreateCard
);
cardRouter.post(
  "/activecard",
  schemaValidateMiddleware(ActiveCardSchema),
  activeCard
);
cardRouter.post(
  "/blockCard",
  schemaValidateMiddleware(BlockCardSchema),
  blockCard
);

export default cardRouter;
