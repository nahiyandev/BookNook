import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { db } from "./db";

/**
 * BookNook auth configuration — Section 2 (Authentication).
 *
 * - Database: MongoDB Adapter. BetterAuth stores users, sessions and
 *   accounts in MongoDB (the same database the books/borrows collections
 *   will live in later). No separate auth database, no Prisma/Drizzle.
 * - Email + password: enabled. `autoSignIn: false` is deliberate and
 *   important for the spec: after Register, the user must go to the Login
 *   page (not straight into the app). With autoSignIn off, sign-up does
 *   NOT create a logged-in session, so the Register → Login flow is clean.
 * - Google: the ONLY social provider (spec). No GitHub/Facebook/etc.
 * - Email verification: NOT enabled, on purpose. The spec says: do not
 *   implement email verification or the forget-password method, because it
 *   would inconvenience the examiner. It may be added only AFTER the result.
 * - JWT plugin: enabled so the client can later fetch a JWT
 *   (authClient.token()) and send it to the Express backend, which will
 *   verify it. The JWT is for the EXTERNAL backend API — it does not replace
 *   BetterAuth's own session cookie for Next.js pages.
 *
 * Secrets come from env only: BETTER_AUTH_SECRET, BETTER_AUTH_URL,
 * GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET. Never paste them in code or chat.
 */
export const auth = betterAuth({
  database: mongodbAdapter(db),
  trustedOrigins: [
    "http://localhost:3000",
    "https://booknook-lovat.vercel.app",
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [jwt()],
});
