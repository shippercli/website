import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <div className="geometric-bg">
        <div className="grid-lines" />
        <div className="cube cube-top-right" />
        <div className="cube cube-bottom-left" />
        <div className="cube cube-right-middle" />
      </div>

      <main className="flex flex-1 w-full flex-col content-wrapper">
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--accent)" }}
          >
            Declarative Deployments
          </p>
          <h1
            className="max-w-2xl text-5xl md:text-6xl font-bold leading-tight mb-6 mx-auto"
            style={{ color: "var(--foreground)" }}
          >
            Deploy like infrastructure.
            <br />
            Ship like a pro.
          </h1>
          <p
            className="text-lg max-w-xl mx-auto mb-12"
            style={{ color: "var(--text-secondary)" }}
          >
            Declarative deployments from a single YAML file. Plan changes,
            review them, then apply.
          </p>

          <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto text-left">
            <div
              className="flex-1 backdrop-blur-xl rounded-2xl p-8 border"
              style={{
                background: "var(--surface-glass)",
                borderColor: "var(--border)",
                boxShadow: "0 8px 32px rgba(122, 162, 255, 0.08)",
              }}
            >
              <div className="font-mono text-sm">
                <div className="mb-2" style={{ color: "var(--accent)" }}>
                  shipper.yml
                </div>
                <div style={{ color: "var(--text-secondary)" }}>providers:</div>
                <div className="ml-4" style={{ color: "var(--text-secondary)" }}>
                  ploi:
                </div>
                <div className="ml-8" style={{ color: "var(--text-muted)" }}>
                  server_id: &quot;105556&quot;
                </div>
                <div className="mt-3" style={{ color: "var(--text-secondary)" }}>
                  projects:
                </div>
                <div className="ml-4" style={{ color: "var(--text-secondary)" }}>
                  api:
                </div>
                <div className="ml-8" style={{ color: "var(--text-muted)" }}>
                  provider: ploi
                </div>
                <div className="ml-8" style={{ color: "var(--text-muted)" }}>
                  domain: &quot;api.example.com&quot;
                </div>
                <div className="ml-8" style={{ color: "var(--text-muted)" }}>
                  profiles:
                </div>
                <div className="ml-12" style={{ color: "var(--text-muted)" }}>
                  production:
                </div>
                <div className="ml-16" style={{ color: "var(--text-muted)" }}>
                  branch: main
                </div>
              </div>
            </div>

            <div
              className="flex-1 backdrop-blur-xl rounded-2xl p-8 border"
              style={{
                background: "var(--surface-glass)",
                borderColor: "var(--border)",
                boxShadow: "0 8px 32px rgba(122, 162, 255, 0.08)",
              }}
            >
              <div className="font-mono text-sm">
                <div className="mb-3" style={{ color: "#4ade80" }}>
                  Terminal
                </div>
                <div style={{ color: "var(--text-secondary)" }}>
                  $ composer global require shippercli/cli
                </div>
                <div className="mt-4" style={{ color: "var(--text-secondary)" }}>
                  $ shipper plan api --profile=production
                </div>
                <div className="mt-1" style={{ color: "#4ade80" }}>
                  + Create site api.example.com
                </div>
                <div style={{ color: "#4ade80" }}>
                  + Configure SSL (Let&apos;s Encrypt)
                </div>
                <div style={{ color: "#4ade80" }}>
                  + Link database shipper_api_prod
                </div>
                <div style={{ color: "#4ade80" }}>
                  + Deploy from main branch
                </div>
                <div className="mt-4" style={{ color: "var(--text-secondary)" }}>
                  $ shipper apply api --profile=production
                </div>
                <div className="mt-3" style={{ color: "var(--accent)" }}>
                  ✓ All resources applied successfully
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2
              className="text-3xl font-bold text-center mb-12"
              style={{ color: "var(--foreground)" }}
            >
              Everything you need to ship
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Provider Agnostic",
                  desc: "Ploi, Forge, and more. One config, any provider.",
                },
                {
                  title: "Plan & Apply",
                  desc: "Preview changes before deploying. No surprises.",
                },
                {
                  title: "Database Lifecycle",
                  desc: "Create, link, and manage databases automatically.",
                },
                {
                  title: "PR Previews",
                  desc: "Spin up preview environments for every pull request.",
                },
                {
                  title: "GitHub Actions",
                  desc: "CI/CD out of the box. Deploy on push or PR.",
                },
                {
                  title: "Config Validation",
                  desc: "Catch misconfigurations before they hit production.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <h3 className="font-semibold mb-3" style={{ color: "var(--foreground)" }}>
                    {f.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-20 text-center">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--foreground)" }}>
              Ready to ship?
            </h2>
            <code
              className="rounded-xl px-8 py-4 font-mono text-sm inline-block border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
                boxShadow: "0 4px 16px rgba(122, 162, 255, 0.06)",
              }}
            >
              $ composer global require shippercli/cli
            </code>
          </div>
        </section>
      </main>
    </div>
  );
}