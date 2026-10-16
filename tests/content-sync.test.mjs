import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { syncContent } from "../scripts/sync-content.mjs";

const run = promisify(execFile);
async function fixture(t) {
  const base = await fs.mkdtemp(path.join(os.tmpdir(), "shipper-content-test-"));
  t.after(() => fs.rm(base, { recursive: true, force: true }));
  const root = path.join(base, "website");
  await fs.mkdir(root);
  const sources = {};
  for (const name of ["docs", "spec"]) {
    const source = path.join(base, name); sources[name] = source;
    await fs.mkdir(source); await run("git", ["init", "--quiet", source]);
    const content = name === "docs" ? path.join(source, "v1") : source;
    if (name === "docs") await fs.mkdir(content);
    await fs.writeFile(path.join(content, "current.md"), `# Current ${name}\n`);
    await fs.mkdir(path.join(root, name));
    await fs.writeFile(path.join(root, name, "removed.md"), `# Old ${name}\n`);
    await commit(source);
  }
  return { base, root, sources };
}
async function commit(source) {
  await run("git", ["-C", source, "add", "."]);
  await run("git", ["-C", source, "-c", "commit.gpgsign=false", "-c", "user.name=Fixture", "-c", "user.email=fixture@example.test", "commit", "--quiet", "-m", "fixture"]);
}
async function oldMirrors(f) {
  for (const name of ["docs", "spec"]) assert.equal(await fs.readFile(path.join(f.root, name, "removed.md"), "utf8"), `# Old ${name}\n`);
  assert.deepEqual((await fs.readdir(f.root)).sort(), ["docs", "spec"]);
}

test("content sync replaces stale pages and is repeatable", async (t) => {
  const f = await fixture(t);
  const first = await syncContent(f);
  for (const name of ["docs", "spec"]) {
    assert.deepEqual(await fs.readdir(path.join(f.root, name)), ["current.md"]);
    assert.equal(await fs.readFile(path.join(f.root, name, "current.md"), "utf8"), `# Current ${name}\n`);
    assert.match(first[name], /^[a-f0-9]{40}$/);
  }
  assert.deepEqual(await syncContent(f), first);
  assert.deepEqual((await fs.readdir(f.root)).sort(), ["docs", "spec"]);
});

test("a second clone failure preserves both existing mirrors", async (t) => {
  const f = await fixture(t); f.sources.spec = path.join(f.base, "missing");
  await assert.rejects(syncContent(f)); await oldMirrors(f);
});

test("a symlink in content is rejected before publishing", async (t) => {
  const f = await fixture(t);
  await fs.symlink("/etc/passwd", path.join(f.sources.docs, "v1", "external.md"));
  await commit(f.sources.docs);
  await assert.rejects(syncContent(f), /ordinary files/); await oldMirrors(f);
});

test("empty documentation sources do not erase existing pages", async (t) => {
  const f = await fixture(t);
  await fs.unlink(path.join(f.sources.docs, "v1", "current.md"));
  await fs.writeFile(path.join(f.sources.docs, "v1", "image.txt"), "not a page");
  await commit(f.sources.docs);
  await assert.rejects(syncContent(f), /no top-level Markdown/); await oldMirrors(f);
});

test("a failed second swap restores both old mirrors", async (t) => {
  const f = await fixture(t); const rename = fs.rename;
  const mocked = t.mock.method(fs, "rename", async (source, target) => {
    if (source.endsWith("spec-next")) throw new Error("Synthetic publish failure");
    return rename(source, target);
  });
  try { await assert.rejects(syncContent(f), /Synthetic publish failure/); }
  finally { mocked.mock.restore(); }
  await oldMirrors(f);
});

test("failed recovery preserves backup directories for manual repair", async (t) => {
  const f = await fixture(t); const rename = fs.rename;
  const mocked = t.mock.method(fs, "rename", async (source, target) => {
    if (source.endsWith("spec-next") || source.endsWith("spec-backup")) throw new Error("Synthetic recovery failure");
    return rename(source, target);
  });
  try { await assert.rejects(syncContent(f), /backups retained at/); }
  finally { mocked.mock.restore(); }
  const stage = (await fs.readdir(f.root)).find((entry) => entry.startsWith(".content-sync-"));
  assert.ok(stage);
  for (const name of ["docs", "spec"]) {
    assert.equal(await fs.readFile(path.join(f.root, stage, `${name}-backup`, "removed.md"), "utf8"), `# Old ${name}\n`);
  }
});

test("the CI mirror check catches pages missed by tracked git diff", async (t) => {
  const f = await fixture(t);
  await run("git", ["init", "--quiet", f.root]); await commit(f.root);
  await fs.writeFile(path.join(f.root, "docs", "new.md"), "# New\n");
  await run("git", ["-C", f.root, "diff", "--exit-code", "--", "docs", "spec"]);
  const untracked = await run("git", ["-C", f.root, "ls-files", "--others", "--exclude-standard", "--", "docs", "spec"]);
  assert.equal(untracked.stdout.trim(), "docs/new.md");
  await assert.rejects(run("bash", ["-c", 'if [ -n "$(git ls-files --others --exclude-standard -- docs spec)" ]; then exit 1; fi'], { cwd: f.root }), (error) => error.code === 1);
});
