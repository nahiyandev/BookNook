import { MongoClient, type Db } from "mongodb";

/**
 * BookNook MongoDB connection — Section 2 (Authentication).
 *
 * Why a cached client? In Next.js dev mode, modules reload on every edit.
 * Without caching, every reload would open a NEW MongoDB connection until
 * Atlas refuses more connections. The global cache keeps ONE client.
 *
 * Env vars (see env.example — values are NEVER written in code):
 *   MONGO_URI or MONGODB_URI — Atlas connection string
 *   MONGODB_DB  — database name, e.g. "booknook" (default if not set)
 */
const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI or MONGODB_URI is not set. See env.example.");
}

declare global {
  var _booknookMongoClient: MongoClient | undefined;
}

const client =
  globalThis._booknookMongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalThis._booknookMongoClient = client;
}

export const db: Db = client.db(process.env.MONGODB_DB || "booknook");
export default client;
