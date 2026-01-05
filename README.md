# Bun Hono for gmi

## Stacks

- Bun as JavaScript Runtime
- Hono as backend framework
- Vite as builder for React frontend: bun create vite
- Tanstack as Meta Framework
- Postgres running in docker locally
- [Drizzle as ORM](https://orm.drizzle.team/docs/get-started/postgresql-new)
  - no need to install dotenv and tsx, because bun can read .env and compile ts natively
  - [use drizzle seed to seed the db for development](https://orm.drizzle.team/docs/seed-overview#drizzle-seed)

## Commands

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run server
bun run client
bun run db:up
```

Manually connect to db in the docker locally

```sh
psql -h localhost -p 5432 -U postgres honogmi
```
