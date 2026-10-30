"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { authClient } from "../../lib/auth-client";
import { Button } from "../../components/ui/button";

/**
 * BookNook Register — Section 2 (Authentication).
 * Spec fields: Name, Email, Photo-URL, Password, Register button, Login link,
 * Google-only social login. Success → Login page (NOT home — see auth.ts:
 * autoSignIn is false, so no session is created here).
 *
 * Password rule (spec, enforced in the FORM, before any API call):
 * at least 6 characters, at least one uppercase letter, at least one
 * lowercase letter. An invalid password is NEVER sent to the server.
 * Email verification is NOT implemented (spec rule — see auth.ts).
 */
export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);

  function passwordError(value: string): string {
    if (value.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(value))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(value))
      return "Password must contain at least one lowercase letter.";
    return "";
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    const error = passwordError(password);
    if (error) {
      setFormError(error);
      toast.error(error);
      return;
    }
    setFormError("");
    setLoading(true);
    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoUrl || undefined,
      callbackURL: "/login",
    });
    setLoading(false);
    if (signUpError) {
      const message =
        signUpError.message || "Registration failed. Please try again.";
      setFormError(message);
      toast.error(message);
      return;
    }
    toast.success("Registration successful! Please login.");
    router.push("/login");
  }

  async function handleGoogle() {
    // Google sign-up goes straight home (spec: social login → Home page).
    setFormError("");
    setGoogleLoading(true);
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
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
        Register
      </h1>
      <p className="mt-2 text-center text-sm text-[#6B7280]">
        Create your BookNook account
      </p>

      <form
        onSubmit={handleRegister}
        className="mt-8 rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-sm dark:border-[#134E4A] dark:bg-[#064E3B]"
      >
        <label className="block text-sm font-medium">
          Name
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className={`${inputClass} mt-1`}
          />
        </label>

        <label className="mt-4 block text-sm font-medium">
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
          Photo URL
          <input
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://… (optional)"
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
            placeholder="Min 6 chars, upper + lower case"
            className={`${inputClass} mt-1`}
          />
        </label>

        {formError && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950">
            {formError}
          </p>
        )}

        <Button type="submit" disabled={loading} className="mt-6 w-full">
          {loading ? "Registering..." : "Register"}
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
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#047857] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
