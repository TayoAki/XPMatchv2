# API

Fastify on Node 22. Deployed to the Railway project `xpmatch-v2` (plan D-010, D-046).

## Endpoints

| Route | Purpose |
| --- | --- |
| `GET /health` | Liveness. Never touches the database |
| `GET /ready` | Readiness: the database answers and every shipped migration is applied. Railway's deploy healthcheck |
| `GET /v1/app-config` | Minimum app versions and update links, read by the app before sign-in |
| `GET /v1/probe/ws` | WebSocket echo for the D-010 check. Only when `ENABLE_WS_PROBE=true`; closes itself after 15 minutes |

Errors always have the shape `{ "error": { "code", "message", "requestId" } }`, and every response carries `x-request-id`.

## Environment

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | Yes | On Railway: `${{Postgres.DATABASE_URL}}` (private network) |
| `PORT`, `HOST` | No | Railway sets `PORT`. `HOST` defaults to `::`, falling back to IPv4 |
| `LOG_LEVEL` | No | `info` by default |
| `MIN_APP_VERSION_IOS`, `MIN_APP_VERSION_ANDROID` | No | `0.1.0` by default. Raise to block old builds |
| `UPDATE_URL_IOS`, `UPDATE_URL_ANDROID` | No | Where the update screen sends testers (TestFlight, Play testing) |
| `ENABLE_WS_PROBE` | No | `false` by default |
| `MIGRATIONS_DIR` | Image only | Set by the Dockerfile |

## Logging

Logs carry the method, route pattern, status and request ID. Bodies, query strings and credentials are never logged, because they can hold private user content (AGENTS.md).

## Railway service settings

Railway's `railway.json` config-as-code is deprecated for new services, so the `api` service is configured in Railway itself. Keep this table in step with it:

| Setting | Value |
| --- | --- |
| Source | GitHub `TayoAki/XPMatchv2`, branch `claude/jolly-volta-2fnh1l` until the S0.1 PR merges, then `main` |
| Root directory | `/` (the build needs `packages/` and `db/`) |
| Builder | Dockerfile at `services/api/Dockerfile` |
| Watch paths | `/services/api/**`, `/packages/contracts/**`, `/db/**`, `/package.json`, `/package-lock.json` |
| Pre-deploy command | `node services/api/dist/migrate.mjs up` |
| Healthcheck | `/ready`, 120-second timeout |
| Restart policy | On failure, 5 retries |
| Region | `sfo` (Railway's default). Revisit before inviting testers from the EU or UK (plan §12) |

Railway's Infrastructure as Code (`.railway/railway.ts`) can take these over once there is a project token for CI.

## Local run

```bash
export DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/xpmatch_dev
npm run db:migrate -- up
npm run api:dev
```

Build and run the production bundle the way the image does:

```bash
npm run build --workspace=@xpmatch/api
MIGRATIONS_DIR=$PWD/db/migrations node services/api/dist/server.mjs
```
