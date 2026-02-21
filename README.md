# Warlock Portfolio

Personal portfolio and blog built with React, TypeScript, and Supabase. Features an admin dashboard for managing content, a responsive design system, and smooth page transitions.

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Animations | Framer Motion |
| Backend | Supabase (Auth, Database, Storage) |
| State | Zustand, React Query |
| Forms | React Hook Form, Zod |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/warlock28/warlock-28.0.git
cd warlock-28.0
npm install
```

### Environment Setup

Copy the template and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Get the values from [Supabase Dashboard](https://supabase.com/dashboard) → Settings → API.

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/       # UI components (Hero, About, Contact, etc.)
│   └── ui/           # Reusable primitives (Button, Input, Dialog)
├── config/           # App configuration
├── data/             # Static data (projects, certifications, skills)
├── hooks/            # Custom hooks (useProfile, useProjects, useBlog)
├── lib/              # Utilities (Supabase client, cn helper)
├── pages/            # Route pages
│   └── admin/        # Admin dashboard and section editors
│       └── sections/ # CRUD sections (Projects, Blog, Certs, Profile)
├── store/            # Zustand stores
├── styles/           # Additional stylesheets
└── types/            # TypeScript type definitions
```

## Features

- **Portfolio** — Projects, certifications, skills, and timeline sections
- **Blog** — Markdown-based blog with cover images and tags
- **Admin Dashboard** — Full CRUD for all content sections
- **Auth** — Supabase auth with password reset flow
- **Dark Mode** — System-aware theme switching
- **PWA** — Installable progressive web app
- **Responsive** — Mobile-first design

## Database Setup

Run the migration in `supabase_migration.sql` against your Supabase project to create the required tables and RLS policies.

## License

MIT

## Author

**Nitin Kumar** — [GitHub](https://github.com/warlock28) · [LinkedIn](https://www.linkedin.com/in/nitin-kumar-warlock/)
