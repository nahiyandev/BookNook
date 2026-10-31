interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarBg: string;
  initials: string;
  quote: string;
  favoriteBook: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Nadia Sultana",
    role: "Literature Student & Book Blogger",
    avatarBg: "bg-emerald-600",
    initials: "NS",
    quote:
      "BookNook completely changed how I read. Instead of buying expensive hardcovers that end up collecting dust, I borrow them for 7 days. It gave me a consistent reading rhythm and connected me with neighbors who love books as much as I do!",
    favoriteBook: "The Midnight Library",
    rating: 5,
  },
  {
    id: "testimonial-2",
    name: "Tanvir Ahmed",
    role: "Software Engineer & Sci-Fi Enthusiast",
    avatarBg: "bg-teal-600",
    initials: "TA",
    quote:
      "I put up 6 of my old physics and sci-fi books on BookNook. Within two days, three neighborhood readers borrowed them. Sharing feels genuinely rewarding, and the zero-fines policy builds true community trust.",
    favoriteBook: "A Brief History of Time",
    rating: 5,
  },
  {
    id: "testimonial-3",
    name: "Farzana Haque",
    role: "Teacher & Parent",
    avatarBg: "bg-amber-600",
    initials: "FH",
    quote:
      "The Kids & Young Readers shelf is pure gold. My 8-year-old now looks forward to borrowing a new illustrated book every weekend. The 1-click wishlist and borrow loop is so smooth and parent-friendly!",
    favoriteBook: "The Little Prince",
    rating: 5,
  },
];

export default function HomeTestimonials() {
  return (
    <section className="bg-[#FDFBF7] py-16 dark:bg-[#052E22] md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#047857] dark:bg-[#073B2E] dark:text-[#6EE7B7]">
            <span>💬</span> Voices of BookNook
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl dark:text-[#F0FDF4]">
            Loved by Readers, Backed by Trust
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[#6B7280] dark:text-[#A7F3D0]">
            Hear from community members who share, borrow, and read books through our peer-to-peer library.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-[#E7E5E4] bg-white p-7 shadow-lg shadow-stone-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#047857]/40 hover:shadow-xl dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl dark:hover:border-[#6EE7B7]/40"
            >
              <div>
                {/* Top: 5-Star Rating & Decorative Quote */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#D97706] dark:text-[#FCD34D]" aria-label="5 stars">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <span className="font-serif text-3xl text-[#E7E5E4] transition group-hover:text-[#047857] dark:text-[#134E4A] dark:group-hover:text-[#6EE7B7]" aria-hidden="true">
                    “
                  </span>
                </div>

                {/* Quote Text */}
                <p className="mt-4 text-sm leading-relaxed text-[#4B5563] dark:text-[#ECFDF5]">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Bottom: Reader Avatar & Info */}
              <div className="mt-6 border-t border-[#E7E5E4] pt-5 dark:border-[#134E4A]">
                <div className="flex items-center gap-3.5">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-xs ${item.avatarBg}`}
                  >
                    {item.initials}
                  </span>
                  <div className="min-w-0">
                    <h4 className="truncate font-serif text-sm font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                      {item.name}
                    </h4>
                    <p className="truncate text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-[#ECFDF5] px-3 py-1.5 text-xs text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
                  <span className="font-bold">Favorite Pick:</span>
                  <span className="truncate italic">{item.favoriteBook}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
