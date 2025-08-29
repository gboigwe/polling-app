# Polling App

A modern polling application built with Next.js, TypeScript, Tailwind CSS, and Supabase for the ALX AI for Developers course.

## Features

- User authentication (login/register)
- Protected routes and session management
- Modern UI with shadcn/ui components
- Responsive design with Tailwind CSS
- Demo mode for testing without Supabase

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)

## Getting Started

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

Copy the example environment file and add your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Add your Supabase project details to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Demo Mode

If Supabase is not configured, the app runs in demo mode where any email/password combination will work for testing the authentication flow.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── polls/             # Polls dashboard
│   └── layout.tsx         # Root layout with AuthProvider
├── components/
│   ├── auth/              # Authentication components
│   └── ui/                # shadcn/ui components
└── lib/
    └── supabase.ts        # Supabase client configuration
```

## Authentication Flow

1. Root page (`/`) redirects to `/polls`
2. Polls page checks authentication status
3. Unauthenticated users are redirected to `/auth/login`
4. Users can register at `/auth/register`
5. Authenticated users see the polls dashboard

## Development

This project was developed as part of the ALX AI for Developers course, demonstrating AI-assisted development practices for building modern web applications.
