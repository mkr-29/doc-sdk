# CLAUDE.md - Guidelines for doc-sdk

## Project Overview
`doc-sdk` is an extensible TypeScript SDK providing custom documentation layouts, forms, and client renderers decoupled into three layers:
1. **Core Data Contracts** (`core/`): Zod schemas and TypeScript types (`DocTemplate`, `DocContent`, `BlockType`).
2. **Admin Suite** (`admin/`): Visual `TemplateBuilder` + dynamic `DocContentEditor`.
3. **Client Viewer Engine** (`client/`): `DocRenderer`, layout shells (`single-column`, `two-column`, `side-by-side-code`), and pluggable `BlockRegistry`.
4. **Hooks** (`hooks/`): Table of contents parsing, scroll spy, search.

## Key Rules & Architectural Invariants
- **Plan-Driven Development**: Always check [`plans/checklist.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/checklist.md) and the corresponding plan in `plans/` before starting work. Keep the checklist up to date as tasks complete.
- **Layer Separation**: `core/` has zero UI dependencies. `client/` does not import `admin/`.
- **Validation**: All data entering/exiting the SDK must be validated against Zod schemas.
- **Key Stability**: Dynamic block lists in the editor must use unique block IDs (`block.id`) as React keys to prevent focus loss and DOM thrashing.
- **Extensible Registries**: Both `layoutType` and `BlockType` renderers must be injectable via developer-provided registry overrides.

## Commands (When implemented)
- Install: `npm install`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Test: `npm test`
- Build: `npm run build`
