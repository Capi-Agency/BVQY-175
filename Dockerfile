# ---------- Build ----------
FROM node:22.23.4-bookworm-slim AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_FILES_URL
ARG NEXT_PUBLIC_ASSETS_URL
ARG DIRECTUS_STATIC_TOKEN
ARG ASSETS_DOMAIN
ARG SITE_URL
ARG DOMAIN

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_FILES_URL=$NEXT_PUBLIC_FILES_URL \
    NEXT_PUBLIC_ASSETS_URL=$NEXT_PUBLIC_ASSETS_URL \
    DIRECTUS_STATIC_TOKEN=$DIRECTUS_STATIC_TOKEN \
    ASSETS_DOMAIN=$ASSETS_DOMAIN \
    SITE_URL=$SITE_URL \
    DOMAIN=$DOMAIN

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build && npm prune --omit=dev

# ---------- Runtime ----------
FROM node:22.23.4-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

EXPOSE 80
CMD ["npm", "start"]