# Build stage — bun installs from the lockfile, then compiles the static bundle.
FROM oven/bun:1.3-alpine AS build

WORKDIR /app

# Dependencies first, so a source-only change reuses the installed layer.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Serve stage — nginx over the static output.
FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
