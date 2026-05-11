# Build Stage
FROM node:26-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI
RUN npm run build

# Serve Stage (Using Node instead of Nginx)
FROM node:26-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]