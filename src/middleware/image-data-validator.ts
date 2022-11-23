import { Request, Response, NextFunction } from "express";

export const imageDataValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { filename, height, width } = req.query;
  if ((filename as string) && Number(height) && Number(width)) {
    next();
  } else {
    res.send(`<p>Please provide image filename, height and width</p>`);
  }
};
