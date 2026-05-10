import Image from "next/image";

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <div className="glow glow-1" />
      <div className="glow glow-2" />

      <section className="section-padding" style={{ position: "relative", zIndex: 1 }}>
        <div className="max-width">
          <nav className="flex items-center justify-between mb-24">
            <div className="flex items-center gap-3">
              <Image
                src="https://raw.githubusercontent.com/shippercli/assets/main/logo-transparent.svg"
                alt="Shipper"
                width={28}
                height={28}
                className="h-7 w-auto invert"
              />
              <span className="font-bold text-lg">Shipper</span>
            </div>
            <div className="flex items-center gap-8 text-sm" style={{ color: "var(--text-secondary)" }}>
              <a href="/docs">Docs</a>
              <a href="/specs">Specs</a>
              <a href="https://github.com/shippercli/cli" target="_blank" rel="noopener">GitHub</a>
              <a href="/docs" className="btn-primary" style={{ padding: "10px 20px", fontSize: "13px" }}>Get Started</a>
            </div>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 border" style={{ background: "var(--accent-light)", borderColor: "var(--border)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#4ade80" }} />
              <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Now supporting Laravel Forge</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8" style={{ lineHeight: 0.95 }}>
              Deploy like<br />infrastructure.
            </h1>

            <p className="text-xl mb-12 leading-relaxed max-w-xl" style={{ color: "var(--text-secondary)" }}>
              Shipper brings the power of infrastructure-as-code to application deployments.
              One config file. Any provider. Total control.
            </p>

            <div className="flex gap-4">
              <a href="/docs" className="btn-primary">Get Started</a>
              <a href="https://github.com/shippercli/cli" target="_blank" rel="noopener" className="btn-secondary">View on GitHub</a>
            </div>

            <div className="mt-16 p-6 rounded-2xl border" style={{ background: "var(--background-alt)", borderColor: "var(--border)", maxWidth: "600px" }}>
              <div className="mb-3 text-sm font-medium" style={{ color: "var(--accent)" }}>shipper.yml</div>
              <code style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                <pre>{`providers:
  ploi:
    api_key: \${PLOI_API_KEY}
    server_id: "105556"

projects:
  api:
    provider: ploi
    domain: "api.example.com"
    profiles:
      production:
        branch: main`}</pre>
              </code>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--background-alt)", position: "relative", zIndex: 1 }}>
        <div className="max-width">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Plan & Apply",
                desc: "Preview every change before it happens. No surprises.",
                icon: "✓",
              },
              {
                title: "Database Lifecycle",
                desc: "Create, link, and destroy databases automatically.",
                icon: "◉",
              },
              {
                title: "PR Previews",
                desc: "Spin up preview environments for every pull request.",
                icon: "⚡",
              },
              {
                title: "GitHub Actions",
                desc: "First-class CI/CD integration.",
                icon: "▶",
              },
              {
                title: "SSL Certificates",
                desc: "Provision and manage SSL automatically.",
                icon: "🔒",
              },
              {
                title: "Config Validation",
                desc: "Catch misconfigurations before production.",
                icon: "⚠",
              },
            ].map((feature) => (
              <div key={feature.title} className="card">
                <div className="text-2xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ position: "relative", zIndex: 1 }}>
        <div className="max-width text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to ship?</h2>
          <p className="text-lg mb-10" style={{ color: "var(--text-secondary)" }}>Get started in under 5 minutes</p>
          <code
            style={{
              display: "inline-block",
              padding: "16px 32px",
              borderRadius: "10px",
              fontSize: "15px",
              background: "var(--background-alt)",
              border: "1px solid var(--border)",
            }}
          >
            $ composer global require shippercli/cli
          </code>
        </div>
      </section>

      <footer className="section-padding py-8" style={{ borderTop: "1px solid var(--border)", position: "relative", zIndex: 1 }}>
        <div className="max-width flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>© 2026 Shipper. Open source MIT.</p>
          <div className="flex gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
            <a href="https://github.com/shippercli/cli" target="_blank" rel="noopener">GitHub</a>
            <a href="/docs">Docs</a>
            <a href="/specs">Specs</a>
          </div>
        </div>
      </footer>
    </main>
  );
}