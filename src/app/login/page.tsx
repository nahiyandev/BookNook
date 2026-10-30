"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { authClient } from "../../lib/auth-client";
import { Button } from "../../components/ui/button";

/**
 * BookNook Login — Section 2 (Authentication).
 * Spec fields: Email, Password, Forget Password, Login button, Register link,
 * Google-only social login. Success → desired route (callbackUrl) or Home.
 * Failure → toast + in-form error, never browser alert().
 *
 * Forget Password is shown but NOT implemented, on purpose (spec rule:
 * implementing it would inconvenience the examiner). Clicking it only shows
 * an informational toast — no reset email is sent and no reset page exists.
 *
 * Why the Suspense wrapper? useSearchParams() (for callbackUrl) only works
 * inside a <Suspense> boundary in Next.js App Router — without it, the
 * production build fails. That is a Next.js rule, not a style choice.
 */
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setFormError("");
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: callbackUrl,
    });
    setLoading(false);
    if (error) {
      const message = error.message || "Login failed. Please try again.";
      setFormError(message);
      toast.error(message);
      return;
    }
    toast.success("Logged in successfully!");
    router.push(callbackUrl);
    router.refresh();
  }

  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGoogle() {
    setFormError("");
    setGoogleLoading(true);
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
      if (res?.error) {
        const msg =
          res.error.message ||
          "Google Sign-In is not configured yet. Please configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in Vercel.";
        setFormError(msg);
        toast.error(msg);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google Sign-In failed.";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setGoogleLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[#E7E5E4] bg-white px-3 py-2 text-sm text-[#1F2937] focus:border-[#047857] focus:outline-none dark:border-[#134E4A] dark:bg-[#064E3B] dark:text-[#ECFDF5]";

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-center font-serif text-3xl font-bold text-[#047857]">
        Login
      </h1>
      <p className="mt-2 text-center text-sm text-[#6B7280]">
        Welcome back to BookNook
      </p>

      <form
        onSubmit={handleLogin}
        className="mt-8 rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-sm dark:border-[#134E4A] dark:bg-[#064E3B]"
      >
        <label className="block text-sm font-medium">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`${inputClass} mt-1`}
          />
        </label>

        <label className="mt-4 block text-sm font-medium">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className={`${inputClass} mt-1`}
          />
        </label>

        <div className="mt-3 text-right">
          <button
            type="button"
            onClick={() =>
              toast.info("Password reset is not available in this version.")
            }
            className="text-sm text-[#047857] hover:underline"
          >
            Forget Password?
          </button>
        </div>

        {formError && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950">
            {formError}
          </p>
        )}

        <Button type="submit" disabled={loading} className="mt-6 w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="my-5 flex items-center gap-3 text-xs text-[#9CA3AF]">
          <span className="h-px flex-1 bg-[#E7E5E4]" />
          OR
          <span className="h-px flex-1 bg-[#E7E5E4]" />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogle}
          disabled={loading || googleLoading}
          className="w-full"
        >
          {googleLoading ? "Connecting to Google..." : "Continue with Google"}
        </Button>

        <p className="mt-6 text-center text-sm text-[#6B7280]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-[#047857] hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
