import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../lib/markdown.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText
  .replace('from "marked"', `from ${JSON.stringify(import.meta.resolve("marked"))}`)
  .replace('from "sanitize-html"', `from ${JSON.stringify(import.meta.resolve("sanitize-html"))}`);
const { parseMarkdownToHtml } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

for (const [href, expected] of [
  ["./DATABASES.md", "/docs/databases"],
  ["DATABASES.md#Preview", "/docs/databases#Preview"],
  ["../README.md#Overview", "/#Overview"],
  ["../ROADMAP.md", "/"],
  ["./DATABASES.md?view=full#Preview", "/docs/databases?view=full#Preview"],
  ["https://example.com/README.md", "https://example.com/README.md"],
  ["#Preview", "#Preview"],
  ["/docs/databases", "/docs/databases"],
]) {
  test(`Markdown link ${href}`, () => {
    const html = parseMarkdownToHtml(`[Link](${href})`, "/docs");
    assert.ok(html.includes(`href="${expected}"`), html);
  });
}

test('repository Markdown cannot inject active HTML or unsafe URLs', () => {
  const html = parseMarkdownToHtml(`
<script>alert('secret-script')</script>
<img src="https://example.com/image.png" onerror="alert('secret-handler')">
<a href="javascript:alert(1)">unsafe</a>
<a href="java&#x73;cript:alert(1)">encoded unsafe</a>
<iframe src="https://example.com"></iframe>
<form action="https://example.com"><input name="password"></form>

[Markdown unsafe](javascript:alert%281%29)
`, '/docs');
  assert.doesNotMatch(html, /secret-script|secret-handler|javascript:|<script|<iframe|<form|<input|onerror=/i);
  assert.match(html, /<img src="https:\/\/example.com\/image.png"/);
});

test('safe Markdown structure and relative links survive sanitizing', () => {
  const html = parseMarkdownToHtml('# Heading\n\n```php\necho "ok";\n```\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n[Guide](./DATABASES.md)', '/docs');
  for (const expected of ['<h1>Heading</h1>', 'class="language-php"', '<table>', 'href="/docs/databases"']) {
    assert.ok(html.includes(expected), html);
  }
});
