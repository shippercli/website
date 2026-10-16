import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);
const defaultSources = {
  docs: "https://github.com/shippercli/docs.git",
  spec: "https://github.com/shippercli/specs.git",
};

async function copyTree(source, destination) {
  const info = await fs.lstat(source);
  if (info.isSymbolicLink() || (!info.isDirectory() && !info.isFile())) {
    throw new Error("Content sources must contain ordinary files and directories");
  }
  if (info.isDirectory()) {
    await fs.mkdir(destination);
    for (const entry of await fs.readdir(source)) {
      await copyTree(path.join(source, entry), path.join(destination, entry));
    }
  } else {
    await fs.copyFile(source, destination);
  }
}

/** Build both mirrors before replacing either destination. */
export async function syncContent({ root = process.cwd(), sources = defaultSources } = {}) {
  root = path.resolve(root);
  const stage = await fs.mkdtemp(path.join(root, ".content-sync-"));
  const swaps = [];
  let preserveStage = false;
  const revisions = {};
  try {
    for (const name of ["docs", "spec"]) {
      const clone = path.join(stage, `${name}-source`);
      await run("git", ["clone", "--depth", "1", "--", sources[name], clone], {
        env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
      });
      const source = name === "docs" ? path.join(clone, "v1") : clone;
      if (!(await fs.lstat(source)).isDirectory()) throw new Error("Content source directory is missing or unsafe");
      const entries = (await fs.readdir(source)).filter((entry) => !entry.startsWith("."));
      if (!entries.some((entry) => entry.endsWith(".md"))) throw new Error("Content source has no top-level Markdown pages");
      const next = path.join(stage, `${name}-next`);
      await fs.mkdir(next);
      for (const entry of entries) await copyTree(path.join(source, entry), path.join(next, entry));
      revisions[name] = (await run("git", ["-C", clone, "rev-parse", "HEAD"])).stdout.trim();
    }
    for (const name of ["docs", "spec"]) {
      const target = path.join(root, name);
      const backup = path.join(stage, `${name}-backup`);
      let exists = true;
      try {
        const info = await fs.lstat(target);
        if (!info.isDirectory() || info.isSymbolicLink()) throw new Error("Content destination must be an ordinary directory");
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
        exists = false;
      }
      const swap = { target, backup, backedUp: false, installed: false };
      swaps.push(swap);
      if (exists) { await fs.rename(target, backup); swap.backedUp = true; }
      await fs.rename(path.join(stage, `${name}-next`), target);
      swap.installed = true;
    }
    return revisions;
  } catch (error) {
    try {
      for (const swap of swaps.reverse()) {
        if (swap.installed) await fs.rm(swap.target, { recursive: true, force: true });
        if (swap.backedUp) await fs.rename(swap.backup, swap.target);
      }
    } catch (recoveryError) {
      preserveStage = true;
      throw new AggregateError([error, recoveryError], `Content recovery failed; backups retained at ${stage}`);
    }
    throw error;
  } finally {
    if (!preserveStage) await fs.rm(stage, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const revisions = await syncContent();
  console.log(`Synced docs ${revisions.docs} and specs ${revisions.spec}`);
}
