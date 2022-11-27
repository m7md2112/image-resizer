import { Response, Request } from "express";
import { existsSync } from "fs";
import { imageResize } from "../utils/image-resizer";

export const imageProcessor = (req: Request, res: Response): void => {
  const { filename, width, height } = req.query;

  const isInputImageExist: boolean = existsSync(
    `./images/${filename as string}`
  );

  const isResizedImageExist: boolean = existsSync(
    `./images/resized-${Number(width)}x${Number(height)}-${filename as string}`
  );

  if (isInputImageExist && !isResizedImageExist) {
    imageResize(filename as string, Number(width), Number(height)).catch(
      console.log
    );
  } else if (!isInputImageExist) {
    res.write(
      `<p>Please make sure image filename is correct or the image is exist in images directory.</p>`
    );
    return;
  }

  res.write(
    `<div><img src=/images/resized-${Number(width)}x${Number(height)}-${
      filename as string
    }></div>`
  );
  res.end();
};
