import { Request, Response } from "express";

import * as cardService from "../services/CardService.js";
import * as verifyService from "../services/ValidationService.js";
import { findByCardId } from "../repositories/paymentRepository.js";
export async function Purchase(req: Request, res: Response) {
  const {
    cardId,
    amount,
    password,
  }: { cardId: number; amount: number; password: string } = req.body;
  const verifyCardRegister = await cardService.verifyCardRegisterById(cardId);
  if (verifyCardRegister.isBlocked || verifyCardRegister.password === null) {
    return res.status(401).send("card unauthorized");
  }
  verifyService.ValidateExpireDate(verifyCardRegister.expirationDate);
  const decryptPass = verifyService.descrypted(verifyCardRegister.password);
  if (!(decryptPass === password)) return res.sendStatus(401);
  const xx = await findByCardId(cardId);
  res.status(200).send(xx);
}
