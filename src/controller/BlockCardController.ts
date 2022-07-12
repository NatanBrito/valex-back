import { Request, Response } from "express";

import * as cardService from "../services/CardService.js";
import * as verifyService from "../services/ValidationService.js";

export async function blockCard(req: Request, res: Response) {
  const { cardId, password }: { cardId: number; password: string } = req.body;
  const verifyCardRegister = await cardService.verifyCardRegisterById(cardId);
  verifyService.ValidateExpireDate(verifyCardRegister.expirationDate);
  if (verifyCardRegister.isBlocked)
    return res.status(401).send("card is already block");
  const decryptPass = verifyService.descrypted(verifyCardRegister.password);
  if (!(decryptPass === password)) return res.sendStatus(401);
  const card = { ...verifyCardRegister, isBlocked: true };
  await cardService.BlockCard(cardId, card);
  res.status(200).send(verifyCardRegister);
}
