import { Migrator } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/postgresql";

export default defineConfig({
  dbName: "postgres",
  user: "postgres",
  password: "password",
  port: 1000,
  host: "localhost",
  entities: [],
  discovery: { warnWhenNoEntities: false },
  extensions: [Migrator],
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
  },
});
