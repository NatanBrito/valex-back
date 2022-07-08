import { Router } from "express";
import { Teste } from "../controller/testeController.js";

const testRouter = Router();

testRouter.get("/", Teste);
export default testRouter;
