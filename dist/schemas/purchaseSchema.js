import Joi from "joi";
export var purchaseCardSchema = Joi.object({
    cardId: Joi.number().required(),
    amount: Joi.number().min(1).required(),
    businessId: Joi.number().required(),
    password: Joi.string()
        .regex(/^[0-9]{4}$/)
        .required()
});
