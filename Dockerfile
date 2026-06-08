# syntax=docker/dockerfile:1.7
# @bimo-dk/* packages are public on npmjs.com — no auth required.
FROM node:22-alpine AS builder
ARG REMOTE_NAME=__REMOTE_NAME__
ARG REMOTE_ROUTE=__REMOTE_ROUTE__
WORKDIR /app

COPY package*.json .npmrc ./
RUN npm install --no-audit --no-fund --legacy-peer-deps

COPY tsconfig*.json angular.json federation.config.js ./
COPY src ./src

# Substitute build-time names into source files so federation.config.js
# and the Angular CLI know the real REMOTE_NAME/REMOTE_ROUTE before the
# bundle is built. Without this the bundle exposes /dist/__REMOTE_NAME__
# which never matches the runtime container name.
RUN find . -not -path './node_modules/*' -type f \
    \( -name '*.ts' -o -name '*.html' -o -name '*.json' -o -name '*.conf' -o -name '*.js' \) \
    -exec sed -i "s/__REMOTE_NAME__/${REMOTE_NAME}/g" {} \; && \
    find . -not -path './node_modules/*' -type f \
    \( -name '*.ts' -o -name '*.html' \) \
    -exec sed -i "s/__REMOTE_ROUTE__/${REMOTE_ROUTE}/g" {} \; && \
    npm run build:prod

FROM nginx:alpine
ARG REMOTE_NAME=__REMOTE_NAME__
RUN apk add --no-cache wget gettext curl jq
COPY --from=builder /app/dist/${REMOTE_NAME}/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.d/40-runtime-config.sh /docker-entrypoint.d/40-runtime-config.sh
COPY docker-entrypoint.d/50-register-remote.sh /docker-entrypoint.d/50-register-remote.sh
RUN chmod +x /docker-entrypoint.d/40-runtime-config.sh /docker-entrypoint.d/50-register-remote.sh
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1/health || exit 1
CMD ["nginx", "-g", "daemon off;"]
