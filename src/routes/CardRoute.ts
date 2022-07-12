import { Router } from "express";

import { activeCard } from "../controller/ActiveCardController.js";
import { blockCard } from "../controller/BlockCardController.js";
import { CreateCard } from "../controller/CreateCardController.js";
import { UnlockCard } from "../controller/UnlockCardController.js";
import schemaValidateMiddleware from "../middlewares/SchemaValidateMiddleware.js";
import { ActiveCardSchema } from "../schemas/activeCardSchema.js";
import { BlockUnlockCardSchema } from "../schemas/blockUnlockCardSchema.js";
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
  schemaValidateMiddleware(BlockUnlockCardSchema),
  blockCard
);
cardRouter.post(
  "/UnlockCard",
  schemaValidateMiddleware(BlockUnlockCardSchema),
  UnlockCard
);
export default cardRouter;
