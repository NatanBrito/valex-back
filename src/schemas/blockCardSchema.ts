import Joi from "joi";

export const BlockCardSchema = Joi.object({
  cardId: Joi.number().required(),
  password: Joi.string()
    .regex(/^[0-9]{4}$/)
    .required(),
});
