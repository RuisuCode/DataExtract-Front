# syntax=docker/dockerfile:1

# Build stage: install dependencies and compile the Vite/React app
FROM node:18-alpine AS build
WORKDIR /app

# copy package files first to leverage layer caching
COPY package.json package-lock.json ./

# install everything (dev deps required for building)
RUN npm ci

# copy source and run build
COPY . .
RUN npm run build

# Runtime stage: serve the static assets with a lightweight server
FROM node:18-alpine AS release
WORKDIR /app

# install serve globally for runtime
RUN npm install -g serve

# copy built output from build stage
COPY --from=build /app/dist ./dist

# environment variable for port with default
ENV PORT=3000
EXPOSE 3000

# start the server using serve, allowing custom port via PORT
CMD ["serve", "-s", "dist", "-l", "${PORT}"]
