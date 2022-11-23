import supertest from "supertest";
import { app } from "../server";

const appServer = supertest(app);

describe("endpoint: /api/resize-image", (): void => {
  it("gets chunked response", async (): Promise<void> => {
    const response: supertest.Response = await appServer.get(
      "/api/resize-image?filename=image.jpg&height=200&width=350"
    );
    expect(response.header["transfer-encoding"]).toBe("chunked");
  });
});

describe("endpoint: /", (): void => {
  it("gets /", async (): Promise<void> => {
    const response: supertest.Response = await appServer.get("/");
    expect(response.status).toBe(200);
  });
});
