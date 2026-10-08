# Plan 06: Headless Hooks & Navigation

## Objective
Provide lightweight, headless React hooks for Table of Contents extraction, active heading tracking (scroll spy), client-side document search, and deep-link anchor navigation.

---

## Technical Specifications & Hooks

### 1. Target Directory
- `hooks/useTableOfContents.ts`: Extracts heading hierarchy from document sections and markdown blocks.
- `hooks/useScrollSpy.ts`: IntersectionObserver-based active section tracker.
- `hooks/useDocSearch.ts`: Client-side full-text search indexing and fuzzy query filter.
- `hooks/useAnchorScroll.ts`: Handles smooth scrolling to anchor IDs with sticky header offset compensation.
- `hooks/index.ts`: Barrel export.

### 2. Hook Specifications
1. **`useTableOfContents(sections: SectionContent[])`**:
   - Traverses all blocks in all sections.
   - For `markdown` and `text` blocks, parses `#`, `##`, `###` headings.
   - Returns a structured tree: `Array<{ id: string, title: string, level: number, sectionId: string }>`.
   - Generates URL-friendly slugs for headings missing explicit IDs.
2. **`useScrollSpy(headingIds: string[], options?: { offset?: number })`**:
   - Uses `IntersectionObserver` to track viewport position of headings.
   - Returns `activeId: string` with debounced updates to prevent jitter during fast scrolls.
3. **`useDocSearch(content: DocContent)`**:
   - Indexes all metadata fields, section titles, block text, code samples, and endpoint paths into an in-memory index.
   - Exposes `search(query: string): SearchResult[]` with matched snippets, section breadcrumbs, and deep-link anchors.
4. **`useAnchorScroll()`**:
   - Automatically scrolls to `window.location.hash` upon mounting or hashchange.
   - Smooth animation with adjustable scroll margin offset for sticky headers.

---

## Verification Criteria
- [ ] TOC extraction correctly handles nested headings (h1 -> h2 -> h3).
- [ ] Scroll spy correctly updates active heading while scrolling up and down.
- [ ] Search accurately locates terms within markdown, endpoint parameters, and metadata.
