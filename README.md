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