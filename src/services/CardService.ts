import dayjs from "dayjs";

import * as cardRepository from "../repositories/cardRepository.js";
import { insert, findByCardId } from "../repositories/rechargeRepository.js";
import { findById } from "../repositories/businessRepository.js";
import * as paymentService from "../repositories/paymentRepository.js";

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

export async function recharge(data: { cardId: number; amount: number }) {
  await insert(data);
}
export async function findBusinessById(businessId: number) {
  const find = await findById(businessId);
  if (!find)
    throw { type: "NotFound", status: 404, message: "business not found" };
  return find;
}
export function verifyType(cardType: string, businessType: string) {
  if (cardType !== businessType) {
    throw {
      type: "NotFound",
      status: 401,
      message: "unauthorized purchase, card type invalid",
    };
  }
  return true;
}
export async function verifyEnoughBalance(cardId: number, amount: number) {
  const verifyBalance = await findByCardId(cardId);
  let amountBalance = verifyBalance.map((money) => {
    return money.amount;
  });
  const balance = amountBalance.reduce((contador: number, curr: any) => {
    return contador + curr;
  });
  if (balance < amount)
    throw { type: "unauthorized", status: 401, message: "insufficient funds" };
  return balance;
}
export async function insertPayment(payment: paymentService.PaymentInsertData) {
  await paymentService.insert(payment);
  return true;
}
export async function Amount(balanceMoney: any) {
  let amount = balanceMoney.map((money: any) => {
    return money.amount;
  });
  const balance = amount.reduce((contador: number, curr: any) => {
    return contador + curr;
  });
  return balance;
}
export async function Balance(cardId: number) {
  const verifyBalance = await findByCardId(cardId);
  return verifyBalance;
}
export async function Purchases(cardId: number) {
  const allPurchases = await paymentService.findByCardId(cardId);
  return allPurchases;
}
