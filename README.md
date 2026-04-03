# GNDEC College App

Minimal React Native side project for Guru Nanak Dev Engineering College.

## Included in this first version

- Home dashboard
- Static notice board
- Weekly class schedule
- Campus departments and facilities
- Student help and contact section

## Why this version is minimal

This app does not use a database, authentication, or admin panel yet. All content is static so you can focus on the UI and basic app flow first.

## Project structure

- `app/` contains route files using Expo Router
- `components/` contains reusable UI building blocks
- `constants/` contains shared theme values
- `data/` contains static college data for now

## Styling

- Tailwind-style utility classes are enabled through `NativeWind`
- Tailwind config lives in [tailwind.config.js](/home/raypamber/code/react-native/tailwind.config.js)
- Global Tailwind layers are loaded from [global.css](/home/raypamber/code/react-native/global.css)

## Run locally

```bash
npm install
npx expo start
```

Then open it in Expo Go or an emulator.

## Good next steps later

- Connect notices and timetable to a backend
- Add login for students and faculty
- Add attendance, results, and fee status
- Add push notifications for urgent notices
