# Copilot Instructions for SochNepal Frontend (Next.js)

## 📘 Project Context

This is the **frontend** of **SochNepal**, a social accountability platform where users can report civic issues in Nepal, such as garbage piles, broken roads, power outages, etc.

The frontend is built with **Next.js**, **Tailwind CSS**, and **TypeScript (optional)** and consumes an API powered by **Django REST Framework** using **JWT authentication**.

---

## 🧠 Copilot — Please Keep in Mind:

### 1. 🧑‍💻 Authentication

-   The app uses **JWT** stored in memory (or localStorage).
-   Login/register should call endpoints like `/auth/jwt/create/` and `/auth/users/`.
-   Authenticated routes should use protected page components or HOC.

### 2. 🗺 Report Features

-   Reports have: `title`, `description`, `category`, `image`, `location (lat/lng)`, and `status` (e.g., pending, resolved).
-   Users can submit new reports and view a feed of existing ones.
-   Show a map with a pin if location data exists (e.g., using Leaflet or Google Maps API).

### 3. 💬 Interactions

-   Each report can be **upvoted**, **commented on**, and **flagged**.
-   Comments are shown in threads under each report.
-   Copilot should assist in designing reusable components for interactions.

### 4. 👥 Roles

-   Users may be regular users or moderators.
-   Moderators can update report statuses (e.g., “in progress”, “resolved”).

### 5. 🧩 Pages to Include

-   `/login` – JWT login form
-   `/register` – user signup
-   `/reports` – list of civic issues
-   `/reports/[id]` – report detail + comments
-   `/submit` – form to create new report
-   Optional: `/dashboard` – moderation tools (if role is moderator)

---

## ✅ Code Style & Structure

-   Use functional components and React hooks.
-   ShadCn and Tailwind CSS is preferred for all styling.
-   Keep components reusable and small.
-   State management can be done using `useState` or a lightweight store like Zustand (if needed).
-   Use `fetch` or `axios` for API calls.

---

## ⚠️ Copilot — Avoid This:

-   Do not suggest server-side auth with cookies; we use **JWT**.
-   Don’t generate class-based components or outdated Next.js patterns (e.g., `_app.tsx` is still used, but `getInitialProps` is discouraged unless necessary).
-   Don’t use unnecessary third-party libraries if native features or simple APIs work.

---

Thanks, Copilot. You’re helping build civic tech for real people. 🇳🇵
