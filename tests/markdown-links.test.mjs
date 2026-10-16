import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../lib/markdown.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText
  .replace('from "marked"', `from ${JSON.stringify(import.meta.resolve("marked"))}`);
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
