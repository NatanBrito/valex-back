import Joi from "joi";

export const rechargeCardSchema = Joi.object({
  cardId: Joi.number().required(),
  amount: Joi.number().min(1).required(),
});
