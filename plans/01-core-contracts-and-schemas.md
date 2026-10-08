# Plan 01: Core Data Contracts & Validation

## Objective
Establish the foundational data contracts, TypeScript types, Zod runtime schemas, and validation utilities that bind all layers together without UI dependencies.

---

## Technical Specifications & Schemas

### 1. Target Directory
- `core/types.ts`: Compile-time TypeScript interfaces and union types.
- `core/schemas.ts`: Runtime Zod schemas for all models.
- `core/registry.ts`: Block registry contracts and layout type registries.
- `core/index.ts`: Barrel export file.

### 2. Required Models
1. **`BlockType`**:
   - `'text' | 'markdown' | 'code_sample' | 'api_endpoint' | 'callout' | 'stepper'`
2. **`FieldDefinition`**:
   - `id: string`, `name: string`, `type: 'string' | 'rich-text' | 'code' | 'select' | 'array'`, `required?: boolean`, `options?: string[]`, `defaultValue?: any`, `placeholder?: string`, `description?: string`.
3. **`SectionDefinition`**:
   - `id: string`, `title: string`, `allowedBlocks: BlockType[]`, `isRepeatable?: boolean`, `description?: string`.
4. **`DocTemplate`**:
   - `id: string`, `name: string`, `layoutType: 'two-column' | 'single-column' | 'side-by-side-code'`, `metadataFields: FieldDefinition[]`, `sections: SectionDefinition[]`.
5. **`DocContent`**:
   - `id: string`, `templateId: string`, `metadata: Record<string, any>`, `sections: Array<{ sectionId: string, blocks: Array<{ id: string, type: BlockType, data: Record<string, any> }> }>`.

### 3. Block-Specific Payload Schemas
- `TextBlockData`: `{ text: string, variant?: 'lead' | 'body' | 'caption' }`
- `MarkdownBlockData`: `{ content: string }`
- `CodeSampleBlockData`: `{ code: string, language: string, title?: string, highlightLines?: number[] }`
- `ApiEndpointBlockData`: `{ method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', path: string, description?: string, parameters?: ParameterItem[], responses?: ResponseItem[] }`
- `CalloutBlockData`: `{ title?: string, message: string, variant: 'info' | 'warning' | 'tip' | 'danger' }`
- `StepperBlockData`: `{ steps: Array<{ title: string, content: string, stepNumber?: number }> }`

### 4. Validation Utilities
- `validateTemplate(data: unknown): DocTemplate` (throws detailed errors)
- `safeValidateTemplate(data: unknown): SafeParseReturnType<unknown, DocTemplate>`
- `validateContent(data: unknown): DocContent`
- `safeValidateContent(data: unknown): SafeParseReturnType<unknown, DocContent>`
- `validateBlockData(type: BlockType, data: unknown): boolean`

---

## Verification Criteria
- [ ] Zod schema inference matches manual TypeScript interface definitions.
- [ ] Invalid templates or content objects fail with clear Zod error paths.
- [ ] 100% test coverage in `tests/core/schemas.test.ts`.
