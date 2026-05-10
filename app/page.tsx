export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex flex-1 w-full flex-col">
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
          <p className="text-blue-500 font-semibold text-sm uppercase tracking-widest mb-4">Declarative Deployments</p>
          <h1 className="max-w-xs text-4xl md:text-5xl font-extrabold leading-tight mb-4 mx-auto text-foreground">
            Deploy like infrastructure.<br />Ship like a pro.
          </h1>
          <p className="text-lg max-w-xl mx-auto mb-10 text-muted-foreground">
            Declarative deployments from a single YAML file. Plan changes, review them, then apply.
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto text-left">
            <div className="flex-1 bg-zinc-900 rounded-lg p-6 font-mono text-sm">
              <div className="text-blue-400 mb-1">shipper.yml</div>
              <div className="text-zinc-400">providers:</div>
              <div className="text-zinc-400 ml-4">ploi:</div>
              <div className="text-zinc-400 ml-8">server_id: &quot;105556&quot;</div>
              <div className="text-zinc-400 mt-2">projects:</div>
              <div className="text-zinc-400 ml-4">api:</div>
              <div className="text-zinc-400 ml-8">provider: ploi</div>
              <div className="text-zinc-400 ml-8">domain: &quot;api.example.com&quot;</div>
              <div className="text-zinc-400 ml-8">profiles:</div>
              <div className="text-zinc-400 ml-12">production:</div>
              <div className="text-zinc-400 ml-16">branch: main</div>
            </div>

            <div className="flex-1 bg-zinc-900 rounded-lg p-6 font-mono text-sm">
              <div className="text-green-400 mb-1">Terminal</div>
              <div className="text-zinc-300">$ composer global require shippercli/cli</div>
              <div className="mt-3 text-zinc-300">$ shipper plan api --profile=production</div>
              <div className="text-green-400 mt-1">+ Create site api.example.com</div>
              <div className="text-green-400">+ Configure SSL (Let&apos;s Encrypt)</div>
              <div className="text-green-400">+ Link database shipper_api_prod</div>
              <div className="text-green-400">+ Deploy from main branch</div>
              <div className="mt-3 text-zinc-300">$ shipper apply api --profile=production</div>
              <div className="text-blue-400 mt-2">✓ All resources applied successfully</div>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold text-center mb-10">Everything you need to ship</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Provider Agnostic", desc: "Ploi, Forge, and more. One config, any provider." },
                { title: "Plan & Apply", desc: "Preview changes before deploying. No surprises." },
                { title: "Database Lifecycle", desc: "Create, link, and manage databases automatically." },
                { title: "PR Previews", desc: "Spin up preview environments for every pull request." },
                { title: "GitHub Actions", desc: "CI/CD out of the box. Deploy on push or PR." },
                { title: "Config Validation", desc: "Catch misconfigurations before they hit production." },
              ].map((f) => (
                <div key={f.title} className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-6">
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">
            <h2 className="text-xl font-semibold mb-4">Ready to ship?</h2>
            <code className="bg-zinc-100 dark:bg-zinc-900 rounded-lg px-6 py-3 font-mono text-sm inline-block">
              $ composer global require shippercli/cli
            </code>
          </div>
        </section>
      </main>
    </div>
  );
}