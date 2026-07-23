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
    <div
      className="overflow-hidden rounded-2xl border border-[var(--border)]"
      style={{ background: "var(--surface-glass)" }}
    >
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Feature
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Support
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
                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">
                  {isSupported ? "Supported" : "Not supported"}
                </td>
                <td className="px-4 py-4">
                  <span
                    className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider"
                    style={{
                      background: isSupported
                        ? "rgba(29, 76, 127, 0.12)"
                        : "rgba(115, 126, 148, 0.14)",
                      color: isSupported ? "var(--accent)" : "var(--text-muted)",
                    }}
                  >
                    {isSupported ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
