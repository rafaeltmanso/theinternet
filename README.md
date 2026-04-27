# The Internet (QA Testing Playground)

A modern clone-style testing playground inspired by common automation practice sites.  
This project provides many small pages with predictable behaviors so you can build and validate automated tests against realistic UI scenarios.

Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 40+ test scenarios under `/examples`
- Interactive, authentication, file, and advanced DOM cases
- Client and API routes for auth simulations
- Lightweight setup for local QA automation practice

## Tech Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- ESLint 9

## Requirements

- Node.js `>= 20.9.0`
- npm (comes with Node.js)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start local development server on port `3000`
- `npm run build` - Build production assets
- `npm run start` - Run the production server
- `npm run lint` - Run ESLint checks

## Main Routes

- `/` - Home page with all examples
- `/examples` - Examples section layout
- `/examples/<example-id>` - Individual testing scenarios (for example: `/examples/drag-and-drop`)

Authentication examples:

- `/examples/basic-auth`
- `/examples/digest-auth`

Related API endpoints:

- `/api/basic-auth`
- `/api/digest-auth`

### Demo Credentials

For auth examples, use:

- Username: `admin`
- Password: `password`

## Project Structure

```text
src/
  app/
    api/              # API routes used by examples
    examples/         # Individual scenario pages
    page.tsx          # Home page (examples grid)
    examples-data.tsx # Metadata for scenario cards
  components/         # Shared UI components
  lib/                # Utilities
```

## QA Automation Notes

- Each example is designed to represent a specific testing challenge.
- Prefer targeting stable selectors/labels when building tests.
- Some pages intentionally include dynamic or flaky-like behavior for practice (loading delays, shifting content, dynamic elements).

## License

This project is for educational and testing-practice purposes.
