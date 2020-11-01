import { Request, Response } from "express";

export const GLOBAL_API_META = {
  company: "EadsGraphic",
  license: "MIT",
  authors: ["Tyler Eads"],
};

export const toSuccessJSON = (status = 200, req: Request, res: Response) => {
  return res.status(status).json({
    success: true,
    data: { ...req.body },
  });
};

export const toFailureJSON = (
  status = 400,
  errors: Record<string, string>,
  res: Response
) => {
  res.status(status).json({
    success: false,
    errors,
  });
};
