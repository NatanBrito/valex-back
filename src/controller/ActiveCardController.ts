import { Request, Response } from "express";

// import * as verifyServices from "../services/ValidationService.js";
import * as ActiveCardService from "../services/ActiveCardService.js";

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
  // trazer a function do service e comparar
  const verifyExistCardRegister = await ActiveCardService.findCardRegister(
    cardNumber,
    CardHolderName,
    expirateDate
  );
  const decrypt = ActiveCardService.descryptedCvc(
    verifyExistCardRegister.securityCode
  );
  if (!(decrypt == cvc)) {
  }
  res.status(200).send(verifyExistCardRegister);
}
