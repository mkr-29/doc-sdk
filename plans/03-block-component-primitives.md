# Plan 03: Design Tokens, CSS Architecture & Block Primitives

## Objective
Establish the themeable CSS token architecture and build accessible, responsive block components (`text`, `markdown`, `code_sample`, `api_endpoint`, `callout`, `stepper`) with default registry integration.

---

## 1. CSS & Token Architecture (`client/styles/doc-sdk.css`)
To prevent host application style collisions while enabling themeability, all styling is governed by CSS variables prefixed with `--doc-sdk-`:
- Theme variables:
  ```css
  :root {
    --doc-sdk-font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --doc-sdk-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    --doc-sdk-bg: #ffffff;
    --doc-sdk-surface: #f8fafc;
    --doc-sdk-surface-hover: #f1f5f9;
    --doc-sdk-border: #e2e8f0;
    --doc-sdk-text: #0f172a;
    --doc-sdk-text-muted: #64748b;
    --doc-sdk-primary: #2563eb;
    --doc-sdk-primary-hover: #1d4ed8;
    --doc-sdk-code-bg: #0f172a;
    --doc-sdk-code-text: #e2e8f0;
    --doc-sdk-radius: 8px;
  }
  ```
- Component class prefix: `.doc-sdk-*` (e.g. `.doc-sdk-block`, `.doc-sdk-callout`, `.doc-sdk-code-snippet`).

---

## 2. Block Component Implementations
- `client/blocks/TextBlock.tsx`:
  - Renders paragraph with variant typography: `lead` (1.25rem), `body` (1rem), `caption` (0.875rem muted).
- `client/blocks/MarkdownBlock.tsx`:
  - Uses `markdown-to-jsx` with custom heading overrides that generate slug IDs for TOC links.
- `client/blocks/CodeSampleBlock.tsx`:
  - Uses `prismjs` for syntax highlighting.
  - Interactive "Copy" button with "Copied!" feedback state.
  - Optional title bar displaying file name or language.
- `client/blocks/ApiEndpointBlock.tsx`:
  - Method pill with distinct colors: `GET` (blue), `POST` (emerald), `PUT` (amber), `DELETE` (rose), `PATCH` (indigo).
  - Clean path display with copy-path button.
  - Interactive parameter table (name, location, type, required badge, description).
  - Response tabs / preview with status codes (`200 OK`, `400 Bad Request`).
- `client/blocks/CalloutBlock.tsx`:
  - Variants: `info`, `warning`, `tip`, `danger`.
  - Accessible Lucide icons: `Info`, `AlertTriangle`, `Lightbulb`, `AlertOctagon`.
- `client/blocks/StepperBlock.tsx`:
  - Step progression cards with numbers, checkmarks, active step state, and step navigation.
- `client/blocks/defaultRegistry.ts`:
  - Maps `BlockType` to default React components.

---

## 3. Automated Test Suite (`tests/blocks/blocks.test.tsx`)
1. Test `<TextBlock/>` renders text with specified variant classes.
2. Test `<MarkdownBlock/>` generates valid headings with slug IDs and renders tables.
3. Test `<CodeSampleBlock/>` renders code syntax and triggers clipboard copy on button click.
4. Test `<ApiEndpointBlock/>` renders method badge and parameters table.
5. Test `<CalloutBlock/>` renders correct variant banner and icon.
6. Test `<StepperBlock/>` allows clicking next/previous steps.

---

## 4. Automated Gatekeeper Command
```bash
npm run test:blocks && npm run typecheck
```
