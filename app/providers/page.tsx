import Image from "next/image";
import Link from "next/link";
import { getProviders } from "./providers";


export default async function ProvidersPage() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">Providers</h1>
          <p className="text-lg text-[var(--text-secondary)] mb-12">
            Shipper supports multiple deployment providers. Choose the one that matches your infrastructure.
          </p>

          <div className="space-y-12">
            {(await getProviders()).map((provider) => (
              <Link
                key={provider.slug}
                href={`/providers/${provider.slug}`}
                className="block border border-[var(--border)] rounded-2xl p-8 backdrop-blur-xl transition-transform duration-150 hover:-translate-y-0.5"
                style={{ background: "var(--surface)" }}
              >
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
                  <div className="mb-2 flex items-center gap-3">
                    <h2 className="text-2xl font-bold">{provider.name}</h2>
                    {provider.status === "beta" ? (
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider"
                        style={{ background: "rgba(29, 76, 127, 0.12)", color: "var(--accent)" }}
                      >
                        Beta
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[var(--text-secondary)]">{provider.description}</p>
                  {provider.statusNote ? (
                    <p className="mt-2 text-sm text-[var(--text-muted)]">{provider.statusNote}</p>
                  ) : null}
                </div>
                <div className="text-sm font-medium text-[var(--accent)]">View provider details</div>
              </Link>
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
