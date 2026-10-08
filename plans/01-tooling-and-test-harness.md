# Plan 01: Tooling, Build Setup & Automated Test Harness

## Objective
Establish the foundational developer tooling, TypeScript configuration, bundle configuration (`tsup`), and automated test runner (`vitest` + `@testing-library/react` + `jsdom`) so that every subsequent phase has instant, automated verification gates.

---

## 1. Locked-In Dependencies & Scripts

### Package Dependencies (`package.json`)
```json
{
  "name": "@mkr/doc-sdk",
  "version": "0.1.0",
  "description": "Decoupled TypeScript documentation SDK with dynamic layouts, forms, and renderers",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
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
    },
    "./styles.css": "./dist/styles.css"
  },
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:harness": "vitest run tests/harness",
    "test:core": "vitest run tests/core",
    "test:blocks": "vitest run tests/blocks",
    "test:builder": "vitest run tests/admin/builder",
    "test:editor": "vitest run tests/admin/editor",
    "test:client": "vitest run tests/client",
    "test:hooks": "vitest run tests/hooks",
    "test:integration": "vitest run tests/integration",
    "build": "tsup",
    "lint": "eslint . --ext .ts,.tsx || true"
  },
  "dependencies": {
    "zod": "^3.23.8",
    "clsx": "^2.1.1",
    "lucide-react": "^0.447.0",
    "prismjs": "^1.29.0",
    "markdown-to-jsx": "^7.4.7"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "@testing-library/react": "^16.0.1",
    "@testing-library/user-event": "^14.5.2",
    "@types/node": "^22.7.4",
    "@types/prismjs": "^1.26.4",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.0",
    "jsdom": "^25.0.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tsup": "^8.3.0",
    "typescript": "^5.5.4",
    "vitest": "^2.1.2"
  }
}
```

---

## 2. Configuration Files

### 2.1. TypeScript (`tsconfig.json`)
- Strict mode enabled (`"strict": true`).
- JSX configured (`"jsx": "react-jsx"`).
- Module resolution: `"moduleResolution": "Bundler"`, `"module": "ESNext"`, `"target": "ES2022"`.
- Path aliases: `@/core/*`, `@/admin/*`, `@/client/*`, `@/hooks/*`.

### 2.2. Vitest (`vitest.config.ts`)
- Environment: `"jsdom"`.
- Globals: `true`.
- Setup file: `tests/setup.ts` (importing `@testing-library/jest-dom/vitest` or mock cleanup).
- Include: `tests/**/*.test.{ts,tsx}`.

### 2.3. Bundler (`tsup.config.ts`)
- Entry points: `index.ts`, `core/index.ts`, `admin/index.ts`, `client/index.ts`, `hooks/index.ts`.
- Format: `['esm', 'cjs']`.
- DTS generation: `true`.
- Clean: `true`.
- External: `['react', 'react-dom']`.

---

## 3. Automated Gatekeeper Command
```bash
npm run typecheck && npm run test:harness
```
- Test `tests/harness/smoke.test.ts` validates that the environment runs JSDOM, mounts a sample React node, and verifies TypeScript compilation.
