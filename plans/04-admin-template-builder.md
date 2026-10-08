# Plan 04: Admin Template Builder Engine

## Objective
Build `<TemplateBuilder/>`, a visual canvas enabling non-technical users and administrators to configure `DocTemplate` definitions, layout types, metadata field schemas, and section block constraints with real-time validation and JSON export.

---

## 1. Target Directory & Components
- `admin/TemplateBuilder/TemplateBuilder.tsx`: Top-level builder component.
- `admin/TemplateBuilder/GeneralSettings.tsx`: Template ID, template name, and visual layout selector (`two-column`, `single-column`, `side-by-side-code`).
- `admin/TemplateBuilder/MetadataFieldEditor.tsx`: Add/edit/remove fields in `metadataFields`. Supports types (`string`, `rich-text`, `code`, `select`, `array`), required toggle, and options.
- `admin/TemplateBuilder/SectionList.tsx`: Section manager. Allows adding, deleting, and reordering sections with `isRepeatable` toggle and `allowedBlocks` multi-select chips.
- `admin/TemplateBuilder/JsonPreviewModal.tsx`: Modal displaying real-time JSON schema, copy button, and import paste box with validation error diagnostics.
- `admin/TemplateBuilder/index.ts`: Public export.

---

## 2. Component Contract & Props
```tsx
export interface TemplateBuilderProps {
  initialTemplate?: DocTemplate;
  onChange?: (template: DocTemplate) => void;
  onSave?: (template: DocTemplate) => void;
  className?: string;
}
```

---

## 3. Automated Test Suite (`tests/admin/builder/builder.test.tsx`)
1. **Initial Mount**: Renders builder with `mockApiReferenceTemplate` from fixtures.
2. **Metadata Field Creation**: Adding a new field adds it to the list and triggers `onChange`.
3. **Section Configuration**:
   - Toggling an allowed block updates `section.allowedBlocks`.
   - Clicking "Add Section" creates a new section with a valid unique ID.
   - Deleting a section removes it from the list.
4. **Validation Guard**: Disables "Save" or displays error when a section title is empty or zero blocks are allowed.
5. **JSON Export**: Exporting returns a valid `DocTemplate` that passes `DocTemplateSchema.parse()`.

---

## 4. Automated Gatekeeper Command
```bash
npm run test:builder && npm run typecheck
```
