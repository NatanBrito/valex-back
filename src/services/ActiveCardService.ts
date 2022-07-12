import Cryptr from "cryptr";
import dayjs from "dayjs";

import {
  CardUpdateData,
  findByCardDetails,
  update,
} from "../repositories/cardRepository.js";
export function descryptedCvc(encrypt: string) {
  const cryptr = new Cryptr(process.env.ENCRYPT);
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
    throw {
      type: "NOTFOUND",
      status: 401,
      message: "unauthorized card, not found card register",
    };
  }
  return findCardRegister;
}
export function ValidateExpireDate(cardDate: string) {
  const dateNow = dayjs().format("MM-YY");
  if (!(cardDate > dateNow)) {
    throw { type: "unauthorized", status: 401, message: "card expirate" };
  }
  return true;
}
export async function activeCardEmployee(id: number, card: CardUpdateData) {
  const xx = await update(id, card);
  return xx;
}
