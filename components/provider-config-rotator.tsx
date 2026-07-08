"use client";

import { useEffect, useState } from "react";

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
    providerSetting: 'host: "me.easypanel.io"',
  },
];

export default function ProviderConfigRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % providerExamples.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  const example = providerExamples[index];

  return (
    <div className="font-mono text-sm">
      <div className="mb-2" style={{ color: "var(--accent)" }}>
        shipper.yml
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
      <div className="ml-16" style={{ color: "var(--text-muted)" }}>
        databases:
      </div>
      <div className="ml-20" style={{ color: "var(--text-muted)" }}>
        main:
      </div>
      <div className="ml-24" style={{ color: "var(--text-muted)" }}>
        name: &quot;<span className="marker-highlight marker-highlight-purple">myapp_production</span>&quot;
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
      <div className="ml-16" style={{ color: "var(--text-muted)" }}>
        databases:
      </div>
      <div className="ml-20" style={{ color: "var(--text-muted)" }}>
        main:
      </div>
      <div className="ml-24" style={{ color: "var(--text-muted)" }}>
        name: &quot;<span className="marker-highlight marker-highlight-purple">myapp_staging</span>&quot;
      </div>
    </div>
  );
}
