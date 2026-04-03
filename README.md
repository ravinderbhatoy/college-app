# GNDEC College App

A React Native mobile app concept for **Guru Nanak Dev Engineering College, Ludhiana**, built with **Expo**, **Expo Router**, and **NativeWind**.

This project is designed as a student-first campus app inspired by the official GNDEC website. Instead of copying the dense desktop layout, it reorganizes the college’s key sections into a simpler mobile experience focused on daily student needs.

## Current app focus

- Home dashboard
- Notice board
- Academics tab with timetable and academic links
- Campus tab with departments and facilities
- Help desk tab with admission and support contacts

## Design direction

The current information architecture is based on the GNDEC website’s strongest student-facing sections:

- Student Corner
- Information Corner
- Help Desk
- Departments
- Facilities
- Institutional identity and trust signals

The app aims to make those sections easier to access on mobile, with shorter navigation paths and cleaner content grouping.

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
    academics.tsx
    campus.tsx
    help.tsx
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

- GNDEC identity snapshot
- quick access shortcuts
- student-priority highlights
- latest notices

### Notices

Focused on:

- student-corner style notices
- fee and scholarship updates
- public and information-corner style content

### Academics

Includes:

- weekly timetable
- academic essentials
- calendar-style links
- information-corner items useful to students

### Campus

Includes:

- department groups
- campus facilities
- institutional highlights

### Help

Includes:

- admission helplines
- student support entries
- grievance and anti-ragging style support references

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
- Notices, timetable, and support content are demo data shaped around GNDEC’s structure

## Next improvements

- Connect notices and academic updates to a backend
- Add student login
- Add attendance, results, and fee status
- Add push notifications for urgent notices
- Add direct links to official GNDEC web resources
- Refine the visual design to better match GNDEC branding
