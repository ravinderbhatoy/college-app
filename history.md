# History

## 2026-04-02

### Initial app scaffold

- Created a minimal Expo-based React Native project for Guru Nanak Dev Engineering College.
- Added [App.tsx](/home/raypamber/code/react-native/App.tsx) with a single-screen student app shell using static data only.
- Included minimum college-app features:
  - Home dashboard
  - Notice board
  - Weekly class schedule
  - Campus/departments info
  - Student help/contact section
- Added project config files:
  - [package.json](/home/raypamber/code/react-native/package.json)
  - [app.json](/home/raypamber/code/react-native/app.json)
  - [babel.config.js](/home/raypamber/code/react-native/babel.config.js)
  - [tsconfig.json](/home/raypamber/code/react-native/tsconfig.json)
- Added [README.md](/home/raypamber/code/react-native/README.md) with basic run instructions and suggested future upgrades.

### Decisions made

- No database/backend was added.
- No authentication/admin system was added.
- All data in the current app is static placeholder/demo content intended to be replaced later by APIs or a database.
- The project uses Expo commands through npm scripts, so the normal start command is `npm run start`.

### Later workspace state observed

- Dependencies are now installed locally in `node_modules`.
- `package-lock.json` now exists in the workspace.
- [package.json](/home/raypamber/code/react-native/package.json) currently includes `@expo/ngrok` in `devDependencies`, which supports `expo start --tunnel`.

### Working agreement

- From this point onward, every meaningful action or code change should also be recorded in this file so future agents can understand what has already been done.

### Tunnel issue observed

- Running `npx expo start --tunnel` failed locally with:
  - `CommandError: ngrok tunnel took too long to connect`
  - `CommandError: failed to start tunnel`
- This indicates a tunnel startup/network problem rather than an app code error.

### SDK 54 upgrade

- Upgraded the project from Expo SDK 53 to Expo SDK 54.
- The dependency set now resolves to:
  - `expo` `54.0.33`
  - `react-native` `0.81.5`
  - `react` `19.1.0`
  - `react-dom` `19.1.0`
  - `@expo/metro-runtime` `~6.1.2`
  - `expo-status-bar` `~3.0.9`
  - `react-native-web` `^0.21.0`
- Updated [package.json](/home/raypamber/code/react-native/package.json) so `@types/react` uses a compatible SDK 54 range: `^19.1.0`.
- `package-lock.json` and installed dependencies now reflect the SDK 54 version set.
- A full `expo-doctor` validation was attempted but did not produce a usable result in this environment, so version verification was done directly through installed package versions and the lockfile instead.

### Structure refactor to current Expo pattern

- Replaced the old single-file root app in `App.tsx` with the current Expo Router structure.
- Updated [package.json](/home/raypamber/code/react-native/package.json) so the app entry point is now `expo-router/entry`.
- Added route files under `app/`:
  - `app/_layout.tsx`
  - `app/(tabs)/_layout.tsx`
  - `app/(tabs)/index.tsx`
  - `app/(tabs)/notices.tsx`
  - `app/(tabs)/schedule.tsx`
  - `app/(tabs)/campus.tsx`
  - `app/(tabs)/help.tsx`
- Split shared code into:
  - [components/ui.tsx](/home/raypamber/code/react-native/components/ui.tsx)
  - [constants/theme.ts](/home/raypamber/code/react-native/constants/theme.ts)
  - [data/college-data.ts](/home/raypamber/code/react-native/data/college-data.ts)
- Updated [app.json](/home/raypamber/code/react-native/app.json) to include an app scheme for router usage.
- Updated [README.md](/home/raypamber/code/react-native/README.md) to describe the new structure and startup command.
- Verified the refactor with `npx tsc --noEmit`, which completed successfully.

### Tailwind / NativeWind setup

- Decided to use Tailwind-style styling through `NativeWind` instead of Bootstrap.
- Installed and configured:
  - `nativewind`
  - `tailwindcss`
  - `react-native-reanimated`
  - `babel-preset-expo`
  - `prettier-plugin-tailwindcss`
- Added configuration files:
  - [tailwind.config.js](/home/raypamber/code/react-native/tailwind.config.js)
  - [metro.config.js](/home/raypamber/code/react-native/metro.config.js)
  - [global.css](/home/raypamber/code/react-native/global.css)
  - [nativewind-env.d.ts](/home/raypamber/code/react-native/nativewind-env.d.ts)
- Updated [babel.config.js](/home/raypamber/code/react-native/babel.config.js) for NativeWind.
- Updated [app/_layout.tsx](/home/raypamber/code/react-native/app/_layout.tsx) to import the global Tailwind stylesheet.
- Refactored shared UI and parts of the route screens to use `className` utilities.
- Verified the setup with `npx tsc --noEmit`, which completed successfully.

## 2026-04-03

### GNDEC website-inspired app structure

- Reviewed the official GNDEC website at `https://www.gndec.ac.in/` to extract mobile-relevant structure and content priorities.
- Reframed the app around the site’s strongest student-facing sections instead of the earlier generic college demo layout.
- Renamed the timetable-focused tab to `Academics` and aligned tabs to:
  - Home
  - Notices
  - Academics
  - Campus
  - Help
- Updated [data/college-data.ts](/home/raypamber/code/react-native/data/college-data.ts) with GNDEC-inspired content groups:
  - Student-corner style notices
  - Academic links
  - Information corner items
  - Department groups
  - Facilities
  - Institutional highlights
  - Website-inspired support and admission helplines
- Added [app/(tabs)/academics.tsx](/home/raypamber/code/react-native/app/(tabs)/academics.tsx) and removed the old schedule-only tab file.
- Updated the existing tab screens so:
  - Home acts as a student dashboard
  - Notices reflects student/public/information-corner style content
  - Campus highlights departments, facilities, and institutional identity
  - Help becomes a proper help-desk style screen

### Intent of the redesign

- The app should take inspiration from GNDEC’s official content hierarchy, but not copy its dense desktop navigation.
- Mobile emphasis should stay on:
  - notices
  - academics
  - student support
  - departments and facilities
  - institutional trust signals in compact form

### Git setup

- Added [.gitignore](/home/raypamber/code/react-native/.gitignore) after the project was initialized with Git.
- The ignore file excludes common Expo / React Native generated files and local secrets, including:
  - `node_modules/`
  - `.expo/`
  - environment files
  - build outputs
  - common key/certificate files

### README refresh

- Rewrote [README.md](/home/raypamber/code/react-native/README.md) to match the current GitHub-pushed project state instead of the earlier placeholder description.
- The README now documents:
  - the current GNDEC-inspired app direction
  - the active screen structure
  - the Expo / Router / NativeWind stack
  - local development commands
  - the known `--tunnel` / ngrok issue and LAN fallback
  - current limitations and next improvements

### GNDEC logo integration

- Located the official GNDEC logo asset from the college website and added it to the shared page shell in [components/ui.tsx](/home/raypamber/code/react-native/components/ui.tsx).
- The logo now appears at the top of tab screens so the app carries GNDEC branding consistently across the current experience.
- Replaced the remote website logo reference with the user-provided local asset [gnelogo.png](/home/raypamber/code/react-native/gnelogo.png) so the app uses the correct bundled logo file.

### Tab bar icons

- Added bottom-tab icons in [app/(tabs)/_layout.tsx](/home/raypamber/code/react-native/app/(tabs)/_layout.tsx) using Expo Ionicons.
- The tabs now show icons for:
  - Home
  - Notices
  - Academics
  - Campus
  - Help

### Programs offered in Academics

- Extracted the current GNDEC programs offered list from the official college website and added it to [data/college-data.ts](/home/raypamber/code/react-native/data/college-data.ts).
- Updated [app/(tabs)/academics.tsx](/home/raypamber/code/react-native/app/(tabs)/academics.tsx) to show grouped programs with duration and intake instead of only a generic placeholder reference.

### GNDEC-inspired color theme

- Replaced the earlier green-brown demo palette with a GNDEC-inspired theme based on the logo colors and user-approved green accent.
- Updated shared tokens in [constants/theme.ts](/home/raypamber/code/react-native/constants/theme.ts) and [tailwind.config.js](/home/raypamber/code/react-native/tailwind.config.js).
- Updated reusable UI styles in [components/ui.tsx](/home/raypamber/code/react-native/components/ui.tsx) so hero sections, chips, info cards, and shared surfaces now use the new navy, red, green, and off-white palette.

### Expo SDK 54 dependency alignment

- Updated package version ranges in [package.json](/home/raypamber/code/react-native/package.json) to match Expo SDK 54 compatibility guidance for the packages that were producing warnings.
- Adjusted:
  - `react-native-reanimated` to `~4.1.1`
  - `@types/react` to `~19.1.10`
  - `babel-preset-expo` to `~54.0.10`
  - `typescript` to `~5.9.2`
- Installed dependencies and verified the resolved versions are Expo-compatible patch releases.
- Verified the project still type-checks with `npx tsc --noEmit`.
