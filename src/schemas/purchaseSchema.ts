import Joi from "joi";

export const purchaseCardSchema = Joi.object({
  cardId: Joi.number().required(),
  amount: Joi.number().min(1).required(),
  password: Joi.string()
    .regex(/^[0-9]{4}$/)
    .required(),
  businessId: Joi.number().required(),
});
