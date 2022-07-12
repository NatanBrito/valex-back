import Joi from "joi";

export const BlockUnlockCardSchema = Joi.object({
  cardId: Joi.number().required(),
  password: Joi.string()
    .regex(/^[0-9]{4}$/)
    .required(),
});
