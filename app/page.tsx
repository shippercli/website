import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="section-padding">
        <div className="max-width">
          <nav className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-3">
              <Image
                src="https://raw.githubusercontent.com/shippercli/assets/main/logo-transparent.svg"
                alt="Shipper"
                width={28}
                height={28}
                className="h-7 w-auto"
              />
              <span className="font-bold text-lg">Shipper</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="/docs" style={{ color: "var(--text-secondary)" }}>Docs</a>
              <a href="/specs" style={{ color: "var(--text-secondary)" }}>Specs</a>
              <a href="/docs" className="btn-primary">Get Started</a>
            </div>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6" style={{ lineHeight: 1.1 }}>
              Ship applications<br />with confidence.
            </h1>
            <p className="text-xl mb-10" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Declarative deployments from a single YAML file. Plan your changes,
              review them, then apply. Works with Ploi and Laravel Forge.
            </p>
            <div className="flex gap-4">
              <a href="/docs" className="btn-primary">Get Started</a>
              <a href="https://github.com/shippercli/cli" target="_blank" rel="noopener" className="btn-secondary">View on GitHub</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#fafafa" }}>
        <div className="max-width">
          <h2 className="text-3xl font-bold text-center mb-4">Provider Agnostic</h2>
          <p className="text-center mb-12" style={{ color: "var(--text-secondary)" }}>
            One config file works across multiple hosting providers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="card">
              <div className="text-4xl mb-4">▲</div>
              <h3 className="text-xl font-bold mb-2">Ploi</h3>
              <p style={{ color: "var(--text-muted)" }}>Deploy to Ploi.io servers with full API support</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">◆</div>
              <h3 className="text-xl font-bold mb-2">Laravel Forge</h3>
              <p style={{ color: "var(--text-muted)" }}>Deploy to servers managed by Laravel Forge</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-width">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Plan & Apply</h3>
              <p style={{ color: "var(--text-muted)" }}>Preview every change before it happens. No surprises.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Database Lifecycle</h3>
              <p style={{ color: "var(--text-muted)" }}>Create, link, and destroy databases automatically.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">GitHub Actions</h3>
              <p style={{ color: "var(--text-muted)" }}>First-class CI/CD. Deploy on push or PR merge.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#fafafa" }}>
        <div className="max-width text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to ship?</h2>
          <p className="mb-8" style={{ color: "var(--text-secondary)" }}>Get started in under 5 minutes</p>
          <code style={{ background: "white", padding: "12px 24px", borderRadius: "6px", fontFamily: "monospace" }}>
            $ composer global require shippercli/cli
          </code>
        </div>
      </section>

      <footer className="section-padding py-8" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-width flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>© 2026 Shipper. Open source MIT.</p>
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