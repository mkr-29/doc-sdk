# doc-sdk: Agent Operating Guidelines & Architecture Guide

Welcome to **`@mkr/doc-sdk`** (or `doc-sdk`). This project is a modular, decoupled TypeScript SDK for creating, editing, and rendering dynamic documentation experiences with custom layouts, schema-driven forms, and extensible client renderers.

---

## 1. Architectural Principles & Tri-Layer Decoupling

The SDK is strictly decoupled into three independent layers communicating exclusively through typed JSON contracts:

```text
┌────────────────────────────────────────────────────────┐
│                      Data Store                        │
│   • Template Schema (Layout, blocks, field rules)      │
│   • Document Content (Values keyed by block/field ID)  │
└───────────────▲────────────────────────▲───────────────┘
                │                        │
        (Save Template)           (Save Content)
                │                        │
┌───────────────┴───────────────┐ ┌──────┴───────────────┐
│       1. Template Builder     │ │   2. Content Editor   │
│  (Admin defines blocks, meta, │ │ (Form generated from  │
│      and section schemas)     │ │   template structure) │
└───────────────────────────────┘ └───────────────────────┘
                │                        │
                └───────────┬────────────┘
                            ▼
              ┌───────────────────────────┐
              │     3. Client Viewer      │
              │ (Renders blocks dynamic-  │
              │  ally based on template)  │
              └───────────────────────────┘
```

### The Three Layers:
1. **Core Data Contracts & Validation (`core/`)**:
   - Single source of truth for runtime (Zod) and compile-time (TypeScript) types.
   - Zero UI dependencies. Lightweight, tree-shakable, runs in browser, Node, and edge runtimes.
2. **Admin Suite (`admin/`)**:
   - `TemplateBuilder`: Visual schema constructor for defining metadata fields, section order, repeatability, and allowed block types.
   - `ContentEditor`: Dynamic form generator that reads a `DocTemplate` and generates reactive form inputs to produce validated `DocContent`.
3. **Client Viewer Engine (`client/`)**:
   - `DocRenderer`: Consumer-facing presentation engine.
   - Layout shells (`single-column`, `two-column`, `side-by-side-code`).
   - Pluggable `BlockRegistry` executing individual block renderers.
4. **Hooks & Utilities (`hooks/`)**:
   - Headless logic for Table of Contents (TOC) extraction, search indexing, anchor navigation, and scroll spy.

---

## 2. Directory & Package Structure

```text
doc-sdk/
├── core/                       # Core contracts, Zod schemas, validation logic
│   ├── types.ts                # TypeScript interfaces (DocTemplate, DocContent, etc.)
│   ├── schemas.ts              # Zod schemas matching all interfaces
│   ├── registry.ts             # Registry definitions & block registration types
│   └── index.ts                # Core public exports
├── admin/                      # Admin Suite (Builder + Content Editor)
│   ├── TemplateBuilder/        # Drag-and-drop template designer
│   │   ├── TemplateBuilder.tsx
│   │   ├── SectionList.tsx
│   │   ├── MetadataFieldEditor.tsx
│   │   └── types.ts
│   ├── ContentEditor/          # Dynamic form generator
│   │   ├── DocContentEditor.tsx
│   │   ├── DynamicField.tsx
│   │   ├── SectionForm.tsx
│   │   └── BlockInjector.tsx
│   └── index.ts                # Admin public exports
├── client/                     # Client Viewer Engine
│   ├── DocRenderer/            # Top-level rendering orchestrator
│   │   ├── DocRenderer.tsx
│   │   └── BlockRenderer.tsx
│   ├── layouts/                # Documentation layout wrappers
│   │   ├── SingleColumnLayout.tsx
│   │   ├── TwoColumnLayout.tsx
│   │   ├── SideBySideCodeLayout.tsx
│   │   └── LayoutRegistry.ts
│   ├── blocks/                 # Default prebuilt UI blocks
│   │   ├── TextBlock.tsx
│   │   ├── MarkdownBlock.tsx
│   │   ├── CodeSampleBlock.tsx
│   │   ├── ApiEndpointBlock.tsx
│   │   ├── CalloutBlock.tsx
│   │   ├── StepperBlock.tsx
│   │   └── defaultRegistry.ts
│   └── index.ts                # Client public exports
├── hooks/                      # Headless hooks & navigation
│   ├── useTableOfContents.ts   # TOC parsing & heading anchor generation
│   ├── useScrollSpy.ts         # Active section tracking on scroll
│   ├── useDocSearch.ts         # In-memory document search indexing
│   └── index.ts                # Hooks public exports
├── plans/                      # Categorized execution roadmaps & checklist
│   ├── checklist.md            # Master checklist & execution tracker
│   ├── auto-development-protocol.md # Autonomous TDD & gatekeeper rules
│   ├── 01-tooling-and-test-harness.md
│   ├── 02-core-contracts-and-schemas.md
│   ├── 03-block-component-primitives.md
│   ├── 04-admin-template-builder.md
│   ├── 05-admin-content-editor.md
│   ├── 06-client-viewer-engine-and-layouts.md
│   ├── 07-headless-hooks-and-navigation.md
│   └── 08-packaging-and-playground.md
├── tests/                      # Automated test suite (unit, integration, contracts)
├── .agents/                    # Agent rules, workflows, and prompts
│   └── rules/                  # Modular agent rules
├── AGENTS.md                   # Agent guidelines (this file)
└── CLAUDE.md                   # Anthropic / Claude assistant reference
```

---

## 3. Core Data Contracts (Immutable Baseline)

### 3.1. Block Types
```typescript
export type BlockType = 
  | 'text' 
  | 'markdown' 
  | 'code_sample' 
  | 'api_endpoint' 
  | 'callout' 
  | 'stepper';
```

### 3.2. Template Schema (`DocTemplate`)
```typescript
export interface FieldDefinition {
  id: string;
  name: string;
  type: 'string' | 'rich-text' | 'code' | 'select' | 'array';
  required?: boolean;
  options?: string[]; // for select/tags
}

export interface SectionDefinition {
  id: string;
  title: string;
  allowedBlocks: BlockType[];
  isRepeatable?: boolean;
}

export interface DocTemplate {
  id: string;
  name: string;
  layoutType: 'two-column' | 'single-column' | 'side-by-side-code';
  metadataFields: FieldDefinition[];
  sections: SectionDefinition[];
}
```

### 3.3. Document Content (`DocContent`)
```typescript
export interface DocContent {
  id: string;
  templateId: string;
  metadata: Record<string, any>;
  sections: {
    sectionId: string;
    blocks: {
      id: string;
      type: BlockType;
      data: Record<string, any>;
    }[];
  }[];
}
```

---

## 4. Coding Standards & Agent Rules

1. **Plan-Driven Development & Checklist Synchronization**:
   - Before implementing any feature, agents MUST consult [`plans/checklist.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/checklist.md) and the corresponding category plan in `plans/`.
   - Update the checklist immediately upon task completion. Do not start subsequent phases with incomplete preceding milestones.

2. **Strict TypeScript & Runtime Validation**:
   - Every contract in `core/types.ts` must have an identical schema in `core/schemas.ts` defined with Zod.
   - Use `z.infer<typeof ...>` to guarantee type alignment.
   - Never use `any` in core definitions. Where block payload is dynamic, use `Record<string, unknown>` with typed generics or schemas per `BlockType`.

3. **No Leaky Abstractions**:
   - `core/` MUST NEVER import from `admin/`, `client/`, or React UI packages.
   - `client/` MUST NEVER import from `admin/`.
   - `admin/` may import types/schemas from `core/` and optionally reusable block renderers from `client/` for preview mode.

4. **DOM Stability & Anti-Thrashing**:
   - Form inputs and dynamic block editors must maintain stable React component keys (`block.id`, not array indices).
   - Never trigger unneeded remounts or full re-renders of the content editor when editing a single block.

5. **Extensibility via Registries**:
   - Always allow developers using the SDK to pass a custom `customBlocks: Partial<Record<BlockType, React.FC<any>>>` or register brand-new block types dynamically.
   - Provide high-quality fallback handling when an unregistered block type is encountered.

6. **Accessibility & Semantic HTML**:
   - Client viewer layouts and blocks must output semantic HTML (`<article>`, `<section>`, `<nav>`, `<h1>`-`<h6>`, `<aside>`).
   - Steppers, tabs, and code blocks must have ARIA roles and keyboard navigation.

---

## 5. Development & Testing Commands (Targeted)

- Package management: `pnpm` / `npm`
- Lint & Typecheck: `npm run typecheck`, `npm run lint`
- Test: `npm test`
- Build: `npm run build` (outputs clean ESM & CJS with d.ts declarations)
