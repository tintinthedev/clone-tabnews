import database from "infra/database";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();

  const defaultMigrationConfig = {
    dryRun: true,
    verbose: true,
    dir: join("infra", "migrations"),
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

    response.status(migrations.length > 0 ? 201 : 200).json(migratedMigrations);
  }

  response.status(405).end();
}
