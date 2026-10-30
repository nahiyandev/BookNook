import Link from "next/link";
import { Button } from "../components/ui/button";

/**
 * BookNook custom 404 — Section 1 (Client Base).
 * Why this exact filename? Next.js App Router renders `not-found.tsx`
 * automatically for unknown routes. In this section that includes the
 * not-yet-built routes (/books, /add-book, /login …) — showing this page
 * instead of the default 404 proves routing + layout already work.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-serif text-6xl font-bold text-[#047857]">404</h1>
      <h2 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#ECFDF5]">
        Page not found
      </h2>
      <p className="max-w-md text-sm text-[#6B7280] dark:text-[#A7F3D0]">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button render={<Link href="/" />} nativeButton={false}>
        Back to Home
      </Button>
    </div>
  );
}
