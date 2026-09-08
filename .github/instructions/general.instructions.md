---
applyTo: "**/*"
---

# Universal Engineering Standards

## Naming Conventions
- Use clear, descriptive names that reflect intent.
- Prefer consistent terminology across files, modules, and features.
- Avoid abbreviations unless they are widely understood.
- Use pluralization, casing, and suffixes consistently within the repository.

## File Structure
- Keep files focused on a single responsibility.
- Group related code, assets, and configuration logically.
- Prefer shallow directory structures when possible.
- Separate implementation, tests, and documentation clearly.

## Readability
- Optimize for clarity over cleverness.
- Keep functions, modules, and blocks small and easy to scan.
- Use whitespace to separate logical sections.
- Prefer straightforward control flow over deeply nested logic.

## Comments
- Write comments only when they add information not obvious from the code.
- Explain intent, tradeoffs, and non-obvious constraints.
- Do not restate what the code already makes clear.
- Remove outdated comments during refactoring.

## Refactoring Discipline
- Refactor incrementally and verify behavior after each meaningful change.
- Keep changes scoped and avoid unrelated cleanup in the same commit.
- Preserve public behavior unless the change explicitly requires otherwise.
- Improve structure without introducing unnecessary abstraction.

## Error Handling
- Fail clearly and early when inputs or state are invalid.
- Handle expected failures explicitly and consistently.
- Use meaningful error messages that help diagnose the problem.
- Avoid silent failures, swallowed exceptions, and ambiguous fallback behavior.

## Imports and Dependencies
- Keep imports organized, minimal, and free of unused entries.
- Prefer local, explicit dependencies over hidden coupling.
- Avoid circular dependencies where possible.
- Remove obsolete dependencies and references promptly.

## Formatting
- Follow the repository’s established formatting conventions.
- Keep line length, indentation, and spacing consistent.
- Let automated formatting tools handle mechanical style when available.
- Avoid style-only changes mixed with functional changes unless necessary.

## Collaboration Rules
- Make changes that are easy for others to review and maintain.
- Keep pull requests focused and small when possible.
- Document behavior changes clearly in code, tests, or PR descriptions.
- Respect existing patterns unless there is a clear reason to improve them.