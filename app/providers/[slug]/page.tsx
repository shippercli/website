import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProviderFeatures, getProvider, getProviders } from "../providers";
import ProviderLogo from "@/components/provider-logo";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const providers = await getProviders();
  return providers.map((provider) => ({ slug: provider.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = await getProvider(slug);

  if (!provider) return {};

  return {
    title: `${provider.name} Provider — Shipper`,
    description: provider.description,
  };
}

export default async function ProviderDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = await getProvider(slug);

  if (!provider) notFound();

  const allProviderFeatures = await getAllProviderFeatures();
  const unsupportedFeatures = allProviderFeatures.filter(
    (feature) => !provider.features.includes(feature)
  );

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-6 text-sm text-[var(--text-muted)]">
            <Link href="/providers" className="hover:text-[var(--foreground)] transition-colors">
              Providers
            </Link>{" "}
            / {provider.name}
          </div>

          <div
            className="border border-[var(--border)] rounded-3xl p-8 md:p-10 backdrop-blur-xl"
            style={{ background: "var(--surface)" }}
          >
            <div className="mb-8">
              <div className="mb-5 flex h-16 items-center">
                <ProviderLogo
                  lightSrc={provider.logo}
                  darkSrc={provider.darkLogo}
                  alt={`${provider.name} logo`}
                  width={220}
                  height={64}
                  className="h-12 w-auto object-contain object-left"
                />
              </div>
              <div className="mb-3 flex items-center gap-3">
                <h1 className="text-4xl font-bold">{provider.name}</h1>
                {provider.status === "beta" ? (
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                    style={{ background: "rgba(29, 76, 127, 0.12)", color: "var(--accent)" }}
                  >
                    Beta
                  </span>
                ) : null}
              </div>
              <p className="text-lg text-[var(--text-secondary)] max-w-3xl">{provider.description}</p>
              {provider.statusNote ? (
                <p className="mt-3 text-sm text-[var(--text-muted)]">{provider.statusNote}</p>
              ) : null}
            </div>

            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">Supported features</h2>
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

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">Not supported</h2>
                <div className="flex flex-wrap gap-2">
                  {unsupportedFeatures.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-sm rounded-full border border-[var(--border)] opacity-70"
                      style={{ background: "rgba(255, 255, 255, 0.35)" }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">Configuration</h2>
                <pre
                  className="p-4 rounded-lg border border-[var(--border)] text-sm font-mono overflow-x-auto"
                  style={{ background: "var(--surface-glass)" }}
                >
                  <code>{JSON.stringify(provider.config, null, 2)}</code>
                </pre>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">Installation</h2>
                <pre
                  className="p-4 rounded-lg border border-[var(--border)] text-sm font-mono overflow-x-auto"
                  style={{ background: "var(--surface-glass)" }}
                >
                  <code>{provider.install}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
