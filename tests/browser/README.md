# Optional production browser regression

Build the website and run `npm start`. With Playwright and its Chromium browser
available in the test environment, run:

```sh
SHIPPER_BROWSER_URL=http://127.0.0.1:3000/ node tests/browser/mobile-navigation.cjs
```

This opt-in check is separate from `npm test` and is not run by the current CI
workflow. It verifies keyboard menu opening, controlled-region visibility, Tab
navigation, Escape focus return, menu closure after navigation, distinct index
titles and horizontal sizing on Providers, Specs and Documentation pages.

Optional environment variables:

- `SHIPPER_PLAYWRIGHT_MODULE`: module name or absolute module path when Playwright
  is supplied outside this repository.
- `SHIPPER_BROWSER_EXECUTABLE`: a Chromium/Chrome executable instead of Playwright's
  installed browser.
- `SHIPPER_BROWSER_WIDTH`: mobile viewport width; defaults to 390 (height 844).
- `SHIPPER_BROWSER_EVIDENCE`: optional path for the resulting JSON evidence.

The running server determines the tested build. A pass does not verify the hosted
preview, all routes, all viewport sizes or full accessibility conformance.
