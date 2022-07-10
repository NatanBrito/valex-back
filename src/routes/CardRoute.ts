import { Router } from "express";
import { CreateCard } from "../controller/CreateCardController.js";

const cardRouter = Router();

cardRouter.post("/create-card", CreateCard);
export default cardRouter;
