# XPMatch

Tell XPMatch how you like to travel. It helps you choose relevant travelers' itineraries, contextual reviews and places, explains the tradeoffs, and turns your choices into a private trip board.

This repository holds the native mobile rebuild for iOS and Android. The earlier web prototype, [TayoAki/XPMatchv1](https://github.com/TayoAki/XPMatchv1), is a product reference only; no code is carried over from it.

**Status:** the MVP-1 plan (`docs/prds/XPMatch-MVP1-plan.md`, PRD revision v1.2) was approved on 2026-09-23. The project shell (S0.1) is in place; sign-in (slice 1) is next.

## Layout

| Path | What it is |
| --- | --- |
| `apps/mobile` | The Expo app (SDK 57, Expo Router, Uniwind, React Native Reusables) |
| `services/api` | The TypeScript API (Fastify), deployed to Railway |
| `packages/contracts` | Schemas shared by the app and the API |
| `packages/design-tokens` | Colors, accents and the contrast check; generates the app's `global.css` |
| `db` | PostgreSQL migrations and the migration runner |
| `docs` | The PRD, the approved plan and the design documents |

## Quick start

Needs Node 22 (`.nvmrc`) and, for database tests, a local PostgreSQL.

```bash
npm install
npm run check          # format, lint, typecheck, tests
npm run api:dev        # API on :3000 (needs DATABASE_URL)
npm run mobile:start   # Expo dev server
```

More detail: `db/README.md`, `services/api/README.md`, `apps/mobile/README.md`.
