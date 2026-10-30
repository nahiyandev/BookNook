import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

/**
 * BookNook auth client — Section 2 (Authentication).
 * Used by every Client Component that needs auth: Navbar (useSession),
 * Login/Register pages (signIn/signUp/signOut), and later, API calls.
 *
 * jwtClient() is what adds authClient.token() — the method that returns a
 * JWT for the Express backend. Without this plugin, token() does not exist.
 * The JWT is short-lived (15 minutes in BetterAuth's JWT plugin), so later
 * API code must fetch a fresh token per request, never store it in
 * localStorage long-term.
 */
export const authClient = createAuthClient({
  plugins: [jwtClient()],
});

export const { useSession, signIn, signUp, signOut } = authClient;

/** Fetch a fresh JWT for the Express backend. Used from Section 4 onward. */
export async function getJwtToken(): Promise<string | null> {
  const { data, error } = await authClient.token();
  if (error || !data?.token) return null;
  return data.token;
}
