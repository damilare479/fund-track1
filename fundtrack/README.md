# FundTrack
Personal graduate application command center. Vanilla HTML/CSS/JS, no build step. Open `index.html`.

You add opportunities you find elsewhere, then track opportunities, applications, outreach and deadlines. No scraping, no live feeds, no scoring.

## Structure
- `css/` theme tokens (light/dark), layout, components, responsive
- `js/storage.js` persistence (localStorage). Replace its functions to connect a backend.
- `js/data.js` demo seed data (fictional), `js/state.js` state and helpers
- `js/intelligence/` Today's Mission actions, deadline risk, shared research areas (descriptive, no percentages)
- `js/features/` opportunities (add/edit/delete/detail), onboarding, mission/overview, outreach/settings, actions
- `js/views.js` applications and outreach boards, `js/router.js`, `js/app.js`

Settings holds your name, interests and Data & backup (export, import, CSV/JSON, reset demo).
Not built yet: Universities, Calendar, Documents, Analytics pages.

## v4
Single store `S` (state.js) feeds every page. My Opportunities resets filters on each visit and has Clear filters. Outreach is now a Supervisor / contact panel inside each opportunity. Overview has a live clock hero, pipeline, activity trend and deadline outlook. `js/motivation.js` uses the browser's speech synthesis (autoplay off by default).

## v5
Outreach Kanban restored (contact modal, no research-fit page). First-launch intro (CSS keyframes) and Settings > About with Replay Introduction. Moment of the Day in `js/motivation.js` (46 entries; 12 attributed quotes, the rest labelled FundTrack Original; verify attributions before sharing publicly).

## v6: pointer drag
`js/motion.js` replaces HTML5 drag-and-drop with Pointer Events (mouse, touch, pen) on a `.drag-handle`. Touch needs a 220 ms press; the handle alone has `touch-action:none`. Stage changes go through `moveApplication()` / `moveProfessor()`, shared with the dropdowns. Motion 12.23.12 is vendored at `js/vendor/motion.js` (pinned, no CDN dependency).
