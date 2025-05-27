# ---- Base image with core dependencies ----
FROM node:23-alpine AS base
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# ---- Builder stage: install pnpm & turbo, prune app ----
FROM base AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm add -g turbo

WORKDIR /app
COPY . .
RUN turbo prune user --docker

# ---- Installer stage: install deps & build user app ----
FROM base AS installer
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY --from=builder /app/out/json/ ./
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ ./

# Run Prisma commands from db package
RUN pnpm --filter db run prisma:deploy
RUN pnpm --filter db run prisma:generate

RUN pnpm turbo build --filter=user...

# ---- Final runtime image for Heroku ----
FROM base AS runner
WORKDIR /app

COPY --from=installer /app/apps/user/.next/standalone ./
COPY --from=installer /app/apps/user/.next/static ./apps/user/.next/static
COPY --from=installer /app/apps/user/public ./apps/user/public

CMD ["node", "apps/user/server.js"]