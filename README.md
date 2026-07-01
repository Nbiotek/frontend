# NBiotek Frontend

A comprehensive medical diagnostics and laboratory services platform built with Next.js 15. The system supports multi-role workflows across patients, doctors, lab technicians, lab coordinators, receptionists, marketers, and administrators.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [User Roles & Access](#user-roles--access)
- [Route Architecture](#route-architecture)
- [State Management](#state-management)
- [API Layer](#api-layer)
- [Scripts](#scripts)

---

## Overview

NBiotek is a SaaS platform for Nigeria's healthcare and diagnostics sector. Key capabilities include:

- **Lab test booking & results delivery** — Patients order tests, results are delivered digitally
- **Appointment management** — Scheduling, booking, and tracking across all roles
- **E-commerce storefront** — Online purchasing of tests and medical products
- **Doctor referrals & result review** — Physicians review results and issue referrals
- **Lab operations** — Technicians execute tests, coordinators manage inventory and QC
- **Content management** — Admins manage landing page heroes, testimonials, partners, and pricing
- **Push notifications** — Firebase-powered real-time alerts

---

## Tech Stack

| Category      | Library                                 |
| ------------- | --------------------------------------- |
| Framework     | Next.js 15.1.9 (App Router)             |
| Language      | TypeScript 5                            |
| Styling       | Tailwind CSS 3.4 + shadcn/ui (Radix UI) |
| Client State  | MobX 6 + mobx-react-lite                |
| Server State  | TanStack React Query 5                  |
| Tables        | TanStack React Table 8                  |
| Forms         | React Hook Form + Zod                   |
| HTTP Client   | Axios                                   |
| Auth          | NextAuth v4 + JWT                       |
| Animations    | Framer Motion                           |
| Charts        | Recharts                                |
| Calendar      | FullCalendar                            |
| Storage       | AWS S3 SDK / Cloudflare R2              |
| Notifications | Firebase Messaging                      |
| Testing       | Vitest + @vitest/coverage-v8            |
| Linting       | ESLint 9 + Prettier                     |
| Git Hooks     | Husky                                   |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (website)/              # Public-facing pages
│   ├── (modules)/              # Authenticated role-based pages
│   ├── auth/                   # Authentication flows
│   ├── api/                    # API route handlers
│   ├── Provider.tsx            # React context providers
│   └── globals.css
├── atoms/                      # Atomic UI components (buttons, fields, modals, etc.)
├── components/                 # Feature-level components (Header, Footer, Dashboard, Cart)
├── constants/                  # Static config (routes, API endpoints, enums)
├── hooks/                      # Custom hooks organized by role
├── lib/                        # Utility helpers (Tailwind cn, SVG)
├── requests/                   # API request functions organized by domain
├── server/                     # Server-side utilities
├── store/                      # MobX stores organized by domain
├── types/                      # TypeScript type definitions (.d.ts)
└── utils/                      # General utilities (date, currency, logger, etc.)
```

### Key Directories

**`src/atoms/`** — Reusable primitive components: `Buttons`, `Cards`, `fields`, `modal`, `Table`, `Loaders`, `Toast`, `typographys`, `pagination`

**`src/hooks/`** — Hooks organized by role: `admin/`, `doctor/`, `patient/`, `labTech/`, `labCoord/`, `marketer/`, `recpst/`, `settings/`, plus generic hooks (`useDebounce`, `useMediaQuery`, `useOutsideClick`, `useInView`)

**`src/store/`** — MobX stores: `AuthStore`, `PatientStore`, `AdminStore`, `DoctorStore`, `LabTechStore`, `LabCoordStore`, `ReceptionistStore`, `CartStore`, `NotificationStore`, `SettingsStore`, `AppConfig`

**`src/requests/`** — Axios-based API functions: `admin.ts`, `patient.ts`, `doctor.ts`, `lab-coord.ts`, `lab-tech.ts`, `appointments.ts`, `auth.ts`, `settings.ts`, `notifications.ts`, `file-upload.ts`

**`src/types/`** — Role-specific type definitions: `admin.d.ts`, `doctor.d.ts`, `patient.d.ts`, `lab_tech.d.ts`, `lab_coord.d.ts`, `auth.d.ts`, `global.d.ts`, `notification.d.ts`, `test.d.ts`

---

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

Runs the app on [http://localhost:3000](http://localhost:3000) with Turbopack enabled.

### Build

```bash
yarn build
yarn start
```

---

## Environment Variables

Create a `.env` file in the project root with the following:

```env
# Backend API
NEXT_PUBLIC_BASE_URL=            # Backend base URL (e.g. Railway-hosted service)

# Cloudflare R2 / S3-compatible storage
CLOUD_ACCESS_KEY_ID=
CLOUD_SECRET_ACCESS_KEY=
CLOUD_ENDPOINT=
CLOUD_BUCKET_NAME=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Firebase (push notifications)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_VAPID_KEY=
```

---

## User Roles & Access

The platform uses JWT-based role-gating enforced in `src/middleware.ts`. Route access is defined in `src/constants/routes.ts`.

| Role        | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| `patient`   | Books tests/appointments, views results, manages billing      |
| `doctor`    | Reviews test results, creates referrals, manages appointments |
| `lab_tech`  | Executes tests, records results, performs QC                  |
| `lab_coord` | Manages inventory, oversees test operations and QC            |
| `recpst`    | Registers patients, books appointments                        |
| `marketer`  | Tracks field visits and marketing activities                  |
| `admin`     | Full access — user management, content, pricing, settings     |

---

## Route Architecture

Routes are split into two Next.js route groups:

### `(website)` — Public pages

| Path              | Description           |
| ----------------- | --------------------- |
| `/home`           | Landing page          |
| `/about`          | About page            |
| `/contact-us`     | Contact form          |
| `/lab-test`       | Lab test catalog      |
| `/ecommerce`      | E-commerce store      |
| `/bio-hub`        | Blog / knowledge base |
| `/whats-new`      | News and updates      |
| `/cart`           | Shopping cart         |
| `/privacy-policy` | Legal                 |

### `(modules)` — Authenticated pages

**Common (all roles)**

- `/settings`, `/notifications`, `/support`

**Patient** (`/patient/*`)

- Dashboard, appointments (booking/upcoming/pending/past), test results, cart, billing history

**Doctor** (`/doctor/*`)

- Dashboard, appointments, referrals, test result review

**Lab Technician** (`/lab-tech/*`)

- Dashboard, test execution, result entry, QC validation, test templates

**Lab Coordinator** (`/lab-coord/*`)

- Dashboard, test management, inventory, quality control

**Receptionist** (`/recpst/*`)

- Dashboard, appointment management, patient management

**Marketer** (`/marketer/*`)

- Dashboard, field visits

**Admin** (`/admin/*`)

- Dashboard, user management, patient management, content management (heroes, testimonials, partners, pricing)

### `auth/` — Authentication

- `/auth/login`, `/auth/register`, `/auth/otp`, `/auth/forgot-pwd`, `/auth/patient`

---

## State Management

The app uses a two-layer state strategy:

- **MobX** — Client/UI state, session data, cart, per-role stores. Stores live in `src/store/` and are injected via `Provider.tsx`.
- **React Query** — Server state, caching, background refetching. Query client is configured in `src/requests/query.tanstack.tsx`. Custom hooks in `src/hooks/` wrap React Query calls.

---

## API Layer

All backend calls go through `src/requests/`. Each file maps to a domain:

```
requests/
├── admin.ts
├── appointments.ts
├── auth.ts
├── billing.ts
├── doctor.ts
├── file-upload.ts
├── file-manager.ts
├── lab-coord.ts
├── lab-tech.ts
├── marketer.ts
├── notifications.ts
├── patient.ts
├── recept.ts
├── settings.ts
└── query.tanstack.tsx     # React Query client setup
```

API base URLs and endpoint paths are centralised in `src/constants/api.ts`.

---

## Scripts

```bash
yarn dev          # Start dev server (Turbopack)
yarn build        # Production build
yarn start        # Start production server
yarn lint         # Run ESLint
yarn format       # Run Prettier
yarn test         # Run Vitest unit tests
yarn coverage     # Generate test coverage report
```
