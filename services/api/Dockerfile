# The API image. Build context: the repository root (Railway's default).
#   docker build -f services/api/Dockerfile .
ARG NODE_VERSION=22.22.2

# Every workspace's manifest is needed for `npm ci` to accept the lockfile;
# only the API's dependency tree is installed.
FROM node:${NODE_VERSION}-bookworm-slim AS manifests
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/mobile/package.json apps/mobile/
COPY packages/contracts/package.json packages/contracts/
COPY packages/design-tokens/package.json packages/design-tokens/
COPY db/package.json db/
COPY services/api/package.json services/api/

FROM manifests AS build
RUN npm ci --workspace=@xpmatch/api --include-workspace-root=false --ignore-scripts --no-audit --no-fund
COPY tsconfig.base.json ./
COPY packages/contracts packages/contracts
COPY db db
COPY services/api services/api
RUN npm run build --workspace=@xpmatch/api

FROM manifests AS prod-deps
RUN npm ci --workspace=@xpmatch/api --include-workspace-root=false --omit=dev --ignore-scripts --no-audit --no-fund

FROM node:${NODE_VERSION}-bookworm-slim
ENV NODE_ENV=production \
    MIGRATIONS_DIR=/app/db/migrations
WORKDIR /app
COPY --from=prod-deps /app/node_modules node_modules
COPY --from=build /app/services/api/dist services/api/dist
COPY db/migrations db/migrations
USER node
CMD ["node", "services/api/dist/server.mjs"]
