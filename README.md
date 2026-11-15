# Resilio by IshIra - Next.js + Supabase

A modern, accessible website for Resilio by IshIra — evidence-based psychotherapy, psychology research and training in Bengaluru and online across India.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS with custom Meridian beige design system
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Design System

The design combines:
- **Meridian beige palette** (from option5-meridian-beige.html): warm beige backgrounds, bronze accents, sage greens
- **Resilio taupe & rose palette** (from resilio-site): taupe pages, espresso type, rose highlights

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
NEXT_PUBLIC_SITE_NAME=Resilio by IshIra
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

### Colors (Resilio)
- `--taupe`: #CDBFB3
- `--espresso`: #2A211E
- `--rose`: #E8C3BE
- `--blush`: #E8C3BE

### Typography
- **Headings**: Newsreader (Meridian) / Nunito Sans (Resilio)
- **Body**: Hanken Grotesk (Meridian) / Nunito Sans (Resilio)

## License

© 2026 Resilio by IshIra. All rights reserved.