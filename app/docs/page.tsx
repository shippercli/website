import { getAllDocs, getDocsNavigation } from "@/lib/docs";
import { KnowledgeIndex } from "@/components/knowledge-base";

export const dynamic = "force-static";

export default function DocsPage() {
  const navigation = getDocsNavigation();
  const docs = getAllDocs().map((doc) => ({ ...doc, label: doc.section }));

  return (
    <KnowledgeIndex
      kind="docs"
      eyebrow="Documentation"
      title="Feature-by-feature deployment documentation"
      description="Installation, configuration, sites, databases, previews, automation, and server provisioning organized as a systematic product manual."
      entries={docs}
      navigation={navigation}
      startSlug="getting-started"
    />
  );
}
