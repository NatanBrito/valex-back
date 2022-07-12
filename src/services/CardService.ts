import dayjs from "dayjs";

import * as cardRepository from "../repositories/cardRepository.js";

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
  type: cardRepository.TransactionTypes,
  id: number
) {
  const verifyCardType = await cardRepository.findByTypeAndEmployeeId(type, id);
  if (verifyCardType)
    throw { type: "conflict", status: 409, message: "already this card type" };
  return verifyCardType;
}

export function expireDateCard() {
  const date = dayjs().add(5, "year").format("MM-YY");
  return date;
}

export async function InsertCard(card: cardRepository.CardInsertData) {
  const CreateCard = await cardRepository.insert(card);
  return CreateCard;
}
export async function verifyCardRegisterById(id: number) {
  const verifyRegister = await cardRepository.findById(id);
  if (!verifyRegister) {
    throw { type: "Invalid", status: 401, message: "card register not found" };
  }
  return verifyRegister;
}
export async function BlockCard(
  id: number,
  card: cardRepository.CardUpdateData
) {
  await cardRepository.update(id, card);
  return true;
}
