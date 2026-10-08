# Plan 05: Client Viewer Engine & Layouts

## Objective
Implement `<DocRenderer/>` and the layout rendering engine, which consumes a `DocTemplate` and `DocContent` to generate a responsive, accessible documentation site with sticky navigation, multiple layout paradigms, and pluggable block registries.

---

## Technical Specifications & Components

### 1. Target Directory
- `client/DocRenderer/DocRenderer.tsx`: Top-level viewer component.
- `client/DocRenderer/BlockRenderer.tsx`: Registry lookup and block execution wrapper.
- `client/layouts/SingleColumnLayout.tsx`: Centered reading flow for walkthroughs and articles.
- `client/layouts/TwoColumnLayout.tsx`: Left navigation, central reading column, right TOC.
- `client/layouts/SideBySideCodeLayout.tsx`: Split-screen API reference layout (prose left, sticky code right).
- `client/layouts/LayoutRegistry.ts`: Default registry of layouts with custom override support.
- `client/index.ts`: Barrel export.

### 2. Layout Implementations
1. **`SingleColumnLayout`**:
   - Header with title, badges, description, and metadata tags.
   - Sequential rendering of sections and blocks in a readable max-width container (`max-w-4xl`).
   - Clean footer and next/previous section links.
2. **`TwoColumnLayout`**:
   - Left Sidebar: Section index, heading links, search input.
   - Main Body: Rich document view with section dividers.
   - Right Rail: Sticky Table of Contents (TOC) highlighting current reading position.
3. **`SideBySideCodeLayout` (API Style)**:
   - Left Column (Prose): Endpoint description, parameters table, query params, response headers.
   - Right Column (Code Column): Sticky dark-themed code playground, cURL/SDK code snippets, response JSON preview.

### 3. Block Registry & Custom Extensibility
```tsx
export interface BlockRegistryProps {
  block: BlockContent;
  sectionId: string;
  template: DocTemplate;
}

export type BlockRegistry = Record<BlockType, React.ComponentType<BlockRegistryProps>>;
```
- Developers can pass `blockRegistry={{ custom_block: CustomBlockComponent }}` to register or override any block renderer.
- Fallback component renders a developer warning and raw data preview if an unknown block type is encountered.

---

## Verification Criteria
- [ ] Switching `template.layoutType` dynamically reconfigures the view without data loss.
- [ ] Side-by-side layout aligns endpoints with their corresponding code samples on desktop and stacks gracefully on mobile.
- [ ] Semantic HTML tags (`<article>`, `<nav>`, `<aside>`, `<section>`) are used throughout.
