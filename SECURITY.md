# Security notes — AAROP browser demo

This document describes the browser implementation in this repository. It is not a production security certification.

## Data and execution

- The default loop runs in the browser with a deterministic mock provider.
- The knowledge base is local. No database, hosted agent API, login, or persistent run store is included.
- Objectives, tool results, and trace details render as React text.
- The theme preference is stored in localStorage. Runs and optional API keys are held in React state.
- Exporting a trace creates a local JSON download containing the objective, events, and result.

## Optional OpenAI narration

When enabled, `realComplete` in `lib/aarop.ts` sends one request directly to `https://api.openai.com/v1/chat/completions`. It sends the provided API key as a bearer credential and the final result in the narration prompt. Requests can incur API charges.

The key is not sent to a first-party API or written to localStorage. Do not commit keys, log them, or include them in screenshots. Refreshing or closing the page clears the in-memory key.

The loop's simulated cost display and budgets do not account for or enforce billing limits on this optional external narration request.

## Calculator

`safeCalc` uses a restricted arithmetic character allow-list and a JavaScript `Function` constructor. This is a demo tool, not an isolation boundary for running arbitrary code. Production tools require stronger input validation, resource limits, and isolation.

## Headers

`next.config.mjs` configures `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`. A Content Security Policy is not configured; development uses Next.js HMR. A production deployment should assess its own CSP requirements.

## Validation

```bash
npm test
npm run typecheck
npm run test:e2e
npm run build
npm audit --omit=dev
```

Dependencies and browser behavior should be reviewed before a public production deployment. Proposed services in `docs/ARCHITECTURE.md` are not implemented security controls.

To report a problem, open an issue in [Samar's repository](https://github.com/samardonapati07-crypto/sam) with reproducible steps. Do not include credentials or sensitive personal data.
