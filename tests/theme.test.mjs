import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { initializeTheme, persistTheme, themeInitializationScript } from "../lib/theme.mjs";

function browser({ saved, dark = false, blocked = false, mediaBlocked = false } = {}) {
  const classes = new Set();
  const window = {
    document: { documentElement: {
      dataset: {},
      classList: { toggle(name, enabled) { enabled ? classes.add(name) : classes.delete(name); } },
    } },
    matchMedia() {
      if (mediaBlocked) throw new Error("Media unavailable");
      return { matches: dark };
    },
    get localStorage() {
      if (blocked) throw new Error("Storage denied");
      return { getItem: () => saved, setItem(_key, value) { saved = value; } };
    },
  };
  return { window, classes };
}

for (const [label, options, expected] of [
  ["saved dark overrides system", { saved: "dark" }, "dark"],
  ["saved light overrides system", { saved: "light", dark: true }, "light"],
  ["missing preference follows system", { dark: true }, "dark"],
  ["invalid preference follows system", { saved: "invalid", dark: true }, "dark"],
  ["blocked storage follows system", { blocked: true, dark: true }, "dark"],
  ["unavailable preferences default to light", { blocked: true, mediaBlocked: true }, "light"],
  ["saved preference survives unavailable media", { saved: "dark", mediaBlocked: true }, "dark"],
]) {
  test(label, () => {
    for (const bootstrap of [false, true]) {
      const { window, classes } = browser(options);
      if (bootstrap) vm.runInNewContext(themeInitializationScript, { window });
      else assert.equal(initializeTheme(window), expected);
      assert.equal(window.document.documentElement.dataset.theme, expected);
      assert.equal(classes.has("dark"), expected === "dark");
    }
  });
}

test("preference persistence is optional", () => {
  assert.doesNotThrow(() => persistTheme(browser({ blocked: true }).window, "dark"));
  const { window } = browser();
  persistTheme(window, "dark");
  assert.equal(initializeTheme(window), "dark");
});

test("storage write errors do not escape", () => {
  const window = { localStorage: { setItem() { throw new Error("Quota exceeded"); } } };
  assert.doesNotThrow(() => persistTheme(window, "dark"));
});
