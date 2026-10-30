"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { apiFetch, uploadToImgbb } from "../../lib/api";
import { authClient } from "../../lib/auth-client";
import { Button } from "../../components/ui/button";

/**
 * BookNook Add Book — Books section, PRIVATE route (middleware guards it).
 * Spec fields: Book Title, Author Name, Category (select), Book Image
 * (upload to imgbb), Short Description, User Name + Email (read-only,
 * from the logged-in user), Total Copies, Add Book button. On submit the
 * book is saved with its added date (backend sets addedAt) and a success
 * toast is shown, then the user goes to My Books.
 *
 * Image: pick a FILE to upload to imgbb, OR paste an image URL directly.
 * File wins if both are given. imgbb needs NEXT_PUBLIC_IMGBB_API_KEY
 * (frontend .env.local + Vercel) — without it, file upload fails with a
 * clear toast and the URL option still works.
 */
const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState(1);
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-[#E7E5E4] bg-white px-3 py-2 text-sm text-[#1F2937] focus:border-[#047857] focus:outline-none dark:border-[#134E4A] dark:bg-[#064E3B] dark:text-[#ECFDF5]";

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      let image = imageUrl.trim();
      if (imageFile) image = await uploadToImgbb(imageFile);
      if (!image) throw new Error("Please upload a book image or paste an image URL.");
      await apiFetch("/books", {
        method: "POST",
        body: { title, author, category, image, description, totalCopies },
        auth: true,
      });
      toast.success("Book added successfully!");
      router.push("/my-books");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add book.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold text-[#047857]">Add Book</h1>
      <p className="mt-2 text-sm text-[#6B7280]">
        Share a book from your shelf with other readers.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-sm dark:border-[#134E4A] dark:bg-[#064E3B]"
      >
        <label className="block text-sm font-medium">
          Book Title
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={`${inputClass} mt-1`} />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Author Name
          <input required value={author} onChange={(e) => setAuthor(e.target.value)} className={`${inputClass} mt-1`} />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputClass} mt-1`}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="mt-4 block text-sm font-medium">
          Book Image (upload to imgbb)
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className={`${inputClass} mt-1`}
          />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Or paste an image URL
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://…" className={`${inputClass} mt-1`} />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Short Description
          <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={`${inputClass} mt-1`} />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Total Copies
          <input
            type="number"
            min={0}
            required
            value={totalCopies}
            onChange={(e) => setTotalCopies(Number(e.target.value))}
            className={`${inputClass} mt-1`}
          />
        </label>
        <label className="mt-4 block text-sm font-medium">
          User Name
          <input readOnly value={session?.user?.name || ""} className={`${inputClass} mt-1 bg-[#F9FAFB] dark:bg-[#052E22]`} />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Email
          <input readOnly value={session?.user?.email || ""} className={`${inputClass} mt-1 bg-[#F9FAFB] dark:bg-[#052E22]`} />
        </label>

        <Button type="submit" disabled={loading} className="mt-6 w-full">
          {loading ? "Adding..." : "Add Book"}
        </Button>
      </form>
    </div>
  );
}
