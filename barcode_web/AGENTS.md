# Agent Guide

## Scope

- This file defines project-level instructions for AI coding agents in this repository.
- Keep changes minimal and focused on the requested task.

## Project Snapshot

- Framework: Next.js 16.2.6 (App Router) with React 19 and TypeScript.
- Styling: Tailwind CSS v4 via [app/globals.css](app/globals.css).
- Main app entry: [app/page.tsx](app/page.tsx).
- Root layout: [app/layout.tsx](app/layout.tsx).

## Required First Step for Next.js Work

- This codebase targets a Next.js version with breaking changes.
- Before changing Next.js behavior or APIs, read relevant local docs under:
  - [node_modules/next/dist/docs/01-app](node_modules/next/dist/docs/01-app)
  - [node_modules/next/dist/docs/01-app/02-guides](node_modules/next/dist/docs/01-app/02-guides)

## Build and Validation Commands

- Install deps: npm install
- Dev server: npm run dev
- Lint: npm run lint
- Production build: npm run build
- Start production server: npm run start

## Implementation Conventions

- Use App Router patterns.
- Default to Server Components; add use client only when interactivity/browser APIs are needed.
- Keep UI responsive for desktop and mobile.
- Preserve existing style and public behavior unless the request requires changes.

## Known Pitfalls

- Browser extensions may inject attributes into body/html and trigger hydration mismatch warnings.
- If this appears, confirm behavior in Incognito or with extensions disabled before changing app logic.
- For this project, hydration warning suppression is already applied in [app/layout.tsx](app/layout.tsx).

## Source of Truth

- Base project overview: [README.md](README.md)
- Scripts and dependency versions: [package.json](package.json)
