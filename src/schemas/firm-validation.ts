import Joi from "joi";

export const firmSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  code: Joi.string().min(3).max(3).required(),
  accounting_system: Joi.string().lowercase().valid("acme"),
  description: Joi.string().required(),
});
