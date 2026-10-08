# Master Project Checklist & Execution Tracker

> **Current Status**: Active  
> **Progress**: Phase 0 Complete | Phase 1 Ready for Implementation  
> **Rule Requirement**: Agents and developers must check and update this checklist when completing tasks and before moving to subsequent phases.

---

## High-Level Roadmap Overview

| Phase | Category | Status | Target Deliverables |
| :---: | :--- | :---: | :--- |
| **0** | **Project Setup & Agent Operating Rules** | ✅ Completed | Architecture definitions, git setup, agent rules, plans directory |
| **1** | **Core Data Contracts & Validation** | ⬜ Not Started | Zod schemas, TypeScript types, validation helpers, unit tests |
| **2** | **Block Component Primitives** | ⬜ Not Started | Headless & UI block library (`text`, `markdown`, `code_sample`, `api_endpoint`, `callout`, `stepper`) |
| **3** | **Admin Template Builder** | ⬜ Not Started | `<TemplateBuilder/>`, section manager, metadata configurator, layout selector, JSON exporter |
| **4** | **Admin Content Form Editor** | ⬜ Not Started | `<DocContentEditor/>`, dynamic field mapping, block injector, block reordering/deletion |
| **5** | **Client Viewer Engine & Layouts** | ⬜ Not Started | `<DocRenderer/>`, `SingleColumnLayout`, `TwoColumnLayout`, `SideBySideCodeLayout`, Block Registry |
| **6** | **Headless Hooks & Navigation** | ⬜ Not Started | `useTableOfContents`, `useScrollSpy`, `useDocSearch`, anchor scroll handlers |
| **7** | **Packaging, Testing & Demo Playground** | ⬜ Not Started | ESM/CJS bundling, TypeScript declarations, test suites, interactive preview app |

---

## Detailed Phase Breakdown & Tasks

### [x] Phase 0: Project Initialization & Operating Rules
- [x] Configure repository remote, SSH keys, and git author identity.
- [x] Create comprehensive architectural guidelines ([`AGENTS.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/AGENTS.md)).
- [x] Create agent reference guides ([`CLAUDE.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/CLAUDE.md), [`GEMINI.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/GEMINI.md)).
- [x] Create modular agent rule files in [`.agents/rules/`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/.agents/rules/).
- [x] Create categorized execution plans in [`plans/`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/).
- [x] Enforce plan-driven development in agent rules.

---

### [ ] Phase 1: Core Data Contracts & Validation ([`01-core-contracts-and-schemas.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/01-core-contracts-and-schemas.md))
- [ ] Initialize `package.json`, TypeScript config (`tsconfig.json`), and install core dependencies (`zod`).
- [ ] Implement `core/types.ts`:
  - [ ] `BlockType` union and type guards.
  - [ ] `FieldDefinition` and `FieldType`.
  - [ ] `SectionDefinition`.
  - [ ] `DocTemplate` and `LayoutType`.
  - [ ] `DocContent`, `SectionContent`, and `BlockContent`.
- [ ] Implement `core/schemas.ts`:
  - [ ] Zod schemas matching all TypeScript interfaces.
  - [ ] Block data schemas for each block type (`text`, `markdown`, `code_sample`, `api_endpoint`, `callout`, `stepper`).
  - [ ] Schema validation utilities (`validateTemplate`, `validateContent`, `safeParseTemplate`, `safeParseContent`).
- [ ] Implement `core/registry.ts`:
  - [ ] Type definitions for block registry and layout registry.
  - [ ] Default registry token definitions.
- [ ] Write unit tests for core validation (`tests/core/schemas.test.ts`).

---

### [ ] Phase 2: Block Component Primitives ([`02-block-component-primitives.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/02-block-component-primitives.md))
- [ ] Setup UI dependencies (React, Lucide icons, Prism/Shiki, unified/remark or markdown-to-jsx).
- [ ] Implement `<TextBlock/>`: Paragraph, lead, body, caption typography.
- [ ] Implement `<MarkdownBlock/>`: GFM rendering, auto-heading IDs, tables, task lists.
- [ ] Implement `<CodeSampleBlock/>`: Syntax highlighting, language badges, line highlights, copy button.
- [ ] Implement `<ApiEndpointBlock/>`: Method badge (`GET`, `POST`, `PUT`, `DELETE`), path header, query/header/body parameter tables, response status cards.
- [ ] Implement `<CalloutBlock/>`: Variants (`info`, `warning`, `tip`, `danger`), icon mapping, accessible container.
- [ ] Implement `<StepperBlock/>`: Step navigation, active step indicators, collapsible/sequential views.
- [ ] Create `client/blocks/defaultRegistry.ts` mapping block types to component renderers.
- [ ] Add unit tests for block components.

---

### [ ] Phase 3: Admin Template Builder ([`03-admin-template-builder.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/03-admin-template-builder.md))
- [ ] Implement `<TemplateBuilder/>` layout container with header, canvas, and property sidebar.
- [ ] Implement template general settings (ID, template name, layout type selector).
- [ ] Implement `<MetadataFieldEditor/>`:
  - [ ] Add/remove metadata fields.
  - [ ] Configure field type (`string`, `rich-text`, `code`, `select`, `array`), required toggle, options.
- [ ] Implement `<SectionList/>` & section designer:
  - [ ] Add, delete, and reorder sections.
  - [ ] Multi-select tag group for `allowedBlocks`.
  - [ ] Toggle `isRepeatable` flag.
- [ ] Implement Template Export/Import modal with real-time JSON validation.
- [ ] Add unit and interaction tests for `<TemplateBuilder/>`.

---

### [ ] Phase 4: Admin Content Form Editor ([`04-admin-content-editor.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/04-admin-content-editor.md))
- [ ] Implement `<DocContentEditor/>` orchestrator.
- [ ] Implement `<MetaPanel/>`: Dynamic inputs generated from `template.metadataFields`.
- [ ] Implement `<SectionForm/>`:
  - [ ] Render section containers based on `template.sections`.
  - [ ] Support repeatable sections (add/remove section instance).
- [ ] Implement `<BlockInjector/>`:
  - [ ] Dynamic "Add Block" button displaying only `section.allowedBlocks`.
  - [ ] Block container cards with move up, move down, duplicate, and delete actions.
  - [ ] Block data editor sub-forms per block type.
- [ ] Implement key stability safeguards (stable `block.id` React keys, debounced state propagation).
- [ ] Implement live TOC preview sidebar.
- [ ] Add unit and interaction tests for `<DocContentEditor/>`.

---

### [ ] Phase 5: Client Viewer Engine & Layouts ([`05-client-viewer-engine-and-layouts.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/05-client-viewer-engine-and-layouts.md))
- [ ] Implement `<DocRenderer/>` main entry component.
- [ ] Implement layout shells:
  - [ ] `<SingleColumnLayout/>`: Centered document layout with optional header/footer.
  - [ ] `<TwoColumnLayout/>`: Left navigation sidebar, content column, right sticky TOC.
  - [ ] `<SideBySideCodeLayout/>`: Split-screen layout (prose left, code/payloads right).
- [ ] Implement `<BlockRenderer/>` with fallback for unregistered custom blocks.
- [ ] Support custom block overrides via `blockRegistry` prop.
- [ ] Support custom layout overrides via `customLayouts` prop.
- [ ] Ensure SSR safety and hydration stability.
- [ ] Add unit and layout snapshot tests.

---

### [ ] Phase 6: Headless Hooks & Navigation ([`06-headless-hooks-and-navigation.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/06-headless-hooks-and-navigation.md))
- [ ] Implement `useTableOfContents`: Extracts headings from markdown and text blocks with slugs and nesting levels.
- [ ] Implement `useScrollSpy`: Observes headings on scroll and flags current active heading ID.
- [ ] Implement `useDocSearch`: In-memory client-side full-text search indexing across sections and blocks.
- [ ] Implement smooth scroll-to-anchor utilities.
- [ ] Add unit tests for headless hooks.

---

### [ ] Phase 7: Packaging, Testing & Demo Playground ([`07-packaging-testing-and-playground.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/07-packaging-testing-and-playground.md))
- [ ] Configure build system (tsup / Vite Library Mode) for ESM + CJS + `.d.ts`.
- [ ] Verify exports in `package.json` (`@mkr/doc-sdk`, `@mkr/doc-sdk/core`, `@mkr/doc-sdk/admin`, `@mkr/doc-sdk/client`, `@mkr/doc-sdk/hooks`).
- [ ] Setup Vitest and React Testing Library test runner.
- [ ] Build interactive Demo Playground app:
  - [ ] Tab 1: Template Builder (design template).
  - [ ] Tab 2: Content Editor (fill out documentation).
  - [ ] Tab 3: Client Viewer (preview the rendered doc with live layout switching).
  - [ ] Preloaded templates: API Reference, Product Walkthrough, Getting Started Guide.
- [ ] Write end-to-end integration tests.
