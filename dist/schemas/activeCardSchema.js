import joiNormal from "joi";
import joiDate from "@joi/date";
var Joi = joiNormal.extend(joiDate);
export var ActiveCardSchema = Joi.object({
    cardNumber: Joi.string()
        .regex(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{2}$/)
        .required(),
    CardHolderName: Joi.string().required(),
    expirateDate: Joi.date().format("MM-YY"),
    cvc: Joi.string().length(3).required(),
    password: Joi.string()
        .regex(/^[0-9]{4}$/)
        .required()
});
