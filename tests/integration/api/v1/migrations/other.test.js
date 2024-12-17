import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("PUT /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Checking endpoint security", async () => {
      const putRequest = await fetch(
        "http://localhost:3000/api/v1/migrations",
        {
          method: "PUT",
        },
      );

      expect(putRequest.status).toBe(405);
    });
  });
});
