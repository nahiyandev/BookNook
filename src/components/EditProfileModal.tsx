"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export type UserProfileData = {
  name: string;
  avatarUrl: string;
  bio: string;
  location: string;
  favoriteAuthor: string;
  readingGoal: number;
  favoriteGenres: string[];
  readingHabit: string;
};

const AVAILABLE_GENRES = ["Fiction", "Science", "History", "Kids", "Others"];

const READING_HABITS = [
  "Night Owl Reader",
  "Morning Coffee Reader",
  "Weekend Bookworm",
  "Daily Commuter",
  "Casual Explorer",
];

export default function EditProfileModal({
  open,
  initialData,
  onClose,
  onSave,
}: {
  open: boolean;
  initialData: UserProfileData;
  onClose: () => void;
  onSave: (data: UserProfileData) => Promise<void>;
}) {
  const [name, setName] = useState(initialData.name);
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatarUrl);
  const [bio, setBio] = useState(initialData.bio);
  const [location, setLocation] = useState(initialData.location);
  const [favoriteAuthor, setFavoriteAuthor] = useState(initialData.favoriteAuthor);
  const [readingGoal, setReadingGoal] = useState(initialData.readingGoal);
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>(
    initialData.favoriteGenres || []
  );
  const [readingHabit, setReadingHabit] = useState(
    initialData.readingHabit || READING_HABITS[0]
  );
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const toggleGenre = (genre: string) => {
    if (favoriteGenres.includes(genre)) {
      setFavoriteGenres(favoriteGenres.filter((g) => g !== genre));
    } else {
      setFavoriteGenres([...favoriteGenres, genre]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        name,
        avatarUrl,
        bio,
        location,
        favoriteAuthor,
        readingGoal: Number(readingGoal) || 10,
        favoriteGenres,
        readingHabit,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4 py-6">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#E7E5E4] bg-white p-6 shadow-2xl sm:p-8 dark:border-[#134E4A] dark:bg-[#073B2E]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-4 dark:border-[#134E4A]">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </span>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                Edit Profile
              </h2>
              <p className="text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                Update your personal info, reading goals, and community preferences.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-[#9CA3AF] transition hover:bg-stone-100 hover:text-[#1F2937] dark:hover:bg-[#052E22] dark:hover:text-[#F0FDF4]"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5 text-left">
          {/* Avatar Preview & URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
              Profile Photo URL
            </label>
            <div className="mt-2 flex items-center gap-4">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt="Avatar preview"
                  className="h-14 w-14 rounded-2xl object-cover ring-2 ring-[#047857] dark:ring-[#6EE7B7]"
                  onError={() => setAvatarUrl("")}
                />
              ) : (
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECFDF5] font-serif text-xl font-bold text-[#047857] ring-1 ring-[#047857]/30 dark:bg-[#052E22] dark:text-[#6EE7B7]">
                  {name.charAt(0).toUpperCase() || "U"}
                </span>
              )}
              <div className="flex-1">
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="Paste image link (e.g. from imgbb or unsplash)..."
                  className="w-full rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] px-3.5 py-2.5 text-xs text-[#1F2937] transition focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:focus:bg-[#052E22] dark:text-[#F0FDF4] dark:focus:border-[#6EE7B7]"
                />
              </div>
            </div>
          </div>

          {/* Full Name & Location */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
                Display Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your reader name"
                className="mt-1.5 w-full rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1F2937] transition focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:focus:bg-[#052E22] dark:text-[#F0FDF4] dark:focus:border-[#6EE7B7]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
                Location / City
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Dhaka, Bangladesh"
                className="mt-1.5 w-full rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1F2937] transition focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:focus:bg-[#052E22] dark:text-[#F0FDF4] dark:focus:border-[#6EE7B7]"
              />
            </div>
          </div>

          {/* Reader Bio / Quote */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
              Reader Bio or Favorite Quote
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell fellow readers a bit about yourself or your favorite literary quote..."
              className="mt-1.5 w-full rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] p-3 text-sm text-[#1F2937] transition focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:focus:bg-[#052E22] dark:text-[#F0FDF4] dark:focus:border-[#6EE7B7]"
            />
          </div>

          {/* Reading Goal & Favorite Author */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
                Annual Reading Goal (Books)
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={readingGoal}
                onChange={(e) => setReadingGoal(Number(e.target.value))}
                className="mt-1.5 w-full rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1F2937] transition focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:focus:bg-[#052E22] dark:text-[#F0FDF4] dark:focus:border-[#6EE7B7]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
                Favorite Author
              </label>
              <input
                type="text"
                value={favoriteAuthor}
                onChange={(e) => setFavoriteAuthor(e.target.value)}
                placeholder="e.g. Richard Dawkins, Mary Beard"
                className="mt-1.5 w-full rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1F2937] transition focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:focus:bg-[#052E22] dark:text-[#F0FDF4] dark:focus:border-[#6EE7B7]"
              />
            </div>
          </div>

          {/* Reading Habit Vibe */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
              Reading Habit / Style
            </label>
            <select
              value={readingHabit}
              onChange={(e) => setReadingHabit(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1F2937] transition focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:focus:bg-[#052E22] dark:text-[#F0FDF4] dark:focus:border-[#6EE7B7]"
            >
              {READING_HABITS.map((habit) => (
                <option key={habit} value={habit} className="dark:bg-[#073B2E]">
                  {habit}
                </option>
              ))}
            </select>
          </div>

          {/* Favorite Shelves / Genres */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
              Preferred Shelves & Genres (Click to toggle)
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {AVAILABLE_GENRES.map((genre) => {
                const isSelected = favoriteGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#047857] text-white shadow-xs ring-2 ring-[#047857]/30 dark:bg-[#6EE7B7] dark:text-[#052E22]"
                        : "border border-[#E7E5E4] bg-stone-50 text-[#4B5563] hover:border-[#047857] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0]"
                    }`}
                  >
                    {isSelected ? `✓ ${genre}` : `+ ${genre}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3 border-t border-[#E7E5E4] pt-5 dark:border-[#134E4A]">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={saving}
              className="flex-1 rounded-xl border-[#E7E5E4] text-xs font-bold text-[#4B5563] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#ECFDF5]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] text-xs font-bold text-white shadow-md transition hover:brightness-110 active:scale-[0.99]"
            >
              {saving ? "Saving Changes..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

