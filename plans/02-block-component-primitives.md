# Plan 02: Block Component Primitives

## Objective
Implement headless and UI block primitives for rendering each of the standard `BlockType` values in the documentation engine.

---

## Technical Specifications & Components

### 1. Target Directory
- `client/blocks/TextBlock.tsx`: Typographic text block.
- `client/blocks/MarkdownBlock.tsx`: Full markdown renderer with GFM & auto-anchors.
- `client/blocks/CodeSampleBlock.tsx`: Syntax highlighting, language badges, copy-to-clipboard.
- `client/blocks/ApiEndpointBlock.tsx`: HTTP method pill, URL path, parameters table, responses.
- `client/blocks/CalloutBlock.tsx`: Styled alert cards (info, warning, tip, danger).
- `client/blocks/StepperBlock.tsx`: Interactive step-by-step progress component.
- `client/blocks/defaultRegistry.ts`: Maps all default block types to React components.
- `client/blocks/index.ts`: Barrel export.

### 2. Component Requirements
1. **`TextBlock`**:
   - Accepts `{ text, variant }`.
   - Supports variants: `lead` (larger text), `body` (standard prose), `caption` (subtle muted text).
2. **`MarkdownBlock`**:
   - Parses GitHub-Flavored Markdown (GFM).
   - Generates slugified IDs on `h1`, `h2`, `h3` for anchor linking and TOC integration.
   - Accessible table and blockquote styling.
3. **`CodeSampleBlock`**:
   - Syntax highlighter supporting `javascript`, `typescript`, `python`, `bash`, `json`, `html`, `css`, `go`, etc.
   - Copy-to-clipboard button with visual feedback ("Copied!").
   - Optional title bar showing filename or language badge.
4. **`ApiEndpointBlock`**:
   - Color-coded HTTP badges: `GET` (blue), `POST` (green), `PUT` (amber), `DELETE` (red), `PATCH` (purple).
   - Clean endpoint path display with copy-url button.
   - Collapsible request parameters table (name, type, required badge, description).
   - Response status codes (e.g. `200 OK`, `400 Bad Request`) with payload preview.
5. **`CalloutBlock`**:
   - Icons mapped to variant (`info` -> Info, `warning` -> AlertTriangle, `tip` -> Lightbulb, `danger` -> AlertOctagon).
   - Custom title support with clean fallback.
6. **`StepperBlock`**:
   - Step indicator badges with line connectors.
   - Active step selection, or vertical sequential step layout with embedded instructions.

---

## Verification Criteria
- [ ] Each block component renders cleanly and handles empty/missing optional props without crashing.
- [ ] Code samples support copy-to-clipboard and line highlighting.
- [ ] All elements are styled via CSS custom properties (`--doc-sdk-*`) for full themeability.
