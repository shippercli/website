import fs from "fs";
import path from "path";

const DOCS_PATH = path.join(process.cwd(), "..", "docs", "v1");

export interface DocPage {
  slug: string;
  title: string;
  content: string;
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : "Untitled";
}

export function getAllDocs(): DocPage[] {
  if (!fs.existsSync(DOCS_PATH)) return [];
  return fs
    .readdirSync(DOCS_PATH)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const content = fs.readFileSync(path.join(DOCS_PATH, file), "utf-8");
      return { slug, title: extractTitle(content), content };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getDoc(slug: string): DocPage | null {
  const filePath = path.join(DOCS_PATH, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  return { slug, title: extractTitle(content), content };
}

export function getDocsNavigation(): Record<string, { slug: string; title: string }[]> {
  const docs = getAllDocs();
  const sections: Record<string, { slug: string; title: string }[]> = {
    "Getting Started": [],
    "Configuration": [],
    "Deployment": [],
    "Guides": [],
    "Reference": [],
  };

  docs.forEach((doc) => {
    if (doc.slug === "getting-started") sections["Getting Started"].push({ slug: doc.slug, title: doc.title });
    else if (doc.slug.startsWith("CONFIGURATION") || doc.slug.startsWith("STRICT_STANDARDS")) sections["Configuration"].push({ slug: doc.slug, title: doc.title });
    else if (doc.slug.startsWith("BUILD_SYSTEM") || doc.slug.startsWith("GITHUB_ACTION") || doc.slug.startsWith("PR_PREVIEWS") || doc.slug.startsWith("SITES")) sections["Deployment"].push({ slug: doc.slug, title: doc.title });
    else if (doc.slug.startsWith("DATABASES") || doc.slug.startsWith("PHPSTAN_FIXES")) sections["Guides"].push({ slug: doc.slug, title: doc.title });
    else sections["Reference"].push({ slug: doc.slug, title: doc.title });
  });

  Object.keys(sections).forEach((k) => {
    if (sections[k].length === 0) delete sections[k];
  });

  return sections;
}