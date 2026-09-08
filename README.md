# Daily Journal

Daily Journal is a calm, local-first journaling application built with Vite, React, and TypeScript. It lets you write one journal entry per calendar day, attach a mood, and browse or manage past entries.

## Features

- Create and edit daily journal entries
- Select one of five moods: Happy, Neutral, Sad, Angry, or Tired
- Browse entries in reverse chronological order
- View today's entry and recent entries from the home page
- Delete entries with a confirmation dialog
- Persist data in the browser's local storage
- Validate dates, moods, and journal content before saving
- Limit journal content to 5,000 characters

## Technology Stack

- Vite 6
- React 19
- TypeScript with strict mode enabled
- React Router
- Tailwind CSS 4
- Vitest with jsdom and Testing Library matchers
- ESLint and Prettier

## Prerequisites

- Node.js with npm

## Installation

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

Vite will print the local URL in the terminal.

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Development Commands

```bash
npm run lint       # Run ESLint
npm run format     # Format the repository with Prettier
npm run typecheck  # Run the TypeScript project checks
npm test           # Run the Vitest suite once
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Shows today's entry and up to three recent entries |
| `/journals` | Lists all saved entries in reverse chronological order |
| `/journal/new` | Creates an entry, or edits today's entry when one exists |
| `/journal/new?date=YYYY-MM-DD` | Creates or edits an entry for a selected date |

## Data and Privacy

The current version does not use authentication, a server, or Supabase persistence. Journal data is stored in the browser under the local storage key `daily-journal-app-data`.

Stored data is local to the browser profile and is not synchronized between browsers or devices. Clearing site data removes the saved entries.

## Project Structure

```text
src/
├── components/shared/       Shared buttons, dialogs, and toast feedback
├── features/journal/        Journal components, hooks, services, and utilities
├── pages/                   Route-level page components
├── services/                Persistence services
├── types/                   Shared TypeScript domain types
├── utils/                   General-purpose utilities
├── App.tsx                  Application routes and navigation
└── main.tsx                 React entry point and providers
```

For more detail about data flow and architectural boundaries, see [docs/architecture.md](docs/architecture.md).

## Testing

Tests cover journal persistence behavior and local date formatting. The test environment uses jsdom and the shared setup at `src/test/setup.ts`.

Run the test suite with:

```bash
npm test
```
