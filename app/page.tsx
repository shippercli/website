import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <div className="geometric-bg">
        <div className="grid-overlay" />
        <div className="cube cube-top-right" />
        <div className="cube cube-bottom-left" />
        <div className="cube cube-right-middle" />
        <div className="cube cube-top-left" />
      </div>

      <main className="flex flex-1 w-full flex-col content-wrapper">
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border" style={{ background: "var(--accent-light)", borderColor: "var(--border)" }}>
            <span className="w-2 h-2 rounded-full" style={{ background: "#4ade80" }} />
            <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              Now supporting Laravel Forge
            </span>
          </div>

          <h1 className="max-w-3xl text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 mx-auto" style={{ color: "var(--foreground)" }}>
            Deploy like<br />infrastructure.
          </h1>

          <p className="text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Shipper brings the power of infrastructure-as-code to application deployments.
            One YAML file. Any provider. Complete control.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="/docs"
              className="px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 accent-gradient glow-accent"
            >
              Get Started
            </a>
            <a
              href="https://github.com/shippercli/cli"
              target="_blank"
              rel="noopener"
              className="px-8 py-4 rounded-xl font-semibold border transition-all hover:bg-white/50"
              style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--foreground)" }}
            >
              View on GitHub
            </a>
          </div>

          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            $ composer global require shippercli/cli
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="glass-card p-10 md:p-14">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
                  Provider Agnostic
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                  One configuration file works across multiple hosting providers.
                  Currently supporting Ploi and Laravel Forge, with more coming soon.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Ploi", "Laravel Forge", "More coming"].map((p) => (
                    <span key={p} className="px-3 py-1 rounded-full text-sm border" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="rounded-xl p-6 font-mono text-sm" style={{ background: "var(--background-alt)", border: "1px solid var(--border)" }}>
                  <div className="mb-3" style={{ color: "var(--accent)" }}>shipper.yml</div>
                  <div style={{ color: "var(--text-secondary)" }}>providers:</div>
                  <div className="ml-4" style={{ color: "var(--text-muted)" }}>ploi: ...</div>
                  <div className="ml-4" style={{ color: "var(--text-muted)" }}>forge: ...</div>
                  <div className="mt-3" style={{ color: "var(--text-secondary)" }}>projects:</div>
                  <div className="ml-4" style={{ color: "var(--text-muted)" }}>api:</div>
                  <div className="ml-8" style={{ color: "var(--text-muted)" }}>provider: forge</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ color: "var(--foreground)" }}>
            Everything you need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Plan & Apply",
                desc: "Preview every change before it happens. No surprises, no guesswork.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Database Lifecycle",
                desc: "Create, link, and destroy databases automatically with your deployments.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                ),
              },
              {
                title: "PR Previews",
                desc: "Spin up preview environments for every pull request automatically.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
              },
              {
                title: "GitHub Actions",
                desc: "First-class CI/CD integration. Deploy on push or PR merge.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: "SSL Certificates",
                desc: "Provision and manage SSL certificates automatically.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: "Config Validation",
                desc: "Catch misconfigurations before they hit production.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="glass-card p-8 hover:shadow-xl transition-all duration-300"
                style={{ boxShadow: "0 4px 24px rgba(122, 162, 255, 0.05)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--foreground)" }}>
                  {feature.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--foreground)" }}>
            Ready to ship?
          </h2>
          <p className="text-lg mb-10" style={{ color: "var(--text-secondary)" }}>
            Get started in under 5 minutes.
          </p>
          <code
            className="rounded-xl px-8 py-4 font-mono text-sm inline-block border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            $ composer global require shippercli/cli
          </code>
        </section>
      </main>
    </div>
  );
}