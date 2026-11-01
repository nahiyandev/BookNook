"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const NEWSLETTER_STORAGE_KEY = "booknook_newsletter_subscribed";

export default function HomeNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
        if (stored) {
          queueMicrotask(() => {
            setIsSubscribed(true);
          });
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      localStorage.setItem(NEWSLETTER_STORAGE_KEY, trimmed);
    } catch {
      // Ignore storage errors
    }

    setIsSubscribed(true);
    setEmail("");
    toast.success("Welcome! You are now subscribed to the weekly book dispatch.");
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(NEWSLETTER_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setIsSubscribed(false);
    toast.info("Subscription reset. You can enter a new email anytime.");
  };

  return (
    <section className="border-t border-[#E7E5E4] bg-[#FAF9F6] py-10 dark:border-[#134E4A] dark:bg-[#04241B] md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white/95 p-6 shadow-xs backdrop-blur-xs transition hover:shadow-sm sm:p-8 dark:border-[#134E4A] dark:bg-[#063327]/80">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-10">
            {/* Left Content */}
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-3 py-0.5 text-xs font-semibold tracking-wide text-[#047857] dark:border-emerald-700/50 dark:bg-emerald-900/40 dark:text-[#6EE7B7]">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Weekly Dispatch</span>
              </div>

              <h3 className="mt-2.5 font-serif text-xl font-bold tracking-tight text-[#1F2937] sm:text-2xl dark:text-[#F0FDF4]">
                Subscribe to BookNook Weekly
              </h3>
              <p className="mt-1.5 text-xs text-[#6B7280] sm:text-sm dark:text-[#A7F3D0] leading-relaxed">
                Handpicked book additions, community recommendations, and reading notes delivered every Friday.
              </p>
            </div>

            {/* Right Form or Subscribed State */}
            <div className="w-full lg:max-w-md">
              {isSubscribed ? (
                <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs dark:border-emerald-800/60 dark:bg-emerald-950/40">
                  <div className="flex items-center gap-2 text-[#047857] dark:text-[#6EE7B7]">
                    <svg className="h-4 w-4 shrink-0 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">You are on the weekly reading list.</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="font-medium text-[#D97706] hover:underline dark:text-[#FCD34D] ml-2 shrink-0 text-xs"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full rounded-xl border border-[#E7E5E4] bg-white px-3.5 py-2.5 text-xs text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#047857] focus:outline-hidden focus:ring-1 focus:ring-[#047857] sm:text-sm dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4] dark:placeholder-emerald-400/40"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:brightness-110 active:scale-[0.98] sm:text-sm"
                  >
                    Subscribe
                  </button>
                </form>
              )}

              {/* Minimal Trust Micro-details */}
              <div className="mt-2.5 flex items-center justify-center gap-3 text-[11px] text-[#6B7280] lg:justify-start dark:text-[#A7F3D0]">
                <span className="flex items-center gap-1">
                  <svg className="h-3 w-3 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Free forever
                </span>
                <span>•</span>
                <span>Weekly on Friday</span>
                <span>•</span>
                <span>No spam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
