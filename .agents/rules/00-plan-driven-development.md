# Rule: Plan-Driven Development & Checklist Maintenance

## 1. Context & Scope
This rule mandates that all agents and developers operating in `doc-sdk` follow the structured execution roadmap defined in [`plans/`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/).

---

## 2. Mandatory Workflow

### Step 1: Pre-Task Plan Inspection
- Before writing or modifying any code, the agent MUST inspect [`plans/checklist.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/checklist.md) and [`plans/auto-development-protocol.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/auto-development-protocol.md) to identify:
  1. The current phase and open tasks.
  2. The specific category plan file associated with the task (e.g. `01-tooling-and-test-harness.md`, `02-core-contracts-and-schemas.md`).
  3. The exact automated gatekeeper command for that phase.
- Read the relevant plan file to confirm technical invariants, target file paths, and verification criteria.

### Step 2: Implementation & Test-Driven Development (TDD)
- Author or update test suites under `tests/` before/alongside implementation.
- Execute code changes adhering strictly to the specifications outlined in the category plan.
- Ensure all types, schemas, and components comply with the rules in:
  - `01-architecture-and-contracts.md`
  - `02-admin-suite-and-form-engine.md`
  - `03-client-viewer-and-blocks.md`
  - `04-code-style-and-quality.md`

### Step 3: Automated Gate Verification & Checklist Updates
- Run the required automated gate command in the terminal (e.g., `npm run test:core && npm run typecheck`).
- If the command fails (exit code != 0), follow the self-healing loop: inspect the error output, patch the code, and re-run until it passes.
- ONLY when the automated gate command passes with exit code 0 and zero TypeScript errors:
  - Mark completed tasks in [`plans/checklist.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/checklist.md) with `[x]`.
  - Update the phase status in the High-Level Roadmap Overview table to `✅ Completed`.
- Advance to the next phase. Never mark a task as completed without green automated test verification.

---

## 3. Scope Discipline & Prohibitions
- NEVER implement features out of order without acknowledging plan dependencies.
- NEVER leave `plans/checklist.md` stale after implementing planned items.
- If scope or requirements change during development, update the corresponding file in `plans/` first before executing divergent code changes.
