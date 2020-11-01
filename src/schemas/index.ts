// ...

import Joi from "joi";
import { firmSchema } from "./firm-validation";
import { userSchema } from "./user-validation";

/**
 * Global List of Route Validation
 */
export const validationSchemas: Record<string, Joi.ObjectSchema> = {
  "/firm": firmSchema,
  "/user": userSchema,
};
