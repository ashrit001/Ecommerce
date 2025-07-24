import request from "supertest";
import app from "../../server.js";

describe("Auth API with Atlas", () => {
  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        email: "test@example.com",
        phoneNumber: "1234567890",  // ✅ Added
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Success");
  });

  it("should login a user", async () => {
    // First register a user
    await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        email: "login@test.com",
        phoneNumber: "1234567890",  // ✅ Added
        password: "password123"
      });

    // Then login
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });
});
