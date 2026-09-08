# Architecture

## Overview

Daily Journal is a client-side React application. React Router selects the page, feature hooks coordinate UI state with services, and the journal service persists data through a single local storage service.

```text
Pages
  -> journal hook
    -> journal service
      -> storage service
        -> browser localStorage
```

## Application Composition

`src/main.tsx` creates the React root and composes the application providers:

- `BrowserRouter` supplies route navigation.
- `ToastProvider` supplies transient success and error feedback.
- `App` defines the navigation and page routes.

`src/App.tsx` owns the route table and the shared top navigation. Route-level components live in `src/pages/`.

## Feature Boundaries

The journal feature is under `src/features/journal/`:

- `components/` contains the journal form, mood selector, and entry card.
- `hooks/` exposes React state behavior through `useJournalEntries`.
- `services/` contains journal operations such as create, update, lookup, and delete.
- `constants.ts` defines the supported moods.
- `utils.ts` contains journal-specific sorting behavior.

Pages compose these pieces and handle navigation, toast messages, and delete confirmation. They do not write to localStorage directly.

## Persistence Model

The persistence boundary is `src/services/storageService.ts`. It owns the local storage key `daily-journal-app-data`, JSON parsing, default data, malformed data fallback, and serialization.

The stored shape is:

```ts
interface AppStorageData {
  journals: JournalEntry[]
}
```

Each `JournalEntry` contains an ID, a local `YYYY-MM-DD` date, mood ID, content, creation timestamp, and update timestamp.

The journal service enforces one entry per calendar date. Saving an existing date updates its mood, content, and `updatedAt`; saving a new date creates a UUID-backed entry.

## Date Handling

Journal dates use the user's local calendar context. `src/utils/dateUtils.ts` formats dates without converting the calendar day through UTC, preventing timezone shifts for journal-day behavior.

## Validation and Feedback

`JournalEntryForm` performs client-side validation before calling the journal service:

- A date is required.
- A mood is required.
- Content must contain non-whitespace text.
- Content is limited to 5,000 characters.

Successful saves and deletes use the shared toast provider. Deletes require the shared confirmation dialog, which supports cancellation and the Escape key.

## Testing

Vitest runs in a jsdom environment configured in `vite.config.ts`. The current tests focus on the service and utility boundaries:

- `src/features/journal/services/journalService.test.ts` verifies create, update-without-duplication, and delete behavior.
- `src/utils/dateUtils.test.ts` verifies local date formatting and display formatting.
