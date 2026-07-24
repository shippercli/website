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
    title: `${provider.name} Installation — Shipper`,
    description: `Installation steps for the ${provider.name} provider package.`,
  };
}

export default async function ProviderInstallationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = await getProvider(slug);

  if (!provider) notFound();

  return (
    <ProviderDetailShell provider={provider} active="installation">
      <div className="space-y-6 sm:space-y-8">
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Install command
          </h2>
          <pre
            className="overflow-x-auto rounded-2xl border border-[var(--border)] p-4 text-sm sm:p-5"
            style={{ background: "var(--surface-glass)" }}
          >
            <code>{provider.install}</code>
          </pre>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Rollout checklist
          </h2>
          <div className="rounded-2xl border border-[var(--border)] p-5 sm:p-6" style={{ background: "var(--surface-glass)" }}>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li>Install the provider package into the same project or runtime that executes Shipper.</li>
              <li>Configure credentials before the first deploy command.</li>
              <li>Run the provider against a disposable or staging target before using production resources.</li>
            </ul>
          </div>
        </section>
      </div>
    </ProviderDetailShell>
  );
}
