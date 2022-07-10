import Joi from "joi";

const bodySchema = Joi.object({
  type: Joi.string()
    .valid("groceries", "restaurant", "transport", "education", "health")
    .required(),
})
  .required()
  .options({ allowUnknown: false });
