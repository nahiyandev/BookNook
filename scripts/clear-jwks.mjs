/**
 * One-time script: drops the BetterAuth `jwks` collection so that
 * BetterAuth regenerates it with the current BETTER_AUTH_SECRET.
 *
 * Run ONCE after changing BETTER_AUTH_SECRET:
 *   node scripts/clear-jwks.mjs
 */
import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Read .env manually (dotenv not required — simple parse)
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const uri = env.MONGODB_URI || env.MONGO_URI;
if (!uri) {
  console.error("❌  MONGO_URI or MONGODB_URI not found in .env");
  process.exit(1);
}

const client = new MongoClient(uri);
try {
  await client.connect();
  const db = client.db(env.MONGODB_DB || "booknook");
  const collections = await db.listCollections({ name: "jwks" }).toArray();
  if (collections.length === 0) {
    console.log("ℹ️  No `jwks` collection found — nothing to clear.");
  } else {
    await db.collection("jwks").drop();
    console.log("✅  `jwks` collection dropped. BetterAuth will regenerate it on next request.");
  }
} finally {
  await client.close();
}
