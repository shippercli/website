import { notFound } from "next/navigation";
import { getSpec, getAllSpecs, getSpecsNavigation } from "@/lib/specs";
import Link from "next/link";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const specs = getAllSpecs();
  return specs.map((spec) => ({ slug: spec.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spec = getSpec(slug);
  if (!spec) return {};
  return { title: `${spec.title} — Shipper Specs` };
}

export default async function SpecPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spec = getSpec(slug);
  if (!spec) notFound();

  const navigation = getSpecsNavigation();
  const allSpecs = getAllSpecs();
  const currentIndex = allSpecs.findIndex((s) => s.slug === slug);
  const prev = currentIndex > 0 ? allSpecs[currentIndex - 1] : null;
  const next = currentIndex < allSpecs.length - 1 ? allSpecs[currentIndex + 1] : null;

  const currentSection = Object.entries(navigation)
    .find(([, pages]) => pages.some((p) => p.slug === slug))
    ?.[0] ?? "Specifications";

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
                    href={`/specs/${page.slug}`}
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
            <Link href="/specs" className="hover:text-foreground transition-colors">Specs</Link>
            <span>/</span>
            <span>{currentSection}</span>
            <span>/</span>
            <span className="text-foreground">{spec.title}</span>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: spec.content.replace(/^#\s+(.+)$/m, "").trim() }} />

          <div className="flex items-center justify-between mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              {prev && (
                <Link href={`/specs/${prev.slug}`} className="group">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">Previous</div>
                  <div className="text-blue-500 group-hover:text-blue-400 transition-colors">← {prev.title}</div>
                </Link>
              )}
            </div>
            <div className="text-right">
              {next && (
                <Link href={`/specs/${next.slug}`} className="group">
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