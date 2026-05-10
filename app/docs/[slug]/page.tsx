import { notFound } from "next/navigation";
import { getDoc, getAllDocs, getDocsNavigation } from "@/lib/docs";
import Link from "next/link";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return { title: `${doc.title} — Shipper Docs` };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const navigation = getDocsNavigation();
  const allDocs = getAllDocs();
  const currentIndex = allDocs.findIndex((d) => d.slug === slug);
  const prev = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const next = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  const currentSection = Object.entries(navigation)
    .find(([, pages]) => pages.some((p) => p.slug === slug))
    ?.[0] ?? "Documentation";

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
                    className={`block px-3 py-1.5 rounded text-sm transition-colors ${page.slug === slug ? "bg-zinc-100 dark:bg-zinc-900 text-blue-500 font-medium" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900"}`}
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
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-10">
          <div className="text-xs text-zinc-500 mb-6 flex items-center gap-1.5">
            <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
            <span>/</span>
            <span>{currentSection}</span>
            <span>/</span>
            <span className="text-foreground">{doc.title}</span>
          </div>

          <div className="prose prose-slate max-w-none text-foreground [&_p]:text-foreground [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_code]:text-foreground [&_pre]:bg-zinc-800 [&_pre]:text-zinc-100" dangerouslySetInnerHTML={{ __html: doc.content.replace(/^#\s+(.+)$/m, "").trim() }} />

          <div className="flex items-center justify-between mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              {prev && (
                <Link href={`/docs/${prev.slug}`} className="group">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">Previous</div>
                  <div className="text-blue-500 group-hover:text-blue-400 transition-colors">← {prev.title}</div>
                </Link>
              )}
            </div>
            <div className="text-right">
              {next && (
                <Link href={`/docs/${next.slug}`} className="group">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">Next</div>
                  <div className="text-blue-500 group-hover:text-blue-400 transition-colors">{next.title} →</div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}