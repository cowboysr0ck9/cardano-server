import express, { Request, Response } from "express";
import { toSuccessJSON } from "./constants";
import { schemaValidator } from "../middlewares/checkSchema";
import { Firm, IFirmDocument } from "../schemas/firm.model";
const router = express.Router();

export const firm = router.post(
  "/firm",
  schemaValidator,
  async (req: Request, res: Response) => {
    try {
      const firm = new Firm({
        name: req.body.name,
        code: req.body.code,
        system: req.body.system,
        description: req.body.description,
      });

      await firm.save((err, product) => {
        if (err) {
          console.log(err.errors);
          if (err.name === "MongoError" && err.code === 11000) {
            console.log(err);

            return res.status(400).json({
              success: false,
              errors: [
                {
                  field: "database_error",
                  message: `${Object.keys(err.keyValue)} must be unique`,
                },
              ],
            });
          } else {
            return res.status(400).json({
              success: false,
              errors: [
                {
                  field: "database_error",
                  message: `Failed to save to database.`,
                },
              ],
            });
          }
        } else {
          return res.status(201).json({ product });
        }
      });
    } catch (error) {
      // TODO: Handle errors in production manner via logger
      return res.status(400).json({
        success: false,
        errors: [
          {
            field: "database_error",
            message: `${error}`,
          },
        ],
      });
    }
  }
);

export const firmById = router.get(
  "/firm/:code",
  schemaValidator,
  async (req: Request, res: Response) => {
    try {
      const { code } = req.params;
      const firm = await Firm.findOne({
        code: { $regex: new RegExp(code, "i") },
      })
        .select(["-_id", "name", "code", "system", "description"])
        .exec();
      return res.status(200).json({ firm });
    } catch (error) {
      // TODO: Handle errors in production manner via logger
      console.log(error);
    }
  }
);

export const firms = router.get(
  "/firm",
  schemaValidator,
  async (req: Request, res: Response) => {
    try {
      const firm = await Firm.find().select([
        "-_id",
        "name",
        "code",
        "system",
        "description",
      ]);

      return res.status(200).json({ firm });
    } catch (error) {
      // TODO: Handle errors in production manner via logger
      console.log(error);
    }
  }
);

export const removeFirmById = router.delete(
  "/firm/:code",
  schemaValidator,
  async (req: Request, res: Response) => {
    try {
      const firm = await Firm.findOneAndRemove({
        code: { $regex: new RegExp(req.params.code, "i") },
      })
        .select(["-_id", "name", "code", "system", "description"])
        .exec();

      if (!firm) {
        return res.status(404).json({
          success: false,
          message: {
            field: "database_error",
            message: "A firm by this ID could not be found.",
          },
        });
      }
      return res.status(200).json({ success: true, firm });
    } catch (error) {
      // TODO: Handle errors in production manner via logger
      console.log(error);
    }
  }
);

export const firmRoutes = [firm, firms, firmById, removeFirmById];
