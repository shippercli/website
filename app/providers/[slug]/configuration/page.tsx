import { notFound } from "next/navigation";
import ProviderDetailShell from "@/components/provider-detail-shell";
import { getProvider, getProviders } from "../../providers";

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
    title: `${provider.name} Configuration — Shipper`,
    description: `Configuration reference for the ${provider.name} provider.`,
  };
}

export default async function ProviderConfigurationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = await getProvider(slug);

  if (!provider) notFound();

  return (
    <ProviderDetailShell provider={provider} active="configuration">
      <div className="space-y-6 sm:space-y-8">
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Example configuration
          </h2>
          <pre
            className="overflow-x-auto rounded-2xl border border-[var(--border)] p-4 text-sm sm:p-5"
            style={{ background: "var(--surface-glass)" }}
          >
            <code>{JSON.stringify(provider.config, null, 2)}</code>
          </pre>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Configuration guidance
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] p-5 sm:p-6" style={{ background: "var(--surface-glass)" }}>
              <h3 className="mb-2 text-lg font-semibold">Provider block</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Define credentials and connection settings in the provider block. Keep secrets outside version
                control and inject them through environment variables where possible.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] p-5 sm:p-6" style={{ background: "var(--surface-glass)" }}>
              <h3 className="mb-2 text-lg font-semibold">Project mapping</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Reference this provider from project profiles only after the provider-level credentials and
                provider-specific identifiers have been validated.
              </p>
            </div>
          </div>
        </section>
      </div>
    </ProviderDetailShell>
  );
}
