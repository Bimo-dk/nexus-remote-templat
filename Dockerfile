# syntax=docker/dockerfile:1.7
# @bimo-dk/* packages are public on npmjs.com — no auth required.
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json .npmrc ./
RUN npm install --no-audit --no-fund --legacy-peer-deps

COPY tsconfig*.json angular.json federation.config.js ./
COPY src ./src
RUN npm run build:prod

FROM nginx:alpine
RUN apk add --no-cache wget gettext
COPY --from=builder /app/dist/__REMOTE_NAME__/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.d/40-runtime-config.sh /docker-entrypoint.d/40-runtime-config.sh
RUN chmod +x /docker-entrypoint.d/40-runtime-config.sh
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://127.0.0.1/health || exit 1
CMD ["nginx", "-g", "daemon off;"]
