import { getAllDocs, getDocsNavigation } from "@/lib/docs";
import Link from "next/link";

export const dynamic = "force-static";

export default function DocsPage() {
  const navigation = getDocsNavigation();
  const docs = getAllDocs();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden lg:block w-60 flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800 p-5 overflow-y-auto">
        <nav className="space-y-6">
          {Object.entries(navigation).map(([section, pages]) => (
            <div key={section}>
              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">{section}</h4>
              <div className="space-y-0.5">
                {pages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/docs/${page.slug}`}
                    className="block px-3 py-1.5 rounded text-sm text-zinc-600 dark:text-zinc-400 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold mb-6">Documentation</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">Get started with Shipper by installing the package and configuring your first deployment.</p>
          <div className="grid gap-4">
            {docs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="block p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <h2 className="font-semibold mb-1">{doc.title}</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{doc.content.replace(/^#.*$/gm, "").replace(/\n+/g, " ").trim().slice(0, 120)}…</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}