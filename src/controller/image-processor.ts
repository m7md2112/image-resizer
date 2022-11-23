import { Response, Request } from "express";
import sharp from "sharp";
import * as fs from "fs";

sharp.cache({ files: 0 }); // remove cached image

export const imageProcessor = (req: Request, res: Response): void => {
  const { filename, height, width } = req.query;
  const isOriginalImageExist: boolean = fs.existsSync("./images/image.jpg");
  const isNewImageExist: boolean = fs.existsSync("./images/newImage.jpg");

  function resizing(): void {
    res.write(`<p>Now processing ${filename as string}</p>`);
    sharp(`./images/${filename as string}`)
      .resize(Number(width), Number(height))
      .toFile("./images/" + "newImage.jpg")
      .then(() => res.write(`<p> <img src=/images/newImage.jpg> </p>`))
      .catch((e) => res.write(`<p>Warning 1 ${JSON.stringify(e)}</p>`));
      res.end()
  }

  function readMetaData(): void {
    sharp("./images/newImage.jpg")
      .metadata()
      .then((imageData) => {
        if (
          Number(imageData.width) !== Number(width) ||
          Number(imageData.height) !== Number(height)
        ) {
          resizing();
        }
      })
      .catch((e) =>{ 
        res.write(`<p>Warning 2 ${JSON.stringify(e)}</p>`)
        res.end()
        console.log(e)});
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
