# BookNook — A Small Online Library

**Live website:** https://booknook-lovat.vercel.app

BookNook is a small online library where readers share books with each
other. There is no admin and no author role — one user puts a book up,
another user borrows it, reads it, and returns it. Add a book, borrow a
book, return a book.

## Features

- **Browse all books:** a public grid of every book in the library, with
  cover image, title, author, and category on each card.
- **Book details and borrowing:** a private details page with full book
  info, who added it, and copies left, plus a borrow modal with the
  borrower's name and email pre-filled (read-only).
- **Add a book:** a private form with title, author, category, short
  description, total copies, and a cover image uploaded through imgbb
  (or pasted as an image URL). The book is saved with the date it was
  added and the user who added it.
- **My Books — edit and delete:** each user sees only the books they
  added, edits them in a pre-filled form, and deletes them only after a
  custom confirmation modal (never the browser's default confirm).
- **Borrow system with copy counting:** borrowing decreases available
  copies by one and returning increases them by one. At zero copies the
  Borrow button becomes "Not Available".
- **No double borrow:** a user cannot borrow the same book twice at the
  same time; a second attempt shows an error toast.
- **My Borrows and returns:** a private table of the user's borrowed
  books with image, title, borrow date, return date, and a Return button.
- **Authentication and protected APIs:** email/password and Google
  sign-in with BetterAuth and MongoDB, private routes that redirect to
  Login and back, and JWT verification on the backend for protected
  routes.
- **Home page:** a full-width Swiper banner with at least three slides,
  a dynamic New Arrivals section showing the latest six books, a
  "How Borrowing Works" section, and Top Categories.
- **Polish:** dark/light theme toggle, responsive layout for mobile,
  tablet and desktop, loading spinner, custom 404 page, a per-route
  page title, toast messages for every success and error (no browser
  alerts, no Lorem ipsum text), and fade-in animation with Framer Motion.

## Tech stack

- Frontend: Next.js (App Router), TypeScript, shadcn UI, Tailwind CSS,
  BetterAuth with MongoDB Adapter, JWT, Swiper, Framer Motion,
  React Toastify.
- Backend: Express.js, MongoDB (separate server repository).
- Image hosting: imgbb.

## Run locally

```bash
npm install
npm run dev
```

Create a `.env.local` file at the repository root with (names only —
never commit real values):

```
NEXT_PUBLIC_API_URL=
MONGODB_URI=
MONGODB_DB=booknook
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_IMGBB_API_KEY=
```

Then open http://localhost:3000. The backend API must be running
separately (locally on the URL in `NEXT_PUBLIC_API_URL`, or the live
server) for book and borrow data to load.
