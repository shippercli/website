import Link from "next/link";
import { getProviders } from "./providers";
import ProviderLogo from "@/components/provider-logo";

export default async function ProvidersPage() {
  const providers = await getProviders();
  const betaCount = providers.filter((provider) => provider.status === "beta").length;

  return (
    <div className="provider-index-page">
      <main className="provider-index-inner">
        <header className="provider-index-header">
          <div>
            <div className="provider-index-eyebrow">Integration catalog</div>
            <h1 className="provider-index-title">Choose the control plane behind your deploy.</h1>
            <p className="provider-index-description">
              One Shipper workflow, provider-specific capabilities. Compare what each integration can do before you connect an account.
            </p>
          </div>
          <div className="provider-index-aside">
            <span className="provider-index-aside-label">The catalog</span>
            <div className="provider-index-stats">
              <div><strong>{providers.length}</strong><span>providers</span></div>
              <div><strong>{betaCount}</strong><span>in beta</span></div>
            </div>
          </div>
        </header>

        <div className="provider-index-list">
          {providers.map((provider, index) => (
            <Link
              key={provider.slug}
              href={"/providers/" + provider.slug}
              className="provider-index-card"
            >
              <div className="provider-index-card-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="provider-index-card-main">
                <div className="provider-index-card-logo">
                  <ProviderLogo
                    lightSrc={provider.logo}
                    darkSrc={provider.darkLogo}
                    alt={provider.name + " logo"}
                    width={180}
                    height={56}
                    className="h-9 w-auto max-w-full object-contain object-left sm:h-10"
                  />
                </div>
                <div className="provider-index-card-heading">
                  <h2>{provider.name}</h2>
                  {provider.status === "beta" ? <span className="provider-beta-badge">Beta</span> : null}
                </div>
                <p>{provider.description}</p>
                {provider.status === "beta" && provider.statusNote ? <p className="provider-index-card-note">{provider.statusNote}</p> : null}
              </div>
              <div className="provider-index-card-action">View capabilities <span aria-hidden="true">-&gt;</span></div>
            </Link>
          ))}
        </div>

        <section className="provider-request-card">
          <div>
            <span className="provider-request-label">Not seeing your infrastructure?</span>
            <h2>Bring another provider into the workflow.</h2>
            <p>Shipper uses a plugin architecture. Tell us which control plane should be next.</p>
          </div>
          <a href="https://github.com/shippercli/cli/issues/new" target="_blank" rel="noopener noreferrer">
            Request a provider <span aria-hidden="true">-&gt;</span>
          </a>
        </section>
      </main>
    </div>
  );
}
