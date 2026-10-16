"use client";

import { useEffect, useState } from "react";
import { scheduleProviderRotation } from "@/lib/provider-rotation.mjs";

const providerExamples = [
  {
    providerKey: "ploi",
    providerSetting: 'server_id: "105556"',
  },
  {
    providerKey: "forge",
    providerSetting: "server_id: 1337",
  },
  {
    providerKey: "cpanel",
    providerSetting: 'host: "cpanel.hosting.com"',
  },
  {
    providerKey: "easypanel",
    providerSetting: 'url: "https://me.easypanel.io"',
  },
];

export default function ProviderConfigRotator() {
  const [index, setIndex] = useState(0);
  const [rotating, setRotating] = useState(true);

  useEffect(() => {
    if (!rotating) return;
    return scheduleProviderRotation(window, () => {
      setIndex((current) => (current + 1) % providerExamples.length);
    });
  }, [rotating]);

  const example = providerExamples[index];

  return (
    <div className="font-mono text-sm">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2" style={{ color: "var(--accent)" }}>
        <span>shipper.yml</span>
        <div className="flex gap-2 text-xs">
          <button
            type="button"
            className="rounded border px-2 py-1"
            onClick={() => setRotating((current) => !current)}
          >
            {rotating ? "Pause rotation" : "Resume rotation"}
          </button>
          <button
            type="button"
            className="rounded border px-2 py-1"
            onClick={() => {
              setRotating(false);
              setIndex((current) => (current + 1) % providerExamples.length);
            }}
          >
            Next provider
          </button>
        </div>
      </div>
      <div style={{ color: "var(--text-secondary)" }}>providers:</div>
      <div className="ml-4 transition-all duration-300" style={{ color: "var(--text-secondary)" }}>
        <span className="marker-highlight marker-highlight-blue">{example.providerKey}</span>:
      </div>
      <div className="ml-8 transition-all duration-300" style={{ color: "var(--text-muted)" }}>
        {example.providerSetting}
      </div>
      <div className="mt-3" style={{ color: "var(--text-secondary)" }}>
        projects:
      </div>
      <div className="ml-4" style={{ color: "var(--text-secondary)" }}>
        <span className="marker-highlight marker-highlight-orange">api</span>:
      </div>
      <div className="ml-8 transition-all duration-300" style={{ color: "var(--text-muted)" }}>
        provider: <span className="marker-highlight marker-highlight-blue">{example.providerKey}</span>
      </div>
      <div className="ml-8" style={{ color: "var(--text-muted)" }}>databases:</div>
      <div className="ml-12" style={{ color: "var(--text-muted)" }}>main:</div>
      <div className="ml-16" style={{ color: "var(--text-muted)" }}>
        name: &quot;<span className="marker-highlight marker-highlight-purple">{'myapp_${PROFILE}'}</span>&quot;
      </div>
      <div className="ml-16" style={{ color: "var(--text-muted)" }}>
        user: &quot;{'myapp_${PROFILE}'}&quot;
      </div>
      <div className="ml-8" style={{ color: "var(--text-muted)" }}>
        profiles:
      </div>
      <div className="ml-12" style={{ color: "var(--text-muted)" }}>
        <span className="marker-highlight marker-highlight-yellow">production</span>:
      </div>
      <div className="ml-16" style={{ color: "var(--text-muted)" }}>
        branch: <span className="marker-highlight marker-highlight-green">main</span>
      </div>
      <div className="ml-16" style={{ color: "var(--text-muted)" }}>
        domain: &quot;<span className="marker-highlight marker-highlight-pink">api.example.com</span>&quot;
      </div>
      <div className="ml-12" style={{ color: "var(--text-muted)" }}>
        <span className="marker-highlight marker-highlight-yellow">staging</span>:
      </div>
      <div className="ml-16" style={{ color: "var(--text-muted)" }}>
        branch: <span className="marker-highlight marker-highlight-green">develop</span>
      </div>
      <div className="ml-16" style={{ color: "var(--text-muted)" }}>
        domain: &quot;<span className="marker-highlight marker-highlight-pink">api.example-test.com</span>&quot;
      </div>
    </div>
  );
}
