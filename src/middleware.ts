import { NextResponse, type NextRequest } from "next/server";

/**
 * BookNook route guard — Section 2 (Authentication).
 *
 * Spec: a logged-out user who opens a private route must go to Login, and
 * after login must come back to the page they wanted. This middleware does
 * that redirect, carrying the wanted page in ?callbackUrl=.
 *
 * How it checks: it looks for BetterAuth's session cookie. In production the
 * cookie name is prefixed (__Secure-better-auth.session_token), so both names
 * are checked. This is a UX redirect only — it does NOT prove the session is
 * valid. Real protection is: (a) server session checks on pages that need it,
 * and (b) JWT verification on the Express backend for API calls (later section).
 *
 * Protected here: /add-book, /my-books, /my-borrows, /profile, and
 * /books/<id> (Book Details). /books itself (All Books list) is PUBLIC and
 * is deliberately NOT in the matcher below — the matcher only matches
 * /books/<single-segment>, never bare /books.
 */
const SESSION_COOKIES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
];

export function middleware(request: NextRequest) {
  const hasSession = SESSION_COOKIES.some(
    (name) => request.cookies.get(name)?.value
  );
  if (hasSession) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
    "/profile/:path*",
    "/books/:id",
  ],
};
