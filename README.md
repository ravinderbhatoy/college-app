# GNDEC College App

A React Native mobile app concept for **Guru Nanak Dev Engineering College, Ludhiana**, built with **Expo**, **Expo Router**, and **NativeWind**.

This project is designed as a student-first campus app inspired by the official GNDEC website. Instead of copying the dense desktop layout, it narrows the mobile app down to the information students are most likely to check frequently.

## Current app focus

- Home dashboard
- Notice board
- Events tab
- Training & Placement tab
- Timetable utility screen
- Contacts utility screen
- Profile/auth placeholder screen

## Design direction

The current information architecture is intentionally smaller than the website:

- high-frequency student updates stay in tabs
- lower-frequency tools stay in Home quick actions
- notices can be `featured` to stand out visually
- pinned notices surface a pin icon and sort to the top of the notices feed
- placement gets its own tab because deadlines and drive updates are high priority

## Tech stack

- Expo SDK 54
- React Native 0.81
- React 19
- Expo Router
- NativeWind
- TypeScript

## Project structure

```text
app/
  _layout.tsx
  (tabs)/
    _layout.tsx
    index.tsx
    notices.tsx
    events.tsx
    placement.tsx
  contacts.tsx
  profile.tsx
  timetable.tsx
components/
  ui.tsx
constants/
  theme.ts
data/
  college-data.ts
```

## Screens

### Home

Student dashboard with:

- quick actions for timetable, contacts, and profile/login placeholder
- one featured notice highlight
- upcoming events preview

### Notices

Focused on:

- a complete notice feed
- `featured` notices with stronger visual emphasis
- pinned notices shown with a pin icon
- pinned notices sorted to the top

### Events

Includes:

- upcoming campus events
- date and venue shown together in the card header

### Placement

Includes:

- placement updates and upcoming drives
- form submission links
- eligibility notes
- TPO contact details

### Utility screens

Includes:

- timetable selector
- campus and support contacts
- profile/auth placeholder for future login work

## Local development

### Install dependencies

```bash
npm install
```

### Start the app

```bash
npm run start
```

You can also use:

```bash
npm run android
npm run ios
npm run web
```

## Tunnel note

If `expo start --tunnel` fails with an `ngrok` tunnel error, use LAN mode instead:

```bash
npx expo start --lan
```

This project has already shown tunnel startup issues locally, so LAN or emulator-based development is the more reliable option.

## Current limitations

- No backend or database yet
- No authentication
- No admin panel
- All app content is currently static
- Notice, event, placement, timetable, and contact content are demo data shaped around GNDEC’s structure

## Next improvements

- Add notice detail and event detail screens
- Replace mock data with real college content sources
- Connect notices and placement updates to a backend
- Add student login
- Add push notifications for urgent notices and placement updates
