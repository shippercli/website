type ProviderSupportTableProps = {
  features: string[];
  supportedFeatures: string[];
};

export default function ProviderSupportTable({
  features,
  supportedFeatures,
}: ProviderSupportTableProps) {
  const supported = new Set(supportedFeatures);

  return (
    <>
      <div
        className="hidden overflow-hidden rounded-2xl border border-[var(--border)] sm:block"
        style={{ background: "var(--surface-glass)" }}
      >
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Feature
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => {
              const isSupported = supported.has(feature);

              return (
                <tr key={feature} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="px-4 py-4 text-sm text-[var(--foreground)]">{feature}</td>
                  <td className="px-4 py-4">
                    <span
                      className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider"
                      style={{
                        background: isSupported
                          ? "rgba(41, 163, 106, 0.16)"
                          : "rgba(191, 87, 87, 0.14)",
                        color: isSupported ? "#1f8a57" : "#b45454",
                      }}
                    >
                      {isSupported ? "Supported" : "Unsupported"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 sm:hidden">
        {features.map((feature) => {
          const isSupported = supported.has(feature);

          return (
            <div
              key={feature}
              className="rounded-2xl border border-[var(--border)] p-4"
              style={{ background: "var(--surface-glass)" }}
            >
              <div className="mb-2 text-sm font-semibold text-[var(--foreground)]">{feature}</div>
              <div className="flex items-center justify-end gap-3">
                <span
                  className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    background: isSupported
                      ? "rgba(41, 163, 106, 0.16)"
                      : "rgba(191, 87, 87, 0.14)",
                    color: isSupported ? "#1f8a57" : "#b45454",
                  }}
                >
                  {isSupported ? "Supported" : "Unsupported"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
