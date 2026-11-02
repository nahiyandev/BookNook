import { API_URL } from "./config";
import { getJwtToken } from "./auth-client";

/**
 * BookNook API helper — Books + Borrow section.
 * EVERY backend call in the frontend goes through here. No page or
 * component hardcodes a backend URL or builds its own fetch headers.
 *
 * - Base URL comes ONLY from config.ts (which reads NEXT_PUBLIC_API_URL).
 * - Protected calls (auth: true) fetch a fresh JWT via getJwtToken() and
 *   send it as `Authorization: Bearer <token>`. The token is short-lived,
 *   so it is fetched per request, never stored in localStorage.
 * - Errors: the backend's { message } / { error } is thrown as a normal
 *   Error, so pages can show it with toast.error(...) — never alert().
 */
export async function apiFetch<T>(
  path: string,
  options: { method?: string; body?: unknown; auth?: boolean } = {}
): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (options.auth) {
    const token = await getJwtToken();
    if (!token) throw new Error("Please login again to continue.");
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || "Something went wrong.");
  }
  return data as T;
}

/** Upload a book cover to imgbb. Returns the hosted image URL. */
export async function uploadToImgbb(file: File): Promise<string> {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) {
    throw new Error("Image upload is not configured (NEXT_PUBLIC_IMGBB_API_KEY is missing).");
  }
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  if (!data?.success || !data?.data?.url) {
    throw new Error("Image upload failed. Please try again.");
  }
  return data.data.url as string;
}

/** Shared book type — matches the backend books collection. */
export type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  addedBy: { name: string; email: string };
  addedAt: string;
};

export type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
};
