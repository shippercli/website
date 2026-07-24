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
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="mb-5 text-sm text-[var(--text-muted)] sm:mb-6">
            <Link href="/providers" className="hover:text-[var(--foreground)] transition-colors">
              Providers
            </Link>{" "}
            / {provider.name}
          </div>

          <div
            className="rounded-[1.75rem] border border-[var(--border)] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8 md:p-10"
            style={{ background: "var(--surface)" }}
          >
            <div className="mb-6 sm:mb-8">
              <div className="mb-4 flex h-14 items-center sm:mb-5 sm:h-16">
                <ProviderLogo
                  lightSrc={provider.logo}
                  darkSrc={provider.darkLogo}
                  alt={`${provider.name} logo`}
                  width={220}
                  height={64}
                  className="h-10 w-auto max-w-full object-contain object-left sm:h-12"
                />
              </div>
              <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="text-3xl font-bold leading-none sm:text-4xl">{provider.name}</h1>
                {provider.status === "beta" ? (
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                    style={{ background: "rgba(29, 76, 127, 0.12)", color: "var(--accent)" }}
                  >
                    Beta
                  </span>
                ) : null}
              </div>
              <p className="max-w-3xl text-base text-[var(--text-secondary)] sm:text-lg">{provider.description}</p>
              {provider.statusNote ? (
                <p className="mt-3 text-sm text-[var(--text-muted)]">{provider.statusNote}</p>
              ) : null}
            </div>

            <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto border-b border-[var(--border)] px-1 pb-4 sm:mb-8 sm:flex-wrap sm:overflow-visible sm:pb-5">
              {navItems.map((item) => {
                const isActive = item.key === active;

                return (
                  <Link
                    key={item.key}
                    href={item.href(provider.slug)}
                    className="inline-flex shrink-0 items-center rounded-full px-4 py-2 text-sm font-medium transition-colors"
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
