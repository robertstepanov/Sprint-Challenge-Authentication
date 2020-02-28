const request = require("supertest");

const server = require("../api/server");

describe("router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("POST /api/auth/register", function() {
    it("should return 200 OK", function() {
      return request(server)
        .post("/api/auth/register")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("should return users as value", function() {
      return request(server)
        .get("/api/users")
        .then(res => {
          expect(Array.isArray(res.body)).toBe(false);
        });
    });
  });
});
