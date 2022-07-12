import { Request, Response } from "express";

import * as cardService from "../services/CardService.js";

export default async function BankStatement(req: Request, res: Response) {
  const id: string = req.params.cardId;
  const cardId = parseInt(id);
  await cardService.verifyCardRegisterById(cardId);
  const allRecharges = await cardService.Balance(cardId);
  const amountBalance = await cardService.Amount(allRecharges);
  const allPurchases = await cardService.Purchases(cardId);
  const amountPurchases = await cardService.Amount(allPurchases);
  const bankExtract = {
    balance: amountBalance - amountPurchases,
    transactions: allPurchases,
    recharges: allRecharges,
  };
  res.status(200).send(bankExtract);
}
