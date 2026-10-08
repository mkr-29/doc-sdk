# GEMINI.md - Google Antigravity & AI Agent Instructions

See full architecture and operating guidelines in [AGENTS.md](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/AGENTS.md).

## Quick Summary
- **SDK Package**: `@mkr/doc-sdk` / `doc-sdk`
- **Core Architecture**:
  - `core/`: Types, Zod runtime schemas, contracts, block registries. Zero UI dependencies.
  - `admin/`: `<TemplateBuilder/>` (visual schema creator) and `<DocContentEditor/>` (dynamic form engine).
  - `client/`: `<DocRenderer/>`, layout wrappers (`single-column`, `two-column`, `side-by-side-code`), and default block renderers (`text`, `markdown`, `code_sample`, `api_endpoint`, `callout`, `stepper`).
  - `hooks/`: Table of contents parsing, scroll spy, navigation, search.
- **Rule Modules**:
  - [00-plan-driven-development.md](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/.agents/rules/00-plan-driven-development.md)
  - [01-architecture-and-contracts.md](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/.agents/rules/01-architecture-and-contracts.md)
  - [02-admin-suite-and-form-engine.md](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/.agents/rules/02-admin-suite-and-form-engine.md)
  - [03-client-viewer-and-blocks.md](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/.agents/rules/03-client-viewer-and-blocks.md)
  - [04-code-style-and-quality.md](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/.agents/rules/04-code-style-and-quality.md)
- **Execution Plans**:
  - Master Checklist: [plans/checklist.md](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/checklist.md)

