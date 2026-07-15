# QRForge — QR Code Generator SaaS (starter scaffold)

This is a **working, minimal end-to-end slice** of the full product spec: register → log in → open the
live QR builder → type a value → see a real QR code render → download it. Persisted QR codes show up on
the dashboard. It's built to extend cleanly toward the full feature set (dynamic QR, analytics, Stripe
billing, admin panel, teams) rather than being a pile of stub files.

## What's actually implemented

**Backend** (`/backend`) — Node + Express + TypeScript + Prisma + PostgreSQL
- Prisma schema: `User`, `QRCode`, `QRCodeDesign`, `Folder`, `Tag`, `ScanLog` (with `PlanTier` and `QRType` enums)
- JWT auth (register/login/me) with bcrypt password hashing
- QR CRUD (create/list/get/update/delete/duplicate) scoped to the authenticated user
- Server-side QR rendering (`/api/qr/render`) using the `qrcode` package — used by the live builder preview
  and by download
- Dynamic-QR scan resolution service (`resolveAndLogScan`) — logic is in place; the public `/r/:shortCode`
  redirect route isn't wired up yet (see "Next steps")
- Zod validation, centralized error handling, helmet, CORS, rate limiting

**Frontend** (`/frontend`) — React 19 + Vite + TypeScript + Tailwind + Zustand + React Router
- Login / Register pages wired to the real auth API, session persisted via Zustand
- **Live QR Builder**: left sidebar (type + content), center (live-rendered QR preview, debounced calls to
  the backend render endpoint), right sidebar (color, margin, error correction) — matches the spec's layout
- Dashboard listing the logged-in user's saved QR codes
- Axios client with auth interceptor (attaches JWT, logs out on 401)

Both packages were installed and typechecked (`tsc --noEmit`) and the frontend was run through a full
`vite build` in this environment — no errors. `node_modules` were removed before zipping; the Prisma
query-engine binary itself couldn't be downloaded in this sandbox (network-restricted), but the Prisma
client types generated successfully, so the code compiles. Run `npx prisma generate` after `npm install`
in your own environment.

## What's scaffolded but not built out yet

The full spec (dynamic QR pause/expiry/password/geo-restrict UI, 25+ eye styles, 50+ frames, logo upload,
folders/tags/favorites UI, analytics dashboard + charts, Stripe billing, admin panel, email
verification/Google login, Redis caching, Docker/deploy configs) is **not** in this slice. The data model
and service layers are shaped to support all of it (e.g. `QRCodeDesign.eyeStyle`/`frameStyle`/`logoUrl`
fields already exist; `expiresAt`/`scanLimit`/`passwordHash` already exist on `QRCode`), so adding each
feature is additive rather than a rearchitecture.

## Running it locally

### Backend
```bash
cd backend
npm install
cp .env.example .env        # then point DATABASE_URL at your Postgres instance
npx prisma migrate dev --name init
npm run dev                 # http://localhost:4000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env        # VITE_API_BASE_URL defaults to http://localhost:4000/api
npm run dev                 # http://localhost:5173
```

## Suggested next slice

Pick one and I'll build it the same way (real code, installed, typechecked):
1. Dynamic QR: `/r/:shortCode` public redirect route + pause/expiry/password/scan-limit UI
2. Analytics: scan-log ingestion on redirect + dashboard charts (device/country/time)
3. Design: shape/eye/frame registry + logo upload (Multer) + client-side instant preview (no network round-trip)
4. Billing: Stripe checkout + webhook + plan gating
