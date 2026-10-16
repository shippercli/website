import assert from "node:assert/strict";
import test from "node:test";
import { scheduleProviderRotation } from "../lib/provider-rotation.mjs";

function fixture({ reduced = false, blocked = false } = {}) {
  const timers = new Map();
  const listeners = new Set();
  let nextId = 0;
  const media = {
    matches: reduced,
    addEventListener(type, listener) { assert.equal(type, "change"); listeners.add(listener); },
    removeEventListener(type, listener) { assert.equal(type, "change"); listeners.delete(listener); },
  };
  const browser = {
    matchMedia(query) {
      assert.equal(query, "(prefers-reduced-motion: reduce)");
      if (blocked) throw new Error("Preferences unavailable");
      return media;
    },
    setInterval(callback, delay) { assert.equal(delay, 2000); timers.set(++nextId, callback); return nextId; },
    clearInterval(id) { timers.delete(id); },
  };
  return { browser, media, timers, listeners, tick() { [...timers.values()].forEach((callback) => callback()); }, change(value) { media.matches = value; [...listeners].forEach((listener) => listener()); } };
}

test("normal preference rotates and cleanup removes its timer", () => {
  const f = fixture(); let advances = 0;
  const cleanup = scheduleProviderRotation(f.browser, () => advances++);
  f.tick(); assert.equal(advances, 1);
  cleanup(); f.tick(); assert.equal(advances, 1); assert.equal(f.timers.size, 0);
});

test("reduced motion starts without an automatic timer", () => {
  const f = fixture({ reduced: true });
  const cleanup = scheduleProviderRotation(f.browser, () => assert.fail("Unexpected rotation"));
  assert.equal(f.timers.size, 0); cleanup();
});

test("preference changes stop and resume exactly one timer", () => {
  const f = fixture(); let advances = 0;
  const cleanup = scheduleProviderRotation(f.browser, () => advances++);
  f.change(true); assert.equal(f.timers.size, 0);
  f.change(false); f.change(false); assert.equal(f.timers.size, 1);
  f.tick(); assert.equal(advances, 1);
  cleanup(); assert.equal(f.listeners.size, 0);
});

test("unavailable preference APIs leave rotation safely stopped", () => {
  for (const browser of [fixture({ blocked: true }).browser, {}, { matchMedia: () => null }]) {
    const cleanup = scheduleProviderRotation(browser, () => assert.fail("Unexpected rotation"));
    assert.equal(typeof cleanup, "function"); assert.doesNotThrow(cleanup);
  }
});

test("cleanup prevents stale timer and preference callbacks from restarting rotation", () => {
  const f = fixture(); let advances = 0;
  const cleanup = scheduleProviderRotation(f.browser, () => advances++);
  const callback = [...f.timers.values()][0]; const listener = [...f.listeners][0];
  cleanup(); callback(); listener();
  assert.equal(advances, 0); assert.equal(f.timers.size, 0); assert.equal(f.listeners.size, 0);
});

test("legacy media listeners also stop and resume rotation", () => {
  const f = fixture({ reduced: true }); let advances = 0;
  delete f.media.addEventListener; delete f.media.removeEventListener;
  f.media.addListener = (listener) => f.listeners.add(listener);
  f.media.removeListener = (listener) => f.listeners.delete(listener);
  const cleanup = scheduleProviderRotation(f.browser, () => advances++);
  assert.equal(f.timers.size, 0);
  f.change(false); f.tick(); assert.equal(advances, 1);
  cleanup(); assert.equal(f.listeners.size, 0); assert.equal(f.timers.size, 0);
});

test("denied media subscriptions use preference-aware polling", () => {
  const f = fixture(); let advances = 0;
  f.media.addEventListener = () => { throw new Error("Subscription denied"); };
  const cleanup = scheduleProviderRotation(f.browser, () => advances++);
  f.tick(); assert.equal(advances, 1);
  f.change(true); f.tick(); assert.equal(advances, 1);
  f.change(false); f.tick(); assert.equal(advances, 2);
  cleanup(); assert.equal(f.timers.size, 0);
});

test("media queries without listener APIs remain preference-aware", () => {
  const f = fixture({ reduced: true }); let advances = 0;
  delete f.media.addEventListener; delete f.media.removeEventListener;
  const cleanup = scheduleProviderRotation(f.browser, () => advances++);
  f.tick(); assert.equal(advances, 0);
  f.change(false); f.tick(); assert.equal(advances, 1);
  cleanup(); assert.equal(f.timers.size, 0);
});
