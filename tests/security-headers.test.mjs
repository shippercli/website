import assert from "node:assert/strict";
import test from "node:test";
import { securityHeaders } from "../lib/security-headers.mjs";

const headers = Object.fromEntries(securityHeaders.map(({ key, value }) => [key.toLowerCase(), value]));

test("security headers restrict browser capabilities and framing", () => {
  assert.equal(headers["x-content-type-options"], "nosniff");
  assert.equal(headers["x-frame-options"], "DENY");
  assert.equal(headers["referrer-policy"], "strict-origin-when-cross-origin");
  assert.equal(headers["permissions-policy"], "camera=(), microphone=(), geolocation=()");
});

test("content security policy limits resource origins and disables object content", () => {
  const policy = headers["content-security-policy"];
  assert.ok(policy);
  assert.match(policy, /default-src 'self'/);
  assert.match(policy, /object-src 'none'/);
  assert.match(policy, /frame-ancestors 'none'/);
  assert.match(policy, /base-uri 'self'/);
  assert.match(policy, /upgrade-insecure-requests/);
  assert.doesNotMatch(policy, /unsafe-eval|https?:/);
});
