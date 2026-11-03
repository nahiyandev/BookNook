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
    <section className="relative overflow-hidden border-t border-stone-200/70 bg-[#FAF9F6]/80 py-10 dark:border-emerald-900/60 dark:bg-[#04241B]/90 md:py-12">
      {/* Ambient Glass Glow Orbs */}
      <div className="pointer-events-none absolute -top-16 left-1/4 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-400/10" />
      <div className="pointer-events-none absolute -bottom-16 right-1/4 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-300/5" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Frosted Glass Container */}
        <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-6 shadow-xl shadow-stone-300/20 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-stone-300/30 sm:p-8 dark:border-emerald-500/20 dark:bg-[#063327]/60 dark:shadow-2xl dark:shadow-black/40">
          {/* Subtle Glass Highlight Line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent dark:via-emerald-400/30" />

          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-10">
            {/* Left Content */}
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/40 bg-emerald-100/50 px-3 py-1 text-xs font-semibold tracking-wide text-[#047857] backdrop-blur-md dark:border-emerald-600/40 dark:bg-emerald-950/60 dark:text-[#6EE7B7]">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>The Friday Dispatch</span>
              </div>

              <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl dark:text-[#F0FDF4]">
                Subscribe to BookNook Weekly
              </h3>
              <p className="mt-1.5 text-xs text-[#6B7280] sm:text-sm dark:text-[#A7F3D0] leading-relaxed">
                Handpicked book additions, community recommendations, and reading notes delivered every Friday.
              </p>
            </div>

            {/* Right Form or Subscribed State */}
            <div className="w-full lg:max-w-md">
              {isSubscribed ? (
                <div className="flex items-center justify-between rounded-2xl border border-emerald-300/40 bg-emerald-50/70 p-4 text-xs backdrop-blur-md shadow-xs dark:border-emerald-700/40 dark:bg-emerald-950/50">
                  <div className="flex items-center gap-2.5 text-[#047857] dark:text-[#6EE7B7]">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-200/60 dark:bg-emerald-900/60">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-semibold text-sm">You are on the weekly reading list.</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="font-medium text-[#D97706] hover:underline dark:text-[#FCD34D] ml-3 shrink-0 text-xs"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[#9CA3AF] dark:text-emerald-400/50">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full rounded-2xl border border-stone-300/80 bg-white/80 py-2.5 pr-3.5 pl-10 text-xs text-[#1F2937] placeholder-[#9CA3AF] backdrop-blur-sm transition focus:border-[#047857] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#047857]/20 sm:text-sm dark:border-emerald-700/50 dark:bg-[#052E22] dark:focus:bg-[#052E22] dark:text-[#F0FDF4] dark:placeholder-emerald-400/40 dark:focus:border-[#6EE7B7]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-900/20 backdrop-blur-md transition hover:scale-102 hover:brightness-110 active:scale-[0.98] sm:text-sm"
                  >
                    <span>Subscribe</span>
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              )}

              {/* Minimal Trust Micro-details */}
              <div className="mt-3 flex items-center justify-center gap-3.5 text-[11px] font-medium text-[#6B7280] lg:justify-start dark:text-[#A7F3D0]">
                <span className="flex items-center gap-1.5">
                  <svg className="h-3 w-3 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Free forever
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-3 w-3 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Weekly on Friday
                </span>
                <span>•</span>
                <span>Zero spam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
