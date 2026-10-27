FROM node:22.23.4-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --if-present && npm prune --omit=dev

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]