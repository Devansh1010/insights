# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI
RUN npm run build

# Serve Stage
FROM node:20-alpine AS runner
WORKDIR /app

# Only copy what is absolutely necessary for production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./ 

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]