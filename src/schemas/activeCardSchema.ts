import joiNormal from "joi";
import joiDate from "@joi/date";

const Joi = joiNormal.extend(joiDate);
// const Joi = require("joi").extend(require("@joi/date"));
export const ActiveCardSchema = Joi.object({
  cardNumber: Joi.string().required(),
  CardHolderName: Joi.string().required(),
  expirateDate: Joi.date().format("MM-YY"),
  cvc: Joi.string().length(3).required(),
  password: Joi.string().length(4).required(),
});
// TODO: fazer o regex do numberCard
