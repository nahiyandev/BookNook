/**
 * BookNook central config — ONE place for every dynamic value.
 *
 * Rule for the whole project (all sections from now on):
 *   - NO hardcoded backend URL, API base URL, or other dynamic value in any
 *     page, component, or API helper. Import it from here instead.
 *   - To change the backend, change ONE value in .env.local (local) or in
 *     Vercel Environment Variables (live) — never search-and-replace code.
 *
 * Why NEXT_PUBLIC_? In Next.js, only env vars starting with NEXT_PUBLIC_
 * reach the browser (Client Components). The backend API URL is NOT a secret
 * — it is a public address — so it is safe and necessary to expose it this way.
 *
 * SECURITY — do NOT apply this prefix to real secrets:
 *   MONGODB_URI, BETTER_AUTH_SECRET, GOOGLE_CLIENT_SECRET must stay
 *   server-only (no NEXT_PUBLIC_). If you prefix them, Next.js will bake
 *   them into the browser bundle and anyone can read them. Those vars are
 *   only read in server files (lib/db.ts, lib/auth.ts) — never in this file.
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/** Site name, used in titles/metadata if a page needs it dynamically. */
export const SITE_NAME = "BookNook";
