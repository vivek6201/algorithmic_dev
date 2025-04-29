# Base image
FROM node:lts-slim AS base
WORKDIR /app

# Install dependencies only
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile  # Install only production dependencies

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . . 
RUN corepack enable && pnpm run build  # Build the app using Next.js

# Final image for production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --prod --frozen-lockfile  # Install only production dependencies

# Generate Prisma client in production
RUN pnpm prisma:deploy
RUN pnpm prisma:prod

# Copy built app
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static 
COPY public ./public 
# Expose port and run the app
EXPOSE 3000

CMD ["node", "server.js"]  