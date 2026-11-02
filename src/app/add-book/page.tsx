"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { apiFetch, uploadToImgbb } from "../../lib/api";
import { authClient } from "../../lib/auth-client";
import { Button } from "../../components/ui/button";


const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState(1);
  const [loading, setLoading] = useState(false);

  function handleFileChange(file: File | null) {
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(imageUrl.trim() || null);
    }
  }

  function handleUrlChange(url: string) {
    setImageUrl(url);
    if (!imageFile) {
      setImagePreview(url.trim() || null);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#E7E5E4] bg-white px-3.5 py-2.5 text-sm text-[#1F2937] transition placeholder:text-[#9CA3AF] focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20 focus:outline-none dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#ECFDF5] dark:placeholder:text-[#6EE7B7]/40 dark:focus:border-[#10B981] dark:focus:ring-[#10B981]/20";

  const readOnlyInputClass =
    "w-full rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] px-3.5 py-2.5 text-sm font-medium text-[#4B5563] cursor-not-allowed select-none dark:border-[#134E4A] dark:bg-[#052E22]/60 dark:text-[#A7F3D0]";

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
      toast.success("Book added successfully to BookNook!");
      router.push("/my-books");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add book.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Breadcrumb navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/my-books"
          className="group inline-flex items-center gap-2 rounded-full border border-[#E7E5E4] bg-white px-4 py-1.5 text-xs font-semibold text-[#047857] shadow-xs transition hover:border-[#047857] hover:bg-[#ECFDF5] dark:border-[#134E4A] dark:bg-[#064E3B] dark:text-[#6EE7B7] dark:hover:bg-[#052E22]"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Back to My Books
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
          <span>Library</span>
          <span>/</span>
          <span className="font-semibold text-[#047857] dark:text-[#6EE7B7]">Contribute</span>
        </div>
      </div>

      {/* Main Form Container Card */}
      <div className="overflow-hidden rounded-3xl border border-[#E7E5E4] bg-white p-6 shadow-xl shadow-stone-200/50 sm:p-10 dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl dark:shadow-black/50">
        {/* Form Header */}
        <div className="border-b border-[#E7E5E4] pb-6 dark:border-[#134E4A]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#047857] shadow-xs dark:bg-[#052E22] dark:text-[#6EE7B7]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl dark:text-[#F0FDF4]">
                Add Book to Library
              </h1>
              <p className="mt-1 text-xs text-[#6B7280] sm:text-sm dark:text-[#A7F3D0]">
                Share a book from your shelf so other readers can borrow, read, and return.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Section 1: Book Essentials (2-column grid) */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] dark:text-[#ECFDF5]">
                Book Title <span className="text-red-500">*</span>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. To Kill a Mockingbird"
                  className={`${inputClass} mt-1.5`}
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] dark:text-[#ECFDF5]">
                Author Name <span className="text-red-500">*</span>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Harper Lee"
                  className={`${inputClass} mt-1.5`}
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] dark:text-[#ECFDF5]">
                Category <span className="text-red-500">*</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`${inputClass} mt-1.5 cursor-pointer font-medium`}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-white text-[#1F2937] dark:bg-[#052E22] dark:text-[#ECFDF5]">
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Section 2: Book Cover Upload & URL with live preview */}
          <div className="rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-5 dark:border-[#134E4A] dark:bg-[#052E22]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
                Book Cover Image <span className="text-red-500">*</span>
              </span>
              <span className="text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
                File upload or image URL
              </span>
            </div>

            <div className="mt-4 grid gap-5 sm:grid-cols-12 sm:items-center">
              {/* Image Input Options (Left) */}
              <div className="space-y-4 sm:col-span-8">
                <div>
                  <label className="block text-xs font-medium text-[#4B5563] dark:text-[#D1FAE5]">
                    Upload Image File (Imgbb)
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                      className={`${inputClass} mt-1.5 file:mr-3 file:rounded-lg file:border-0 file:bg-[#047857] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-white file:transition hover:file:bg-[#065F46]`}
                    />
                  </label>
                </div>

                <div className="relative flex items-center justify-center">
                  <span className="h-px w-full bg-[#E7E5E4] dark:bg-[#134E4A]" />
                  <span className="absolute bg-[#FDFBF7] px-2 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] dark:bg-[#052E22]">
                    Or
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4B5563] dark:text-[#D1FAE5]">
                    Paste Direct Image URL
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder="https://example.com/cover.jpg"
                      className={`${inputClass} mt-1.5`}
                    />
                  </label>
                </div>
              </div>

              {/* Live Preview Box (Right) */}
              <div className="flex flex-col items-center justify-center sm:col-span-4">
                <div className="relative flex aspect-2/3 h-44 w-auto items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#A7F3D0] bg-white shadow-xs dark:border-[#134E4A] dark:bg-[#073B2E]">
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imagePreview}
                      alt="Cover preview"
                      className="h-full w-full object-cover transition"
                      onError={() => setImagePreview(null)}
                    />
                  ) : (
                    <div className="px-3 text-center">
                      <svg className="mx-auto h-8 w-8 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-1 text-[11px] font-medium text-[#9CA3AF]">
                        Cover Preview
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Quantity & Description */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] dark:text-[#ECFDF5]">
                Total Copies <span className="text-red-500">*</span>
                <input
                  type="number"
                  min={1}
                  required
                  value={totalCopies}
                  onChange={(e) => setTotalCopies(Math.max(1, Number(e.target.value)))}
                  className={`${inputClass} mt-1.5 font-bold`}
                />
              </label>
              <p className="mt-1 text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
                Minimum 1 copy for library loan
              </p>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] dark:text-[#ECFDF5]">
                Short Description <span className="text-red-500">*</span>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Share a brief synopsis, why you loved it, or what future readers can look forward to..."
                  className={`${inputClass} mt-1.5 leading-relaxed`}
                />
              </label>
            </div>
          </div>

          {/* Section 4: Contributor Details (Read-only User Info as Spec Requires) */}
          <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 dark:border-[#D97706]/40 dark:bg-[#052E22]">
            <div className="flex items-center justify-between pb-3 border-b border-[#FDE68A]/60 dark:border-[#134E4A]">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#D97706] text-white">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <span className="text-xs font-bold uppercase tracking-wide text-[#92400E] dark:text-[#FBBF24]">
                  Contributor Identity (Read-only)
                </span>
              </div>
              <span className="rounded-full bg-[#D97706]/10 px-2 py-0.5 text-[10px] font-bold text-[#B45309] dark:bg-[#D97706]/20 dark:text-[#FDE68A]">
                Auto-assigned
              </span>
            </div>

            <div className="mt-3.5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-[#78350F] dark:text-[#A7F3D0]">
                  User Name
                  <input
                    type="text"
                    readOnly
                    value={session?.user?.name || "Reader"}
                    className={`${readOnlyInputClass} mt-1`}
                  />
                </label>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#78350F] dark:text-[#A7F3D0]">
                  Email Address
                  <input
                    type="email"
                    readOnly
                    value={session?.user?.email || "reader@booknook.com"}
                    className={`${readOnlyInputClass} mt-1`}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button with Emerald Gradient & Loading State */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Adding Book to Library...</span>
                </span>
              ) : (
                <span>Add Book to Library</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
