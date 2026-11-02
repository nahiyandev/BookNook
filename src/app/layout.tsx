import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import CommandPalette from "@/components/CommandPalette";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const metadata: Metadata = {
  title: {
    default: "BookNook",
    // A later page that sets title: "All Books" will show as "BookNook | All Books".
    template: "BookNook | %s",
  },
  description:
    "A small online library where readers share books — borrow, read, return.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#FDFBF7] text-[#1F2937] antialiased dark:bg-[#052E22] dark:text-[#ECFDF5]">
        <Suspense fallback={<div className="h-16 w-full border-b border-[#E7E5E4] bg-white dark:border-[#134E4A] dark:bg-[#073B2E]" />}>
          <Navbar />
        </Suspense>
        <CommandPalette />
        <main>{children}</main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
      </body>
    </html>
  );
}
