# Stage 1: Dependency Installation and Project Build
# We use a full Node.js image for building as it has all necessary tools.
FROM node:23-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy Turborepo package.json and pnpm-lock.yaml (or yarn.lock/package-lock.json)
# This allows caching of dependencies if they don't change.
COPY package.json pnpm-lock.yaml ./
# Copy package.json for all apps and packages to ensure pnpm can resolve dependencies
COPY apps/admin/package.json apps/admin/
COPY apps/user/package.json apps/user/
COPY packages/ui/package.json packages/ui/
COPY packages/shared/package.json packages/shared/
COPY packages/db/package.json packages/db/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json packages/eslint-config/

# Install pnpm (if not already installed in base image)
RUN npm install -g pnpm

# Install all dependencies for the monorepo
RUN pnpm install --frozen-lockfile

# Copy the entire Turborepo project source code
COPY . .

# Build the 'user' application.
# Next.js will generate the 'standalone' output in apps/user/.next/standalone
# Ensure your next.config.js for the user app has `output: 'standalone'`.
RUN pnpm turbo build --filter=user...

# Stage 2: Production Image for Droplet/Docker
# Use a smaller base image for the final production image.
# The 'standalone' output contains its own node_modules.
FROM node:23-alpine AS runner

# Set working directory to the root of the standalone application
WORKDIR /app

# Copy the standalone output for the user app.
# The `standalone` directory contains the server.js, a minimal node_modules,
# and other necessary build artifacts.
COPY --from=builder /app/apps/user/.next/standalone ./

# Copy the public assets for the user app.
# These are served statically by Next.js.
COPY --from=builder /app/apps/user/public ./public


# Expose the port the app will run on.
# You'll map this port when running the Docker container (e.g., -p 3001:3001).
EXPOSE 3001

# Command to run the Next.js user app in production mode.
# The 'server.js' is the entry point for the standalone output.
CMD ["node", "server.js"]
