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
    title: provider.name + " Provider — Shipper",
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
  const featureRows = [...provider.features, ...unsupportedFeatures].sort((a, b) => a.localeCompare(b));

  return (
    <ProviderDetailShell provider={provider} active="overview">
      <div className="provider-content-stack">
        <section className="provider-content-section">
          <div className="provider-section-heading">
            <div>
              <span>Compatibility matrix</span>
              <h2>What this integration can handle</h2>
            </div>
            <p>{featureRows.length} capabilities tracked</p>
          </div>
          <ProviderSupportTable features={featureRows} supportedFeatures={provider.features} />
        </section>

        <section className="provider-content-section">
          <div className="provider-section-heading">
            <div>
              <span>Provider manual</span>
              <h2>Go deeper before you deploy</h2>
            </div>
            <p>Three focused references</p>
          </div>
          <div className="provider-resource-grid">
            <div className="provider-resource-card">
              <span className="provider-resource-number">01</span>
              <h3>Documentation</h3>
              <p>Read provider-specific operating notes and rollout guidance.</p>
              <a href={"/providers/" + provider.slug + "/documentation"}>Read notes <span aria-hidden="true">-&gt;</span></a>
            </div>
            <div className="provider-resource-card">
              <span className="provider-resource-number">02</span>
              <h3>Configuration</h3>
              <p>Review provider config keys and the expected configuration shape.</p>
              <a href={"/providers/" + provider.slug + "/configuration"}>View config <span aria-hidden="true">-&gt;</span></a>
            </div>
            <div className="provider-resource-card">
              <span className="provider-resource-number">03</span>
              <h3>Installation</h3>
              <p>See the package install command and rollout checklist for this provider.</p>
              <a href={"/providers/" + provider.slug + "/installation"}>See install <span aria-hidden="true">-&gt;</span></a>
            </div>
          </div>
        </section>
      </div>
    </ProviderDetailShell>
  );
}
