# Architecture

## Overview

Daily Journal is a single-page React application for journaling and mood tracking. The frontend is split between route-level pages, feature-specific modules, and a small persistence layer backed by the browser's localStorage.

```text
Pages
  -> feature hook / UI components
    -> journal service
      -> storage service
        -> localStorage
```

## Runtime composition

The application bootstraps in `src/main.tsx`:

- `BrowserRouter` enables client-side navigation
- `ToastProvider` provides shared feedback messages
- `App` defines the page routes and navigation shell

`src/App.tsx` is the central route map. It renders the main navigation and the page-level views for the home, journals list, and entry editor.

## Feature boundaries

The journal feature lives under `src/features/journal/`:

- `components/` contains the journal card, form, and mood selector
- `hooks/` contains stateful behavior exposed to pages
- `services/` contains read/write logic for entries
- `constants.ts` defines the mood options
- `utils.ts` contains sorting and composition utilities

Pages stay focused on navigation and user actions. They do not read or write localStorage directly.

## Persistence layer

`src/services/storageService.ts` owns the storage contract. It is responsible for:

- reading and writing the app payload
- defaulting empty data
- handling malformed JSON safely
- serializing the application state

The storage key is:

```ts
const STORAGE_KEY = 'daily-journal-app-data'
```

The persisted payload is:

```ts
interface AppStorageData {
  journals: JournalEntry[]
}
```

`src/features/journal/services/journalService.ts` uses this storage boundary to enforce a single entry per local date. A save operation either updates the entry for an existing date or creates a new one with a generated UUID.

## Data model

The shared `JournalEntry` model is defined in `src/types/index.ts`:

```ts
interface JournalEntry {
  id: string
  date: string
  moodId: MoodId
  content: string
  createdAt: string
  updatedAt: string
}
```

This keeps journaling logic simple: each day maps to at most one journal record, and the date is treated as the canonical key.

## Date handling

The app uses local calendar dates for journaling behavior. Date formatting utilities avoid unnecessary UTC conversion so entries are associated with the user's local day instead of a shifted date across time zones.

## Validation and UX

The entry form validates before saving:

- a date is required
- a mood must be selected
- content must contain non-whitespace text
- content is bounded by the input UI and local logic

The UI also shows toast feedback for successful save and delete actions. Destructive actions require a custom confirmation dialog rather than a native browser confirmation.

## Testing strategy

The project uses Vitest with a jsdom environment. The current tests focus on the behaviors that matter most to the journal domain:

- journal creation and update logic
- preventing duplicate entries for the same date
- deletion behavior
- local-date formatting utilities

## Architectural intent

This is intentionally a small, maintainable app with clear separation between:

- pages
- feature logic
- shared UI elements
- persistence logic
- types and utilities

That keeps the project easy to extend without introducing unnecessary abstractions or backend complexity.
