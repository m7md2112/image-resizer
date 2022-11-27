import sharp from "sharp";

sharp.cache({ files: 0 }); // remove cached image

export async function imageResize(
  filename: string,
  width: number,
  height: number
): Promise<void> {
  await sharp(`./images/${filename}`)
    .resize(width, height)
    .toFile(`./images/resized-${width}x${height}-${filename}`)
    .catch(console.log);
}
