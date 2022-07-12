import Joi from "joi";
export var bodySchema = Joi.object({
    type: Joi.string()
        .valid("groceries", "restaurant", "transport", "education", "health")
        .required(),
    id: Joi.number().required(),
    name: Joi.string().required()
});
