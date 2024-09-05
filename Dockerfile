# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy necessary files from builder stage
COPY --from=builder /app/next.config.mjs ./


COPY --from=builder /app/.next/static ./.next/static

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "server.js"]