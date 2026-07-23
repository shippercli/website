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
  {
    key: "overview",
    label: "Overview",
    href: (slug) => `/providers/${slug}`,
  },
  {
    key: "documentation",
    label: "Documentation",
    href: (slug) => `/providers/${slug}/documentation`,
  },
  {
    key: "configuration",
    label: "Configuration",
    href: (slug) => `/providers/${slug}/configuration`,
  },
  {
    key: "installation",
    label: "Installation",
    href: (slug) => `/providers/${slug}/installation`,
  },
];

export default function ProviderDetailShell({
  provider,
  active,
  children,
}: ProviderDetailShellProps) {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-6 text-sm text-[var(--text-muted)]">
            <Link href="/providers" className="hover:text-[var(--foreground)] transition-colors">
              Providers
            </Link>{" "}
            / {provider.name}
          </div>

          <div
            className="border border-[var(--border)] rounded-3xl p-8 md:p-10 backdrop-blur-xl"
            style={{ background: "var(--surface)" }}
          >
            <div className="mb-8">
              <div className="mb-5 flex h-16 items-center">
                <ProviderLogo
                  lightSrc={provider.logo}
                  darkSrc={provider.darkLogo}
                  alt={`${provider.name} logo`}
                  width={220}
                  height={64}
                  className="h-12 w-auto object-contain object-left"
                />
              </div>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-bold">{provider.name}</h1>
                {provider.status === "beta" ? (
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                    style={{ background: "rgba(29, 76, 127, 0.12)", color: "var(--accent)" }}
                  >
                    Beta
                  </span>
                ) : null}
              </div>
              <p className="text-lg text-[var(--text-secondary)] max-w-3xl">{provider.description}</p>
              {provider.statusNote ? (
                <p className="mt-3 text-sm text-[var(--text-muted)]">{provider.statusNote}</p>
              ) : null}
            </div>

            <div className="mb-8 flex flex-wrap gap-2 border-b border-[var(--border)] pb-5">
              {navItems.map((item) => {
                const isActive = item.key === active;

                return (
                  <Link
                    key={item.key}
                    href={item.href(provider.slug)}
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors"
                    style={{
                      background: isActive ? "var(--accent)" : "var(--surface-glass)",
                      color: isActive ? "white" : "var(--text-secondary)",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
