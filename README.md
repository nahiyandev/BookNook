<div align="center">

# BookNook
### A Modern, Community-Driven Book Sharing and Circulation Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-BookNook%20on%20Vercel-047857?style=for-the-badge&logo=vercel&logoColor=white)](https://booknook-lovat.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better--Auth-JWT-D97706?style=for-the-badge&logo=auth0&logoColor=white)](https://better-auth.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

<p align="center">
  <b>Borrow • Read • Return</b><br />
  <i>"A library built entirely by its readers — where stories travel freely from shelf to shelf."</i>
</p>

[**Explore Live Website**](https://booknook-lovat.vercel.app) • [**Source Code Repository**](https://github.com/nahiyandev/BookNook) • [**Report Issue**](https://github.com/nahiyandev/BookNook/issues)

---

</div>

## Overview and Philosophy

**BookNook** is a non-commercial, peer-to-peer community library platform designed to connect avid readers through shared physical books. The system is built entirely on community trust and free circulation:

1. **Share**: Members add books resting on their home shelves into the shared library catalog.
2. **Borrow**: Any authenticated member can borrow available copies for a structured 7-day reading period.
3. **Return**: Once finished, borrowers return books with a single click, instantly restoring stock for fellow readers.
4. **Zero Monetary Barrier**: No sales, no subscription fees, and no financial transactions — pure knowledge sharing.

---

## Core Features and Capabilities

### 1. Editorial Visual Design System
- **Emerald Reading Room Palette**: Custom brand palette utilizing Deep Emerald (`#047857`), Warm Amber (`#D97706`), Soft Cream (`#FDFBF7`), and Dark Emerald Night (`#073B2E` / `#052E22`).
- **High-Contrast Dark Mode**: Instant, flicker-free toggle between warm paper daylight and cozy dark mode with full persistence via local storage and system events.
- **Pure Vector Iconography**: Clean, consistent SVG vector icons across all pages, controls, and dialogs.
- **Mobile-First Responsive Layout**: Optimized navigation, scalable logo typography, and touch-friendly controls across smartphones, tablets, and desktops.

### 2. Book Discovery and Catalog Management
- **Curated Home Showcase**: Displays fresh additions without clutter, accompanied by randomized community banner scenes and platform trust highlights.
- **Complete Library Catalog**: Comprehensive `/books` route equipped with a real-time search lens, keyword matching across title and author, and category shelf counters (**Fiction**, **Science**, **History**, **Kids**, **Others**).
- **Live Availability Filter**: One-click filter to display only books with active inventory ready to borrow.
- **Command Palette (Ctrl + K / Cmd + K)**: Universal spotlight search modal accessible from any screen for rapid navigation and instant book lookups.

### 3. Complete Book Lifecycle (CRUD)
- **Add Book**: Multi-field submission form supporting live cover preview, direct cloud image uploads via **ImgBB API**, category assignment, and automatic contributor attribution.
- **Book Details Page**: Dynamic route featuring uncropped high-definition cover art, live availability badge, contributor metadata, and borrowing trigger.
- **Edit Book Dialog**: Accessible in-place modal pre-populated with current details for authorized contributors.
- **Safe Confirm Dialogs**: Custom, accessible modal dialogues that eliminate default browser prompts for actions like book removal and loan returns.

### 4. Real-Time Borrowing and Wishlist Loop
- **Instant Stock Tracking**: Borrowing immediately decrements available copies in the database; returning increments availability instantly.
- **Zero-Stock Guard**: When all copies are circulating, the borrow button automatically disables with a clear "Out of Stock" indicator.
- **Anti-Duplicate Borrowing**: Prevents users from borrowing multiple simultaneous copies of the exact same title.
- **Reading Wishlist**: Bookmark favorite titles from any card or details view. Dedicated `/wishlist` management page with quick-clear and navigation triggers.

### 5. Reader Profile and Session Dashboard
- **Reading Goal Tracker**: Interactive progress bar visualizing completed loans against reader-defined annual targets.
- **Real-Time KPI Counters**: Accurate metric counters for books contributed, active loans, and wishlist items with skeleton pulse loading states.
- **Community Merit Honors**: Activity badges honoring reader dedication (**Eco-Reader**, **Shelf Partner**, **Punctual Return**, **Founding Member**).
- **Profile Customization**: In-place modal to modify bio, favorite genres, reading habits, location, and avatar image.

### 6. Authentication and Security
- **Multi-Factor Auth Architecture**: Powered by **BetterAuth** with MongoDB session persistence.
- **Email and Password Sign-In**: Client-validated password requirements (minimum 6 characters, uppercase, and lowercase characters).
- **Google Social Authentication**: Rapid one-click Google OAuth sign-in.
- **Stateless Bearer JWTs**: API requests are protected via cryptographically signed JSON Web Tokens.
- **Fast Session State Caching**: Zero-delay client state resolution eliminates login/register flashing on page reloads.
- **Sign Out Confirmation**: Accessible confirmation dialogue before destroying active sessions.

---

## Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Hybrid SSR, Partial Prerendering (PPR), Turbopack build system |
| **UI Library** | **React 19** | Concurrent rendering, modern hooks, and action paradigms |
| **Language** | **TypeScript 5** | Strict end-to-end static type checking |
| **Styling** | **Tailwind CSS v4** | Modern utility-first styling with custom OKLCH color variables |
| **UI Primitives** | **Base UI / Shadcn** | Accessible headless primitives for modals, dialogs, and buttons |
| **Authentication** | **BetterAuth + JWT** | Session handling, OAuth flows, and microservice token issuance |
| **Database** | **MongoDB Atlas** | Document store for books, circulation records, and users |
| **Backend API** | **Express.js + Node.js** | RESTful service managing book persistence and borrow state |
| **Carousel** | **Swiper.js** | Responsive, touch-enabled hero slider |
| **Feedback** | **React Toastify** | Non-intrusive toast notifications for user interactions |
| **Image CDN** | **ImgBB API** | Cloud storage for contributor book cover uploads |

---

## Project Structure

```plaintext
booknook-client/
├── assets/                          # High-resolution banners, logos, and vector favicons
├── public/                          # Static public web assets and favicon files
├── src/
│   ├── app/                         # Next.js App Router route segments
│   │   ├── add-book/                # Private route: Contributor book upload form
│   │   ├── api/auth/[...all]/       # BetterAuth API handler endpoint
│   │   ├── books/                   # Catalog page and [id] details view
│   │   ├── login/                   # Responsive authentication page with Google OAuth
│   │   ├── my-books/                # Private route: User-contributed book management
│   │   ├── my-borrows/              # Private route: Active loans with return workflow
│   │   ├── profile/                 # Private route: Reader profile and metric stats
│   │   ├── register/                # User registration with real-time validation
│   │   ├── wishlist/                # Saved books reading list
│   │   ├── layout.tsx               # Root application shell with title template and theme
│   │   ├── not-found.tsx            # Custom 404 error page
│   │   └── page.tsx                 # Home landing page
│   ├── components/                  # Application components
│   │   ├── ui/                      # Design system primitives (Button, Dialog, Navbar, Footer)
│   │   ├── BookCard.tsx             # Universal responsive book display card
│   │   ├── BookReviewsSection.tsx   # Reader review and rating module
│   │   ├── BorrowButton.tsx         # Context-aware borrow action button
│   │   ├── BorrowModal.tsx          # Borrow loan duration confirmation dialog
│   │   ├── CommandPalette.tsx       # Spotlight search overlay (Ctrl + K)
│   │   ├── ConfirmModal.tsx         # Action confirmation modal
│   │   ├── EditBookModal.tsx        # In-place book update modal
│   │   ├── EditProfileModal.tsx     # Profile preferences modal
│   │   ├── HomeBanner.tsx           # Swiper hero carousel
│   │   ├── HomeBookExplorer.tsx     # Filterable and searchable book grid
│   │   ├── HomeFAQ.tsx              # Frequently asked questions accordion
│   │   ├── HomeGenres.tsx           # Curated reading genres showcase
│   │   ├── HomeImpactCounter.tsx    # Community milestones and statistics
│   │   ├── HomeTestimonials.tsx     # Verified member review testimonials
│   │   ├── SignOutConfirmDialog.tsx # Safe sign-out confirmation dialogue
│   │   └── WishlistActionButton.tsx # Book save and share action trigger
│   └── lib/                         # Shared libraries and utilities
│       ├── api.ts                   # Centralized API fetcher with token authorization
│       ├── auth-client.ts           # Client-side BetterAuth instance with JWT support
│       ├── auth.ts                  # Server-side BetterAuth configuration
│       ├── config.ts                # Application configuration and environment constants
│       ├── utils.ts                 # Classname merge helper (clsx / tailwind-merge)
│       └── wishlist.ts              # LocalStorage-backed reactive wishlist store
├── components.json                  # Shadcn UI configuration file
├── next.config.ts                   # Next.js compiler and Turbopack options
└── package.json                     # Project dependencies and script declarations
```

---

## Getting Started Locally

### 1. Prerequisites
- Node.js (version 20 or higher recommended)
- npm or pnpm
- Running instance of MongoDB Atlas or local MongoDB
- BookNook Express backend service running (default: `http://localhost:5000`)

### 2. Clone the Repository
```bash
git clone https://github.com/nahiyandev/BookNook.git
cd BookNook/booknook-client
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the `booknook-client` root directory:

```env
# Backend REST API Endpoint
NEXT_PUBLIC_API_URL=http://localhost:5000

# BetterAuth Configuration
BETTER_AUTH_SECRET=your_generated_secret_key
BETTER_AUTH_URL=http://localhost:3000

# MongoDB Database Connection
MONGO_URI=your_mongodb_connection_string

# Google OAuth Credentials (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ImgBB API Key for Book Cover Uploads
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

### 5. Run the Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the application.

---

## API Reference Summary

All protected endpoints require an `Authorization: Bearer <JWT>` header, which the frontend automatically requests and attaches via `apiFetch()`.

| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| **GET** | `/books` | Public | Fetch all community books (sorted newest first) |
| **GET** | `/books/:id` | Public | Fetch full record and details for a single book |
| **POST** | `/books` | Authenticated | Publish a new book to the library catalog |
| **PATCH** | `/books/:id` | Author Only | Update book details (title, category, cover, copies) |
| **DELETE** | `/books/:id` | Author Only | Remove a book contributed by the authenticated user |
| **GET** | `/borrows` | Authenticated | Retrieve the active borrowed loans of the current user |
| **POST** | `/borrows` | Authenticated | Borrow an available copy (creates 7-day loan, decrements stock) |
| **DELETE** | `/borrows/:id` | Authenticated | Return a borrowed loan (increments stock, deletes record) |

---

## Author and Contact

Developed and maintained by **Nahiyan**:

- **GitHub**: [github.com/nahiyandev](https://github.com/nahiyandev)
- **LinkedIn**: [linkedin.com/in/nahiyandev](https://www.linkedin.com/in/nahiyandev)
- **Facebook**: [facebook.com/nahiyan24](https://www.facebook.com/nahiyan24)

---

<div align="center">
  <sub>Copyright 2026 BookNook Platform. Open community library for readers everywhere.</sub>
</div>
