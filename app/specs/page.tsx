import { getAllSpecs, getSpecsNavigation } from "@/lib/specs";
import { KnowledgeIndex } from "@/components/knowledge-base";

export const dynamic = "force-static";

export default function SpecsPage() {
  const navigation = getSpecsNavigation();
  const specs = getAllSpecs();

  return (
    <KnowledgeIndex
      kind="specs"
      eyebrow="System Blueprints"
      title="Specifications for how Shipper works"
      description="Design notes, architectural decisions, and internal references laid out like a product handbook instead of a loose markdown archive."
      entries={specs}
      navigation={navigation}
    />
  );
}
