# Frontend setup and scope

Repair branch: `fix/internship-audit-20261010`. Changes are scoped to audit findings; no deployment or live provider action is included.

## Changed

Added missing repository-level setup and companion-project documentation, plus frontend CI for the existing tests and bundle.

## Verification

`cd frontend; npm ci; npm test -- --run; npm run build`

Commands are entry points, not a claim that every live integration was executed. See the repair bundle for actual results.

## Setup and remaining evidence

195 local tests passed in 14 files and the production bundle built. This is the Product B frontend; server-side permissions, exam lifecycle, refresh handling and judge outcomes require the companion backend. Native kiosk/OS claims require Windows evidence, not frontend unit tests.
