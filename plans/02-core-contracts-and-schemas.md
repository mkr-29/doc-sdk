# Plan 02: Core Data Contracts, Schemas & Canonical Fixtures

## Objective
Implement runtime Zod schemas, TypeScript types, validation helpers, and canonical test fixtures (`mockTemplates`, `mockContents`) with zero external UI dependencies.

---

## 1. Target Files & Deliverables
- `core/types.ts`: TypeScript contracts for `BlockType`, `FieldDefinition`, `SectionDefinition`, `DocTemplate`, `DocContent`, and payload models.
- `core/schemas.ts`: Zod runtime schemas corresponding 1:1 with all types.
- `core/validation.ts`: `validateTemplate()`, `safeValidateTemplate()`, `validateContent()`, `safeValidateContent()`, `validateBlockData()`.
- `core/registry.ts`: Registry contracts (`BlockRegistry`, `LayoutRegistry`).
- `core/fixtures/mockTemplates.ts`: Pre-built, valid templates:
  - `mockApiReferenceTemplate` (two-column layout, endpoint + code sample blocks).
  - `mockWalkthroughTemplate` (single-column layout, stepper + markdown blocks).
  - `mockSideBySideTemplate` (side-by-side-code layout).
- `core/fixtures/mockContents.ts`: Corresponding pre-populated `DocContent` objects matching each template.
- `core/index.ts`: Public barrel exports.

---

## 2. Core Contract Specifications

### 2.1. Supported Block Types
```typescript
export const BLOCK_TYPES = [
  'text',
  'markdown',
  'code_sample',
  'api_endpoint',
  'callout',
  'stepper',
] as const;

export type BlockType = typeof BLOCK_TYPES[number];
```

### 2.2. Payload Schemas
1. **`text`**:
   `{ text: string, variant?: 'lead' | 'body' | 'caption' }`
2. **`markdown`**:
   `{ content: string }`
3. **`code_sample`**:
   `{ code: string, language: string, title?: string, highlightLines?: number[] }`
4. **`api_endpoint`**:
   `{ method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', path: string, description?: string, parameters?: Array<{ name: string, in: 'query' | 'header' | 'path' | 'body', required: boolean, type: string, description?: string }>, responses?: Array<{ status: number, description: string, body?: string }> }`
5. **`callout`**:
   `{ title?: string, message: string, variant: 'info' | 'warning' | 'tip' | 'danger' }`
6. **`stepper`**:
   `{ steps: Array<{ title: string, content: string, stepNumber?: number }> }`

---

## 3. Automated Test Suite (`tests/core/schemas.test.ts`)
The automated test must assert:
1. `validateTemplate` succeeds on all 3 canonical fixtures.
2. `validateContent` succeeds on all 3 canonical content objects.
3. Reject invalid templates (e.g. empty ID, invalid `layoutType`, section with empty `allowedBlocks`).
4. Reject invalid content (e.g. mismatched block type and payload, missing required block ID).
5. Ensure `safeValidateTemplate` returns `{ success: false, error }` with accurate paths.

---

## 4. Automated Gatekeeper Command
```bash
npm run test:core && npm run typecheck
```
