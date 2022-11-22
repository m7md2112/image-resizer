import { Router } from "express";
import { imageDataValidator } from "../middleware/image-data-validator";
import { imageProcessor } from "../controller/image-processor";

const router = Router();

export const resizeImage = router.get(
  "/resize-image",
  imageDataValidator,
  imageProcessor
);
