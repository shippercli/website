import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import test from 'node:test';
import ts from 'typescript';

const moduleUrl = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const transpile = source => ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.ESNext}}).outputText;
const metadata = moduleUrl(transpile(await readFile(new URL('../lib/content-metadata.ts', import.meta.url), 'utf8')));
const source = await readFile(new URL('../lib/docs.ts', import.meta.url), 'utf8');

test('documentation sections cannot collide with inherited object properties', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'shipper-docs-navigation-'));
  try {
    for (const [index, section] of ['constructor', '__proto__', 'toString', 'Ordinary'].entries()) {
      await writeFile(path.join(directory, `page-${index}.md`), `---\nsection: ${section}\n---\n# Page ${index}\n`);
    }
    const compiled = transpile(source)
      .replace('path.join(process.cwd(), "docs")', JSON.stringify(directory))
      .replace('"@/lib/content-metadata"', JSON.stringify(metadata))
      .replace('"@/lib/markdown"', JSON.stringify(moduleUrl('export const parseMarkdownToHtml = value => value;')));
    const { getDocsNavigation } = await import(moduleUrl(compiled));
    const navigation = getDocsNavigation();
    assert.equal(Object.getPrototypeOf(navigation), null);
    for (const [index, section] of ['constructor', '__proto__', 'toString', 'Ordinary'].entries()) {
      assert.deepEqual(navigation[section], [{slug: `page-${index}`, title: `Page ${index}`}]);
    }
  } finally {
    await rm(directory, {recursive: true, force: true});
  }
});
