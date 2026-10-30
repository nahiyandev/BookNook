"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "./ui/button";

// Banners are IMPORTED from the repo-root assets/ folder (his guide's
// structure), NOT loaded from a /assets/... URL — root assets/ is not
// served by Next.js, so a URL path would 404 live. Importing also lets
// Next.js optimise the images. Paths: src/components -> ../../assets.
import bannerShelf from "../../assets/banner-01-shelf.jpg";
import bannerReading from "../../assets/banner-02-reading.jpg";
import bannerSharing from "../../assets/banner-03-sharing.jpg";

/**
 * BookNook home banner — Step 6 (Home), "Emerald Reading Room" design.
 * Full-width, ONE big slide at a time (his 2026-10-30 clarification),
 * sliding one after another with autoplay + clickable pagination.
 * All headline text is an HTML overlay — the banner images themselves
 * are clean, with no text baked in (his 2026-10-30 reversal).
 * Slide copy is original; it does NOT copy the demo site's slide text.
 */
const slides = [
  {
    image: bannerShelf,
    title: "A library built by its readers",
    text: "One reader puts a book up, another borrows it, reads it, and returns it. No shop, no waiting list — just readers sharing books.",
  },
  {
    image: bannerReading,
    title: "Find your next read tonight",
    text: "Browse books shared by readers, pick one you like, and borrow it for a few days. Your next favourite book is already on someone's shelf.",
  },
  {
    image: bannerSharing,
    title: "Read it, then pass it on",
    text: "When you finish, return the book so the next reader can enjoy it too. That loop — borrow, read, return — is the whole idea of BookNook.",
  },
];

export default function HomeBanner() {
  return (
    <section
      aria-label="BookNook highlights"
      /* Fixed height lives on a plain HTML element so Tailwind v4
         IntelliSense recognises it and Swiper's inner wrappers can
         use h-full to fill it reliably. */
      style={{ height: "clamp(420px, 52vw, 520px)" }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt=""
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#052E22]/85 via-[#052E22]/50 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-4">
                  <div className="max-w-xl">
                    <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
                      {slide.title}
                    </h1>
                    <p className="mt-4 text-base leading-relaxed text-[#ECFDF5] md:text-lg">
                      {slide.text}
                    </p>
                    <Button render={<Link href="/books" />} nativeButton={false} size="lg" className="mt-6 bg-[#D97706] text-white hover:bg-[#B45309]">Browse Books</Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
