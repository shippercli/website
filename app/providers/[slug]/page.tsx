import { notFound } from "next/navigation";
import ProviderDetailShell from "@/components/provider-detail-shell";
import ProviderSupportTable from "@/components/provider-support-table";
import { getAllProviderFeatures, getProvider, getProviders } from "../providers";

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
  const featureRows = [
    ...provider.features,
    ...unsupportedFeatures,
  ].sort((a, b) => a.localeCompare(b));

  return (
    <ProviderDetailShell provider={provider} active="overview">
      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Compatibility matrix
          </h2>
          <ProviderSupportTable features={featureRows} supportedFeatures={provider.features} />
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border)] p-6" style={{ background: "var(--surface-glass)" }}>
            <h3 className="mb-2 text-lg font-semibold">Documentation</h3>
            <p className="mb-4 text-sm text-[var(--text-secondary)]">
              Read provider-specific operating notes and rollout guidance.
            </p>
            <a href={`/providers/${provider.slug}/documentation`} className="text-sm font-medium text-[var(--accent)]">
              Open documentation
            </a>
          </div>
          <div className="rounded-2xl border border-[var(--border)] p-6" style={{ background: "var(--surface-glass)" }}>
            <h3 className="mb-2 text-lg font-semibold">Configuration</h3>
            <p className="mb-4 text-sm text-[var(--text-secondary)]">
              Review provider config keys and the expected configuration shape.
            </p>
            <a href={`/providers/${provider.slug}/configuration`} className="text-sm font-medium text-[var(--accent)]">
              Open configuration
            </a>
          </div>
          <div className="rounded-2xl border border-[var(--border)] p-6" style={{ background: "var(--surface-glass)" }}>
            <h3 className="mb-2 text-lg font-semibold">Installation</h3>
            <p className="mb-4 text-sm text-[var(--text-secondary)]">
              See the package install command and rollout checklist for this provider.
            </p>
            <a href={`/providers/${provider.slug}/installation`} className="text-sm font-medium text-[var(--accent)]">
              Open installation
            </a>
          </div>
        </section>
      </div>
    </ProviderDetailShell>
  );
}
