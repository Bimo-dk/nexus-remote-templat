FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund --legacy-peer-deps
COPY tsconfig*.json angular.json federation.config.js federation.config.json ./
COPY src ./src
RUN npm run build:prod

FROM nginx:alpine
RUN apk add --no-cache wget
COPY --from=builder /app/dist/__REMOTE_NAME__/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://localhost/health || exit 1
CMD ["nginx", "-g", "daemon off;"]
