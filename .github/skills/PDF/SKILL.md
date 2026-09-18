# Commit Report PDF Skill

Create a polished PDF report that summarizes commits introduced in a Git revision range.

## When to use

Use this skill when asked to create, export, or share a PDF describing recent commits, release changes, a branch comparison, or a pull request's changes.

## Required input

Obtain a revision range before generating the report:

- Preferred: an explicit range such as `main..HEAD`, `v1.2.0..HEAD`, or `<base-sha>..<head-sha>`.
- If the request identifies a pull request, use its base and head commits.
- If no baseline is supplied, ask the user for one. Do not guess which commits are "new."

The user may also specify an output path. Otherwise, write the file to:

```text
reports/commit-report-<short-base>-to-<short-head>.pdf
```

Create the `reports/` directory if necessary. Do not write generated PDFs to `dist/`.

## Collecting commit data

Run these commands from the repository root:

```powershell
git log --no-merges --date=short --format="%H%x09%h%x09%ad%x09%an%x09%s" <range>
git diff --stat <range>
git diff --name-status <range>
```

For each commit, collect:

- Short SHA
- Subject
- Author
- Local commit date
- Changed-file count and additions/deletions when useful

Use `git show --format= --stat <sha>` for per-commit file summaries. Read individual diffs only when needed to accurately describe meaningful behavior changes. Do not include sensitive values, credentials, tokens, private keys, or full user-provided content in the report.

## Report contents

Use this order:

1. Title: **Commit Report**
2. Repository name and revision range
3. Generation date in the user's local time
4. Executive summary: a concise, factual description of the overall change
5. Commit summary table with SHA, date, author, and subject
6. Notable changes grouped by feature or area
7. Changed-files summary
8. Risks, migration notes, or follow-up actions, only when supported by the changes

Keep commit messages verbatim except for harmless whitespace normalization. Summaries must be grounded in Git history and diffs; do not invent testing results, deployment status, issue links, or behavior.

## PDF quality requirements

- Use a standard readable font, clear heading hierarchy, page numbers, and margins.
- Repeat table headers on multi-page tables.
- Wrap long file paths and commit subjects without clipping.
- Keep code excerpts short and include them only when essential.
- Use a light, print-friendly style with sufficient contrast.
- Use an ASCII-safe filename.

Generate the PDF with an available local tool or library. Do not install dependencies unless the user approves it. If no local PDF-capable tool exists, clearly report the limitation and provide the structured report content instead of creating a file with a `.pdf` extension that is not a valid PDF.

## Final response

State the saved PDF path, the revision range, and the number of commits included. Mention meaningful exclusions or limitations plainly.