# Rule: Code Style, TypeScript Standards & Quality

## 1. Context & Scope
This rule enforces development conventions, packaging, TypeScript strictness, and quality guarantees across the `doc-sdk` repository.

## 2. Standards & Practices

### 2.1. Strict TypeScript Standards
- **Zero `any` Policy**: Use explicit types, discriminating unions, or `unknown` with runtime type narrowing.
- **Type Coherence**: Export all types consumed by users in public index files.
- **Contract Synchronization**: When modifying any interface in `core/types.ts`, immediately update `core/schemas.ts` and test assertions.

### 2.2. Component Architecture
- Pure functional React components with hooks.
- Decouple view rendering from complex business logic using custom hooks (`hooks/`).
- Proper props interface declaration with JSDoc comments explaining purpose and default values.
- Props should allow `className` and `style` injection for styling customization by host apps.

### 2.3. Styling Architecture
- **Themeable & Scoped**: Use modular CSS or standard CSS variables prefixed with `--doc-sdk-` (e.g. `--doc-sdk-primary`, `--doc-sdk-bg`, `--doc-sdk-border`, `--doc-sdk-code-bg`).
- Avoid hardcoded magic color values. Ensure high contrast and dark/light mode compatibility.
- Ensure zero CSS conflicts when embedded into Next.js, Remix, Vite, or Astro host apps.

### 2.4. Testing Discipline
- **Unit Tests (`tests/core/`)**:
  - Test Zod validation for all valid and invalid permutations of `DocTemplate` and `DocContent`.
  - Test custom block registration and fallback handling.
- **Component Tests (`tests/admin/`, `tests/client/`)**:
  - Test dynamic form input generation from various field definitions.
  - Test block addition, deletion, and reordering in `<DocContentEditor/>`.
  - Test `<DocRenderer/>` rendering across all three layout types.
- **Anchor & Navigation Tests (`tests/hooks/`)**:
  - Test TOC extraction from markdown headings and active scroll spy tracking.

### 2.5. Safe Git & Tool Operations
- Never run destructive commands (`git reset --hard`, `git clean -f`, `rm -rf`) without explicit instruction.
- Keep commits granular and well-documented.
