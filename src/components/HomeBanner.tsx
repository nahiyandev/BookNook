"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "./ui/button";

// All 6 Banners imported from repo-root assets/ folder
import bannerShelf from "../../assets/banner-01-shelf.jpg";
import bannerReading from "../../assets/banner-02-reading.jpg";
import bannerSharing from "../../assets/banner-03-sharing.jpg";
import bannerKids from "../../assets/banner-04-kids.jpg";
import bannerHistory from "../../assets/banner-05-history.jpg";
import bannerScience from "../../assets/banner-06-science.jpg";

/**
 * BookNook Home Banner — Step 6 (Home).
 * Full-width carousel cycling through all 6 curated community banner images
 * (Shelf, Reading, Sharing, Kids, History, Science).
 * Automatically loops through all banners, starting at a randomized slide.
 */
const slides = [
  {
    image: bannerShelf,
    title: "A library built by its readers",
    text: "One reader puts a book up, another borrows it, reads it, and returns it. No shop, no waiting list — just readers sharing books.",
    badge: "Community Shelf",
  },
  {
    image: bannerReading,
    title: "Find your next read tonight",
    text: "Browse books shared by readers, pick one you like, and borrow it for a few days. Your next favourite book is already on someone's shelf.",
    badge: "Cozy Reading",
  },
  {
    image: bannerSharing,
    title: "Read it, then pass it on",
    text: "When you finish, return the book so the next reader can enjoy it too. That loop — borrow, read, return — is the whole idea of BookNook.",
    badge: "Sharing Loop",
  },
  {
    image: bannerKids,
    title: "Inspire young minds & storytellers",
    text: "Discover picture books, fairy tales, and adventures designed for curious little readers across our community.",
    badge: "Kids & Family",
  },
  {
    image: bannerHistory,
    title: "Step through the corridors of time",
    text: "Explore biographies, historic archives, and classic volumes preserved and shared by passionate history lovers.",
    badge: "History & Classics",
  },
  {
    image: bannerScience,
    title: "Feed your curious scientific mind",
    text: "From cosmos and ecology to breakthrough ideas, explore thoughtful non-fiction and science titles on our shared shelf.",
    badge: "Science & Discovery",
  },
];

export default function HomeBanner() {
  return (
    <section
      aria-label="BookNook highlights"
      style={{ height: "clamp(440px, 52vw, 540px)" }}
      className="relative w-full overflow-hidden"
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          // Start at a random slide on mount so every visit starts with a different scene
          const randomIdx = Math.floor(Math.random() * slides.length);
          if (randomIdx > 0) {
            swiper.slideToLoop(randomIdx, 0);
          }
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.badge}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                className="object-cover"
              />
              {/* Rich Emerald gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-[#052E22]/90 via-[#052E22]/60 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="max-w-xl">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D97706]/90 px-3 py-1 text-xs font-bold text-white shadow-xs backdrop-blur-xs">
                      <span>✨</span>
                      <span>{slide.badge}</span>
                    </span>

                    <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                      {slide.title}
                    </h1>

                    <p className="mt-4 text-sm leading-relaxed text-[#ECFDF5] sm:text-base md:text-lg">
                      {slide.text}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Button
                        render={<Link href="/books" />}
                        nativeButton={false}
                        size="lg"
                        className="rounded-xl bg-linear-to-r from-[#D97706] to-[#B45309] px-6 text-sm font-bold text-white shadow-md transition hover:brightness-110 active:scale-[0.99]"
                      >
                        Browse All Books →
                      </Button>
                      <Button
                        render={<Link href="/add-book" />}
                        nativeButton={false}
                        variant="outline"
                        size="lg"
                        className="rounded-xl border-white/40 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur-xs transition hover:bg-white/20 active:scale-[0.99]"
                      >
                        Add a Book ➕
                      </Button>
                    </div>
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
