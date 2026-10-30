/**
 * BookNook loading state — Section 1 (Client Base).
 * Why this exact filename? Next.js App Router renders `loading.tsx`
 * automatically while a route is loading — no wiring is needed anywhere else.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-[#D1FAE5] border-t-[#047857]"
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm text-[#374151] dark:text-[#D1FAE5]">Loading...</p>
    </div>
  );
}
