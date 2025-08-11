FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY shared/package*.json ./shared/

# Install dependencies
RUN npm install

# Copy source code
COPY shared/ ./shared/
COPY frontend/ ./frontend/

# Build shared package
WORKDIR /app/shared
RUN npm run build

# Build frontend
WORKDIR /app/frontend
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/frontend/build /usr/share/nginx/html

# Copy nginx configuration
COPY frontend/nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]