<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook project guide

## Keep project notes current

- At the end of every task, review this file and update it so it accurately reflects the current project structure and relevant conventions.
- Keep the folder and file map below in sync with actual changes, including changes made manually by the user. Read current files before updating; preserve user-authored content and do not overwrite unrelated work.
- When dependencies, tools, or significant APIs are added, removed, or begin to be used, update `project-info/packages.json` in the same task.
- Keep the root `README.md` at the repository root; do not move it into another folder.

## Project structure

`	ext
.
+-- assets/                 # BookNook branding and homepage banner images
¦   +-- banner-01-shelf.jpg       # Library shelves and open book
¦   +-- banner-02-reading.jpg    # Reader by a window
¦   +-- banner-03-sharing.jpg    # Book being exchanged
¦   +-- banner-04-kids.jpg       # Children's reading corner
¦   +-- banner-05-history.jpg    # Vintage library reading hall
¦   +-- banner-06-science.jpg    # Science study desk
¦   +-- favicon.ico             # Browser favicon
¦   +-- favicon.png             # PNG favicon
¦   +-- favicon.svg             # SVG favicon
¦   +-- logo-full.svg            # Full BookNook logo and tagline
¦   +-- logo.png                 # PNG logo mark
¦   +-- logo.svg                 # SVG logo mark
¦   +-- README.txt               # Asset descriptions and usage notes
+-- project-info/
¦   +-- packages.json       # Installed dependencies and their purposes
+-- public/                 # Static assets served from the site root
¦   +-- file.svg
¦   +-- globe.svg
¦   +-- next.svg
¦   +-- vercel.svg
¦   +-- window.svg
+-- scripts/
¦   +-- clear-jwks.mjs      # Maintenance script to drop stale BetterAuth JWKS
+-- src/
¦   +-- app/                # Next.js App Router routes, layout, and global styles
¦   ¦   +-- add-book/       # Add Book page (form + imgbb upload)
¦   ¦   +-- api/auth/       # BetterAuth catch-all API handler
¦   ¦   +-- books/          # All Books listing & [id] details page
¦   ¦   +-- login/          # Login page (email/pass + Google OAuth)
¦   ¦   +-- my-books/       # User's added books (with edit & delete)
¦   ¦   +-- my-borrows/     # User's borrowed books (with return action)
¦   ¦   +-- profile/        # User profile page
¦   ¦   +-- register/       # User registration page
¦   ¦   +-- favicon.ico
¦   ¦   +-- globals.css
¦   ¦   +-- layout.tsx
¦   ¦   +-- loading.tsx
¦   ¦   +-- not-found.tsx
¦   ¦   +-- page.tsx        # Homepage (Banner, New Arrivals, Steps, Categories)
¦   +-- components/         # Feature and reusable UI components
¦   ¦   +-- ui/             # Reusable base UI components
¦   ¦   ¦   +-- button.tsx
¦   ¦   ¦   +-- Footer.tsx
¦   ¦   ¦   +-- Navbar.tsx
¦   ¦   +-- BookCard.tsx    # Responsive book card component (4-column grid)
¦   ¦   +-- BorrowButton.tsx
¦   ¦   +-- BorrowModal.tsx
¦   ¦   +-- ConfirmModal.tsx
¦   ¦   +-- EditBookModal.tsx
¦   ¦   +-- FadeIn.tsx      # Framer Motion scroll animation wrapper
¦   ¦   +-- HomeBanner.tsx  # Swiper carousel hero banner
¦   +-- lib/                # Shared utilities and configurations
¦   ¦   +-- api.ts          # Central API helper (apiFetch, uploadToImgbb, types)
¦   ¦   +-- auth-client.ts  # BetterAuth client-side instance
¦   ¦   +-- auth.ts         # BetterAuth server-side instance & adapter config
¦   ¦   +-- config.ts       # Central environment variables & base URL config
¦   ¦   +-- db.ts           # Cached MongoDB client instance
¦   ¦   +-- utils.ts
¦   +-- middleware.ts       # Route guard for protected pages
+-- .vscode/
¦   +-- settings.json       # Workspace settings (Tailwind v4 lint override)
+-- components.json         # shadcn component and alias configuration
+-- eslint.config.mjs       # ESLint configuration
+-- next.config.ts          # Next.js and Turbopack configuration
+-- package.json            # Scripts and dependency manifest
+-- package-lock.json       # Locked npm dependency versions
+-- README.md               # Project setup and usage documentation
+-- tsconfig.json           # TypeScript configuration
`

Generated or installed folders such as `.git/`, `.next/`, and `.node_modules/` are not listed above.

## Backend and API

- The backend is hosted separately on Vercel (`https://book-nook-servar.vercel.app`).
- All requests use `apiFetch` from `src/lib/api.ts` which securely includes JWT tokens when `auth: true`.

## Project commands

- `npm run dev` — start the development server.
- `npm run build` — create a production build.
- `npm run start` — start the production server.
- `npm run lint` — run ESLint.
