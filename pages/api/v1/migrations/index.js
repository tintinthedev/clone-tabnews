import database from "infra/database";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];

  if (!allowedMethods.includes(request.method)) {
    return response.status(405).end();
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const defaultMigrationConfig = {
      dryRun: true,
      verbose: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
      dbClient,
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationConfig);

      await dbClient.end();

      response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationConfig,
        dryRun: false,
      });

      await dbClient.end();

      response
        .status(migrations.length > 0 ? 201 : 200)
        .json(migratedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
