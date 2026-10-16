// Optional browser regression; see README for Playwright/Chrome configuration.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.SHIPPER_PLAYWRIGHT_MODULE || 'playwright');
const source = await readFile(new URL('../../lib/markdown.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText
  .replace('from "marked"', `from ${JSON.stringify(import.meta.resolve('marked'))}`)
  .replace('from "sanitize-html"', `from ${JSON.stringify(import.meta.resolve('sanitize-html'))}`);
const { parseMarkdownToHtml } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const browser = await chromium.launch({headless: true, ...(process.env.SHIPPER_BROWSER_EXECUTABLE ? {executablePath: process.env.SHIPPER_BROWSER_EXECUTABLE} : {})});
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => route.abort());
  const payload = `
<script>window.markdownExecuted=true</script>
<img src="https://fixture.invalid/image.png" onerror="window.markdownExecuted=true">
<svg onload="window.markdownExecuted=true"><a href="javascript:window.markdownExecuted=true">SVG</a></svg>
<iframe srcdoc="<script>parent.markdownExecuted=true</script>"></iframe>
<a href="java&#x73;cript:window.markdownExecuted=true">Encoded</a>
<a href="data:text/html,unsafe">Data</a>
<a href="//fixture.invalid/unsafe">Protocol relative</a>

# Safe heading

[Guide](./DATABASES.md)
`;
  await page.setContent(parseMarkdownToHtml(payload, '/docs'));
  assert.equal(await page.evaluate(() => window.markdownExecuted), undefined);
  assert.equal(await page.locator('script,svg,iframe,form,input,[onerror],[onload]').count(), 0);
  for (const href of await page.locator('a[href]').evaluateAll(links => links.map(link => link.getAttribute('href')))) {
    assert.doesNotMatch(href, /^(?:javascript:|data:|\/\/)/i);
  }
  assert.equal(await page.getByRole('heading', {name: 'Safe heading'}).count(), 1);
  assert.equal(await page.getByRole('link', {name: 'Guide'}).getAttribute('href'), '/docs/databases');
  assert.deepEqual(errors, []);
  console.log('Browser Markdown security regression passed: active content removed; safe heading and link preserved.');
} finally {
  await browser.close();
}
