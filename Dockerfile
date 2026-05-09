FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package*.json ./

RUN pnpm install --ignore-scripts

COPY . .

EXPOSE 8080

CMD [ "pnpm", "run", "dev" ]

