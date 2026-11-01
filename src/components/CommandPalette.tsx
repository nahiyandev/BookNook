"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/config";
import type { Book } from "@/lib/api";

interface ActionItem {
  id: string;
  type: "page" | "book";
  title: string;
  subtitle?: string;
  icon: string;
  href: string;
  badge?: string;
  image?: string;
}

const STATIC_PAGES: ActionItem[] = [
  {
    id: "page-home",
    type: "page",
    title: "Home",
    subtitle: "Hero banner, new arrivals & community reviews",
    icon: "🏠",
    href: "/",
    badge: "Main",
  },
  {
    id: "page-books",
    type: "page",
    title: "All Books Catalog",
    subtitle: "Explore and search all community books",
    icon: "📚",
    href: "/books",
    badge: "Catalog",
  },
  {
    id: "page-wishlist",
    type: "page",
    title: "Reading Wishlist",
    subtitle: "Your bookmarked & saved titles",
    icon: "🔖",
    href: "/wishlist",
    badge: "Personal",
  },
  {
    id: "page-add-book",
    type: "page",
    title: "Add a Book to Library",
    subtitle: "Share a book resting on your home shelf",
    icon: "➕",
    href: "/add-book",
    badge: "Contribute",
  },
  {
    id: "page-borrows",
    type: "page",
    title: "My Borrows",
    subtitle: "Active 7-day loans & return history",
    icon: "📖",
    href: "/my-borrows",
    badge: "Loans",
  },
  {
    id: "page-my-books",
    type: "page",
    title: "My Books",
    subtitle: "Manage books you shared with BookNook",
    icon: "📚",
    href: "/my-books",
    badge: "Dashboard",
  },
  {
    id: "page-profile",
    type: "page",
    title: "My Profile",
    subtitle: "Reading milestones, preferences & bio",
    icon: "👤",
    href: "/profile",
    badge: "Account",
  },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Listen for Ctrl+K or Cmd+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("booknook_open_command_palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("booknook_open_command_palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Fetch books once when palette is opened
  useEffect(() => {
    if (!isOpen || books.length > 0) return;
    let active = true;
    fetch(`${API_URL}/books`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Book[]) => {
        if (active && Array.isArray(data)) {
          setBooks(data);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [isOpen, books.length]);

  // Reset selected item when query changes
  const handleQueryChange = (val: string) => {
    setQuery(val);
    setSelectedIndex(0);
  };

  // Filter actions based on query
  const filteredItems = useMemo<ActionItem[]>(() => {
    const q = query.trim().toLowerCase();

    const matchedPages = STATIC_PAGES.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q))
    );

    const matchedBooks: ActionItem[] = books
      .filter((b) => {
        if (!q) return true;
        return (
          b.title?.toLowerCase().includes(q) ||
          b.author?.toLowerCase().includes(q) ||
          b.category?.toLowerCase().includes(q)
        );
      })
      .slice(0, 8)
      .map((b) => ({
        id: `book-${b._id}`,
        type: "book",
        title: b.title,
        subtitle: `by ${b.author} • Shelf: ${b.category}`,
        icon: "📖",
        href: `/books/${b._id}`,
        badge: b.availableCopies > 0 ? `${b.availableCopies} Copies` : "Out of Stock",
        image: b.image,
      }));

    if (!q) {
      return [...STATIC_PAGES, ...matchedBooks.slice(0, 4)];
    }

    return [...matchedPages, ...matchedBooks];
  }, [query, books]);

  // Handle keyboard navigation (Arrow Up, Down, Enter)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filteredItems[selectedIndex];
      if (target) {
        handleSelect(target.href);
      }
    }
  };

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#E7E5E4] bg-white shadow-2xl shadow-emerald-950/25 transition-all dark:border-[#134E4A] dark:bg-[#073B2E]">
        {/* Search Header */}
        <div className="flex items-center gap-3 border-b border-[#E7E5E4] px-5 py-4 dark:border-[#134E4A]">
          <span className="text-xl text-[#047857] dark:text-[#6EE7B7]">🔍</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a book name, author, or destination..."
            className="flex-1 bg-transparent text-sm font-medium text-[#1F2937] placeholder-[#9CA3AF] focus:outline-hidden dark:text-[#F0FDF4] dark:placeholder-[#A7F3D0]/60"
          />
          <kbd className="hidden rounded-lg border border-[#E7E5E4] bg-[#FDFBF7] px-2 py-0.5 text-[10px] font-bold text-[#6B7280] sm:inline-block dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center">
              <span className="text-3xl">📚</span>
              <p className="mt-2 text-sm font-medium text-[#1F2937] dark:text-[#F0FDF4]">
                No matching books or pages found
              </p>
              <p className="mt-1 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                Try searching for &quot;Fiction&quot;, &quot;Science&quot;, or a book title.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.href)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-center justify-between gap-3 rounded-2xl p-3 text-left transition-colors ${
                      isSelected
                        ? "bg-[#ECFDF5] text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]"
                        : "hover:bg-[#FDFBF7] dark:hover:bg-[#052E22]/50 text-[#1F2937] dark:text-[#F0FDF4]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt={item.title}
                          className="aspect-2/3 h-10 w-7 rounded-md object-cover ring-1 ring-black/10 dark:ring-white/10"
                        />
                      ) : (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-2xs dark:bg-[#073B2E]">
                          {item.icon}
                        </span>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-serif text-sm font-bold">
                            {item.title}
                          </span>
                        </div>
                        {item.subtitle && (
                          <p className="truncate text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {item.badge && (
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isSelected
                            ? "bg-[#047857] text-white dark:bg-[#6EE7B7] dark:text-[#052E22]"
                            : "bg-[#E7E5E4]/60 text-[#6B7280] dark:bg-[#134E4A] dark:text-[#A7F3D0]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="flex items-center justify-between border-t border-[#E7E5E4] bg-[#FDFBF7] px-5 py-2.5 text-[11px] text-[#6B7280] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono font-bold">↑↓</kbd> to navigate
            </span>
            <span>
              <kbd className="font-mono font-bold">↵</kbd> to select
            </span>
          </div>
          <span>
            <kbd className="font-mono font-bold">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
