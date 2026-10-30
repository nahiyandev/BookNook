import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "../../../../lib/auth";

/**
 * BookNook auth API — Section 2 (Authentication).
 * This ONE catch-all route serves every BetterAuth endpoint:
 * /api/auth/sign-in/email, /api/auth/sign-up/email,
 * /api/auth/sign-in/google, /api/auth/callback/google, /api/auth/token, …
 * No hand-written login/register API routes are needed — BetterAuth owns them.
 * If the installed better-auth version renames this helper, check its docs
 * for the current Next.js App Router handler export and use that instead.
 */
export const { GET, POST } = toNextJsHandler(auth);
