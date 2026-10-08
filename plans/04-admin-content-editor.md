# Plan 04: Admin Content Form Editor

## Objective
Build `<DocContentEditor/>`, an intuitive dynamic form generator that reads a `DocTemplate` schema, renders controlled inputs for metadata and sections, presents context-aware block injectors, and produces validated `DocContent`.

---

## Technical Specifications & Components

### 1. Target Directory
- `admin/ContentEditor/DocContentEditor.tsx`: Main editor container.
- `admin/ContentEditor/MetaPanel.tsx`: Dynamic inputs generated from `template.metadataFields`.
- `admin/ContentEditor/DynamicField.tsx`: Individual field renderer per `FieldDefinition.type`.
- `admin/ContentEditor/SectionForm.tsx`: Section container and repeatable instances.
- `admin/ContentEditor/BlockInjector.tsx`: Dynamic "Add Block" palette based on `allowedBlocks`.
- `admin/ContentEditor/BlockItemEditor.tsx`: Wrapper card for block reordering, duplication, deletion, and data editing.
- `admin/ContentEditor/blockEditors/`: Sub-forms for editing specific block data (`MarkdownEditor`, `CodeEditor`, `ApiEndpointEditor`, `CalloutEditor`, `StepperEditor`).
- `admin/ContentEditor/index.ts`: Public export.

### 2. Core Functional Requirements
1. **Dynamic Metadata Panel**:
   - Loops over `template.metadataFields`.
   - Maps `string` -> Text input.
   - Maps `rich-text` -> Markdown/Rich-text input with preview toggle.
   - Maps `code` -> Monospace code textarea.
   - Maps `select` -> Dropdown select with options.
   - Maps `array` -> Chip/Tag input list.
   - Live validation showing red outline and helper text for required fields.
2. **Context-Aware Block Injector**:
   - Each section exposes an "Add Block" action.
   - Only displays block types explicitly allowed in `section.allowedBlocks`.
   - Clicking a block type instantiates a new block with a unique ID (`crypto.randomUUID()` or timestamp) and default data schema.
3. **Block Actions**:
   - Move block up / down.
   - Duplicate block.
   - Delete block with confirmation.
4. **Key Stability & Anti-DOM-Thrashing (Strict Rule)**:
   - Uses `block.id` as React `key`.
   - Local state inside block editors prevents re-rendering parent components on every keystroke.
   - Debounced callbacks push validated updates to the document root state.

---

## Verification Criteria
- [ ] Changing a block's value does not cause other blocks to lose focus or re-render.
- [ ] Dynamic forms accurately reflect metadata and section schema constraints.
- [ ] Exported content conforms 100% to `DocContentSchema`.
