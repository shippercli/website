import { notFound } from "next/navigation";
import { getDoc, getAllDocs, getDocsNavigation } from "@/lib/docs";
import { KnowledgeArticle } from "@/components/knowledge-base";

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
    <KnowledgeArticle
      kind="docs"
      sectionLabel={currentSection}
      title={doc.title}
      description={doc.description}
      currentSlug={slug}
      navigation={navigation}
      html={doc.content.replace(/^#\s+(.+)$/m, "").trim()}
      prev={prev}
      next={next}
    />
  );
}
