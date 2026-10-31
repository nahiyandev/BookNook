"use client";

import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { apiFetch, type Book } from "../lib/api";
import { Button } from "./ui/button";

/**
 * BookNook edit modal — Books section.
 * Opens with the OLD data pre-filled (spec rule). Save → PATCH, success
 * toast, parent refreshes its list. Category select uses the same 5
 * categories as Add Book.
 */
const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

export default function EditBookModal({
  open,
  book,
  onClose,
  onSaved,
}: {
  open: boolean;
  book: Book | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  if (!open || !book) return null;

  return (
    <EditBookForm
      key={book._id}
      book={book}
      onClose={onClose}
      onSaved={onSaved}
    />
  );
}

function EditBookForm({
  book,
  onClose,
  onSaved,
}: {
  book: Book;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [category, setCategory] = useState(book.category);
  const [image, setImage] = useState(book.image);
  const [description, setDescription] = useState(book.description);
  const [totalCopies, setTotalCopies] = useState(book.totalCopies);
  const [loading, setLoading] = useState(false);

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      await apiFetch(`/books/${book._id}`, {
        method: "PATCH",
        body: { title, author, category, image, description, totalCopies },
        auth: true,
      });
      toast.success("Book updated successfully!");
      onSaved();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update book.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#E7E5E4] bg-white px-3.5 py-2.5 text-sm text-[#1F2937] transition placeholder:text-[#9CA3AF] focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20 focus:outline-none dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#ECFDF5] dark:placeholder:text-[#6EE7B7]/40 dark:focus:border-[#10B981] dark:focus:ring-[#10B981]/20";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4">
      <form
        onSubmit={handleSave}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[#E7E5E4] bg-white p-6 shadow-2xl sm:p-8 dark:border-[#134E4A] dark:bg-[#073B2E]"
      >
        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-[#E7E5E4] pb-4 dark:border-[#134E4A]">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5] text-lg text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
            ✏️
          </span>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1F2937] sm:text-2xl dark:text-[#F0FDF4]">
              Edit Book Details
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#A7F3D0]">
              Update information for this book in the library catalog.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] dark:text-[#ECFDF5]">
            Book Title <span className="text-red-500">*</span>
            <input required value={title} onChange={(e) => setTitle(e.target.value)} className={`${inputClass} mt-1`} />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] dark:text-[#ECFDF5]">
              Author Name <span className="text-red-500">*</span>
              <input required value={author} onChange={(e) => setAuthor(e.target.value)} className={`${inputClass} mt-1`} />
            </label>

            <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] dark:text-[#ECFDF5]">
              Category <span className="text-red-500">*</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputClass} mt-1 cursor-pointer font-medium`}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-white text-[#1F2937] dark:bg-[#052E22] dark:text-[#ECFDF5]">{c}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] dark:text-[#ECFDF5]">
            Image URL <span className="text-red-500">*</span>
            <input required value={image} onChange={(e) => setImage(e.target.value)} className={`${inputClass} mt-1`} />
          </label>

          <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] dark:text-[#ECFDF5]">
            Short Description <span className="text-red-500">*</span>
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={`${inputClass} mt-1 leading-relaxed`} />
          </label>

          <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] dark:text-[#ECFDF5]">
            Total Copies <span className="text-red-500">*</span>
            <input type="number" min={1} required value={totalCopies} onChange={(e) => setTotalCopies(Math.max(1, Number(e.target.value)))} className={`${inputClass} mt-1 font-bold`} />
          </label>
        </div>

        {/* Modal Buttons */}
        <div className="mt-6 flex gap-3 border-t border-[#E7E5E4] pt-5 dark:border-[#134E4A]">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-[#E7E5E4] py-2.5 font-bold text-[#4B5563] transition hover:bg-[#F3F4F6] dark:border-[#134E4A] dark:text-[#ECFDF5] dark:hover:bg-[#052E22]"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] py-2.5 font-bold text-white shadow-md transition hover:brightness-110 active:scale-[0.99]"
            disabled={loading}
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
