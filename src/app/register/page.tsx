"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    document.title = "Register | BookNook";
  }, []);

  // Real-time password validations (assignment spec rule)
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase;

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
        signUpError.message || "Registration failed. Please check your information.";
      setFormError(message);
      toast.error(message);
      return;
    }
    toast.success("Registration successful! Please login with your credentials.");
    router.push("/login");
  }

  async function handleGoogle() {
    // Google sign-up redirects directly to Home (spec rule)
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

  return (
    <div className="mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-8 sm:px-6 sm:py-14 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-3xl border border-[#E7E5E4] bg-white shadow-2xl shadow-stone-200/50 lg:grid-cols-12 dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl dark:shadow-black/50">
        {/* Left Column: Brand Story & Member Perks (Visible on lg+) */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-[#047857] via-[#065F46] to-[#052E22] p-10 text-white lg:col-span-5 lg:flex">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#6EE7B7]/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-[#D97706]/15 blur-3xl" />

          {/* Top Branding Header */}
          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-xs ring-1 ring-white/20">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  BookNook
                </span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#A7F3D0]">
                  Borrow • Read • Return
                </p>
              </div>
            </Link>

            <div className="mt-12">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#A7F3D0] backdrop-blur-xs ring-1 ring-white/15">
                <svg className="h-3.5 w-3.5 text-[#FCD34D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Join The Reading Circle</span>
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-white">
                Share what you love. Discover what’s next.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#ECFDF5]/85">
                Become a BookNook reader. Add books from your shelf at home, borrow community favorites, and connect through great stories.
              </p>
            </div>
          </div>

          {/* Member Community Checklist */}
          <div className="relative space-y-3.5 border-t border-white/15 pt-8">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
              <span className="text-xs font-medium text-[#ECFDF5]">
                Borrow books with 1-click confirmation
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </span>
              <span className="text-xs font-medium text-[#ECFDF5]">
                Contribute and manage your books easily
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <span className="text-xs font-medium text-[#ECFDF5]">
                Encrypted credentials & secure access
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Register Form */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-7">
          {/* Mobile Top Brand Header */}
          <div className="mb-6 text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
              <span className="font-serif text-2xl font-bold text-[#047857] dark:text-[#6EE7B7]">
                BookNook
              </span>
            </Link>
          </div>

          <div>
            <h1 className="font-serif text-2xl font-bold text-[#1F2937] sm:text-3xl dark:text-[#F0FDF4]">
              Create Reader Account
            </h1>
            <p className="mt-1.5 text-xs text-[#6B7280] sm:text-sm dark:text-[#A7F3D0]">
              Sign up today and get full access to the shared library.
            </p>
          </div>

          {/* Social Sign-In (Google) */}
          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogle}
              disabled={loading || googleLoading}
              className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#E7E5E4] bg-white py-3 text-xs font-bold text-[#1F2937] shadow-xs transition hover:bg-stone-50 active:scale-[0.99] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4] dark:hover:bg-[#047857]/30"
            >
              <GoogleIcon />
              <span>{googleLoading ? "Connecting to Google..." : "Continue with Google"}</span>
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs font-semibold text-[#9CA3AF] dark:text-[#6EE7B7]/50">
            <span className="h-px flex-1 bg-[#E7E5E4] dark:bg-[#134E4A]" />
            <span>OR REGISTER WITH EMAIL</span>
            <span className="h-px flex-1 bg-[#E7E5E4] dark:bg-[#134E4A]" />
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="register-name"
                className="block text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]"
              >
                Full Name
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[#9CA3AF] dark:text-[#6EE7B7]/60">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  id="register-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Rahman"
                  className="w-full rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] py-2.5 pr-4 pl-10 text-sm text-[#1F2937] placeholder-[#9CA3AF] transition focus:border-[#047857] focus:bg-white focus:ring-2 focus:ring-[#047857]/20 focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4] dark:placeholder-[#6EE7B7]/40 dark:focus:border-[#6EE7B7]"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="register-email"
                className="block text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]"
              >
                Email Address
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[#9CA3AF] dark:text-[#6EE7B7]/60">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  id="register-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] py-2.5 pr-4 pl-10 text-sm text-[#1F2937] placeholder-[#9CA3AF] transition focus:border-[#047857] focus:bg-white focus:ring-2 focus:ring-[#047857]/20 focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4] dark:placeholder-[#6EE7B7]/40 dark:focus:border-[#6EE7B7]"
                />
              </div>
            </div>

            {/* Photo URL (Optional) */}
            <div>
              <label
                htmlFor="register-photo"
                className="block text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]"
              >
                Profile Photo URL <span className="text-[10px] font-normal lowercase text-[#6B7280] dark:text-[#A7F3D0]">(optional)</span>
              </label>
              <div className="relative mt-1.5 flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[#9CA3AF] dark:text-[#6EE7B7]/60">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    id="register-photo"
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://... (image URL)"
                    className="w-full rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] py-2.5 pr-4 pl-10 text-sm text-[#1F2937] placeholder-[#9CA3AF] transition focus:border-[#047857] focus:bg-white focus:ring-2 focus:ring-[#047857]/20 focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4] dark:placeholder-[#6EE7B7]/40 dark:focus:border-[#6EE7B7]"
                  />
                </div>
                {photoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoUrl}
                    alt="Preview"
                    className="h-10 w-10 shrink-0 rounded-xl object-cover ring-1 ring-[#047857]"
                    onError={() => setPhotoUrl("")}
                  />
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="register-password"
                className="block text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]"
              >
                Password
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[#9CA3AF] dark:text-[#6EE7B7]/60">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 chars, uppercase & lowercase"
                  className="w-full rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] py-2.5 pr-10 pl-10 text-sm text-[#1F2937] placeholder-[#9CA3AF] transition focus:border-[#047857] focus:bg-white focus:ring-2 focus:ring-[#047857]/20 focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4] dark:placeholder-[#6EE7B7]/40 dark:focus:border-[#6EE7B7]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center px-1 text-xs text-[#9CA3AF] hover:text-[#1F2937] dark:hover:text-[#F0FDF4]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password Requirement Checklist */}
              {password && (
                <div className="mt-2.5 space-y-1 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] p-2.5 text-[11px] dark:border-[#134E4A] dark:bg-[#052E22]">
                  <div className="flex items-center gap-1.5">
                    <span className={hasMinLength ? "text-emerald-600 font-bold" : "text-stone-400"}>
                      {hasMinLength ? "✓" : "○"}
                    </span>
                    <span className={hasMinLength ? "text-emerald-700 dark:text-emerald-300 font-medium" : "text-[#6B7280] dark:text-[#A7F3D0]"}>
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={hasUppercase ? "text-emerald-600 font-bold" : "text-stone-400"}>
                      {hasUppercase ? "✓" : "○"}
                    </span>
                    <span className={hasUppercase ? "text-emerald-700 dark:text-emerald-300 font-medium" : "text-[#6B7280] dark:text-[#A7F3D0]"}>
                      At least one uppercase letter (A-Z)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={hasLowercase ? "text-emerald-600 font-bold" : "text-stone-400"}>
                      {hasLowercase ? "✓" : "○"}
                    </span>
                    <span className={hasLowercase ? "text-emerald-700 dark:text-emerald-300 font-medium" : "text-[#6B7280] dark:text-[#A7F3D0]"}>
                      At least one lowercase letter (a-z)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {formError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400">
                <p className="font-semibold">{formError}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || (password.length > 0 && !isPasswordValid)}
              className="mt-2 w-full cursor-pointer rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] py-3 text-sm font-bold text-white shadow-md shadow-emerald-900/20 transition hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Free Account →"}
            </Button>
          </form>

          {/* Footer Navigation */}
          <p className="mt-8 text-center text-xs text-[#6B7280] sm:text-sm dark:text-[#A7F3D0]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#047857] underline-offset-4 hover:underline dark:text-[#6EE7B7]"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
