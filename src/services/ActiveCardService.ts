import Cryptr from "cryptr";

import { findByCardDetails } from "../repositories/cardRepository.js";
export function descryptedCvc(encrypt: string) {
  const cryptr = new Cryptr(process.env.ENCRYPTCVC);
  const decryptedString = cryptr.decrypt(encrypt);
  return decryptedString;
}

export async function findCard(
  number: string,
  name: string,
  expirateDate: string
) {
  const xx = await findByCardDetails(number, name, expirateDate);
  return xx;
}
