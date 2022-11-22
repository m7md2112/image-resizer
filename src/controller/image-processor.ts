import { Response, Request } from "express";

export const imageProcessor = (req: Request, res: Response) => {
  res.send(`<p>Now processing ${req.query.filename}</p>`);
  console.log(req.query);
};
