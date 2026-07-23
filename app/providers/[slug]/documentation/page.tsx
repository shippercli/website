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
    title: `${provider.name} Documentation — Shipper`,
    description: `Provider-specific documentation for ${provider.name}.`,
  };
}

export default async function ProviderDocumentationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = await getProvider(slug);

  if (!provider) notFound();

  return (
    <ProviderDetailShell provider={provider} active="documentation">
      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Provider notes
          </h2>
          <div className="rounded-2xl border border-[var(--border)] p-6" style={{ background: "var(--surface-glass)" }}>
            <p className="text-[var(--text-secondary)]">
              Use this provider when your infrastructure already runs through {provider.name}. Shipper
              keeps the deployment workflow consistent, while provider-specific capabilities and limits
              still depend on what {provider.name} exposes on the target account or instance.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Operational model
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] p-6" style={{ background: "var(--surface-glass)" }}>
              <h3 className="mb-2 text-lg font-semibold">What Shipper handles</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Environment-independent deployment orchestration, profile selection, and a consistent
                project configuration surface across providers.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] p-6" style={{ background: "var(--surface-glass)" }}>
              <h3 className="mb-2 text-lg font-semibold">What stays provider-specific</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Authentication details, resource identifiers, available features, and behavior that can
                differ between plans, regions, or instance setups.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Before using in production
          </h2>
          <div className="rounded-2xl border border-[var(--border)] p-6" style={{ background: "var(--surface-glass)" }}>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li>Validate authentication and resource identifiers against a non-critical project first.</li>
              <li>Confirm every feature you plan to use on the overview page support matrix.</li>
              <li>Test deploy, rollback, and any provider-managed resources on the exact account type you run in production.</li>
            </ul>
          </div>
        </section>
      </div>
    </ProviderDetailShell>
  );
}
