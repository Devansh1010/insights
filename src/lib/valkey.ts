import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.VALKEY_HOST,
  port: Number(process.env.VALKEY_PORT),
  // password: process.env.VALKEY_PASSWORD,
});