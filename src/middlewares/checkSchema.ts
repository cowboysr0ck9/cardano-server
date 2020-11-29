import { NextFunction, Request, Response } from "express";
import { validationSchemas } from "../schemas";
import Joi from "joi";

/**
 * Global schema validator for all corresponding POST and PUT requests registered in the schemas folder.
 */
export const schemaValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * JOI Validation option overrides
   */
  const validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true, // remove unknown keys from the validated data
  };

  const route: string = req.route.path;
  const method: string = req.method.toLowerCase();
  const enabledMethods = ["post", "put"];

  const isValidSchemaMethod =
    enabledMethods.includes(method) && validationSchemas[route];

  if (isValidSchemaMethod) {
    const schema: Joi.ObjectSchema = validationSchemas[route];

    if (schema) {
      const validationResults = schema.validate(req.body, validationOptions);

      if (validationResults.errors || validationResults.error) {
        const genericError = {
          success: false,
          errors: [
            ...validationResults!.error!.details.map((err) => {
              return {
                field: err.context?.key,
                message: err.message.replace(/['"]/g, ""),
              };
            }),
          ],
        };
        return res.status(422).json(genericError);
      } else {
        req.body = validationResults.value;
        next();
      }
    }
  } else {
    next();
  }
};
