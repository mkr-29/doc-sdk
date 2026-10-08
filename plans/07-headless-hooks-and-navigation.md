# Plan 07: Headless Hooks & Navigation Suite

## Objective
Provide headless, framework-agnostic React hooks for Table of Contents generation, active scroll spy tracking, client-side document search, and deep-link anchor navigation.

---

## 1. Target Directory & Hooks
- `hooks/useTableOfContents.ts`: Parses heading hierarchy from markdown blocks and text blocks into structured TOC items.
- `hooks/useScrollSpy.ts`: Tracks active viewport heading IDs using `IntersectionObserver`.
- `hooks/useDocSearch.ts`: Builds an in-memory inverted text index across all document blocks and exposes fuzzy search queries.
- `hooks/useAnchorScroll.ts`: Handles smooth scrolling to anchor IDs with sticky header offset compensation.
- `hooks/index.ts`: Public export.

---

## 2. Hook Interfaces & Contracts

### 2.1. `useTableOfContents`
```typescript
export interface TocItem {
  id: string;
  title: string;
  level: 1 | 2 | 3;
  sectionId: string;
}

export function useTableOfContents(content?: DocContent): TocItem[];
```

### 2.2. `useScrollSpy`
```typescript
export function useScrollSpy(
  headingIds: string[],
  options?: { offsetPx?: number }
): string | null;
```

### 2.3. `useDocSearch`
```typescript
export interface SearchResult {
  blockId: string;
  sectionId: string;
  title: string;
  snippet: string;
  score: number;
}

export function useDocSearch(content?: DocContent): {
  search: (query: string) => SearchResult[];
  isIndexing: boolean;
};
```

---

## 3. Automated Test Suite (`tests/hooks/hooks.test.ts`)
1. **TOC Extraction**: Extracts headings (`# Introduction`, `## Getting Started`, `### Prerequisites`) from mock markdown blocks with correct levels and slugified IDs.
2. **Search Indexing**: Searching for terms found in API paths, parameter descriptions, or markdown text returns relevant results with snippets.
3. **Scroll Spy**: Simulates `IntersectionObserver` entry and verifies the active heading ID updates.

---

## 4. Automated Gatekeeper Command
```bash
npm run test:hooks && npm run typecheck
```
