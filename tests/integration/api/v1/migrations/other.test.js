import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("/api/v1/migrations should return 405 for methods that are not GET or POST", async () => {
  const putRequest = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });

  expect(putRequest.status).toBe(405);
});
