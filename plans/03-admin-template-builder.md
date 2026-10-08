# Plan 03: Admin Template Builder

## Objective
Build `<TemplateBuilder/>`, a visual canvas and schema constructor that empowers administrators and technical writers to define document structures, layout options, metadata fields, and section-level block constraints without writing raw JSON.

---

## Technical Specifications & Components

### 1. Target Directory
- `admin/TemplateBuilder/TemplateBuilder.tsx`: Top-level builder component.
- `admin/TemplateBuilder/GeneralSettings.tsx`: Template ID, display name, and layout type selector.
- `admin/TemplateBuilder/MetadataFieldEditor.tsx`: Visual list of fields with type configurator.
- `admin/TemplateBuilder/SectionList.tsx`: Section reordering, repeatability toggle, and allowed block selector.
- `admin/TemplateBuilder/JsonPreviewModal.tsx`: Real-time JSON schema viewer, validator, and clipboard copy.
- `admin/TemplateBuilder/types.ts`: Internal builder state and action types.
- `admin/TemplateBuilder/index.ts`: Public export.

### 2. User Interactions & Features
1. **Layout Selector**:
   - Visual radio cards for `two-column`, `single-column`, and `side-by-side-code` with mini preview illustrations.
2. **Metadata Field Builder**:
   - Add new field button.
   - Field ID, Field Name, Field Type dropdown (`string`, `rich-text`, `code`, `select`, `array`).
   - Required checkbox toggle.
   - Tag / Options input (enabled when type is `select` or `array`).
   - Drag / move buttons to reorder fields.
3. **Section Designer**:
   - Add section button with custom title and generated ID.
   - Allowed Blocks multi-selector: chips for `text`, `markdown`, `code_sample`, `api_endpoint`, `callout`, `stepper`.
   - `isRepeatable` switch: allows multiple instances of the section in the content editor.
   - Section delete and reorder controls.
4. **Validation & Export**:
   - Live validation against `DocTemplateSchema` using Zod.
   - "Export Template" returns validated `DocTemplate` object and emits `onChange` callback.
   - "Import Template" allows pasting external JSON with instant schema validation and error feedback.

---

## Verification Criteria
- [ ] Users can construct a complete `DocTemplate` from scratch and export valid JSON.
- [ ] Invalid configurations (e.g. empty section title, zero allowed blocks) highlight inline validation errors.
- [ ] Drag-and-drop or move buttons reorder sections without state loss.
