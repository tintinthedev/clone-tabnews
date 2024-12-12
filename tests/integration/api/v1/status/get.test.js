import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.updated_at).not.toBeNull();

  const parsedBodyUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(parsedBodyUpdatedAt).toEqual(responseBody.updated_at);

  const { version, max_connections, opened_connections } =
    responseBody.dependencies.database;
  expect(version).toBe("16.0");

  expect(max_connections).toBeDefined();
  expect(Number.isInteger(max_connections)).toBe(true);
  expect(max_connections).toBeGreaterThanOrEqual(0);

  expect(opened_connections).toBe(1);
});
