type ProviderSupportTableProps = {
  features: string[];
  supportedFeatures: string[];
};

export default function ProviderSupportTable({
  features,
  supportedFeatures,
}: ProviderSupportTableProps) {
  const supported = new Set(supportedFeatures);
  const supportedCount = features.filter((feature) => supported.has(feature)).length;
  const unsupportedCount = features.length - supportedCount;

  return (
    <div className="provider-support">
      <div className="provider-support-summary">
        <div>
          <span className="provider-support-label">Capability coverage</span>
          <p>See which parts of the Shipper workflow this provider currently exposes.</p>
        </div>
        <div className="provider-support-counts" aria-label="Support summary">
          <span className="is-supported"><strong>{supportedCount}</strong> supported</span>
          <span className="is-unsupported"><strong>{unsupportedCount}</strong> unsupported</span>
        </div>
      </div>

      <div className="provider-support-table-wrap">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Provider capability support</caption>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => {
              const isSupported = supported.has(feature);

              return (
                <tr key={feature} className="provider-support-row">
                  <td><span className={"provider-support-dot " + (isSupported ? "is-supported" : "is-unsupported")} />{feature}</td>
                  <td>
                    <span className={"provider-support-badge " + (isSupported ? "is-supported" : "is-unsupported")}>
                      <span aria-hidden="true">{isSupported ? "Yes" : "No"}</span>
                      {isSupported ? "Supported" : "Unsupported"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="provider-support-mobile">
        {features.map((feature) => {
          const isSupported = supported.has(feature);

          return (
            <div key={feature} className="provider-support-mobile-card">
              <div>
                <span className={"provider-support-dot " + (isSupported ? "is-supported" : "is-unsupported")} />
                {feature}
              </div>
              <span className={"provider-support-badge " + (isSupported ? "is-supported" : "is-unsupported")}>
                {isSupported ? "Supported" : "Unsupported"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
