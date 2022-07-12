import Joi from "joi";
export var BlockUnlockCardSchema = Joi.object({
    cardId: Joi.number().required(),
    password: Joi.string()
        .regex(/^[0-9]{4}$/)
        .required()
});
