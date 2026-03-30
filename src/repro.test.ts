import { MikroORM } from "@mikro-orm/postgresql";
import config from "./mikro-orm.config";

let orm: MikroORM;

beforeAll(async () => {
  orm = await MikroORM.init(config);
  const conn = orm.em.getConnection();

  await conn.execute(`drop table if exists "mikro_orm_migrations" cascade`);
  await conn.execute(`drop table if exists "user" cascade`);
  await conn.execute(
    `create table "user" ("id" serial primary key, "name" varchar(255) not null)`,
  );
});

afterAll(async () => {
  await orm?.close(true);
});

test("migrator.up() with external transaction hangs", async () => {
  const em = orm.em.fork();

  await em.begin();
  try {
    await orm.migrator.up({
      migrations: ["Migration20250101000000_AddEmailToUser"],
      transaction: em.getTransactionContext(),
    });
    await em.commit();
  } catch (e) {
    await em.rollback();
    throw e;
  }
});
