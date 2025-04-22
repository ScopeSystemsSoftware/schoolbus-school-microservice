FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY src/backend/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src/backend/src ./src

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY src/backend/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built app from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the app
CMD ["node", "dist/main"] 