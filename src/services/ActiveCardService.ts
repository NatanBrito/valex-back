import Cryptr from "cryptr";

import { findByCardDetails } from "../repositories/cardRepository.js";
export function descryptedCvc(encrypt: string) {
  const cryptr = new Cryptr(process.env.ENCRYPTCVC);
  const decryptedString = cryptr.decrypt(encrypt);
  return decryptedString;
}

export async function findCardRegister(
  number: string,
  name: string,
  expirateDate: string
) {
  const findCardRegister = await findByCardDetails(number, name, expirateDate);
  if (!findCardRegister) {
    throw { type: "NOTFOUND", status: 404, message: "not found card register" };
  }
  return findCardRegister;
}
