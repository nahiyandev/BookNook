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
    "w-full rounded-lg border border-[#E7E5E4] bg-white px-3 py-2 text-sm text-[#1F2937] focus:border-[#047857] focus:outline-none dark:border-[#134E4A] dark:bg-[#064E3B] dark:text-[#ECFDF5]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <form
        onSubmit={handleSave}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-[#064E3B]"
      >
        <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#ECFDF5]">
          Edit Book
        </h3>
        <label className="mt-4 block text-sm font-medium">
          Book Title
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={`${inputClass} mt-1`} />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Author Name
          <input required value={author} onChange={(e) => setAuthor(e.target.value)} className={`${inputClass} mt-1`} />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputClass} mt-1`}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="mt-3 block text-sm font-medium">
          Image URL
          <input required value={image} onChange={(e) => setImage(e.target.value)} className={`${inputClass} mt-1`} />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Short Description
          <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={`${inputClass} mt-1`} />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Total Copies
          <input type="number" min={0} required value={totalCopies} onChange={(e) => setTotalCopies(Number(e.target.value))} className={`${inputClass} mt-1`} />
        </label>
        <div className="mt-6 flex gap-3">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
