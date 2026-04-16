Verify the project is ready to merge and deploy.

## Instructions

Run these checks in order:

1. **Git status** — working tree must be clean (no uncommitted changes)
2. **Full CI check** — run lint, typecheck, build, AEO (same as /check)
3. **Branch status** — show commits ahead of main, confirm branch is pushed

Report a summary:

```
Deploy Readiness
├── Git status: ✓ clean / ✗ uncommitted changes
├── Lint: ✓ pass / ✗ errors
├── Typecheck: ✓ pass / ✗ errors
├── Build: ✓ pass / ✗ errors
├── AEO: ✓ 100/100 / ✗ score
├── Branch pushed: ✓ yes / ✗ needs push
└── Ready to merge: ✓ / ✗
```

If anything fails, explain what needs to be fixed before merging.
