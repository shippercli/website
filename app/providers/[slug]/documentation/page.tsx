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
    title: provider.name + " Documentation — Shipper",
    description: "Provider-specific documentation for " + provider.name + ".",
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
      <div className="provider-content-stack">
        {provider.slug === "ftp" ? (
          <section className="provider-content-section">
            <div className="provider-section-heading">
              <div><span>FTP / FTPS guide</span><h2>Deploy a prebuilt artifact</h2></div>
            </div>
            <div className="provider-panel">
              <p>
                Build locally, then upload to a dedicated non-root directory that is empty on first
                deployment. Explicit FTPS verifies certificates and hostnames on control and data
                connections. The server must support MLSD and overwrite by rename.
              </p>
              <p>
                Status reports the deployment journal, rather than application health. There is no
                rollback, runtime management, or multi-file atomic deployment. Destroy removes tracked
                files and preserves unrelated files and directories.
              </p>
              <a href="/docs/ftp">Read the full configuration and recovery guide</a>
            </div>
          </section>
        ) : null}

        <section className="provider-content-section">
          <div className="provider-section-heading">
            <div><span>Provider notes</span><h2>Operating {provider.name} through Shipper</h2></div>
          </div>
          <div className="provider-panel">
            <p>
              Use this provider when your infrastructure already runs through {provider.name}. Shipper
              keeps the deployment workflow consistent, while provider-specific capabilities and limits
              still depend on what {provider.name} exposes on the target account or instance.
            </p>
          </div>
        </section>

        <section className="provider-content-section">
          <div className="provider-section-heading">
            <div><span>Operational model</span><h2>Keep the workflow consistent</h2></div>
          </div>
          <div className="provider-panel-grid">
            <div className="provider-panel">
              <h3>What Shipper handles</h3>
              <p>
                Environment-independent deployment orchestration, profile selection, and a consistent
                project configuration surface across providers.
              </p>
            </div>
            <div className="provider-panel">
              <h3>What stays provider-specific</h3>
              <p>
                Authentication details, resource identifiers, available features, and behavior that can
                differ between plans, regions, or instance setups.
              </p>
            </div>
          </div>
        </section>

        <section className="provider-content-section">
          <div className="provider-section-heading">
            <div><span>Production gate</span><h2>Check the exact account first</h2></div>
          </div>
          <div className="provider-panel">
            <ul className="provider-checklist">
              <li>Validate authentication and resource identifiers against a non-critical project first.</li>
              <li>Confirm every feature you plan to use on the overview page support matrix.</li>
              <li>Test deploy, cleanup, and each supported operation on the exact account type you run in production.</li>
            </ul>
          </div>
        </section>
      </div>
    </ProviderDetailShell>
  );
}
