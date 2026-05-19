# KELLOG eCommerce

A modern full-stack eCommerce platform built with Next.js 16, React 19, Redux Toolkit, and an Express + Prisma backend. Designed as a clean, responsive shopping experience with product browsing, cart management, wishlist support, authentication, and an admin route structure.

## 🚀 What this project includes

- **Frontend**: `frontend/`
  - Next.js 16 app router
  - React 19 + TypeScript support
  - Redux Toolkit for auth, cart, wishlist, and product state
  - Responsive Tailwind CSS styling
  - `next/image` for optimized images
  - Client-side auth redirect flow with `next` preservation
  - Product card component with quick-add and wishlist actions
  - Splash loader on initial load

- **Backend**: `backend/`
  - Express 5 API server
  - Prisma ORM for database modeling
  - JWT-based auth and session handling
  - Product, category, cart, order, and admin controllers
  - Stripe integration for checkout support
  - Multer file upload middleware

## 📁 Repository structure

```
backend/
  package.json
  prisma/
    schema.prisma
  src/
    controllers/
    middlewares/
    routes/
    utils/
frontend/
  package.json
  public/
  src/
    app/
    components/
    store/
```

## 🧰 Install and run

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend starts on the configured Express port and expects environment variables for database, JWT secret, Stripe keys, and file storage settings.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs with Next.js dev mode and serves the React app at `http://localhost:3000` by default.

## 🔧 Key scripts

### Frontend

- `npm run dev` — run the Next.js app in development
- `npm run build` — build for production
- `npm run start` — start the built app
- `npm run lint` — run ESLint

### Backend

- `npm run dev` — run Express with `nodemon`
- `npm run start` — start Express in production mode

## 💡 Project highlights

- **Auth redirect preservation**: unauthenticated product clicks send users to `/login?next=...`, then return them to the original product page after login.
- **Responsive product card**: consistent product entry points and improved mobile-friendly quick-add behavior.
- **Modern styling and layout**: responsive hero section, a clean shop grid, and mobile nav support.
- **Admin routing structure**: separate admin path ready for dashboard controls.
- **Lazy splash screen**: initial loading splash appears before the main page.

