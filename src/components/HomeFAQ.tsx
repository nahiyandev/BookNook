"use client";

import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    category: "Borrowing",
    question: "How does borrowing a book work on BookNook?",
    answer:
      "Browsing and borrowing is open to all community readers. Once you find a book you'd like to read, simply click 'Borrow Book' on its detail page. The book's available copy count will update automatically and appear in your 'My Borrows' dashboard with a 7-day reading loan.",
  },
  {
    id: "faq-2",
    category: "Community & Trust",
    question: "Can books be bought or sold here, or is it entirely user-driven?",
    answer:
      "No buying, selling, or financial transactions take place on BookNook. It is a peer-to-peer sharing circle run entirely by users. Readers put up books from their personal shelves at home for fellow readers to borrow and return. It is purely community-powered.",
  },
  {
    id: "faq-3",
    category: "Loan Period",
    question: "How long can I keep a book, and can I return it early?",
    answer:
      "The standard reading period is 7 days from the moment you borrow. If you finish reading early, you can return it anytime from your 'My Borrows' page with a single click to free it up for the next reader.",
  },
  {
    id: "faq-4",
    category: "Contributing",
    question: "Can I add my own books from home to BookNook?",
    answer:
      "Yes, absolutely! We encourage all members to share books resting on their shelves. Click 'Add Book' from the navigation bar, enter the title, author, category, available copies, and book cover image URL. Fellow bookworms will immediately be able to borrow it.",
  },
  {
    id: "faq-5",
    category: "Availability",
    question: "What happens when a book has 0 copies available?",
    answer:
      "When all copies are currently with readers, the book's status changes to 'Out of Stock' and borrowing is temporarily paused. You can save it to your Wishlist so you can easily check back once a copy is returned.",
  },
  {
    id: "faq-6",
    category: "Account & Profile",
    question: "Can I track my reading history and edit my profile details?",
    answer:
      "Yes! In your Profile page, you can see your total books added, active borrows, reading wishlist count, and member since date. You can also customize your Bio, reading interests, phone number, and location at any time.",
  },
];

export default function HomeFAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="border-t border-[#E7E5E4] bg-white py-16 dark:border-[#134E4A] dark:bg-[#073B2E] md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Got Questions?</span>
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl dark:text-[#F0FDF4]">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[#6B7280] dark:text-[#A7F3D0]">
            Everything you need to know about sharing, borrowing, and reading within the BookNook community.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "border-[#047857]/60 bg-linear-to-r from-emerald-50/80 via-[#FAFDFB] to-emerald-50/40 shadow-md shadow-emerald-900/5 dark:border-[#6EE7B7]/40 dark:bg-none dark:bg-[#052E22]"
                    : "border-emerald-200/70 bg-linear-to-r from-[#FAFDFB] to-[#F4FAF6] hover:border-[#047857]/40 dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E] dark:hover:border-[#6EE7B7]/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-colors ${
                        isOpen
                          ? "bg-[#047857] text-white dark:bg-[#6EE7B7] dark:text-[#052E22]"
                          : "bg-[#ECFDF5] text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-base font-bold text-[#1F2937] sm:text-lg dark:text-[#F0FDF4]">
                      {faq.question}
                    </span>
                  </div>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E7E5E4] text-[#047857] transition-transform duration-300 dark:border-[#134E4A] dark:text-[#6EE7B7] ${
                      isOpen ? "rotate-180 bg-[#ECFDF5] dark:bg-[#052E22]" : "bg-white dark:bg-[#073B2E]"
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-[#E7E5E4]/70 px-5 pt-3 pb-5 sm:px-6 sm:pb-6 dark:border-[#134E4A]/70">
                    <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base dark:text-[#A7F3D0]">
                      {faq.answer}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[11px] font-semibold text-[#047857] dark:bg-[#073B2E] dark:text-[#6EE7B7]">
                        Topic: {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 rounded-2xl border border-dashed border-[#047857]/30 bg-[#ECFDF5]/50 p-6 text-center dark:border-[#6EE7B7]/30 dark:bg-[#052E22]/50">
          <p className="text-sm font-medium text-[#1F2937] dark:text-[#F0FDF4]">
            Have a question that is not answered here?
          </p>
          <p className="mt-1 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
            Our reader community is always eager to help. Visit our catalog or share your favorite book today.
          </p>
        </div>
      </div>
    </section>
  );
}

