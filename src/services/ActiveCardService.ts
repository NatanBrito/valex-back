import {
  CardUpdateData,
  findByCardDetails,
  update,
} from "../repositories/cardRepository.js";

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

export async function activeCardEmployee(id: number, card: CardUpdateData) {
  const xx = await update(id, card);
  return xx;
}
