"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useBookRequests, type BookRequest } from "@/lib/book-requests";

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

export default function HomeBookRequests() {
  const { requests, addRequest, upvote } = useBookRequests();
  const [modalOpen, setModalOpen] = useState(false);
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  // Form state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [requesterName, setRequesterName] = useState("");
  const [note, setNote] = useState("");

  const handleUpvote = (id: string, title: string) => {
    if (upvotedIds[id]) {
      toast.info("You already upvoted this request.");
      return;
    }
    upvote(id);
    setUpvotedIds((prev) => ({ ...prev, [id]: true }));
    toast.success(`Upvoted "${title}". Fellow readers will see your interest.`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      toast.error("Please enter both book title and author.");
      return;
    }

    addRequest({
      title,
      author,
      category,
      requesterName,
      note,
    });

    toast.success(`Request for "${title}" posted to the community wall.`);
    setTitle("");
    setAuthor("");
    setRequesterName("");
    setNote("");
    setModalOpen(false);
  };

  return (
    <section className="relative overflow-hidden border-t border-stone-200/70 bg-[#FAF9F6]/80 py-16 dark:border-emerald-950 dark:bg-[#052E22] md:py-20">
      {/* Subtle ambient light for glass glow */}
      <div className="pointer-events-none absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-400/5" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-300/5" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-100/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#047857] backdrop-blur-md dark:border-emerald-700/40 dark:bg-emerald-950/60 dark:text-[#6EE7B7]">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>Community Wish Wall</span>
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl dark:text-[#F0FDF4]">
              Books Our Readers Are Looking For
            </h2>
            <p className="mt-1.5 text-sm text-[#6B7280] dark:text-[#A7F3D0]">
              Have any of these books sitting on your shelf at home? Share them to let fellow bookworms borrow!
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 self-start rounded-2xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-900/20 backdrop-blur-sm transition-all hover:scale-102 hover:brightness-110 active:scale-[0.99] sm:self-end"
          >
            <span>+ Wish a Book</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        {/* Requests Grid — Frosted Glass Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {requests.slice(0, 4).map((req: BookRequest) => {
            const hasUpvoted = !!upvotedIds[req.id];
            return (
              <div
                key={req.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-emerald-200/90 bg-linear-to-b from-[#FAFDFB] via-[#F4FAF6] to-[#EAF5EF] p-6 shadow-lg shadow-emerald-950/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#047857] hover:shadow-xl dark:border-emerald-500/20 dark:bg-none dark:bg-[#073B2E]/60 dark:shadow-2xl dark:hover:border-[#6EE7B7]/40"
              >
                {/* Glass hairline top reflex */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent dark:via-emerald-400/20" />

                <div>
                  {/* Category Pill + Status */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-emerald-200/60 bg-emerald-100/50 px-2.5 py-0.5 text-[11px] font-semibold text-[#047857] backdrop-blur-xs dark:border-emerald-700/40 dark:bg-emerald-950/60 dark:text-[#6EE7B7]">
                      {req.category}
                    </span>
                    <span className="text-[11px] text-[#9CA3AF] dark:text-[#A7F3D0]/60">
                      {req.createdAt}
                    </span>
                  </div>

                  {/* Book Title & Author */}
                  <h3 className="mt-4 font-serif text-lg font-bold text-[#1F2937] transition group-hover:text-[#047857] dark:text-[#F0FDF4] dark:group-hover:text-[#6EE7B7]">
                    {req.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-[#D97706] dark:text-[#FCD34D]">
                    by {req.author}
                  </p>

                  {/* Reader Note */}
                  <div className="mt-3.5 rounded-2xl border border-stone-200/50 bg-[#FDFBF7]/80 p-3 text-xs leading-relaxed text-[#4B5563] backdrop-blur-xs dark:border-emerald-800/30 dark:bg-[#052E22]/60 dark:text-[#A7F3D0]">
                    &ldquo;{req.note}&rdquo;
                  </div>

                  <p className="mt-2.5 text-[11px] font-medium text-[#6B7280] dark:text-[#A7F3D0]/80">
                    Requested by <span className="font-bold text-[#1F2937] dark:text-[#F0FDF4]">{req.requesterName}</span>
                  </p>
                </div>

                {/* Actions: Upvote + I Have This Book */}
                <div className="mt-6 border-t border-stone-200/60 pt-4 dark:border-emerald-800/40">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleUpvote(req.id, req.title)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold backdrop-blur-sm transition-all ${
                        hasUpvoted
                          ? "bg-[#047857] text-white shadow-xs"
                          : "border border-stone-200/80 bg-white/80 text-[#4B5563] hover:border-[#047857] hover:text-[#047857] dark:border-emerald-700/40 dark:bg-[#052E22]/70 dark:text-[#A7F3D0]"
                      }`}
                    >
                      <svg className="h-3.5 w-3.5 text-[#047857] dark:text-[#6EE7B7]" fill={hasUpvoted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2" />
                      </svg>
                      <span>{req.upvotes}</span>
                      <span className="hidden sm:inline">Me too</span>
                    </button>

                    <Link
                      href="/add-book"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200/80 bg-emerald-50/80 px-3 py-1.5 text-xs font-bold text-[#047857] backdrop-blur-xs transition hover:bg-[#047857] hover:text-white dark:border-emerald-700/40 dark:bg-emerald-950/50 dark:text-[#6EE7B7] dark:hover:bg-[#6EE7B7] dark:hover:text-[#052E22]"
                    >
                      <span>I Have This</span>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* "Wish a Book" Frosted Glass Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wish-book-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          />

          {/* Dialog Container */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-6 shadow-2xl backdrop-blur-2xl dark:border-emerald-500/20 dark:bg-[#073B2E]/90 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100/60 text-[#047857] dark:bg-emerald-950/60 dark:text-[#6EE7B7]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                <div>
                  <h3 id="wish-book-title" className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                    Wish a Book
                  </h3>
                  <p className="text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                    Ask fellow readers if they have a copy to share
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
              <div>
                <label className="block text-xs font-bold text-[#374151] dark:text-[#F0FDF4]">
                  Book Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sapiens, The Alchemist, Dune..."
                  className="mt-1.5 w-full rounded-2xl border border-stone-200/80 bg-white/70 px-4 py-2.5 text-sm text-[#1F2937] placeholder-[#9CA3AF] backdrop-blur-xs focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-emerald-700/40 dark:bg-[#052E22] dark:focus:bg-[#052E22] dark:text-[#F0FDF4]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#374151] dark:text-[#F0FDF4]">
                    Author *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Frank Herbert"
                    className="mt-1.5 w-full rounded-2xl border border-stone-200/80 bg-white/70 px-4 py-2.5 text-sm text-[#1F2937] placeholder-[#9CA3AF] backdrop-blur-xs focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-emerald-700/40 dark:bg-[#052E22] dark:focus:bg-[#052E22] dark:text-[#F0FDF4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] dark:text-[#F0FDF4]">
                    Shelf Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-stone-200/80 bg-white/90 px-4 py-2.5 text-sm font-medium text-[#1F2937] backdrop-blur-xs focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-emerald-700/40 dark:bg-[#052E22] dark:focus:bg-[#052E22] dark:text-[#F0FDF4]"
                  >
                    {CATEGORIES.map((c) => (
                      <option
                        key={c}
                        value={c}
                        className="bg-white text-[#1F2937] dark:bg-[#052E22] dark:text-[#F0FDF4]"
                      >
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] dark:text-[#F0FDF4]">
                  Your Name
                </label>
                <input
                  type="text"
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                  placeholder="e.g. Anika (or leave anonymous)"
                  className="mt-1.5 w-full rounded-2xl border border-stone-200/80 bg-white/70 px-4 py-2.5 text-sm text-[#1F2937] placeholder-[#9CA3AF] backdrop-blur-xs focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-emerald-700/40 dark:bg-[#052E22] dark:focus:bg-[#052E22] dark:text-[#F0FDF4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] dark:text-[#F0FDF4]">
                  Why would you like to read it?
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Recommended by my professor / Need for research..."
                  className="mt-1.5 w-full rounded-2xl border border-stone-200/80 bg-white/70 px-4 py-2.5 text-sm text-[#1F2937] placeholder-[#9CA3AF] backdrop-blur-xs focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-emerald-700/40 dark:bg-[#052E22] dark:focus:bg-[#052E22] dark:text-[#F0FDF4]"
                />
              </div>

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
                  <span>Post Request</span>
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
