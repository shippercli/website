import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../app/providers/providers.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
let generation = 0;
const load = () => import(`data:text/javascript;base64,${Buffer.from(compiled + `\n// ${generation++}`).toString("base64")}`);
const metadata = (url, name = "Provider") => ({ ok: true, json: async () => ({
  name, slug: url.split("/")[4].replace("provider-", ""), logo: "logo.svg", description: "Fixture", features: [], config: {}, install: "composer require fixture",
}) });

test("provider metadata recovers after a transient fetch failure", async () => {
  const original = globalThis.fetch;
  try {
    const { getProviders } = await load();
    globalThis.fetch = async () => { throw new Error("Temporary fixture failure"); };
    await assert.rejects(getProviders(), /Temporary fixture failure/);
    globalThis.fetch = async (url) => metadata(url);
    assert.equal((await getProviders()).length, 4);
  } finally { globalThis.fetch = original; }
});

test("resolved metadata does not bypass future Next fetch revalidation", async () => {
  const original = globalThis.fetch;
  try {
    const { getProviders } = await load();
    globalThis.fetch = async (url) => metadata(url, "First");
    assert.equal((await getProviders())[0].name, "First");
    globalThis.fetch = async (url) => metadata(url, "Updated");
    assert.equal((await getProviders())[0].name, "Updated");
  } finally { globalThis.fetch = original; }
});

test("concurrent metadata consumers share pending requests", async () => {
  const original = globalThis.fetch;
  try {
    const { getProviders } = await load();
    let requests = 0;
    globalThis.fetch = async (url, options) => {
      requests++;
      assert.equal(options.next.revalidate, 300);
      assert.ok(options.signal instanceof AbortSignal);
      return metadata(url);
    };
    const [first, second] = await Promise.all([getProviders(), getProviders()]);
    assert.equal(requests, 4);
    assert.equal(first, second);
  } finally { globalThis.fetch = original; }
});
