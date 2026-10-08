# Rule: Admin Suite & Dynamic Form Engine

## 1. Context & Scope
This rule guides the implementation and extension of the Admin Suite, specifically `<TemplateBuilder/>` and `<DocContentEditor/>`.

## 2. Component Guidelines

### 2.1. Template Builder (`<TemplateBuilder/>`)
- **Primary Function**: Visual, interactive canvas for administrators to construct and modify `DocTemplate` definitions.
- **Key Capabilities**:
  1. **Template Metadata**: Manage template `id`, `name`, and `layoutType` ('two-column' | 'single-column' | 'side-by-side-code').
  2. **Metadata Field Schema Configurator**: Add/remove/reorder fields in `metadataFields` with configurable types (`string`, `rich-text`, `code`, `select`, `array`), required flags, options, and placeholders.
  3. **Section Manager**:
     - Add, delete, and reorder document sections with custom IDs and titles.
     - Toggle `isRepeatable` flag for sections that can have multiple instances.
     - Multi-select `allowedBlocks` per section (e.g., restrict an "Endpoints" section to `api_endpoint` and `code_sample`, or a "Tutorial" section to `stepper`).
  4. **Import / Export**: Live JSON preview, copy to clipboard, and instant schema validation feedback via Zod.

### 2.2. Content Editor (`<DocContentEditor/>`)
- **Primary Function**: Dynamic form engine that takes a `DocTemplate` schema and initial/current `DocContent`, rendering an intuitive editing UI for documentation authors.
- **Key Capabilities**:
  1. **Meta Panel**:
     - Iterates over `template.metadataFields` and maps each field to its corresponding input controller (`string` -> TextInput, `rich-text` -> RichEditor/MarkdownInput, `select` -> Dropdown/Select, `array` -> TagInput/ChipList, `code` -> CodeTextarea).
     - Enforces `required` validations and field-level error messages.
  2. **Dynamic Section & Block Injector**:
     - Iterates over `template.sections`.
     - In each section, evaluates `section.allowedBlocks` to display an "Add Block" palette (buttons or dropdown) with icons and labels for each allowed block type.
     - Instantiates default typed data models for newly added blocks.
     - Supports block deletion, reordering (move up/down or drag), and cloning.
  3. **Auto Table-of-Contents (TOC) Preview**:
     - Extracts heading titles from text/markdown blocks to display an active outline.

### 2.3. Form State & DOM Stability Invariants
- **Stable React Keys**:
  - Always use unique IDs (`block.id`, `section.id`, `field.id`) as React `key` props.
  - NEVER use array index `key={index}` for dynamic block lists or repeatable sections, as reordering or deleting causes input focus drops and state corruption.
- **Input Debouncing & Granular State Updates**:
  - Form state changes within a block must not trigger a full re-render of untouched sections or blocks.
  - Utilize controlled components with localized state or a robust form library (e.g. React Hook Form or lightweight event-driven state) to preserve typing performance.
- **Validation**:
  - On submit or `onChange`, validate against `DocContentSchema`.
  - Expose validation errors adjacent to the offending field or block.
