import Joi from "joi";

export const bodySchema = Joi.object({
  type: Joi.string()
    .valid("groceries", "restaurant", "transport", "education", "health")
    .required(),
});
