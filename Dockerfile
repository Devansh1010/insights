FROM node:22-alpine

RUN apk add --no-cache libc6-compat

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-lock.yaml package*.json ./

RUN pnpm install --frozen-lockfile --only-allow-defined-scripts

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD [ "pnpm", "start"]

