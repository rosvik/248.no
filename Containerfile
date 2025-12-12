FROM node:22-alpine AS base
ARG COMMIT_HASH
ENV COMMIT_HASH=$COMMIT_HASH
ENV NODE_ENV=production
ENV CI=true
WORKDIR /app

FROM base AS build
RUN corepack enable
COPY . ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=build /app/build build/
COPY --from=build /app/node_modules node_modules/
ENV PORT=2330
EXPOSE 2330
CMD [ "node", "build" ]
