# safe-exam-b

195 local tests passed in 14 files and the production bundle built. This is the Product B frontend; server-side permissions, exam lifecycle, refresh handling and judge outcomes require the companion backend. Native kiosk/OS claims require Windows evidence, not frontend unit tests.

## Verification

```sh
cd frontend
npm ci
npm test -- --run
npm run build
```

[Audit fixes and limits](AUDIT_FIXES.md).
