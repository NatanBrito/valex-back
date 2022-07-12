import Joi from "joi";
export var rechargeCardSchema = Joi.object({
    cardId: Joi.number().required(),
    amount: Joi.number().min(1).required()
});
