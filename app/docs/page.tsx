import { getAllDocs, getDocsNavigation } from "@/lib/docs";
import { KnowledgeIndex } from "@/components/knowledge-base";

export const dynamic = "force-static";

export default function DocsPage() {
  const navigation = getDocsNavigation();
  const docs = getAllDocs();

  return (
    <KnowledgeIndex
      kind="docs"
      eyebrow="Field Manual"
      title="Documentation for real deployments"
      description="Installation, configuration, previews, and provider workflows organized like a deployment control room instead of a default markdown listing."
      entries={docs}
      navigation={navigation}
      startSlug="getting-started"
    />
  );
}
