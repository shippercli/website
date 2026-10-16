# Shipper CLI Website

![Shipper Banner](https://raw.githubusercontent.com/shippercli/assets/main/banner.png)

[![Deploy with Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)](https://vercel.com/shippercli)
[![Deploy Status](https://img.shields.io/github/deployments/shippercli/website/production?label=Production&logo=github)](https://github.com/shippercli/website/deployments)
[![Website Status](https://img.shields.io/website?down_color=red&down_message=Error&up_color=brightgreen&up_message=Ready&url=https://shippercli.com)](https://shippercli.com)
[![Website](https://img.shields.io/badge/Website-shippercli.com-blue)](https://shippercli.com)

Marketing website and documentation for Shipper CLI.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS

## Development

```bash
npm install
npm run dev
```

## Documentation mirrors

`npm run sync-content` clones the docs/spec repositories into unique staging
folders, validates both source trees, and replaces the generated `docs`/`spec`
mirrors. Removed upstream pages disappear from the mirror. Both sources must be
ready before replacement starts; missing/empty content and symlinks are refused.
The command logs the exact source commits it copied.

An ordinary replacement failure restores the prior mirrors. If recovery itself
fails, backups remain in the reported `.content-sync-*` folder for manual repair.
The two directory replacements are not a single filesystem transaction; process
termination or concurrent edits can still interrupt them. Root dotfiles are not
mirrored, matching the prior copy policy. Temporary stages are ignored by Git.
CI refuses both modified tracked mirror files and newly copied untracked pages.

## Browser preference checks

`npm test` covers theme storage failures and the provider carousel's timer/media
controller. The carousel stops automatic rotation when motion preferences cannot
be read. With modern or legacy media-query listeners, reduced motion removes the
timer and a later preference change can resume it. If subscription APIs are
unavailable or denied, a timer checks the preference before advancing. Cleanup
stops timers, unregisters listeners where supported, and prevents stale callbacks
from restarting rotation. Manual controls remain available.

The deterministic tests exercise preference changes, unavailable media APIs,
legacy listeners, denied subscriptions, polling fallback, and cleanup. They do
not replace browser rendering/accessibility checks. The current production build
passes with `next build --webpack`; local browser reduced-motion and denied-storage
execution remain unverified because browser control was unavailable during this
check. The normal CI build remains a separate check.

## Deploy

Deployed automatically to Vercel on push to main.

## License

MIT
### Repository Markdown rendering

Imported Markdown is rendered with Marked, relative documentation links are
rewritten, and the resulting HTML is sanitized before rendering. The allowlist
preserves ordinary documentation structure, code language classes and images;
it omits scripts, event attributes, embedded frames/forms and unsafe URL schemes.
Raw repository HTML must not rely on executable content or arbitrary attributes.
Regression coverage lives in `tests/markdown-links.test.mjs`.

An optional browser regression exercises the shared Markdown renderer with
malicious HTML and verifies the resulting DOM in Chrome:

```sh
node tests/browser/markdown-security.mjs
```

Provide Playwright through `SHIPPER_PLAYWRIGHT_MODULE` when it is not installed
locally, and optionally select Chrome with `SHIPPER_BROWSER_EXECUTABLE`. The
regression uses an isolated document and blocks network requests; it needs no
running site. It is separate from `npm test` and CI and does not verify a hosted
deployment's browser behavior.
