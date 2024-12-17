import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous User", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        expect(response.status).toBe(201);

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThanOrEqual(0);
      });

      test("For the second time", async () => {
        const migrationsLeftToRun = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        const migrationsLeftToRunResult = await migrationsLeftToRun.json();

        expect(Array.isArray(migrationsLeftToRunResult)).toBe(true);
        expect(migrationsLeftToRunResult.length).toBe(0);
      });
    });
  });
});
