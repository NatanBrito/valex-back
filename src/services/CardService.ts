import dayjs from "dayjs";
import Cryptr from "cryptr";

import {
  findByTypeAndEmployeeId,
  TransactionTypes,
  insert,
  CardInsertData,
} from "../repositories/cardRepository.js";

export const nameFormatter = (name: string) => {
  const nameArr = name.toUpperCase().split(" ");
  const firstName = nameArr[0];
  const lastName = nameArr[nameArr.length - 1];
  const middleName = nameArr.splice(1, nameArr.length - 2);
  let formattedMiddleName = [];
  middleName.forEach(
    (name) => name.length >= 3 && formattedMiddleName.push(name.slice(0, 1))
  );
  return `${firstName} ${formattedMiddleName.join(" ")} ${lastName}`;
};

export async function verifyAlreadyCardTypeExist(
  type: TransactionTypes,
  id: number
) {
  const verifyCardType = await findByTypeAndEmployeeId(type, id);
  if (verifyCardType)
    throw { type: "conflict", status: 409, message: "already this card type" };
  return verifyCardType;
}

export function expireDateCard() {
  const date = dayjs().add(5, "year").format("MM-YY");
  return date;
}
export function encryptCvc(cvc: string) {
  const cryptr = new Cryptr(process.env.ENCRYPTCVC);
  const encryptedString = cryptr.encrypt("bacon");
  return encryptedString;
}
export function descryptedCvc(encrypt: string) {
  const cryptr = new Cryptr(process.env.ENCRYPTCVC);
  const decryptedString = cryptr.decrypt(encrypt);
  return decryptedString;
}
export async function InsertCard(card: CardInsertData) {
  const CreateCard = await insert(card);
  return CreateCard;
}
