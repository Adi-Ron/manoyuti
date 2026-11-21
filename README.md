---
title: Manoyuti
emoji: 🌿
colorFrom: green
colorTo: gray
sdk: docker
app_port: 7860
pinned: false
---

# Manoyuti - Next.js + Supabase

A modern, accessible website for Manoyuti — evidence-based psychotherapy, psychology research and training in Bengaluru and online across India.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS with custom Meridian beige design system
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Design System

The design combines:
- **Meridian beige palette** (from option5-meridian-beige.html): warm beige backgrounds, bronze accents, sage greens
- **Manoyuti taupe & rose palette** (from resilio-site): taupe pages, espresso type, rose highlights

## Features

- **Home page** with interactive sections:
  - 2.5D tilt hero stage (mouse parallax)
  - Scroll-scrubbed journey narrative
  - Guided breathing exercise (4-4-6)
  - Daily mood check-in (1-5 scale)
  - Morphing inkblot perception test
  - 5-4-3-2-1 grounding exercise
  - 3D tilt service cards
  - FAQ accordion
  - Contact/booking form

- **Full page suite**:
  - Therapy (services, fees, concerns, approaches, journey, FAQ)
  - Training (5 programmes with detail pages)
  - Research (6 areas, mentoring, collaboration)
  - Organisations (3 programmes, workshops, past talks)
  - About (founders, approach, values, vision)
  - Contact (form, details, crisis info)
  - Blog (filterable posts, article pages)
  - Booking (multi-step form with live summary)
  - Careers (4 roles, application)
  - Policies (privacy, cancellation)
  - 404 page

- **Accessibility**: Semantic HTML, ARIA labels, focus states, reduced motion support, skip links
- **Performance**: Static generation where possible, optimized fonts, minimal JS

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account

### Installation

```bash
cd resilio-next
npm install
cp .env.example .env.local
# Fill in your Supabase credentials
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Manoyuti
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=ishat1706@gmail.com
```

### Database Setup

1. Create a new Supabase project
2. Run the SQL in `supabase/schema.sql` in the Supabase SQL Editor
3. Enable Row Level Security (automatically done by schema)

## Project Structure

```
src/
├── app/
│   ├── (public)/           # Public pages
│   │   ├── _components/    # Home page sections
│   │   ├── therapy/
│   │   ├── training/
│   │   ├── research/
│   │   ├── organisations/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── blog/
│   │   ├── booking/
│   │   ├── careers/
│   │   └── policies/
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── not-found.tsx       # 404 page
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── sections/           # Page sections (Header, Footer)
│   └── forms/              # Form components
├── lib/
│   ├── supabase/           # Supabase clients
│   ├── utils.ts            # Utilities
│   └── types.ts            # TypeScript types
└── styles/
    └── globals.css         # Global styles + design system

supabase/
└── schema.sql              # Database schema
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Database Migration

```bash
# Push schema changes
npm run db:push

# Reset database (development only)
npm run db:reset
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Design Tokens

### Colors (Meridian)
- `--bg`: #f4eee4 (warm beige)
- `--bg2`: #ebe2d3
- `--paper`: #fbf8f2
- `--ink`: #2b2520
- `--mut`: #6a5f52
- `--sage`: #46594c
- `--bronze`: #9a794c

### Colors (Manoyuti)
- `--taupe`: #CDBFB3
- `--espresso`: #2A211E
- `--rose`: #E8C3BE
- `--blush`: #E8C3BE

### Typography
- **Headings**: Newsreader (Meridian) / Nunito Sans (Manoyuti)
- **Body**: Hanken Grotesk (Meridian) / Nunito Sans (Manoyuti)

## License

© 2026 Manoyuti. All rights reserved.
## Booking emails and confirmations

1. Run `supabase/booking-confirmation.sql` in this project's Supabase SQL Editor. It adds appointment and email-status fields; existing requests are preserved.
2. Configure real `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` values in `.env.local`. Gmail requires an app password. Use port 587 (STARTTLS) or 465 (TLS).
3. Restart the app. New requests notify `ishatiwari1706@gmail.com`. The sender is your authenticated SMTP account, displayed as Manoyuti.
4. In Admin → Bookings, choose the agreed date and time (IST) and enter the secure meeting link or full address. **Confirm & email client** sends the confirmation and records its acceptance by the mail server.

Saved requests are retained when email delivery is unavailable. Admin can retry therapist notifications. Database leases prevent concurrent duplicate sends; an email timeout can still have an ambiguous delivery result, so check delivery before manually retrying. SMTP acceptance does not guarantee inbox placement.

Reflections and Site settings are no longer admin features; their old URLs redirect to the overview. Stored data is retained.


## Hugging Face deployment

This repository includes a Docker Space configuration using port 7860 and Next.js standalone output. Set these **public Variables before building**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_SITE_URL` (the Space app URL).

Set these **runtime Secrets** in the Space: `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_EMAIL`. Do not upload `.env.local` or local screenshots. Existing Supabase data remains in Supabase.

Hugging Face blocks SMTP ports. When email is enabled later, configure `RESEND_API_KEY` as a Secret and `MAIL_FROM` with a sender verified by Resend. The app automatically uses its HTTPS API; SMTP is disabled inside Spaces. Appointment emails also require `supabase/booking-confirmation.sql` in the database.

Hugging Face currently requires an eligible paid account plan to create Docker Spaces. No paid hardware or subscription should be enabled without the account owner's authorization.

## Netlify deployment

The app is configured for Netlify with its official Next.js adapter and Node.js 22. Netlify supports the App Router, server-rendered pages, route handlers, and admin authentication.

Create or link a Free-plan project, set the public Supabase URL/anon key and the private service-role key/admin email as project environment variables, and set `NEXT_PUBLIC_SITE_URL` to the project's HTTPS URL. Keep secrets out of source control. Local Netlify state and generated functions are ignored by Git.

Run `netlify deploy --prod --context production` after account authorization and environment configuration. Email sending remains disabled until its provider and the appointment database migration are configured.
