import { Response, Request } from "express";
import sharp from "sharp";
import * as fs from "fs";

sharp.cache({ files: 0 }); //remove cached image

export const imageProcessor = (req: Request, res: Response) => {
  const { filename, height, width } = req.query;
  let isOriginalImageExist = fs.existsSync("./images/image.jpg");
  let isNewImageExist = fs.existsSync("./images/newImage.jpg");

  function resizing() {
    res.write(`<p>Now processing ${filename}</p>`);
    sharp(("./images/" + filename) as string)
      .resize(Number(width), Number(height))
      .toFile("./images/" + "newImage.jpg")
      .then(() => res.write(`<p> <img src=/images/newImage.jpg> </p>`))
      .catch((e) => res.write(`<p>Warning 1 ${JSON.stringify(e)}</p>`));
  }

  function readMetaData() {
    sharp("./images/newImage.jpg")
      .metadata()
      .then((imageData) => {
        if (
          Number(imageData.width) !== Number(width) ||
          Number(imageData.height) !== Number(height)
        ) {
          resizing();
        }
      });
  }

  if (!isOriginalImageExist) {
    res.write(`<p>Warning: please put image.jpg in images directory</p>`);
    res.end();
    return;
  }

  if (isOriginalImageExist && !isNewImageExist) {
    resizing();
    res.write(`<p> <img src=/images/newImage.jpg> </p>`);
    res.end();
  } else {
    readMetaData();
    res.write(`<p> <img src=/images/newImage.jpg> </p>`);
    res.end();
  }
};
