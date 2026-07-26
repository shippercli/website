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
    title: provider.name + " Configuration — Shipper",
    description: "Configuration reference for the " + provider.name + " provider.",
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
      <div className="provider-content-stack">
        <section className="provider-content-section">
          <div className="provider-section-heading">
            <div><span>Example configuration</span><h2>The provider block</h2></div>
          </div>
          <pre className="provider-code-block">
            <code>{JSON.stringify(provider.config, null, 2)}</code>
          </pre>
        </section>

        <section className="provider-content-section">
          <div className="provider-section-heading">
            <div><span>Configuration guidance</span><h2>What belongs where</h2></div>
          </div>
          <div className="provider-panel-grid">
            <div className="provider-panel">
              <h3>Provider block</h3>
              <p>
                Define credentials and connection settings in the provider block. Keep secrets outside version
                control and inject them through environment variables where possible.
              </p>
            </div>
            <div className="provider-panel">
              <h3>Project mapping</h3>
              <p>
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
