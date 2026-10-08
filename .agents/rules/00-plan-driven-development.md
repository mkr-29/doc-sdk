# Rule: Plan-Driven Development & Checklist Maintenance

## 1. Context & Scope
This rule mandates that all agents and developers operating in `doc-sdk` follow the structured execution roadmap defined in [`plans/`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/).

---

## 2. Mandatory Workflow

### Step 1: Pre-Task Plan Inspection
- Before writing or modifying any code, the agent MUST inspect [`plans/checklist.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/checklist.md) to identify:
  1. The current phase and open tasks.
  2. The specific category plan file associated with the task (e.g. `01-core-contracts-and-schemas.md`, `02-block-component-primitives.md`).
- Read the relevant plan file to confirm technical invariants, target file paths, and verification criteria.

### Step 2: Implementation & Surgical Changes
- Execute code changes adhering strictly to the specifications outlined in the category plan.
- Ensure all types, schemas, and components comply with the rules in:
  - `01-architecture-and-contracts.md`
  - `02-admin-suite-and-form-engine.md`
  - `03-client-viewer-and-blocks.md`
  - `04-code-style-and-quality.md`

### Step 3: Verification & Checklist Updates
- Verify that changes meet the acceptance criteria of the plan (e.g., tests pass, types compile).
- Update [`plans/checklist.md`](file:///Users/mkr-27/Desktop/MY/MKR/doc-sdk/plans/checklist.md):
  - Mark completed tasks with `[x]`.
  - Update the phase status in the High-Level Roadmap Overview table if a phase is completed.
- Never mark a task as completed without verifying its functional correctness and test coverage.

---

## 3. Scope Discipline & Prohibitions
- NEVER implement features out of order without acknowledging plan dependencies.
- NEVER leave `plans/checklist.md` stale after implementing planned items.
- If scope or requirements change during development, update the corresponding file in `plans/` first before executing divergent code changes.
