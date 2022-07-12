import { Request, Response } from "express";

import * as cardService from "../services/CardService.js";
import * as verifyService from "../services/ValidationService.js";

export async function rechargeCard(req: Request, res: Response) {
  const { "x-api-key": apiKey } = req.headers as { "x-api-key": string };
  const { cardId, amount }: { cardId: number; amount: number } = req.body;

  const verifyApiKeyExist = await verifyService.verifyApiKey(apiKey);
  const verifyCardRegister = await cardService.verifyCardRegisterById(cardId);
  const ValidateEmployeeValid = await verifyService.ValidateExistEmployee(
    verifyCardRegister.employeeId
  );

  if (!(verifyApiKeyExist.id === ValidateEmployeeValid.companyId)) {
    return res.status(409).send(" not your employee");
  }
  if (verifyCardRegister.isBlocked || verifyCardRegister.password === null) {
    return res.status(401).send("card unauthorized");
  }
  verifyService.ValidateExpireDate(verifyCardRegister.expirationDate);
  const rechargeData = { cardId, amount };
  await cardService.recharge(rechargeData);
  res.status(200).send("recharge done");
}
