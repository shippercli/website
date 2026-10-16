import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../app/providers/providers.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText.replace('from "zod"', `from ${JSON.stringify(import.meta.resolve("zod"))}`);
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

test("concurrent metadata consumers each reach the framework fetch cache", async () => {
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
    assert.equal(requests, 8);
    assert.deepEqual(first, second);
  } finally { globalThis.fetch = original; }
});

for (const [label, value] of [
  ["null", null],
  ["array", []],
  ["wrong slug", { name: "Fixture", slug: "foreign", logo: "logo.svg", description: "Fixture", features: [], config: {}, install: "fixture" }],
  ["missing fields", {}],
  ["invalid features", { name: "Fixture", slug: "ploi", logo: "logo.svg", description: "Fixture", features: "invalid", config: {}, install: "fixture" }],
  ["invalid config", { name: "Fixture", slug: "ploi", logo: "logo.svg", description: "Fixture", features: [], config: [], install: "fixture" }],
]) {
  test(`invalid provider metadata: ${label}`, async () => {
    const original = globalThis.fetch;
    try {
      const { getProviders } = await load();
      globalThis.fetch = async () => ({ ok: true, json: async () => value });
      await assert.rejects(getProviders(), { message: "Invalid provider metadata for ploi" });
    } finally { globalThis.fetch = original; }
  });
}

test("invalid JSON diagnostics do not echo the provider response", async () => {
  const original = globalThis.fetch;
  try {
    const { getProviders } = await load();
    globalThis.fetch = async () => ({ ok: true, json: async () => { throw new SyntaxError("synthetic-response-secret"); } });
    await assert.rejects(getProviders(), (error) => {
      assert.equal(error.message, "Invalid provider metadata for ploi");
      assert.equal(error.cause, undefined);
      return true;
    });
  } finally { globalThis.fetch = original; }
});
