import sharp from "sharp";

sharp.cache({ files: 0 }); // remove cached image

export function imageResize(
  filename: string,
  width: number,
  height: number
): void {
  sharp(`./images/${filename}`)
    .resize(width, height)
    .toFile(`./images/resized-${width}x${height}-${filename}`)
    .catch(console.log);
}
