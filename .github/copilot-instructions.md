# GitHub Copilot Instructions

## Project Overview

This repository contains a **Daily Journal with Mood Tracker** web application.

### Technology Stack

* Vite
* React
* TypeScript
* Plain CSS
* React Router
* Supabase is part of the project technology stack, but the **current application uses Local Storage as its persistence mechanism**
* No authentication for the current version
* ESLint
* Prettier

The application should provide a **modern, minimal, calm, and polished journaling experience**.

The highest priority is **maintainability and code quality**.

---

## 1. General Copilot Behavior

When generating or modifying code:

1. Follow the existing project architecture and conventions.
2. Prefer readable, maintainable, explicit code over clever or overly compact code.
3. Avoid unnecessary abstractions and premature optimization.
4. Keep changes focused on the requested feature or fix.
5. Do not introduce unrelated refactoring.
6. Reuse existing components and utilities when there is a clear reuse case.
7. Do not create abstractions for single-use requirements without a strong reason.
8. Prefer standard React and TypeScript patterns.
9. Minimize new npm dependencies.
10. Preserve existing behavior unless the requested change requires otherwise.
11. When requirements are ambiguous, choose the simplest maintainable solution.
12. Do not introduce technologies or architectural patterns without a clear reason.

**Primary principle:**

> Prefer simple, readable, maintainable code over clever or over-engineered solutions.

---

## 2. Architecture

Use a **feature-based project structure**.

Prefer a structure similar to:

```text
src/
├── components/
│   └── shared/
├── features/
│   ├── journal/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   ├── mood/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   └── ...
├── pages/
├── hooks/
├── services/
├── utils/
├── types/
├── styles/
├── App.tsx
└── main.tsx
```

The exact structure may evolve, but new functionality should normally belong to the appropriate feature.

### Separation of Concerns

Maintain clear responsibilities:

* **Components** → UI and presentation
* **Hooks** → React state and reusable React behavior
* **Services** → persistence and data-access logic
* **Types** → shared TypeScript models
* **Utilities** → generic helper functions
* **Pages** → route-level composition
* **CSS files** → styling

Avoid putting large amounts of business logic or persistence logic directly inside React components.

---

## 3. React

Use:

* Functional components
* React hooks
* TypeScript
* Controlled forms
* Explicit and readable component APIs

Prefer modern React patterns while keeping the implementation conservative and understandable.

Do not use class components.

Use:

```tsx
const [journalText, setJournalText] = useState("");
```

rather than unnecessary state abstractions.

---

## 4. Component Size

Keep components reasonably small.

Split a component when:

* It has clearly separate responsibilities.
* It becomes difficult to understand.
* A meaningful part can be reused.
* The component contains too much unrelated logic.

Do **not** split every small piece of JSX into a separate component just for the sake of abstraction.

---

## 5. Component Reuse

Create reusable components when there is a clear repeated pattern.

Good candidates include:

* Buttons
* Dialogs
* Toast notifications
* Form controls
* Calendar controls
* Journal cards
* Common layout elements

Avoid premature abstraction.

A component used only once should normally remain feature-specific unless there is a clear reason to make it reusable.

---

## 6. Naming Conventions

Use conventional React naming.

### Components

Use PascalCase:

```text
JournalCard.tsx
MoodSelector.tsx
JournalCalendar.tsx
DeleteConfirmationDialog.tsx
```

### Hooks

Use camelCase with the `use` prefix:

```text
useJournal.ts
useMoodTracker.ts
```

### Services

Use camelCase:

```text
journalService.ts
storageService.ts
```

### CSS

Match CSS files to their component:

```text
JournalCard.css
MoodSelector.css
```

### Variables and Functions

Use descriptive, intention-revealing names:

```ts
journalEntry
selectedMood
saveJournalEntry()
getJournalEntries()
deleteJournalEntry()
```

Avoid vague names such as:

```ts
data
thing
value
handleStuff()
```

when a more meaningful name is available.

---

## 7. TypeScript

Use TypeScript throughout the project.

Avoid unnecessary `any`.

Use interfaces and types for important domain models.

The project uses a **global types structure** rather than separate type files for every feature.

Example:

```ts
export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: Mood;
  createdAt: string;
  updatedAt: string;
}
```

Prefer clear, explicit types over unnecessarily complex TypeScript abstractions.

---

## 8. Imports

Use **absolute imports with path aliases**.

Prefer:

```ts
import { JournalCard } from "@/features/journal/components/JournalCard";
```

instead of:

```ts
import { JournalCard } from "../../../features/journal/components/JournalCard";
```

Use the existing TypeScript/Vite alias configuration.

Do not introduce multiple competing alias systems.

---

## 9. CSS

Use **plain CSS**.

Each component or feature should generally have its own CSS file.

Example:

```text
features/
└── journal/
    └── components/
        ├── JournalCard.tsx
        └── JournalCard.css
```

Avoid putting component-specific styles into one huge global CSS file.

### Global CSS

Global CSS should primarily contain:

* CSS reset/base styles
* Typography defaults
* CSS variables
* App-wide styles
* Global focus/accessibility styles

---

## 10. CSS Design Tokens

Use CSS variables for reusable design values.

Example:

```css
:root {
  --color-primary: ...;
  --color-background: ...;
  --color-surface: ...;
  --color-text: ...;

  --spacing-sm: ...;
  --spacing-md: ...;
  --spacing-lg: ...;

  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;
}
```

Do not repeatedly hard-code the same colors, spacing, radii, or typography values.

---

## 11. Visual Design

The application should have a:

* Modern
* Minimal
* Clean
* Calm
* Polished

visual style.

Use:

* Generous whitespace
* Clear visual hierarchy
* Subtle borders
* Subtle shadows
* Rounded cards where appropriate
* Calm and coherent colors
* Comfortable typography

Avoid unnecessary decoration and visual clutter.

The application should feel like a modern productivity/journaling application.

---

## 12. Dark Mode

The application is **light mode only**.

Do not implement:

* Dark mode
* Theme switching
* Dark-mode CSS
* Dark-mode toggle

unless explicitly requested in the future.

---

## 13. Responsive Design

Responsive behavior should be implemented **when necessary**.

Prioritize a strong desktop experience while ensuring important pages remain usable on smaller screens.

Do not introduce unnecessary responsive complexity.

Use standard CSS media queries and responsive layout techniques when appropriate.

---

## 14. Icons

Use **Unicode/emoji icons**.

Do not introduce an icon library unless explicitly requested.

Examples:

```text
📅
😊
✏️
🗑️
💾
```

When an icon conveys important meaning, also provide an accessible text label where appropriate.

---

## 15. Mood Representation

Use **emoji-based moods**.

Example mood set:

```text
😊 Happy
😐 Neutral
😔 Sad
😡 Angry
😴 Tired
```

Mood selection should be intuitive and visually clear.

Do not rely exclusively on emoji to communicate important information. Include text labels when practical.

---

## 16. Journal Editor

Use a **simple textarea/plain-text editor**.

Do not introduce:

* Rich-text editors
* Markdown editors
* Complex editor frameworks

unless explicitly requested.

The journal editor should prioritize:

* Easy writing
* Good readability
* Comfortable spacing
* Clear save/update actions
* Character count where useful

---

## 17. Forms

Use **controlled React forms**.

Example:

```tsx
const [content, setContent] = useState("");
```

Handle form submission explicitly.

Do not introduce React Hook Form unless explicitly requested.

---

## 18. Form Validation

Use **client-side validation only** for the current application.

Validate input before saving.

Examples:

* Required journal content where appropriate
* Valid mood selection
* Reasonable content length
* Valid dates

Display clear, user-friendly validation messages.

Do not introduce a validation library unless explicitly requested.

---

## 19. Local Storage

The current application uses **Local Storage as the primary persistence mechanism**.

Do not implement Supabase database persistence unless explicitly requested.

Create centralized persistence utilities such as:

```text
storageService.ts
```

Components should not scatter direct calls to:

```ts
localStorage.getItem()
localStorage.setItem()
localStorage.removeItem()
```

throughout the application.

The storage service should handle:

* Reading
* Writing
* Parsing JSON
* Removing data
* Missing data
* Basic malformed-data handling

---

## 20. Local Storage Data Structure

Store application data as **one large JSON object**.

Conceptually:

```ts
interface AppStorageData {
  journals: JournalEntry[];
  moods: MoodEntry[];
  settings: AppSettings;
}
```

Use one well-defined application storage key.

Do not create a separate Local Storage key for every journal entry.

Do not scatter unrelated Local Storage keys throughout the application.

---

## 21. Local Storage Schema Changes

Do not build a generalized automatic migration framework at this stage.

If the Local Storage structure changes in the future:

1. Identify the compatibility issue.
2. Determine whether existing data can be transformed.
3. Add a targeted migration if necessary.
4. Handle the migration manually.

Do not automatically delete existing journal data because the schema changed.

---

## 22. Date Handling

Use the **user's local date/time**.

A journal created today should correspond to the user's local calendar date.

Avoid unnecessary UTC conversion for journal-day behavior.

When comparing journal dates, use the user's local calendar context.

---

## 23. Journal History

Use **calendar-based navigation** as the primary way to browse journal history.

The calendar should allow users to:

* Select a date
* See whether an entry exists
* Open an entry
* Edit an entry
* View its mood
* Navigate between months

Keep the calendar implementation understandable.

Avoid introducing a large calendar library unless there is a clear need.

---

## 24. Routing

Use **React Router** for application navigation.

Prefer meaningful routes such as:

```text
/
/journal
/mood
/settings
```

Keep route definitions centralized and readable.

Do not replace routing with ad-hoc conditional rendering for meaningful application pages.

---

## 25. Authentication

Authentication is **not currently required**.

Do not implement:

* Login
* Registration
* Password reset
* OAuth
* Protected routes
* User sessions

unless explicitly requested.

---

## 26. Supabase

Supabase is part of the technology stack, but **Local Storage is currently the source of persistence**.

Do not add Supabase database operations simply because Supabase exists in the project.

If Supabase persistence is explicitly requested later:

* Put data access in services.
* Keep raw queries out of UI components.
* Reassess validation.
* Reassess security.
* Keep the UI independent of database implementation details.

---

## 27. Async Operations

Use `async/await`.

Handle relevant UI states:

* Loading
* Success
* Empty
* Error

Example:

```ts
try {
  setIsLoading(true);

  await saveJournalEntry(entry);
} catch (error) {
  // Handle error appropriately.
} finally {
  setIsLoading(false);
}
```

Prefer `async/await` over promise chains when it improves readability.

---

## 28. Error Handling

Use centralized and user-friendly error handling where practical.

Do not expose raw technical errors to users.

Avoid displaying:

* Stack traces
* Database errors
* Internal implementation details
* Raw exception messages

Prefer messages such as:

```text
Unable to save your journal entry. Please try again.
```

Technical information may be logged appropriately for debugging.

---

## 29. Toast Notifications

Use **toast notifications** for action feedback.

Examples:

```text
Journal saved successfully.
Journal deleted.
Changes updated successfully.
```

Toasts should be:

* Short
* Non-blocking
* Accessible
* Easy to understand

Do not use `alert()` for normal success/error feedback.

---

## 30. Destructive Actions

Use a **custom confirmation dialog** for destructive actions.

For example, deleting a journal entry should require confirmation.

The dialog should provide:

* Clear explanation
* Cancel button
* Delete/confirm button
* Keyboard accessibility
* Appropriate focus behavior

Do not use the native browser `confirm()` unless explicitly requested.

---

## 31. Accessibility

Follow standard web accessibility best practices.

Use:

* Semantic HTML
* Proper heading hierarchy
* Form labels
* Keyboard navigation
* Visible focus states
* Meaningful button labels
* Sufficient color contrast
* Accessible dialogs
* Accessible validation messages

Use ARIA only when native HTML semantics are insufficient.

Do not make emoji the only accessible name for important controls.

Automated accessibility testing is **not required by default** and should only be added when explicitly requested.

---

## 32. Security

Follow standard web security best practices.

Never:

* Commit secrets
* Expose private API keys
* Inject untrusted HTML
* Use unsafe HTML rendering unnecessarily
* Store sensitive secrets in client-side source code

Treat user-entered journal content as untrusted data.

If the application later becomes server-backed, reassess server-side validation and authorization requirements.

---

## 33. Environment Variables

Use Vite `.env` / `.env.local` files for environment configuration.

Access Vite client-safe environment values through:

```ts
import.meta.env
```

Do not hard-code environment-specific configuration into source files.

Never commit private secrets.

Remember that variables exposed to client-side Vite code are not secret simply because they are stored in `.env`.

---

## 34. State Management

Use React's built-in state management:

* `useState`
* `useReducer` when appropriate
* Context API for genuinely shared state

Do not introduce:

* Redux
* Redux Toolkit
* Zustand
* Other external state-management libraries

unless explicitly requested.

Keep state as local as reasonably possible.

Do not put all application state into Context.

---

## 35. React Performance

Optimize only when there is a clear reason.

Do not automatically add:

* `useMemo`
* `useCallback`
* `React.memo`

Use these APIs only when they address a meaningful performance concern.

Avoid premature optimization.

---

## 36. Performance Philosophy

Prefer straightforward implementations first.

Optimize when there is evidence or a clear reason to do so.

Do not add complex caching, memoization, code splitting, or rendering optimizations without justification.

---

## 37. Testing

Use **unit testing** for important logic.

Focus tests on:

* Utility functions
* Storage logic
* Date calculations
* Mood logic
* Important hooks
* Non-trivial business logic

Do not require tests for every simple presentational component.

The exact testing framework is intentionally left open.

Use the framework already configured in the repository. If none exists, choose a suitable framework compatible with Vite and the existing project rather than introducing unnecessary complexity.

Do not automatically add end-to-end tests.

---

## 38. Comments and Documentation

Use **minimal, meaningful comments**.

Prefer self-explanatory code.

Comments should explain things such as:

* Non-obvious decisions
* Complex logic
* Browser limitations
* Important constraints
* Reasons for unusual implementations

Do not write comments that simply restate what the code already says.

---

## 39. ESLint and Prettier

Use:

* ESLint
* Prettier

Generated code should follow the repository's existing configuration.

Do not introduce another formatting system.

Do not disable lint rules simply to make generated code pass.

---

## 40. Dependency Management

**Minimize dependencies.**

Before adding a new npm package:

1. Check whether the project already has a suitable solution.
2. Check whether React or browser APIs can solve the problem.
3. Consider maintenance cost.
4. Consider bundle size.
5. Add a dependency only when it provides meaningful value.

Do not introduce dependencies simply for convenience.

In particular, do not introduce a new:

* State-management library
* Form library
* Rich-text editor
* Icon library
* Large UI framework

unless explicitly requested or clearly justified.

---

## 41. Code Style

Use a **traditional, explicit TypeScript/React style**.

Prefer:

* `const` by default
* Clear variable declarations
* Explicit control flow
* Readable conditionals
* Descriptive names
* Explicit interfaces/types
* Straightforward functions

Avoid overly clever one-liners.

Do not optimize for the fewest possible lines of code.

Readability is more important than compactness.

---

## 42. Implementation Workflow

When implementing a feature:

1. Understand the existing architecture.
2. Identify the appropriate feature.
3. Check for existing reusable components/utilities.
4. Define or update necessary types.
5. Implement persistence/service logic separately.
6. Implement React state and interaction logic.
7. Implement the UI.
8. Add feature-specific CSS.
9. Add relevant loading/empty/error states.
10. Add unit tests for important logic.
11. Check accessibility basics.
12. Follow ESLint and Prettier configuration.
13. Avoid unrelated modifications.

---

## 43. Change Discipline

When modifying existing code:

* Make the smallest reasonable change.
* Preserve existing working behavior.
* Avoid unrelated refactoring.
* Do not rename unrelated variables.
* Do not reorganize unrelated folders.
* Do not rewrite entire files when a targeted change is sufficient.
* Do not change architecture without a clear reason.

When creating new functionality, follow the existing project conventions.

---

## 44. User Experience Priorities

For the Daily Journal application, prioritize:

1. Ease of writing
2. Clear mood selection
3. Fast saving
4. Easy calendar/history navigation
5. Clear feedback
6. Readability
7. Accessibility
8. Visual consistency
9. Maintainability

The interface should feel calm and uncluttered.

Avoid unnecessary features and visual complexity.

---

## 45. Future-Proofing

Do not over-engineer for hypothetical future requirements.

However, maintain reasonable architectural boundaries so future functionality such as:

* Authentication
* Supabase persistence
* Cloud synchronization
* Multiple users
* Mood analytics

can be introduced without rewriting the entire UI.

Future-proofing should come primarily from **good separation of concerns**, not excessive abstraction.

---

## 46. Final Copilot Checklist

Before generating code, verify:

* Is this consistent with the feature-based architecture?
* Is this TypeScript?
* Is the component functional?
* Am I using React hooks appropriately?
* Is the code explicit and maintainable?
* Is a new abstraction actually necessary?
* Is a new dependency actually necessary?
* Is persistence handled by the appropriate service?
* Is Local Storage still the current persistence mechanism?
* Are UI states handled appropriately?
* Is CSS located in the correct feature/component CSS file?
* Are CSS variables used for repeated design values?
* Is the interface light-mode only?
* Are emoji-based moods used consistently?
* Is React Router used for page navigation?
* Are destructive actions protected by a custom confirmation dialog?
* Are toast notifications used for action feedback?
* Is the implementation accessible?
* Is important logic testable?
* Am I making unrelated changes?

When uncertain:

> **Choose the simplest maintainable solution that follows the existing project architecture.**
