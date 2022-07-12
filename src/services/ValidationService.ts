import dayjs from "dayjs";
import Cryptr from "cryptr";

import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";

export async function verifyApiKey(apiKey: string) {
  const verifyApiKey = await findByApiKey(apiKey);
  if (!verifyApiKey)
    throw { type: "NOTFOUND", status: 404, message: " notFound company" };
  return verifyApiKey;
}
export async function ValidateExistEmployee(id: number) {
  const verify = await findById(id);
  if (!verify)
    throw {
      type: "NOTFOUND",
      status: 404,
      message: " not found employee register",
    };
  return verify;
}
export function ValidateExpireDate(cardDate: string) {
  const dateNow = dayjs().format("MM-YY");
  if (!(cardDate > dateNow)) {
    throw { type: "unauthorized", status: 401, message: "card expirate" };
  }
  return true;
}
export function descrypted(encrypt: string) {
  const cryptr = new Cryptr(process.env.ENCRYPT);
  const decryptedString = cryptr.decrypt(encrypt);
  return decryptedString;
}
export function encrypt(arg: string) {
  const cryptr = new Cryptr(process.env.ENCRYPT);
  const encryptedString = cryptr.encrypt(arg);
  return encryptedString;
}
