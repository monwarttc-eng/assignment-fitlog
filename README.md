# FitLog – Workout Library & Tracker

A dark-themed workout library and daily planner built with Next.js (App Router). Browse lifts, open details, build a five-lift plan for today, save others for later, and track what you've finished.

## Technologies
Next.js 14 (App Router) · JavaScript · Tailwind CSS · Lucide React · React Hot Toast · React Context · LocalStorage

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production check
```
Requires Node.js 18.17+.

## API
- Primary: `https://api.abcz.workers.dev/api/fitlog` (and `/:id`)
- Fallback: `https://api.api-store.workers.dev/api/fitlog` (and `/:id`)

If the primary request fails, the fallback is used automatically. The API field `caloriesBurned` is mapped to `calories` in `lib/api.js`.

## Key features
1. Workout library with a 3/2/1-column responsive grid.
2. Workout details page with specs table and numbered instructions.
3. Today's Plan (max five, no duplicates) and Saved list with live navbar counters.
4. My Plan dashboard with totals, Mark as Done, and Sort By (Duration, Calories, Rating) on both tabs.
5. LocalStorage persistence (hydration-safe), toasts, loading skeletons, error retry, custom 404.

Sorting: Duration ascending (shortest first); Calories and Rating descending.

## Deployment
Live link: _add after deploying to Vercel_
