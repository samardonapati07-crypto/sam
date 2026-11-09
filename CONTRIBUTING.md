# Contributing

This repository is maintained by Samar and contains the AAROP browser demo. Run all commands from the repository root with Node.js 22.13 or newer.

## Setup and checks

```bash
npm ci
npm run dev
```

Before submitting a change:

```bash
npm test
npm run typecheck
npx playwright install chromium
npm run test:e2e
npm run build
```

## Guidelines

- Keep loop phases and transitions inspectable in `lib/aarop.ts`.
- Preserve the deterministic, key-free default demo.
- Keep API keys in browser memory and out of logs, committed files, and localStorage.
- Update the existing engine tests when changing loop behavior.
- Update documentation and screenshots when changing visible behavior.
- Describe proposed backend services as architecture plans until they are implemented.
- Preserve the original MIT notice and source attribution in `LICENSE` and `NOTICE.md`.

Open issues and pull requests at [samardonapati07-crypto/sam](https://github.com/samardonapati07-crypto/sam), with reproduction steps, expected behavior, and check results.

Contributions are licensed under the repository's MIT license.
