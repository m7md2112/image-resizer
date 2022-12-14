import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error-handler";
import { resizeImage } from "./api/resize-image";

dotenv.config();

export const app = express();
const port = process.env.PORT as string;

app.use("/images", express.static("images"));

app.get("/", (req, res: express.Response<string>) => {
  res.send("Ugliest image processing tool");
});

app.use("/api", resizeImage);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(errorHandler);
