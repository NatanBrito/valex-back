import { Request, Response } from "express";

import { CardUpdateData } from "../repositories/cardRepository.js";
import * as ActiveCardService from "../services/ActiveCardService.js";
import * as CardService from "../services/CardService.js";

export async function activeCard(req: Request, res: Response) {
  const {
    cardNumber,
    CardHolderName,
    expirateDate,
    cvc,
    password,
  }: {
    cardNumber: string;
    CardHolderName: string;
    expirateDate: string;
    cvc: string;
    password: string;
  } = req.body;
  const verifyExistCardRegister = await ActiveCardService.findCardRegister(
    cardNumber,
    CardHolderName,
    expirateDate
  );
  ActiveCardService.ValidateExpireDate(verifyExistCardRegister.expirationDate);

  const decrypt = ActiveCardService.descryptedCvc(
    verifyExistCardRegister.securityCode
  );
  if (!(decrypt == cvc)) {
    return res.status(401).send("data about card not compatible");
  }
  // TODO:  colocar esses ifs em services
  if (verifyExistCardRegister.password !== null) {
    return res.status(401).send("card has already been registered");
  }
  const encryptPassword = CardService.encrypt(password);
  const card: CardUpdateData = {
    ...verifyExistCardRegister,
    password: encryptPassword,
  };

  await ActiveCardService.activeCardEmployee(verifyExistCardRegister.id, card);
  res.sendStatus(201);
}
