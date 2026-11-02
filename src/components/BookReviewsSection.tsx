"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useBookReviews, type BookReview } from "@/lib/book-reviews";
import { authClient } from "@/lib/auth-client";

const RATING_LABELS: Record<number, string> = {
  1: "Poor read",
  2: "Fair, has flaws",
  3: "Good & enjoyable",
  4: "Very good recommendation",
  5: "Masterpiece! Must read",
};

export default function BookReviewsSection({
  bookId,
  bookTitle,
}: {
  bookId: string;
  bookTitle: string;
}) {
  const { reviews, totalReviews, averageRating, distribution, addReview, upvote } =
    useBookReviews(bookId);

  const { data: session } = authClient.useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  // Review form state
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewerName, setReviewerName] = useState(session?.user?.name || "");
  const [comment, setComment] = useState("");

  const handleUpvote = (id: string) => {
    if (upvotedIds[id]) {
      toast.info("You already marked this review as helpful.");
      return;
    }
    upvote(id);
    setUpvotedIds((prev) => ({ ...prev, [id]: true }));
    toast.success("Thank you! Your feedback helps other readers.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please write a few words about your reading experience.");
      return;
    }

    addReview({
      bookId,
      bookTitle,
      reviewerName: reviewerName.trim() || session?.user?.name || "Community Reader",
      rating,
      comment,
    });

    toast.success("Review posted! Fellow readers appreciate your thoughts.");
    setComment("");
    setRating(5);
    setModalOpen(false);
  };

  return (
    <section className="mt-12">
      {/* Frosted Glass Section Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-6 shadow-xl shadow-stone-200/40 backdrop-blur-xl transition hover:shadow-2xl sm:p-8 lg:p-10 dark:border-emerald-500/20 dark:bg-[#073B2E]/60 dark:shadow-2xl dark:shadow-black/50">
        {/* Subtle glass hairline reflection */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent dark:via-emerald-400/20" />

        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-stone-200/60 pb-6 sm:flex-row sm:items-center dark:border-emerald-800/40">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-100/50 px-3 py-0.5 text-xs font-semibold tracking-wide text-[#047857] backdrop-blur-xs dark:border-emerald-700/40 dark:bg-emerald-950/60 dark:text-[#6EE7B7]">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>Community Reviews</span>
            </div>
            <h2 className="mt-2.5 font-serif text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl dark:text-[#F0FDF4]">
              Reader Reviews & Ratings
            </h2>
            <p className="mt-1 text-xs text-[#6B7280] sm:text-sm dark:text-[#A7F3D0]">
              Real thoughts and takeaways shared by readers who borrowed this book.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 self-start rounded-2xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-900/20 backdrop-blur-sm transition-all hover:scale-102 hover:brightness-110 active:scale-[0.99] sm:self-auto sm:text-sm"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Overview Grid */}
        <div className="mt-8 grid gap-8 rounded-2xl border border-stone-200/50 bg-[#FDFBF7]/70 p-6 backdrop-blur-xs sm:grid-cols-12 dark:border-emerald-800/30 dark:bg-[#052E22]/60">
          {/* Average Score Box */}
          <div className="flex flex-col items-center justify-center text-center sm:col-span-4 sm:border-r sm:border-stone-200/60 sm:pr-6 dark:sm:border-emerald-800/40">
            <span className="font-serif text-5xl font-black text-[#D97706] dark:text-[#FCD34D]">
              {averageRating.toFixed(1)}
            </span>
            <div className="mt-2 flex items-center gap-1 text-[#D97706] dark:text-[#FCD34D]">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating) ? "fill-current" : "fill-none stroke-current"
                  }`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
            </div>
            <p className="mt-1.5 text-xs font-semibold text-[#6B7280] dark:text-[#A7F3D0]">
              Based on {totalReviews} reader {totalReviews === 1 ? "review" : "reviews"}
            </p>
          </div>

          {/* Star Distribution Breakdown */}
          <div className="flex flex-col justify-center space-y-2 sm:col-span-8">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = distribution[stars] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <div className="flex w-12 items-center gap-1 font-semibold text-[#374151] dark:text-[#F0FDF4]">
                    <span>{stars}</span>
                    <svg className="h-3 w-3 fill-current text-[#D97706]" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-stone-200/80 dark:bg-emerald-950/80">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-[#D97706] to-[#047857] transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-medium text-[#6B7280] dark:text-[#A7F3D0]/80">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-8 space-y-4">
          {reviews.map((rev: BookReview) => {
            const hasUpvoted = !!upvotedIds[rev.id];
            return (
              <div
                key={rev.id}
                className="group relative rounded-2xl border border-white/80 bg-white/70 p-5 shadow-xs backdrop-blur-md transition-all duration-200 hover:border-emerald-500/40 hover:shadow-md sm:p-6 dark:border-emerald-800/40 dark:bg-[#063327]/60"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  {/* User Profile & Rating */}
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#047857] to-[#065F46] text-xs font-bold text-white shadow-xs">
                      {rev.reviewerName.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-serif text-sm font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                          {rev.reviewerName}
                        </h4>
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200/60 bg-emerald-100/50 px-2 py-0.5 text-[10px] font-semibold text-[#047857] dark:border-emerald-700/40 dark:bg-emerald-950/60 dark:text-[#6EE7B7]">
                          <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Verified Reader
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="mt-1 flex items-center gap-1 text-[#D97706] dark:text-[#FCD34D]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-3.5 w-3.5 ${
                              star <= rev.rating ? "fill-current" : "fill-none stroke-current"
                            }`}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-[11px] font-medium text-[#6B7280] dark:text-[#A7F3D0]">
                          {RATING_LABELS[rev.rating]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-medium text-[#9CA3AF] dark:text-[#A7F3D0]/60">
                    {rev.createdAt}
                  </span>
                </div>

                {/* Comment */}
                <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[#374151] dark:text-[#ECFDF5]/90">
                  {rev.comment}
                </p>

                {/* Helpful Button */}
                <div className="mt-4 flex items-center justify-end border-t border-stone-200/50 pt-3 dark:border-emerald-800/30">
                  <button
                    type="button"
                    onClick={() => handleUpvote(rev.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold backdrop-blur-xs transition ${
                      hasUpvoted
                        ? "bg-[#047857] text-white shadow-xs"
                        : "border border-stone-200/80 bg-white/80 text-[#6B7280] hover:border-[#047857] hover:text-[#047857] dark:border-emerald-700/40 dark:bg-[#052E22]/70 dark:text-[#A7F3D0]"
                    }`}
                  >
                    <svg className="h-3.5 w-3.5" fill={hasUpvoted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2" />
                    </svg>
                    <span>Helpful {rev.helpfulCount > 0 && `(${rev.helpfulCount})`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* "Write a Review" Frosted Glass Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="write-review-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl dark:border-emerald-500/20 dark:bg-[#073B2E]/95 sm:p-8">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-4 dark:border-emerald-800/40">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100/60 text-[#047857] dark:bg-emerald-950/60 dark:text-[#6EE7B7]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </span>
                <div>
                  <h3 id="write-review-title" className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                    Rate & Review
                  </h3>
                  <p className="truncate max-w-xs text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                    {bookTitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full p-1.5 text-[#9CA3AF] hover:bg-stone-100 hover:text-[#1F2937] dark:hover:bg-[#052E22] dark:hover:text-[#F0FDF4]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Interactive Star Picker */}
              <div>
                <label className="block text-xs font-bold text-[#374151] dark:text-[#F0FDF4]">
                  Your Rating *
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = star <= (hoverRating || rating);
                      return (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="rounded-lg p-1 text-[#D97706] transition hover:scale-110 focus:outline-hidden dark:text-[#FCD34D]"
                        >
                          <svg
                            className={`h-7 w-7 ${
                              active ? "fill-current" : "fill-none stroke-current"
                            }`}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.75}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-semibold text-[#047857] dark:text-[#6EE7B7]">
                    {RATING_LABELS[hoverRating || rating]}
                  </span>
                </div>
              </div>

              {/* Reviewer Name */}
              <div>
                <label className="block text-xs font-bold text-[#374151] dark:text-[#F0FDF4]">
                  Your Name
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed (or leave blank)"
                  className="mt-1.5 w-full rounded-2xl border border-stone-200/80 bg-white/80 px-4 py-2.5 text-xs text-[#1F2937] placeholder-[#9CA3AF] backdrop-blur-xs focus:border-[#047857] focus:bg-white focus:outline-hidden sm:text-sm dark:border-emerald-700/40 dark:bg-[#052E22]/70 dark:text-[#F0FDF4]"
                />
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-xs font-bold text-[#374151] dark:text-[#F0FDF4]">
                  Your Review & Takeaways *
                </label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you love about this book? Who would you recommend it to?"
                  className="mt-1.5 w-full rounded-2xl border border-stone-200/80 bg-white/80 px-4 py-2.5 text-xs text-[#1F2937] placeholder-[#9CA3AF] backdrop-blur-xs focus:border-[#047857] focus:bg-white focus:outline-hidden sm:text-sm dark:border-emerald-700/40 dark:bg-[#052E22]/70 dark:text-[#F0FDF4]"
                />
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-stone-200/80 bg-white/80 px-4 py-2 text-xs font-bold text-[#4B5563] backdrop-blur-xs hover:bg-stone-50 dark:border-emerald-700/40 dark:bg-[#052E22]/70 dark:text-[#A7F3D0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-900/20 backdrop-blur-xs transition hover:brightness-110 active:scale-[0.99]"
                >
                  <span>Submit Review</span>
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

