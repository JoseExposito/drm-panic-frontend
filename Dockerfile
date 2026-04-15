# Stage 1: Build the application
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env.example .env
RUN npm run build:production

# Stage 2: Serve static files with nginx
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080
