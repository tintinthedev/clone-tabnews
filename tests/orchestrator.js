import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    await retry(fetchStatusRoute, {
      retries: 100,
      maxTimeout: 5000,
      minTimeout: 100,
    });

    async function fetchStatusRoute() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) throw Error();
    }
  }
}

export default {
  waitForAllServices,
};
