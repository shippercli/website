import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProvider, providers } from "../providers";

export const dynamic = "force-static";

export function generateStaticParams() {
  return providers.map((provider) => ({ slug: provider.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = getProvider(slug);

  if (!provider) return {};

  return {
    title: `${provider.name} Provider — Shipper`,
    description: provider.description,
  };
}

export default async function ProviderDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = getProvider(slug);

  if (!provider) notFound();

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
                <Image
                  src={provider.logo}
                  alt={`${provider.name} logo`}
                  width={220}
                  height={64}
                  className="h-12 w-auto object-contain object-left"
                />
              </div>
              <h1 className="text-4xl font-bold mb-3">{provider.name}</h1>
              <p className="text-lg text-[var(--text-secondary)] max-w-3xl">{provider.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">Features</h2>
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
