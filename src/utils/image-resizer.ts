import sharp from "sharp";

sharp.cache({ files: 0 }); // remove cached image

export function imageResize(
  filename: string,
  height: number,
  width: number
): void {
  sharp(`./images/${filename}`)
    .resize(width, height)
    .toFile(`./images/resized-${filename}`)
    .catch(console.log);
}

export function doImageResize(
  filename: string,
  height: number,
  width: number
): void {
  sharp(`./images/resized-${filename}`)
    .metadata()
    .then((imageData) => {
      if (imageData.width !== width || imageData.height !== height) {
        imageResize(filename, height, width);
      }
    })
    .catch(console.log);
}
