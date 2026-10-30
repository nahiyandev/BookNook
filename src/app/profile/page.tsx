import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";
import { Button } from "../../components/ui/button";

/**
 * BookNook My Profile — Section 2 (Authentication), minimal version.
 * Server Component: it reads the session on the server (no client flash of
 * a logged-out page). No session → redirect to Login.
 *
 * Deliberately minimal: name, email, photo only. My Books / My Borrows
 * COUNTS are not shown yet, because those pages do not exist until later
 * sections — showing a fake count would be inventing data. Counts/lists
 * arrive with their own sections, linked from here.
 */
export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/login");

  const user = session.user;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-[#047857]">
        My Profile
      </h1>

      <div className="mt-8 flex items-center gap-5 rounded-2xl border border-[#E7E5E4] bg-white p-6 dark:border-[#134E4A] dark:bg-[#064E3B]">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#047857] text-2xl font-bold text-white">
            {user.name.charAt(0)}
          </span>
        )}
        <div>
          <p className="text-xl font-semibold text-[#1F2937] dark:text-[#ECFDF5]">
            {user.name}
          </p>
          <p className="text-sm text-[#6B7280] dark:text-[#A7F3D0]">
            {user.email}
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button render={<Link href="/my-books" />} variant="outline" nativeButton={false}>My Books</Button>
        <Button render={<Link href="/my-borrows" />} variant="outline" nativeButton={false}>My Borrows</Button>
      </div>
    </div>
  );
}
