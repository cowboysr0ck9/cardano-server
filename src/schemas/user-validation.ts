import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.base": `username needs to be an alphanumeric string.`,
    "string.empty": `username needs to be a minimum of 3 characters.`,
    "string.min": `username needs to be a minimum of 3 characters.`,
    "string.max": `username needs to be a maximum of 30 characters.`,
    "any.required": `username is a required field.`,
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
  access_token: [Joi.string(), Joi.number()],
  birth_year: Joi.number()
    .integer()
    .min(new Date().getFullYear() - 120)
    .max(new Date().getFullYear()),
  email: Joi.string().email(),
});
