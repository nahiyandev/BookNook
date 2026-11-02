"use client";

import { useSyncExternalStore } from "react";

export interface BookReview {
  id: string;
  bookId: string;
  bookTitle: string;
  reviewerName: string;
  rating: number; // 1 to 5
  comment: string;
  helpfulCount: number;
  createdAt: string;
}

const STORAGE_KEY = "booknook_reader_reviews_store";
const CHANGE_EVENT = "booknook_reader_reviews_change";

const DEFAULT_REVIEWS: BookReview[] = [
  {
    id: "rev-seed-1",
    bookId: "default",
    bookTitle: "Community Reader Pick",
    reviewerName: "Farhan Tanvir",
    rating: 5,
    comment: "An absolute masterpiece. Read it over a quiet weekend and passed it on to a fellow colleague.",
    helpfulCount: 6,
    createdAt: "3 days ago",
  },
  {
    id: "rev-seed-2",
    bookId: "default",
    bookTitle: "Community Reader Pick",
    reviewerName: "Sabrina Yasmin",
    rating: 5,
    comment: "The pacing, depth, and storytelling are phenomenal. A must-borrow from the community shelf!",
    helpfulCount: 4,
    createdAt: "1 week ago",
  },
  {
    id: "rev-seed-3",
    bookId: "default",
    bookTitle: "Community Reader Pick",
    reviewerName: "Nafis Imtiaz",
    rating: 4,
    comment: "Thought-provoking ideas throughout. Highly recommended for curious minds and avid readers.",
    helpfulCount: 2,
    createdAt: "2 weeks ago",
  },
];

export function getStoredReviews(): BookReview[] {
  if (typeof window === "undefined") return DEFAULT_REVIEWS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_REVIEWS));
      return DEFAULT_REVIEWS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_REVIEWS;
  } catch {
    return DEFAULT_REVIEWS;
  }
}

export function saveStoredReviews(list: BookReview[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Ignore storage quota
  }
}

export function addBookReview(data: {
  bookId: string;
  bookTitle: string;
  reviewerName: string;
  rating: number;
  comment: string;
}): BookReview {
  const current = getStoredReviews();
  const newRev: BookReview = {
    id: `rev-${Date.now()}`,
    bookId: data.bookId,
    bookTitle: data.bookTitle,
    reviewerName: data.reviewerName.trim() || "Passionate Reader",
    rating: Math.min(5, Math.max(1, Math.round(data.rating))),
    comment: data.comment.trim(),
    helpfulCount: 0,
    createdAt: "Just now",
  };
  saveStoredReviews([newRev, ...current]);
  return newRev;
}

export function upvoteReview(id: string): void {
  const current = getStoredReviews();
  const updated = current.map((item) =>
    item.id === id ? { ...item, helpfulCount: item.helpfulCount + 1 } : item
  );
  saveStoredReviews(updated);
}

// React Subscribe Helper with cached snapshot to eliminate render loops
let cachedSnapshot: BookReview[] = DEFAULT_REVIEWS;
let cachedString = "";

function getSnapshot(): BookReview[] {
  if (typeof window === "undefined") return DEFAULT_REVIEWS;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_REVIEWS;
  if (raw !== cachedString) {
    try {
      cachedSnapshot = JSON.parse(raw);
      cachedString = raw;
    } catch {
      return DEFAULT_REVIEWS;
    }
  }
  return cachedSnapshot;
}

function getServerSnapshot(): BookReview[] {
  return DEFAULT_REVIEWS;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useBookReviews(bookId: string) {
  const allReviews = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Filter reviews matching this specific book, plus default community reviews if none yet
  const bookSpecific = allReviews.filter((r) => r.bookId === bookId);
  const reviews =
    bookSpecific.length > 0
      ? bookSpecific
      : allReviews.filter((r) => r.bookId === "default");

  const totalReviews = reviews.length;
  const ratingSum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = totalReviews > 0 ? Number((ratingSum / totalReviews).toFixed(1)) : 5.0;

  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    if (distribution[r.rating] !== undefined) {
      distribution[r.rating]++;
    }
  });

  return {
    reviews,
    totalReviews,
    averageRating,
    distribution,
    addReview: addBookReview,
    upvote: upvoteReview,
  };
}

