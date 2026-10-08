# Rule: Core Architecture & Data Contracts

## 1. Context & Scope
This rule governs all schemas, types, validations, and data models defined in `core/` and consumed by the Admin Suite and Client Viewer Engine.

## 2. Invariants & Principles

### 2.1. Zod as the Single Source of Truth
- Every contract interface must have an identical runtime validator in `core/schemas.ts`.
- In TypeScript, derive types via `z.infer<typeof ...>` or ensure 100% bidirectional type equality with tests.
- Export both `parse*` (throws `ZodError`) and `safeParse*` (returns `SafeParseReturnType`) helper functions.

### 2.2. BlockType Taxonomy
The SDK recognizes six core block types:
```typescript
export const BlockTypeSchema = z.enum([
  'text',
  'markdown',
  'code_sample',
  'api_endpoint',
  'callout',
  'stepper',
]);

export type BlockType = z.infer<typeof BlockTypeSchema>;
```
- Custom block types must be supported through extensible schema refinements (`string & {}` or parameterized registries).

### 2.3. Field Definition Contract
```typescript
export const FieldTypeSchema = z.enum([
  'string',
  'rich-text',
  'code',
  'select',
  'array',
]);

export const FieldDefinitionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: FieldTypeSchema,
  required: z.boolean().optional().default(false),
  options: z.array(z.string()).optional(),
  defaultValue: z.any().optional(),
  placeholder: z.string().optional(),
  description: z.string().optional(),
});
```

### 2.4. Section Definition Contract
```typescript
export const SectionDefinitionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  allowedBlocks: z.array(BlockTypeSchema).min(1),
  isRepeatable: z.boolean().optional().default(false),
  description: z.string().optional(),
});
```

### 2.5. DocTemplate Contract
```typescript
export const LayoutTypeSchema = z.enum([
  'two-column',
  'single-column',
  'side-by-side-code',
]);

export const DocTemplateSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  layoutType: LayoutTypeSchema,
  metadataFields: z.array(FieldDefinitionSchema),
  sections: z.array(SectionDefinitionSchema),
});
```

### 2.6. DocContent Contract
```typescript
export const BlockContentSchema = z.object({
  id: z.string().min(1),
  type: BlockTypeSchema,
  data: z.record(z.string(), z.unknown()),
});

export const SectionContentSchema = z.object({
  sectionId: z.string().min(1),
  blocks: z.array(BlockContentSchema),
});

export const DocContentSchema = z.object({
  id: z.string().min(1),
  templateId: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()),
  sections: z.array(SectionContentSchema),
});
```

## 3. Block Data Payload Schemas
Each core block type must have its own strongly-typed data contract:
1. `text`: `{ text: string, variant?: 'lead' | 'body' | 'caption' }`
2. `markdown`: `{ content: string }`
3. `code_sample`: `{ code: string, language: string, title?: string, highlightLines?: number[] }`
4. `api_endpoint`: `{ method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', path: string, description?: string, parameters?: any[], responses?: any[] }`
5. `callout`: `{ title?: string, message: string, variant: 'info' | 'warning' | 'tip' | 'danger' }`
6. `stepper`: `{ steps: Array<{ title: string, content: string, stepNumber: number }> }`

## 4. Prohibitions
- NEVER couple `core/` to any framework (no React, no Next.js, no DOM APIs).
- NEVER allow unvalidated JSON to enter the render pipeline.
- NEVER break backward compatibility of schema properties without migration helpers.
