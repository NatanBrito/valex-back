import Joi from "joi";

export const bodySchema = Joi.object({
  numberCard: Joi.string().required(),
  cvc: Joi.string().length(3).required(),
  password: Joi.string().length(4).required(),
});
// TODO: fazer o regex do numberCard
