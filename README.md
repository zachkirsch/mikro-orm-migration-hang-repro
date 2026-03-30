# `migrator.up()` deadlocks when called with an external transaction

## Github issue: https://github.com/mikro-orm/mikro-orm/issues/7424

Calling `migrator.up({ transaction })` with `snapshot: true` (the default) deadlocks on PostgreSQL. The test pre-creates a table, then runs a migration that alters it inside an external transaction. `migrator.up()` never returns.

## Repro

Test file: [src/repro.test.ts](src/repro.test.ts).

1. `docker compose up`
2. `npm install && npm test`

Test hangs (jest times out at 30s).
