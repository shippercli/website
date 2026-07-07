import { notFound } from "next/navigation";
import { getSpec, getAllSpecs, getSpecsNavigation } from "@/lib/specs";
import { KnowledgeArticle } from "@/components/knowledge-base";

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
    <KnowledgeArticle
      kind="specs"
      sectionLabel={currentSection}
      title={spec.title}
      currentSlug={slug}
      navigation={navigation}
      html={spec.content.replace(/^#\s+(.+)$/m, "").trim()}
      prev={prev}
      next={next}
    />
  );
}
