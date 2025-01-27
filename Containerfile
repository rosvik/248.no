FROM node:22-alpine AS builder

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:22-alpine
ARG COMMIT_HASH
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

ENV NODE_ENV=production
ENV COMMIT_HASH=$COMMIT_HASH
ENV PORT=2330

EXPOSE 2330
CMD [ "node", "build" ]
