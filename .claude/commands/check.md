Run the full local CI check (same as GitHub Actions).

## Instructions

Run these commands in sequence and report results:

```bash
pnpm run lint
pnpm run typecheck
pnpm run build
pnpm run aeo
```

If any step fails:
1. Show the error clearly
2. Suggest a fix
3. Do NOT proceed to the next step

Expected results:
- Lint: no errors (warnings OK)
- Typecheck: no errors
- Build: all routes generated successfully
- AEO: score 100/100 (threshold 90)

If AEO score drops below 90, check what signal was lost by reading the output — each check shows ✓ or ✗.
