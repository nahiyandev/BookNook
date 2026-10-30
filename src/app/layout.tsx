import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * BookNook root layout — Section 1 (Client Base).
 *
 * Why Navbar/Footer live HERE and nowhere else: App Router layouts wrap every
 * route automatically. Putting them here once guarantees they appear on all
 * pages (including pages built in later sections) without repeating code.
 *
 * Why ToastContainer lives here too: one container serves the whole app.
 * Later sections only call toast.success() / toast.error() — they never
 * create their own container. No browser alert() is used anywhere.
 *
 * MERGE NOTE: if your existing layout.tsx already has font setup or other
 * metadata, keep those lines and only add the Navbar/Footer/ToastContainer
 * parts below. Do not delete the next-dev agent-rules block from your repo.
 */
export const metadata: Metadata = {
  title: {
    default: "BookNook",
    // A later page that sets title: "All Books" will show as "BookNook | All Books".
    template: "BookNook | %s",
  },
  description:
    "A small online library where readers share books — borrow, read, return.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#FDFBF7] text-[#1F2937] antialiased dark:bg-[#052E22] dark:text-[#ECFDF5]">
        <Navbar />
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
