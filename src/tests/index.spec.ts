import { existsSync } from "fs";
import supertest from "supertest";
import { app } from "../server";
import { imageResize } from "../utils/image-resizer";

const appServer = supertest(app);

describe("endpoint: /", (): void => {
  it("gets /", async (): Promise<void> => {
    const response: supertest.Response = await appServer.get("/");
    expect(response.status).toBe(200);
  });
});

/**
 * to make this test successfully make sure there are image with name test-image.jpg inside images directory.
 * the test will resize the image and verify that resized image are exist.
 */
describe("image-resizer utility", (): void => {
  it("resize test-image.jpg successfully", async () => {
    await imageResize(`test-image.jpg`, 5000, 3000);
    expect(existsSync("./images/resized-5000x3000-test-image.jpg")).toBe(true);
  });
});
