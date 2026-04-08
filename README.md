# IPL Fantasy League (Next.js + Google Sheets)

Modern IPL leaderboard web app powered by Next.js App Router, Tailwind CSS, and Google Sheets as backend data source.

## Features

- `/api/teams` for normalized team records
- `/api/leaderboard` for accepted-only ranked list with trend + biggest climber
- 60s in-memory cache for Sheets responses
- Podium UI for top 3 + responsive leaderboard table/cards
- Team detail page (`/team/[id]`)
- Dark mode, glassmorphism cards, sticky header, search/filter-like query input
- Loading and error states

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env.local
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```

## Google Sheets format

Headers expected in this exact order:

1. Manager Name
2. Team Name
3. Team Link
4. Status (Accepted/Rejected)
5. Points

Data is read through Google Sheets CSV export (`gviz/tq?tqx=out:csv`) and transformed server-side.
