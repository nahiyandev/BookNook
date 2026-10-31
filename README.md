<div align="center">

# 📚 BookNook
### A Modern, Community-Driven Book Sharing & Borrowing Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-BookNook%20on%20Vercel-047857?style=for-the-badge&logo=vercel&logoColor=white)](https://booknook-lovat.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better--Auth-JWT-amber?style=for-the-badge&logo=auth0&logoColor=white)](https://better-auth.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

<p align="center">
  <b>Borrow • Read • Return</b><br />
  <i>"A library built entirely by its readers — where books never gather dust on home shelves."</i>
</p>

[**Explore Live Website ↗**](https://booknook-lovat.vercel.app) • [**Client Repository**](https://github.com/nahiyandev/BookNook) • [**Report Issue**](https://github.com/nahiyandev/BookNook/issues)

---

<video src="docs/BookNook-Walkthrough-Video-v4-syncfix.mp4" poster="docs/demo-thumbnail.png" controls width="100%"></video>

</div>

## 🌿 Overview & Philosophy

**BookNook** is a 100% user-driven, peer-to-peer community library platform where nobody buys or sells anything. Built entirely around trust and reader exchange, there are no commercial transactions, fees, or monetary barriers:

1. **Share**: Any reader can add books from their personal shelf to the public catalog.
2. **Borrow**: Members borrow available books with instant copy tracking for a 7-day reading period.
3. **Return**: Once finished, readers return the book so the next reader can begin their journey.

---

## ✨ Key Features & Highlights

### 🎨 1. "Emerald Reading Room" Design System
- **Literary Palette**: Handcrafted palette combining Deep Emerald (`#047857`), Warm Amber (`#D97706`), Antique Cream (`#FDFBF7`), and Rich Night Emerald (`#073B2E`/`#052E22`).
- **High-Contrast Dark Mode**: Seamless toggle between cozy light paper tones and deep reading-room dark mode with pristine legibility.
- **100% Responsive Layout**: Fluid mobile, tablet, and desktop experience with touch-optimized targets.

### 🔍 2. Live Search Lens & Shelf Category Filters
- **Interactive Search Lens**: Instant client-side search by book title, author, or keyword with zero latency.
- **Category Filter Pills**: Filter across 5 community shelves (**Fiction**, **Science**, **History**, **Kids**, **Others**) with dynamic live counter badges.
- **Availability Toggle**: Instant filter to view only books currently ready to borrow.

### 🖼️ 3. Full-Width Hero Carousel
- Built with **Swiper.js**, cycling smoothly through 6 curated community banner images (**Library Shelves**, **Window Reading**, **Hand Exchange**, **Kids Corner**, **Historic Archives**, **Science Desk**).
- Starts on a randomized slide on each visit for dynamic variety.

### 📚 4. Complete Book Lifecycle (CRUD)
- **Add Book**: Multi-field form with live image preview, direct **ImgBB API** cover upload, category selection, and contributor signature.
- **Book Details**: Uncropped full-height portrait cover frame, metadata badges, reader overview, and real-time stock indicator.
- **Edit Book Modal**: In-place updates with old data pre-filled, instant feedback, and automatic list refreshing.
- **Custom Confirmation Modal**: Zero default browser alert/confirm dialogues; safe, styled confirmation before deleting books or returning loans.

### 🔄 5. Real-Time Borrow Loop & Wishlist
- **1-Click Wishlist & Save**: Bookmark favorite books from any card or details page (`🔖`), view saved books in dedicated `/wishlist` with live counter in the Navbar and Profile.
- **Copy Tracking**: Borrowing immediately decrements available copies by 1; returning increments it back.
- **Zero-Stock Protection**: At 0 copies, the borrow button disables automatically.
- **Anti-Double Borrow**: A user cannot borrow the same book twice simultaneously.

### 👤 6. Rich Informative Reader Profile
- **Reading Goal Tracker**: Visual milestone progress bar with completion percentage.
- **Community Stat Cards**: Real-time counter of books contributed and currently borrowed loans.
- **Reader Honors**: Community merit badges (**Eco-Reader**, **Shelf Partner**, **Punctual Return**, **Founding Member**).
- **Customizable**: Edit display name, avatar, favorite quote, preferred genres, and reading rhythm.

### 🔐 7. Modern Secure Authentication
- **Multi-Provider Auth**: Powered by **BetterAuth** with MongoDB Adapter.
- **Email & Password**: Client-side password validation (min 6 characters, uppercase + lowercase rules).
- **Google OAuth**: Fast 1-click social sign-in.
- **Protected APIs**: Stateless short-lived JWT tokens attached to protected API requests.

---

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Server Components, routing, SSR, and asset optimization |
| **Language** | **TypeScript 5** | Strict end-to-end type safety |
| **Styling** | **Tailwind CSS v4** | Canonical modern utility classes, design tokens, dark mode |
| **Authentication**| **BetterAuth + JWT** | Session management, OAuth, and API bearer token creation |
| **Database** | **MongoDB Atlas** | Native database adapter for persistent records |
| **Backend API** | **Express.js + Node.js** | RESTful backend handling books and borrow transactions |
| **Interactive UI**| **Swiper.js** | High-performance responsive touch carousel |
| **Notifications** | **React Toastify** | Elegant, accessible toast feedback for all interactions |
| **Image CDN** | **ImgBB API** | Fast cloud hosting for user-uploaded book covers |

---

## 📂 Project Architecture

```plaintext
booknook-client/
├── assets/                  # High-resolution banner assets, logos, and favicons
├── src/
│   ├── app/                 # Next.js App Router routes
│   │   ├── add-book/        # Add book private page with ImgBB upload
│   │   ├── api/auth/        # BetterAuth API route handler
│   │   ├── books/           # All books catalog page & [id] details view
│   │   ├── login/           # Responsive 2-column login with Google OAuth
│   │   ├── my-books/        # User contributed shelf with edit & delete modals
│   │   ├── my-borrows/      # Active loans table with return book flow
│   │   ├── profile/         # Interactive reader profile & stats dashboard
│   │   ├── register/        # Registration page with live password validation
│   │   ├── layout.tsx       # Root layout with theme provider & persistent navbar
│   │   └── page.tsx         # Home page (Hero, Trust Strip, New Arrivals, Steps)
│   ├── components/          # Reusable application components
│   │   ├── ui/              # Button, Navbar, Footer, and core UI primitives
│   │   ├── BookCard.tsx     # Equal-height book presentation card
│   │   ├── ConfirmModal.tsx # Safe deletion/confirmation dialog
│   │   ├── EditBookModal.tsx# Edit book details modal
│   │   ├── EditProfileModal.tsx # Edit reader profile modal
│   │   ├── HomeBanner.tsx   # 6-Slide randomized Swiper carousel
│   │   └── HomeBookExplorer.tsx # Interactive Search Lens + Shelf filter component
│   └── lib/                 # Core utilities and client libraries
│       ├── api.ts           # Centralized API fetch helper & TypeScript interfaces
│       ├── auth-client.ts   # BetterAuth client with JWT plugin
│       ├── auth.ts          # Server authentication configuration
│       ├── config.ts        # Environment configuration
│       └── utils.ts         # Class merging helpers
└── public/                  # Static web assets
```

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/nahiyandev/BookNook.git
cd BookNook
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and configure the required environment variables:

```env
# Backend Express API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=booknook

# BetterAuth Secrets
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (Optional for local social login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ImgBB API for Cover Uploads
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 API Integration Summary

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/books` | Public | Fetch all community books (sorted newest first) |
| **GET** | `/books/:id` | Private | Fetch details for a specific book |
| **POST** | `/books` | Private (JWT) | Contribute a new book to the library |
| **PATCH**| `/books/:id` | Private (JWT) | Edit details of a book added by user |
| **DELETE**| `/books/:id` | Private (JWT) | Remove a book contributed by user |
| **GET** | `/borrows` | Private (JWT) | Fetch current user's active borrowed books |
| **POST** | `/borrows` | Private (JWT) | Borrow an available book copy (7-day loan) |
| **DELETE**| `/borrows/:id` | Private (JWT) | Return a borrowed book copy to the shelf |

---

## 👨‍💻 Developer & Credits

Designed and crafted with care by **Nahiyan**:

- **GitHub**: [@nahiyandev](https://github.com/nahiyandev)
- **LinkedIn**: [Nahiyan on LinkedIn](https://www.linkedin.com/in/nahiyandev)
- **Facebook**: [Nahiyan on Facebook](https://www.facebook.com/nahiyan24)

---

<div align="center">
  <p><sub>© 2026 BookNook Library. Free and open for readers everywhere.</sub></p>
</div>
