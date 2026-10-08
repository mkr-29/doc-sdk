# Auto-Development & Autonomous Testing Protocol

## 1. Overview & Objective
This protocol governs the automated, autonomous implementation and verification of the `doc-sdk` repository. Any autonomous agent working on this repository must execute each phase via deterministic Test-Driven Development (TDD) gates, without requiring human clarification or manual interventions.

---

## 2. Autonomous Execution Lifecycle (Per Phase)

```text
┌────────────────────────────────────────────────────────┐
│ 1. Read Phase Plan & Verification Command              │
│    (Inspect plans/<phase>.md & plans/checklist.md)     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ 2. Author / Verify Test Suite (TDD First)              │
│    (Create tests/<category>/<feature>.test.ts[x])       │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ 3. Implement Code Components & Exports                 │
│    (Strict TypeScript, Zod schemas, React components)  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ 4. Run Phase Gate Command (Terminal Execution)         │
│    (e.g., npm run test:core && npm run typecheck)       │
└───────────────────────────┬────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
         [Exit 0: PASS]             [Exit != 0: FAIL]
              │                           │
              ▼                           ▼
┌───────────────────────────┐ ┌───────────────────────────┐
│ 5. Update Checklist       │ │ 5. Self-Healing Loop      │
│    - Mark tasks [x]       │ │    - Read error stack     │
│    - Advance Phase Status │ │    - Patch root cause     │
│    - Proceed to Next Phase│ │    - Re-run Gate Command  │
└───────────────────────────┘ └───────────────────────────┘
```

---

## 3. Autonomous Gate Commands Matrix

Every phase must pass its specific gate command with **exit code 0** and zero TypeScript errors (`tsc --noEmit`) before updating [`plans/checklist.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/checklist.md):

| Phase | Target Category | Automated Gate Command |
| :---: | :--- | :--- |
| **Phase 1** | **Tooling & Test Harness** | `npm run typecheck && npm run test:harness` |
| **Phase 2** | **Core Contracts & Validation** | `npm run test:core && npm run typecheck` |
| **Phase 3** | **Design Tokens & Block Primitives** | `npm run test:blocks && npm run typecheck` |
| **Phase 4** | **Admin Template Builder** | `npm run test:builder && npm run typecheck` |
| **Phase 5** | **Admin Content Form Editor** | `npm run test:editor && npm run typecheck` |
| **Phase 6** | **Client Viewer Engine & Layouts** | `npm run test:client && npm run typecheck` |
| **Phase 7** | **Headless Hooks & Navigation** | `npm run test:hooks && npm run typecheck` |
| **Phase 8** | **Packaging, Build & Playground** | `npm run test && npm run typecheck && npm run build` |

---

## 4. Self-Healing & Troubleshooting Rules

1. **Deterministic Error Diagnosis**:
   - If a gate command fails:
     1. Capture stdout/stderr logs.
     2. Identify whether the failure is a Type Error, Runtime Assertion, or Missing Dependency.
     3. Apply a surgical patch to the source code or test file.
     4. Re-execute the gate command.
2. **Maximum Self-Healing Threshold**:
   - Never loop more than 3 consecutive iterations on the same failure without re-reading the contract definitions in `core/types.ts` and `core/schemas.ts`.
3. **No Skipping Tests**:
   - An agent must NEVER comment out, skip (`it.skip`), or remove assertions to achieve a passing build. Tests must reflect the real business requirements in the plan.
4. **Key Stability Invariant**:
   - In any form or editor component, verify that dynamic lists strictly use stable unique IDs (`block.id`), not index keys.
