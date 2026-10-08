# Plan 07: Packaging, Testing & Demo Playground

## Objective
Establish high-grade packaging, multi-format module exports (ESM, CJS, `.d.ts`), automated test suites, and an interactive demo playground application validating the full builder -> editor -> renderer developer workflow.

---

## Technical Specifications & Infrastructure

### 1. Target Directory & Files
- `package.json`: Multi-entry exports configuration.
- `tsup.config.ts` or `vite.config.ts`: Library build configuration.
- `tests/`: Automated unit and integration tests.
  - `tests/core/`: Schema validation tests.
  - `tests/admin/`: Builder and editor tests.
  - `tests/client/`: Renderer and layout tests.
  - `tests/hooks/`: Headless hook tests.
- `demo/` or `playground/`: Interactive web app demonstrating the SDK in real-time.

### 2. Package Exports Layout
```json
{
  "name": "@mkr/doc-sdk",
  "version": "0.1.0",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./core": {
      "types": "./dist/core/index.d.ts",
      "import": "./dist/core/index.mjs",
      "require": "./dist/core/index.cjs"
    },
    "./admin": {
      "types": "./dist/admin/index.d.ts",
      "import": "./dist/admin/index.mjs",
      "require": "./dist/admin/index.cjs"
    },
    "./client": {
      "types": "./dist/client/index.d.ts",
      "import": "./dist/client/index.mjs",
      "require": "./dist/client/index.cjs"
    },
    "./hooks": {
      "types": "./dist/hooks/index.d.ts",
      "import": "./dist/hooks/index.mjs",
      "require": "./dist/hooks/index.cjs"
    }
  }
}
```

### 3. Interactive Playground Demo Application
- Runs locally via `npm run dev` in `playground/` or root Vite app.
- **Tab 1: Template Builder (`<TemplateBuilder/>`)**:
  - Live preview of JSON schema as user builds sections and metadata fields.
  - Switch between sample presets: "API Reference", "Product Walkthrough", "Changelog".
- **Tab 2: Content Form Editor (`<DocContentEditor/>`)**:
  - Automatically loads the template generated in Tab 1.
  - Allows adding blocks, editing markdown, configuring API endpoints, testing validations.
- **Tab 3: Client Viewer (`<DocRenderer/>`)**:
  - Immediately renders the content using the selected layout.
  - Live layout switcher (test how the document renders in Two-Column vs Side-by-Side vs Single-Column).

---

## Verification Criteria
- [ ] `npm run build` generates clean ESM, CJS, and `.d.ts` bundles without errors.
- [ ] `npm test` passes 100% of unit and integration test assertions.
- [ ] Playground demonstrates the full end-to-end loop smoothly.
