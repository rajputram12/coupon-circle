import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/couponclub';

let cached = global.mongoose as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDb() {
  if (cached?.conn) return cached.conn;
  if (!cached?.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, { dbName: process.env.MONGODB_DB || 'couponclub' });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}
