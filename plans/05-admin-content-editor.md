# Plan 05: Admin Content Form Editor Engine

## Objective
Build `<DocContentEditor/>`, an interactive dynamic form generator that reads a `DocTemplate`, creates reactive inputs for metadata fields, renders context-aware block injectors restricted by `allowedBlocks`, maintains stable React keys, and produces validated `DocContent`.

---

## 1. Target Directory & Components
- `admin/ContentEditor/DocContentEditor.tsx`: Main editor container.
- `admin/ContentEditor/MetaPanel.tsx`: Dynamic form inputs for `metadataFields` (`string`, `rich-text`, `code`, `select`, `array`).
- `admin/ContentEditor/SectionForm.tsx`: Section container supporting repeatable sections and block listing.
- `admin/ContentEditor/BlockInjector.tsx`: Dynamic "Add Block" dropdown/buttons filtering strictly by `section.allowedBlocks`.
- `admin/ContentEditor/BlockItemCard.tsx`: Card wrapper with move up/down, duplicate, delete, and type badge.
- `admin/ContentEditor/blockEditors/`:
  - `TextBlockEditor.tsx`: Text and variant selector.
  - `MarkdownBlockEditor.tsx`: Markdown textarea with side-by-side or tabbed preview.
  - `CodeSampleBlockEditor.tsx`: Language picker, title input, and code textarea.
  - `ApiEndpointBlockEditor.tsx`: Method selector, path input, parameter adder table, response builder.
  - `CalloutBlockEditor.tsx`: Variant selector and message input.
  - `StepperBlockEditor.tsx`: Step list adder with title and description inputs.
- `admin/ContentEditor/index.ts`: Public export.

---

## 2. Component Contract & Props
```tsx
export interface DocContentEditorProps {
  template: DocTemplate;
  initialContent?: DocContent;
  onChange?: (content: DocContent) => void;
  onSave?: (content: DocContent) => void;
  className?: string;
}
```

---

## 3. Critical Invariants
1. **Stable Keys**: Every rendered block MUST use `key={block.id}`. Reordering or deleting blocks must NOT rely on array indices.
2. **Focus Preservation**: Editing text inside a block or meta field must maintain input focus without resetting or remounting sibling blocks.
3. **Zod Validation**: Content emitted via `onChange` or `onSave` must conform to `DocContentSchema`.

---

## 4. Automated Test Suite (`tests/admin/editor/editor.test.tsx`)
1. **Mount with Template**: Mount `<DocContentEditor/>` with `mockApiReferenceTemplate`.
2. **Meta Inputs**: Type into Title and Short Description fields; verify `content.metadata` updates.
3. **Block Injection**:
   - In a section with allowed blocks `['api_endpoint', 'code_sample']`, verify only those two block options appear in the injector.
   - Click "Add Endpoint"; verify a new block with unique ID and default data is added.
4. **Block Manipulation**:
   - Move block down; verify array order in `content.sections[...].blocks`.
   - Delete block; verify removal.
5. **Validation Output**: Exported object passes `validateContent(content)`.

---

## 5. Automated Gatekeeper Command
```bash
npm run test:editor && npm run typecheck
```
