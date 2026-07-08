import Image from "next/image";

const providers = [
  {
    name: "Ploi",
    slug: "ploi",
    logo: "/providers/ploi.png",
    description: "Manage servers and deployments through the Ploi API. Ideal for developers who want a managed server control panel with a clean UI.",
    features: ["Site Management", "SSL Certificates", "Database Management", "Queue Workers", "Cron Jobs", "Environment Variables"],
    config: {
      provider: "ploi",
      api_key: "${PLOI_API_KEY}",
      server_id: "123456",
    },
    install: "composer require shippercli/ploi-provider",
  },
  {
    name: "Laravel Forge",
    slug: "forge",
    logo: "/providers/forge.svg",
    description: "Deploy to servers managed by Laravel Forge. Perfect for Laravel applications with built-in Composer, queue, and SSL support.",
    features: ["Site Management", "SSL Certificates (Let's Encrypt)", "Database Management", "Queue Workers", "Git Deployment", "Daemon Commands"],
    config: {
      provider: "forge",
      api_token: "${FORGE_API_TOKEN}",
      server_id: "789012",
    },
    install: "composer global require laravel/forge-sdk",
  },
  {
    name: "cPanel",
    slug: "cpanel",
    logo: "/providers/cpanel.svg",
    description: "Automate deployments to shared cPanel hosting accounts. Works with any cPanel provider that gives you API access.",
    features: ["Git Version Control", "Domain Management", "Database Management", "SSL Certificates"],
    config: {
      provider: "cpanel",
      host: "cpanel.example.com",
      port: 2083,
      username: "myuser",
      api_token: "${CPANEL_API_TOKEN}",
    },
    install: "composer require shippercli/provider-cpanel",
  },
  {
    name: "EasyPanel",
    slug: "easypanel",
    logo: "/providers/easypanel.svg",
    description: "Deploy PHP applications with Git integration and EasyPanel-managed services on self-hosted infrastructure.",
    features: ["Git Source Management", "Application Deployment", "Database Management", "Domain Mapping", "SSL Certificates"],
    config: {
      provider: "easypanel",
      url: "https://easypanel.example.com",
      auth_token: "${EASYPANEL_AUTH_TOKEN}",
    },
    install: "composer require shippercli/provider-easypanel",
  },
];

export default function ProvidersPage() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">Providers</h1>
          <p className="text-lg text-[var(--text-secondary)] mb-12">
            Shipper supports multiple deployment providers. Choose the one that matches your infrastructure.
          </p>

          <div className="space-y-12">
            {providers.map((provider) => (
              <div key={provider.slug} className="border border-[var(--border)] rounded-2xl p-8 backdrop-blur-xl" style={{ background: "var(--surface)" }}>
                <div className="mb-6">
                  <div className="mb-4 flex h-14 items-center">
                    <Image
                      src={provider.logo}
                      alt={`${provider.name} logo`}
                      width={180}
                      height={56}
                      className="h-10 w-auto object-contain object-left"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{provider.name}</h2>
                  <p className="text-[var(--text-secondary)]">{provider.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-sm rounded-full border border-[var(--border)]"
                        style={{ background: "var(--surface-glass)" }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">Configuration</h3>
                    <pre className="p-4 rounded-lg border border-[var(--border)] text-sm font-mono overflow-x-auto" style={{ background: "var(--surface-glass)" }}>
                      <code>{JSON.stringify(provider.config, null, 2)}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">Installation</h3>
                    <pre className="p-4 rounded-lg border border-[var(--border)] text-sm font-mono overflow-x-auto" style={{ background: "var(--surface-glass)" }}>
                      <code>{provider.install}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 border border-[var(--border)] rounded-2xl text-center backdrop-blur-xl" style={{ background: "var(--surface)" }}>
            <h3 className="font-semibold mb-2">Missing your provider?</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Shipper has a plugin architecture. Adding new providers is straightforward.
            </p>
            <a
              href="https://github.com/shippercli/cli/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ background: "var(--accent)", color: "white" }}
            >
              Request a Provider
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
