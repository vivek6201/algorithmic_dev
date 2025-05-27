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

# Build the 'admin' application.
# Next.js will generate the 'standalone' output in apps/admin/.next/standalone
# Ensure your next.config.js for the admin app has `output: 'standalone'`.
RUN pnpm turbo build --filter=admin...

# Stage 2: Production Image for Heroku
# Use a smaller base image for the final production image.
# The 'standalone' output contains its own node_modules.
FROM node:23-alpine AS runner

# Set working directory to the root of the standalone application
WORKDIR /app

# Copy the standalone output for the admin app.
# The `standalone` directory contains the server.js, a minimal node_modules,
# and other necessary build artifacts.
COPY --from=builder /app/apps/admin/.next/standalone ./

# Copy the public assets for the admin app.
# These are served statically by Next.js.
COPY --from=builder /app/apps/admin/public ./public

# Set the PORT environment variable required by Heroku.
# Next.js standalone server will listen on this port.
ENV PORT=${PORT:-3001}

# Expose the port the app will run on
EXPOSE 3001

# Command to run the Next.js admin app in production mode.
# The 'server.js' is the entry point for the standalone output.
CMD ["node", "server.js"]
