# Rule: Client Viewer Engine & Block Renderers

## 1. Context & Scope
This rule guides the implementation and extension of the Client Viewer Engine, including `<DocRenderer/>`, layouts, and block components.

## 2. Component Guidelines

### 2.1. Client Viewer Orchestrator (`<DocRenderer/>`)
- **Signature**:
  ```tsx
  interface DocRendererProps {
    template: DocTemplate;
    content: DocContent;
    blockRegistry?: Partial<Record<BlockType, React.ComponentType<BlockRendererProps>>>;
    customLayouts?: Record<string, React.ComponentType<LayoutProps>>;
    className?: string;
    onAnchorClick?: (anchorId: string) => void;
  }
  ```
- **Execution Flow**:
  1. Validates `template` and `content` compatibility (e.g. `content.templateId === template.id`).
  2. Resolves layout wrapper based on `template.layoutType` (`two-column`, `single-column`, `side-by-side-code`).
  3. Traverses `content.sections`, matching against `template.sections`.
  4. Delegates block rendering to the merged `BlockRegistry` (default registry + optional consumer overrides).
  5. Provides graceful fallback when an unrecognized block type is supplied.

### 2.2. Documentation Layout Shells
- **Single-Column (`single-column`)**:
  - Centered reading flow, ideal for long-form guides, tutorials, and release notes.
  - Optional sticky header and in-page anchor links.
- **Two-Column (`two-column`)**:
  - Main documentation view: Left navigation sidebar (or breadcrumb), central main reading column, and right-hand sticky Table of Contents (TOC).
- **Side-by-Side Code (`side-by-side-code`)**:
  - Stripe/Redoc/Mintlify style API reference layout.
  - Left column: Endpoints, parameter descriptions, markdown prose, response schemas.
  - Right column: Sticky code samples, request payloads, response bodies, and multi-language tabs (cURL, Python, JS, Go).

### 2.3. Core Block Components
1. **`text` (`<TextBlock/>`)**:
   - Clean typographic paragraphs with variant styling (`lead`, `body`, `caption`).
2. **`markdown` (`<MarkdownBlock/>`)**:
   - Renders GitHub Flavored Markdown (GFM) including headings (auto-anchored), lists, tables, blockquotes, and links.
3. **`code_sample` (`<CodeSnippetBlock/>`)**:
   - Syntax-highlighted code block with language badges, copy-to-clipboard button, and line highlight support.
4. **`api_endpoint` (`<ApiViewerBlock/>`)**:
   - Displays HTTP method badge (`GET`, `POST`, `PUT`, `DELETE` with distinct colors), route path, query/header/body parameter tables, and response status badges.
5. **`callout` (`<CalloutBanner/>`)**:
   - Highlights tips, notes, warnings, and error callouts with icons and accessible color contrasts.
6. **`stepper` (`<WalkthroughStepper/>`)**:
   - Numbered step progression with active step state, step indicators, and next/prev controls or vertical accordion/timeline style.

### 2.4. Performance & Rendering Invariants
- **SSR & Hydration Safe**: Block renderers and layouts must render predictably on both server and client without hydration mismatches.
- **Semantic HTML**: All blocks must use valid semantic tags (`<article>`, `<section>`, `<header>`, `<pre><code>`, `<details>`, `<summary>`).
- **No Global CSS Leakage**: Styles must use isolated class prefixes (e.g., `doc-sdk-*`), CSS modules, or tailwind utility abstractions that do not pollute host applications.
