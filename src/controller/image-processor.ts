import { Response, Request } from "express";
import { existsSync } from "fs";
import { doImageResize, imageResize } from "../utils/image-resizer";

export const imageProcessor = (req: Request, res: Response): void => {
  const { filename, height, width } = req.query;
  const isResizedImageExist: boolean = existsSync(
    `./images/resized-${filename as string}`
  );
  const isInputImageExist: boolean = existsSync(
    `./images/${filename as string}`
  );

  if (isResizedImageExist) {
    doImageResize(filename as string, Number(height), Number(width));
    res.send(`<div><img src=/images/resized-${filename as string}></div>`);
    return;
  }

  if (isInputImageExist) {
    imageResize(filename as string, Number(height), Number(width));
    res.write(`<div><img src=/images/resized-${filename as string}></div>`);
  } else {
    res.write(
      `<p>Please make sure image filename is correct or the image is exist in images directory.</p>`
    );
  }
  res.end();
};
