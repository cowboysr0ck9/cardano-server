import Joi from "joi";

export const firmSchema = Joi.object({
  name: Joi.string().min(2).max(30).lowercase().required(),
  code: Joi.string().min(3).max(3).lowercase().required(),
  system: Joi.string().lowercase().valid("pos"),
  description: Joi.string().lowercase().required(),
});
