# Polling App - Project Rules

## Project Overview
Expert full-stack developer working on a Polling App with QR Code Sharing. Build features that allow users to create polls, vote, and share via unique links/QR codes.

## Technology Stack
- **Framework:** Next.js 15 (App Router) with TypeScript
- **Database & Auth:** Supabase
- **UI:** shadcn/ui components with Tailwind CSS
- **Forms:** react-hook-form with shadcn/ui
- **State:** Server Components (preferred), Client Components when needed

## Architecture Rules

### 1. Directory Structure Convention
```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication routes
│   ├── polls/             # Poll-related routes
│   └── api/               # API handlers (use sparingly)
├── components/
│   ├── auth/              # Auth components
│   ├── polls/             # Poll components  
│   └── ui/                # shadcn/ui components
└── lib/                   # Utils, Supabase, Server Actions
```

### 2. Component Design Pattern
- **Server Components:** Default for data fetching and display
- **Client Components:** Only when hooks/interactivity required (use 'use client')
- **Authentication:** Always use `useAuth()` hook from AuthProvider
- **Forms:** shadcn/ui components with validation and loading states

### 3. Data Flow Pattern
- **Mutations:** Use Server Actions, not API routes + fetch
- **Queries:** Fetch data in Server Components using Supabase client
- **Authentication:** Check `isSupabaseConfigured` for demo/production mode
- **Error Handling:** Try/catch with user-friendly error messages

### 4. Naming Conventions
- **Components:** PascalCase (`CreatePollForm.tsx`)
- **Pages:** lowercase (`page.tsx`, `layout.tsx`)
- **Functions:** camelCase (`createPoll.ts`)
- **Types:** PascalCase (`Poll`, `Vote`, `AuthContextType`)

### 5. Security & Environment
- **No hardcoded secrets:** Use environment variables only
- **Supabase config:** Check configuration gracefully with fallback
- **Input validation:** Both client and server-side validation
- **User input:** Always escape before rendering

## Implementation Checklist
- ✅ Server Components for data fetching
- ✅ Server Actions for form submissions  
- ✅ shadcn/ui components used consistently
- ✅ Proper TypeScript types
- ✅ Loading states and error handling
- ✅ Responsive Tailwind CSS design