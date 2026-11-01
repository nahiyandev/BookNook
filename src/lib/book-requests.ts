"use client";

import { useSyncExternalStore } from "react";

export interface BookRequest {
  id: string;
  title: string;
  author: string;
  category: string;
  requesterName: string;
  note: string;
  upvotes: number;
  status: "open" | "fulfilled";
  createdAt: string;
}

const STORAGE_KEY = "booknook_community_book_requests";
const CHANGE_EVENT = "booknook_book_requests_change";

const DEFAULT_REQUESTS: BookRequest[] = [
  {
    id: "req-1",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    requesterName: "Anika Rahman",
    note: "Looking to borrow for my anthropological research project. Will return promptly!",
    upvotes: 14,
    status: "open",
    createdAt: "2 days ago",
  },
  {
    id: "req-2",
    title: "Deyal (দেয়াল)",
    author: "Humayun Ahmed",
    category: "Fiction",
    requesterName: "Rafiqul Islam",
    note: "Searching for a copy to read together with my grandfather this weekend.",
    upvotes: 21,
    status: "open",
    createdAt: "3 days ago",
  },
  {
    id: "req-3",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Science",
    requesterName: "Tanvir Ahmed",
    note: "Studying distributed systems and backend architecture. Would love a 7-day loan!",
    upvotes: 18,
    status: "open",
    createdAt: "4 days ago",
  },
  {
    id: "req-4",
    title: "Charlotte's Web",
    author: "E.B. White",
    category: "Kids",
    requesterName: "Samira Akhtar",
    note: "Looking for an illustrated copy for bedtime reading with my 7-year-old daughter.",
    upvotes: 9,
    status: "open",
    createdAt: "5 days ago",
  },
];

export function getStoredRequests(): BookRequest[] {
  if (typeof window === "undefined") return DEFAULT_REQUESTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_REQUESTS));
      return DEFAULT_REQUESTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_REQUESTS;
  } catch {
    return DEFAULT_REQUESTS;
  }
}

export function saveStoredRequests(list: BookRequest[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Ignore storage quota
  }
}

export function addBookRequest(data: {
  title: string;
  author: string;
  category: string;
  requesterName: string;
  note: string;
}): BookRequest {
  const current = getStoredRequests();
  const newReq: BookRequest = {
    id: `req-${Date.now()}`,
    title: data.title.trim(),
    author: data.author.trim(),
    category: data.category.trim() || "Fiction",
    requesterName: data.requesterName.trim() || "Community Reader",
    note: data.note.trim() || "Hoping a fellow reader has a copy to share!",
    upvotes: 1,
    status: "open",
    createdAt: "Just now",
  };
  saveStoredRequests([newReq, ...current]);
  return newReq;
}

export function upvoteBookRequest(id: string): void {
  const current = getStoredRequests();
  const updated = current.map((item) =>
    item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
  );
  saveStoredRequests(updated);
}

// React Subscribe Helper with cached snapshot to eliminate render loops
let cachedSnapshot: BookRequest[] = DEFAULT_REQUESTS;
let cachedString = "";

function getSnapshot(): BookRequest[] {
  if (typeof window === "undefined") return DEFAULT_REQUESTS;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_REQUESTS;
  if (raw !== cachedString) {
    cachedString = raw;
    try {
      cachedSnapshot = JSON.parse(raw);
    } catch {
      cachedSnapshot = DEFAULT_REQUESTS;
    }
  }
  return cachedSnapshot;
}

function getServerSnapshot(): BookRequest[] {
  return DEFAULT_REQUESTS;
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useBookRequests() {
  const requests = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    requests,
    addRequest: addBookRequest,
    upvote: upvoteBookRequest,
  };
}
