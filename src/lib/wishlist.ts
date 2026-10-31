"use client";

import { useSyncExternalStore } from "react";
import type { Book } from "./api";

const WISHLIST_STORAGE_KEY = "booknook_wishlist_books";
const WISHLIST_CHANGE_EVENT = "booknook_wishlist_change";

export type WishlistBook = Pick<
  Book,
  "_id" | "title" | "author" | "category" | "image" | "availableCopies"
>;

function getStoredWishlist(): WishlistBook[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setStoredWishlist(books: WishlistBook[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(books));
    window.dispatchEvent(new Event(WISHLIST_CHANGE_EVENT));
  } catch {
    // Ignore storage errors
  }
}

/** Toggle a book in the wishlist. Returns true if added, false if removed. */
export function toggleWishlistBook(book: Book | WishlistBook): boolean {
  const current = getStoredWishlist();
  const exists = current.some((b) => b._id === book._id);

  if (exists) {
    const updated = current.filter((b) => b._id !== book._id);
    setStoredWishlist(updated);
    return false;
  } else {
    const minimal: WishlistBook = {
      _id: book._id,
      title: book.title,
      author: book.author,
      category: book.category,
      image: book.image,
      availableCopies: book.availableCopies,
    };
    setStoredWishlist([...current, minimal]);
    return true;
  }
}

/** Check if a book is currently in the wishlist */
export function isBookInWishlist(bookId: string): boolean {
  const current = getStoredWishlist();
  return current.some((b) => b._id === bookId);
}

// React Subscribe Helper for real-time reactivity
let cachedSnapshot: WishlistBook[] = [];
let cachedString = "";

function getSnapshot(): WishlistBook[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]";
  if (raw !== cachedString) {
    cachedString = raw;
    try {
      cachedSnapshot = JSON.parse(raw);
    } catch {
      cachedSnapshot = [];
    }
  }
  return cachedSnapshot;
}

function getServerSnapshot(): WishlistBook[] {
  return [];
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(WISHLIST_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(WISHLIST_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Custom hook that returns the live reactive wishlist array */
export function useWishlist() {
  const wishlist = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = (book: Book | WishlistBook) => {
    return toggleWishlistBook(book);
  };

  const isSaved = (bookId: string) => {
    return wishlist.some((b) => b._id === bookId);
  };

  return {
    wishlist,
    count: wishlist.length,
    toggle,
    isSaved,
  };
}
