import { Request, Response } from "express";
import { faker } from "@faker-js/faker";

import * as verifyServices from "../services/ValidationService.js";
import * as CardServices from "../services/CardService.js";

export async function CreateCard(req: Request, res: Response) {
  const { "x-api-key": apiKey } = req.headers as { "x-api-key": string };
  const { id, type, name } = req.body;

  const verifyApiKeyExist = await verifyServices.verifyApiKey(apiKey);
  const ValidateEmployeeValid = await verifyServices.ValidateExistEmployee(id);
  if (!(verifyApiKeyExist.id === ValidateEmployeeValid.companyId)) {
    return res.status(409).send(" not your employee");
  }
  const randomCvc = faker.finance.creditCardCVV();
  const randomNumberCard = faker.finance.creditCardNumber(" ");
  const verifyCardType = await CardServices.verifyAlreadyCardTypeExist(
    type,
    id
  );
  const formatterName = CardServices.nameFormatter(name);
  res.status(200).send(formatterName);
}
