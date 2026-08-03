import Link from "next/link";
import ProviderLogo from "@/components/provider-logo";
import type { Provider } from "@/app/providers/providers";

type ProviderDetailShellProps = {
  provider: Provider;
  active: "overview" | "documentation" | "configuration" | "installation";
  children: React.ReactNode;
};

const navItems: Array<{
  key: ProviderDetailShellProps["active"];
  label: string;
  href: (slug: string) => string;
}> = [
  { key: "overview", label: "Overview", href: (slug) => "/providers/" + slug },
  { key: "documentation", label: "Documentation", href: (slug) => "/providers/" + slug + "/documentation" },
  { key: "configuration", label: "Configuration", href: (slug) => "/providers/" + slug + "/configuration" },
  { key: "installation", label: "Installation", href: (slug) => "/providers/" + slug + "/installation" },
];

export default function ProviderDetailShell({
  provider,
  active,
  children,
}: ProviderDetailShellProps) {
  return (
    <div className="provider-detail-page">
      <main className="provider-detail-inner">
        <div className="provider-detail-breadcrumb">
          <Link href="/providers">Providers</Link>
          <span aria-hidden="true">/</span>
          <span>{provider.name}</span>
        </div>

        <div className="provider-detail-card">
          <header className="provider-detail-header">
            <div className="provider-detail-brand">
              <div className="provider-detail-logo">
                <ProviderLogo
                  lightSrc={provider.logo}
                  darkSrc={provider.darkLogo}
                  alt={provider.name + " logo"}
                  width={220}
                  height={64}
                  className="h-10 w-auto max-w-full object-contain object-left sm:h-12"
                />
              </div>
              <div className="provider-detail-heading">
                <div className="provider-detail-title-row">
                  <h1>{provider.name}</h1>
                  {provider.status === "beta" ? <span className="provider-beta-badge">Beta</span> : null}
                </div>
                <p>{provider.description}</p>
                {provider.status === "beta" && provider.statusNote ? <p className="provider-detail-note">{provider.statusNote}</p> : null}
              </div>
            </div>
            <div className="provider-detail-meta" aria-label="Provider summary">
              <div><strong>{provider.features.length}</strong><span>listed capabilities</span></div>
              <div><strong>{provider.status === "beta" ? "Early" : "Ready"}</strong><span>support stage</span></div>
            </div>
          </header>

          <nav className="provider-detail-nav" aria-label={provider.name + " sections"}>
            {navItems.map((item) => {
              const isActive = item.key === active;

              return (
                <Link
                  key={item.key}
                  href={item.href(provider.slug)}
                  className={isActive ? "is-active" : ""}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="provider-detail-body">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
