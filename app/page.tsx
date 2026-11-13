import Image from "next/image";
const exampleConfig = `providers:
  coolify:
    url: \${COOLIFY_URL}
    api_token: \${COOLIFY_API_TOKEN}
    server_uuid: \${COOLIFY_SERVER_UUID}
    project_uuid: \${COOLIFY_PROJECT_UUID}
projects:
  shipper-reusable-fixture:
    provider: coolify
    ssl:
      enabled: false
    profiles:
      production:
        domain: shipper-reusable-fixture.test
        coolify:
          environment_name: production
          source_type: docker_image
          docker_image: nginx
          docker_registry_image_tag: alpine
          ports_exposes: "80"`;

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
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
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

          <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto text-left">
            <div
              className="min-w-0 flex-1 backdrop-blur-xl rounded-2xl p-8 border"
              style={{
                background: "var(--surface-glass)",
                borderColor: "var(--border)",
                boxShadow: "0 8px 32px rgba(122, 162, 255, 0.08)",
              }}
            >
              <p className="mb-2 font-mono text-sm">shipper.yml</p>
              <pre className="overflow-x-auto text-sm">{exampleConfig}</pre>
            </div>

            <div
              className="min-w-0 flex-1 backdrop-blur-xl rounded-2xl p-8 border"
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
                <pre className="overflow-x-auto">{`$ composer init --name=local/shipper-deployment --no-interaction
$ composer config repositories.provider-coolify git https://github.com/shippercli/provider-coolify.git
$ composer require shippercli/cli:1.0.10 shippercli/provider-coolify:1.0.9
$ vendor/bin/shipper validate
$ vendor/bin/shipper plan shipper-reusable-fixture --profile=production
$ vendor/bin/shipper apply shipper-reusable-fixture --profile=production`}</pre>
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
                  desc: "Use one CLI with providers for Coolify, Ploi, Forge, EasyPanel, and cPanel.",
                },
                {
                  title: "Plan & Apply",
                  desc: "Preview changes before deploying. No surprises.",
                },
                {
                  title: "Database Lifecycle",
                  desc: "Manage database resources where your provider supports them.",
                },
                {
                  title: "PR Previews",
                  desc: "Configure pull request previews on supported providers.",
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/docs/getting-started"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
                style={{ background: "var(--accent)", color: "white" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Get Started
              </a>
              <a
                href="/providers"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium border transition-all"
                style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
              >
                View Providers
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
