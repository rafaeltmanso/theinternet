# AGENTS.md - The Internet QA Playground

## Tech Stack
- Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4
- Node.js >= 20.9.0 required

## Commands
- `npm run dev` - Starts on port 3000 (explicitly set via `-p 3000`)
- `npm run build` - Production build
- `npm run lint` - ESLint (most rules disabled; this is intentional for QA playground)

## Architecture
- `src/app/examples/` - 44 QA testing scenarios, each in its own directory with `page.tsx`
- `src/app/api/` - API routes for auth simulations (`/api/basic-auth`, `/api/digest-auth`)
- `src/app/examples-data.tsx` - Registry of all examples with id, name, description, category
- `src/components/` - Shared UI (theme-provider, example-card)
- Path alias: `@/*` maps to `./src/*`

## Auth Credentials
- Username: `admin`, Password: `password` (for basic-auth and digest-auth examples)

## Key Conventions
- Examples use `'use client'` directive (client components with React hooks)
- Tailwind CSS with custom theme using CSS variables (see `tailwind.config.ts`)
- Dark mode via `next-themes` with `suppressHydrationWarning` on `<html>`
- ESLint: most rules disabled (`no-explicit-any`, `no-unused-vars`, `react-hooks/exhaustive-deps`, etc.)
- TypeScript: `strict: true` but `noImplicitAny: false`

## QA-Specific Notes
- Project intentionally includes dynamic/flaky behavior (loading delays, shifting content)
- Each example targets specific testing challenges for automation practice
- No test framework configured (project is itself a testing target, not tested by framework)

## References
- See `README.md` for full feature list and project structure
- `.env.local` contains Vercel OIDC token (do not commit)
