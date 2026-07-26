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
    title: provider.name + " Installation — Shipper",
    description: "Installation steps for the " + provider.name + " provider package.",
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
      <div className="provider-content-stack">
        <section className="provider-content-section">
          <div className="provider-section-heading">
            <div><span>Install command</span><h2>Add the provider package</h2></div>
          </div>
          <pre className="provider-code-block">
            <code>{provider.install}</code>
          </pre>
        </section>

        <section className="provider-content-section">
          <div className="provider-section-heading">
            <div><span>Rollout checklist</span><h2>Make the first deploy boring</h2></div>
          </div>
          <div className="provider-panel">
            <ul className="provider-checklist">
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
