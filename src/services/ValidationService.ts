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
