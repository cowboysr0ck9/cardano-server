import express, { Request, Response } from "express";
import { toSuccessJSON } from "./constants";
import { schemaValidator } from "../middlewares/SchemaValidator";

const router = express.Router();

export const firm = router.post(
  "/firm",
  schemaValidator,
  async (req: Request, res: Response) => {
    try {
      return toSuccessJSON(200, req, res);
    } catch (error) {
      // TODO: Handle errors in production manner via logger
      console.log(error);
    }
  }
);

export const user = router.post(
  "/user",
  schemaValidator,
  async (req: Request, res: Response) => {
    try {
      return toSuccessJSON(200, req, res);
    } catch (error) {
      // TODO: Handle errors in production manner via logger
      console.log(error);
    }
  }
);
