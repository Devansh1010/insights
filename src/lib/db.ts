import mongoose from 'mongoose'
import { sleep } from './wait';


const MAX_RETRIES = 5
const INITIAL_DELAY = 2000

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  }
}

export async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI || '';

  if (!MONGODB_URI) {
    throw new Error('Please define mongodb uri on the env file.')
  }

  if (cached.conn) {
    return cached.conn
  }

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      if (!cached.promise) {
        cached.promise =
          mongoose
            .connect(MONGODB_URI)
            .then(() => mongoose.connection)
      }

      cached.conn = await cached.promise
      console.log('DB Connected')
      return cached.conn

    } catch (error: unknown) {

      cached.promise = null
      console.log(`Attempt ${i + 1} failed: ${error}`);

      if (i === MAX_RETRIES - 1) {
        throw new Error("Max database connection retries reached.");
      }

      await sleep((INITIAL_DELAY * (i + 1)))
    }
  }
}