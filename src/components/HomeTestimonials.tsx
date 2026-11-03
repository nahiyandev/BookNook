"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface ReviewCard {
  id: string;
  name: string;
  handle: string;
  avatarBg: string;
  initials: string;
  badge: string;
  badgeType: "borrower" | "donor";
  timestamp: string;
  location: string;
  rating: number;
  review: string;
  bookTag: string;
  likes: number;
  replies: number;
}

const reviews: ReviewCard[] = [
  {
    id: "rev-1",
    name: "Nadia Sultana",
    handle: "@nadia_reads",
    avatarBg: "bg-emerald-600",
    initials: "NS",
    badge: "Verified Borrower",
    badgeType: "borrower",
    timestamp: "Yesterday at 9:42 PM",
    location: "Dhanmondi, Dhaka",
    rating: 5,
    review:
      "Honestly didn't expect the 7-day borrowing to be this smooth! Borrowed 'The Midnight Library', finished it over the weekend, and returned it from the dashboard with zero fuss. No commercial hurdles, just readers sharing directly. BookNook is a blessing for readers.",
    bookTag: "Borrowed: The Midnight Library",
    likes: 38,
    replies: 4,
  },
  {
    id: "rev-2",
    name: "Tanvir Ahmed",
    handle: "@tanvir_codes",
    avatarBg: "bg-teal-600",
    initials: "TA",
    badge: "Book Donor & Reader",
    badgeType: "donor",
    timestamp: "2 days ago",
    location: "Uttara, Dhaka",
    rating: 5,
    review:
      "Listed 6 of my old computer science and sci-fi books that were just sitting on my bedroom shelf. Within 48 hours, two junior students borrowed 'Clean Code' and 'Sapiens'. The feeling of passing books forward instead of letting them gather dust is unmatched.",
    bookTag: "Shared: Clean Code & Sapiens",
    likes: 52,
    replies: 9,
  },
  {
    id: "rev-3",
    name: "Farzana Haque",
    handle: "@farzana_teacher",
    avatarBg: "bg-amber-600",
    initials: "FH",
    badge: "Verified Parent",
    badgeType: "borrower",
    timestamp: "3 days ago",
    location: "Gulshan, Dhaka",
    rating: 5,
    review:
      "The Kids & Young Readers shelf is such a delight for our home! My 8-year-old daughter now reads a new illustrated story every single week shared by other parents. She was so excited to pick them out herself! Safe, cozy, and completely community-driven.",
    bookTag: "Borrowed: The Little Prince",
    likes: 29,
    replies: 2,
  },
  {
    id: "rev-4",
    name: "Arif Chowdhury",
    handle: "@arif_bookshelf",
    avatarBg: "bg-indigo-600",
    initials: "AC",
    badge: "Avid Borrower",
    badgeType: "borrower",
    timestamp: "Oct 28 at 11:15 AM",
    location: "Chattogram",
    rating: 5,
    review:
      "I love that BookNook is entirely user-driven and runs purely on mutual respect. The 7-day loan countdown on the My Borrows page keeps me accountable and reading consistently without any pressure. Five stars to the creators!",
    bookTag: "Borrowed: Atomic Habits",
    likes: 44,
    replies: 6,
  },
  {
    id: "rev-5",
    name: "Mehnaz Kabir",
    handle: "@mehnaz_reads",
    avatarBg: "bg-rose-600",
    initials: "MK",
    badge: "Verified Reader",
    badgeType: "borrower",
    timestamp: "Oct 26 at 4:30 PM",
    location: "Sylhet",
    rating: 5,
    review:
      "The Wishlist feature is fantastic! Whenever a book like 'Project Hail Mary' is out of stock, I just bookmark it and check back when the copy is returned. Clean UI, dark mode looks gorgeous too.",
    bookTag: "Borrowed: Project Hail Mary",
    likes: 31,
    replies: 3,
  },
  {
    id: "rev-6",
    name: "Zubair Al-Mamun",
    handle: "@zubair_shelf",
    avatarBg: "bg-emerald-700",
    initials: "ZM",
    badge: "Book Donor",
    badgeType: "donor",
    timestamp: "Oct 24 at 8:05 PM",
    location: "Mirpur, Dhaka",
    rating: 5,
    review:
      "Added 4 Bengali literature classics here. Got notified when a university student borrowed one for her research. Love the community ethos, the trust loop, and the emerald reading room design.",
    bookTag: "Shared: Ekattorer Dinguli",
    likes: 63,
    replies: 11,
  },
];

export default function HomeTestimonials() {
  return (
    <section className="bg-[#FDFBF7] py-16 dark:bg-[#052E22] md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#047857] dark:bg-[#073B2E] dark:text-[#6EE7B7]">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Verified Community Reviews</span>
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl dark:text-[#F0FDF4]">
            Loved by Readers, Backed by Trust
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[#6B7280] dark:text-[#A7F3D0]">
            Real feedback captured from readers across Bangladesh borrowing and sharing books on BookNook.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#047857] dark:text-[#6EE7B7]">
            <span>Swipe to explore reader stories</span>
          </div>
        </div>

        {/* Swiper Review Carousel */}
        <div className="mt-10 pb-8">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="pb-14!"
          >
            {reviews.map((rev) => (
              <SwiperSlide key={rev.id} className="h-auto">
                {/* Authentic "App Review Screenshot / Social Proof" Card */}
                <div className="flex h-full flex-col justify-between rounded-3xl border border-emerald-200/90 bg-linear-to-b from-[#FAFDFB] via-[#F4FAF6] to-[#EAF5EF] p-6 shadow-xl shadow-emerald-950/5 transition-all duration-300 hover:border-[#047857] hover:shadow-2xl dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl dark:hover:border-[#6EE7B7]/40">
                  {/* Card Header — Social Style */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-xs ${rev.avatarBg}`}
                        >
                          {rev.initials}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="truncate font-serif text-sm font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                              {rev.name}
                            </h4>
                            <span
                              className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#047857] text-[10px] text-white dark:bg-[#6EE7B7] dark:text-[#052E22]"
                              title="Verified Community Member"
                            >
                              ✓
                            </span>
                          </div>
                          <p className="truncate text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
                            {rev.handle} • {rev.location}
                          </p>
                        </div>
                      </div>

                      {/* Timestamp Pill */}
                      <span className="shrink-0 rounded-md bg-[#FDFBF7] px-2 py-0.5 text-[10px] font-medium text-[#6B7280] dark:bg-[#052E22] dark:text-[#A7F3D0]">
                        {rev.timestamp}
                      </span>
                    </div>

                    {/* Star Rating & Verified Pill */}
                    <div className="mt-4 flex items-center justify-between gap-2 border-y border-[#E7E5E4]/60 py-2 dark:border-[#134E4A]/60">
                      <div className="flex items-center gap-1 text-sm text-[#D97706] dark:text-[#FCD34D]" aria-label="5 out of 5 stars">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                        <span className="ml-1 text-xs font-bold text-[#1F2937] dark:text-[#F0FDF4]">5.0</span>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          rev.badgeType === "donor"
                            ? "bg-amber-50 text-[#D97706] dark:bg-amber-950/40 dark:text-[#FCD34D]"
                            : "bg-[#ECFDF5] text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]"
                        }`}
                      >
                        ✓ {rev.badge}
                      </span>
                    </div>

                    {/* Review Body */}
                    <div className="mt-3.5">
                      <p className="text-xs leading-relaxed text-[#374151] sm:text-sm dark:text-[#ECFDF5]">
                        &ldquo;{rev.review}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Card Footer — Book Reference & Social Engagement Bar */}
                  <div className="mt-5 border-t border-[#E7E5E4]/80 pt-3.5 dark:border-[#134E4A]/80">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate rounded-lg bg-[#ECFDF5] px-2.5 py-1 text-[11px] font-semibold text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
                        {rev.bookTag}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
                      <span className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 text-rose-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span>{rev.likes} Found helpful</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{rev.replies} replies</span>
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
