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
    toast.success("Welcome to the Book Club! 🎉 Fresh reads will arrive in your inbox every Friday.");
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(NEWSLETTER_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setIsSubscribed(false);
    toast.info("Subscription reset. You can sign up with a new email anytime.");
  };

  return (
    <section className="bg-white py-16 dark:bg-[#073B2E] md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#E7E5E4] bg-linear-to-br from-[#FDFBF7] via-white to-[#ECFDF5] p-8 shadow-xl shadow-stone-200/50 sm:p-12 md:p-16 dark:border-[#134E4A] dark:from-[#052E22] dark:via-[#073B2E] dark:to-[#052E22] dark:shadow-2xl">
          <div className="mx-auto max-w-2xl text-center">
            {/* Header Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
              <span>💌</span> Friday Book Dispatch
            </span>

            {/* Title & Description */}
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl dark:text-[#F0FDF4]">
              Join the Weekly Reading Nook Club
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6B7280] sm:text-base dark:text-[#A7F3D0]">
              Every Friday morning, we curate our community&apos;s freshest book additions, reader reviews, and most-wanted book requests. Pure reading joy, zero spam.
            </p>

            {/* Form or Subscribed State */}
            {isSubscribed ? (
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-[#ECFDF5] p-6 text-center dark:border-emerald-800 dark:bg-[#052E22]">
                <span className="text-3xl">🎉</span>
                <h4 className="mt-2 font-serif text-lg font-bold text-[#047857] dark:text-[#6EE7B7]">
                  You&apos;re Officially on the Reading List!
                </h4>
                <p className="mt-1 text-xs text-[#4B5563] dark:text-[#A7F3D0]">
                  Look out for our Friday morning dispatch. Happy reading!
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 text-xs font-semibold text-[#D97706] hover:underline dark:text-[#FCD34D]"
                >
                  Change email address ↺
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <div className="relative w-full max-w-md">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-[#047857] dark:text-[#6EE7B7]">
                    ✉️
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full rounded-2xl border border-[#E7E5E4] bg-white py-3.5 pr-4 pl-11 text-sm text-[#1F2937] placeholder-[#9CA3AF] shadow-xs focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20 focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full shrink-0 rounded-2xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-900/20 transition-all hover:scale-102 hover:brightness-110 active:scale-[0.99] sm:w-auto"
                >
                  Subscribe Free 📬
                </button>
              </form>
            )}

            {/* Trust Micro-Bullets */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] dark:text-[#A7F3D0]">
              <span className="flex items-center gap-1">
                <span>✓</span> 100% Free
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>✓</span> One email per week
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>✓</span> Unsubscribe anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
