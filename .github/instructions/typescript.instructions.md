---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript + React Standards

## TypeScript
- Assume `strict` mode is enabled and keep code compatible with it.
- Do not use `any`; prefer `unknown`, precise generics, or explicit interfaces/types.
- Model complex states with discriminated unions rather than ad hoc flags.
- Prefer immutable data structures and avoid in-place mutation.
- Use explicit return types for exported functions, hooks, and public interfaces when clarity benefits maintainability.
- Narrow types early and keep type assertions to a minimum.
- Keep types local when they are only used in one place; promote shared types only when reuse is real.

## React
- Use functional components and hooks; avoid class components.
- Follow the Rules of Hooks strictly: call hooks at the top level and only from React functions or custom hooks.
- Keep components small, focused, and composable.
- Prefer explicit prop typing and keep props minimal.
- Derive state instead of duplicating it when possible.
- Encapsulate reusable logic in custom hooks rather than large components.
- Use stable keys, predictable rendering, and side effects only where necessary.

## Error Handling
- Handle expected failures explicitly and surface useful error messages.
- Use typed error shapes when errors are part of the control flow.
- Avoid swallowing errors; log or rethrow with context where appropriate.
- Keep loading, empty, success, and error states clearly separated.

## State Management
- Prefer local state for local concerns and lift state only when required.
- Keep derived values computed from source state instead of stored separately.
- Use a centralized store only when shared state or workflow complexity justifies it.
- Make state transitions predictable and easy to trace.
- Avoid mixing server state, UI state, and derived state without clear boundaries.