---
name: code-quality-audit
description: Audits the workspace code quality, verifies React 19 purity, Next.js best practices, and fixes ESLint/TypeScript errors. Use when the user asks to check, audit, clean up, or prepare code for production or commit.
---

# Code Quality Audit & Verification

This skill guides the agent through a thorough audit of the codebase to guarantee that all changes meet the project's quality bar.

## Audit Workflow

### 1. Run Static Linter
Run the project's ESLint runner:
```bash
npm run lint
```

### 2. Inspect Common Antipatterns
Review the output for the following critical categories:
- **React 19 Impure Functions (`react-hooks/purity`)**: Look for functions like `Date.now()`, `Math.random()`, or non-idempotent operations executed during the component render body. Move them inside event handlers or `useEffect`.
- **Next.js Image Optimization (`@next/next/no-img-element`)**: Replace raw `<img>` tags with `next/image` (`<Image />`) providing `width`, `height`, or `fill` alongside meaningful `alt` descriptions.
- **Dead Code / Unused Variables (`@typescript-eslint/no-unused-vars`)**: Remove unused constants, variables, and unreferenced imports.
- **Inline Style Overuse**: Flag components using extensive `style={{ ... }}` blocks instead of Tailwind CSS classes.

### 3. Verify Production Build
Ensure that the Next.js compilation passes without build-time errors:
```bash
npm run build
```

### 4. Verification Checkpoint
Confirm that:
1. `npm run lint` exits with code `0` (0 errors, 0 warnings).
2. `npm run build` succeeds cleanly.
