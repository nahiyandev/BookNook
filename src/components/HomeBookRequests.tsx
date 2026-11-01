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
      toast.info("You already upvoted this request! 👍");
      return;
    }
    upvote(id);
    setUpvotedIds((prev) => ({ ...prev, [id]: true }));
    toast.success(`Upvoted "${title}"! Fellow readers will see the interest.`);
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

    toast.success(`Request for "${title}" posted to the community wall! 📋`);
    setTitle("");
    setAuthor("");
    setRequesterName("");
    setNote("");
    setModalOpen(false);
  };

  return (
    <section className="border-t border-[#E7E5E4] bg-[#FDFBF7] py-16 dark:border-[#134E4A] dark:bg-[#052E22] md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#047857] dark:bg-[#073B2E] dark:text-[#6EE7B7]">
              <span>📋</span> Community Wish Wall
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
            className="inline-flex items-center gap-2 self-start rounded-2xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-900/20 transition-all hover:scale-102 hover:brightness-110 active:scale-[0.99] sm:self-end"
          >
            <span>+ Wish a Book</span>
            <span>✨</span>
          </button>
        </div>

        {/* Requests Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {requests.slice(0, 4).map((req: BookRequest) => {
            const hasUpvoted = !!upvotedIds[req.id];
            return (
              <div
                key={req.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-[#E7E5E4] bg-white p-6 shadow-lg shadow-stone-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#047857]/40 hover:shadow-xl dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl dark:hover:border-[#6EE7B7]/40"
              >
                <div>
                  {/* Category Pill + Status */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-bold text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
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
                  <div className="mt-3.5 rounded-2xl bg-[#FDFBF7] p-3 text-xs leading-relaxed text-[#4B5563] dark:bg-[#052E22] dark:text-[#A7F3D0]">
                    &ldquo;{req.note}&rdquo;
                  </div>

                  <p className="mt-2 text-[11px] font-medium text-[#6B7280] dark:text-[#A7F3D0]/80">
                    Requested by <span className="font-bold text-[#1F2937] dark:text-[#F0FDF4]">{req.requesterName}</span>
                  </p>
                </div>

                {/* Actions: Upvote + I Have This Book */}
                <div className="mt-6 border-t border-[#E7E5E4] pt-4 dark:border-[#134E4A]">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleUpvote(req.id, req.title)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                        hasUpvoted
                          ? "bg-[#047857] text-white shadow-xs"
                          : "border border-[#E7E5E4] bg-white text-[#4B5563] hover:border-[#047857] hover:text-[#047857] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0]"
                      }`}
                    >
                      <span>👍</span>
                      <span>{req.upvotes}</span>
                      <span className="hidden sm:inline">Me too</span>
                    </button>

                    <Link
                      href="/add-book"
                      className="inline-flex items-center gap-1 rounded-xl bg-[#ECFDF5] px-3 py-1.5 text-xs font-bold text-[#047857] transition hover:bg-[#047857] hover:text-white dark:bg-[#052E22] dark:text-[#6EE7B7] dark:hover:bg-[#6EE7B7] dark:hover:text-[#052E22]"
                    >
                      <span>I Have This</span>
                      <span>➕</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* "Wish a Book" Modal */}
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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Dialog Container */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#E7E5E4] bg-white p-6 shadow-2xl dark:border-[#134E4A] dark:bg-[#073B2E] sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ECFDF5] text-xl text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
                  📋
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
                  className="mt-1.5 w-full rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4]"
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
                    className="mt-1.5 w-full rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] dark:text-[#F0FDF4]">
                    Shelf Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] px-4 py-2.5 text-sm font-medium text-[#1F2937] focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
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
                  className="mt-1.5 w-full rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4]"
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
                  className="mt-1.5 w-full rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4]"
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-[#E7E5E4] bg-white px-4 py-2 text-xs font-bold text-[#4B5563] hover:bg-stone-50 dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-900/20 transition hover:brightness-110 active:scale-[0.99]"
                >
                  Post Request 📋
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

