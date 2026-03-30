# `migrator.up()` deadlocks when called with an external transaction

Calling `migrator.up({ transaction })` with `snapshot: true` (the default) deadlocks on PostgreSQL. The test pre-creates a table, then runs a migration that alters it inside an external transaction. `migrator.up()` never returns.

## Repro

1. `docker compose up`
2. `npm install && npm test`

Test hangs (jest times out at 30s).
