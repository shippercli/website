import fs from "fs";
import path from "path";
import { parseContentMetadata } from "@/lib/content-metadata";
import { parseMarkdownToHtml } from "@/lib/markdown";

const DOCS_PATH = path.join(process.cwd(), "docs");

export interface DocPage {
  slug: string;
  title: string;
  description: string;
  content: string;
}

function slugFromFilename(file: string): string {
  return file.replace(/\.md$/i, "").toLowerCase();
}

function findDocFile(slug: string): string | null {
  if (!fs.existsSync(DOCS_PATH)) return null;
  const normalizedSlug = slug.toLowerCase();
  const file = fs
    .readdirSync(DOCS_PATH)
    .find((entry) => entry.endsWith(".md") && slugFromFilename(entry) === normalizedSlug);

  return file ?? null;
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
      const slug = slugFromFilename(file);
      const content = fs.readFileSync(path.join(DOCS_PATH, file), "utf-8");
      const { metadata, body } = parseContentMetadata(content);
      return {
        slug,
        title: extractTitle(body),
        description: metadata.description ?? "",
        content: body,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getDoc(slug: string): DocPage | null {
  const file = findDocFile(slug);
  if (!file) return null;
  const filePath = path.join(DOCS_PATH, file);
  const content = fs.readFileSync(filePath, "utf-8");
  const { metadata, body } = parseContentMetadata(content);
  const htmlContent = parseMarkdownToHtml(body, "/docs");
  return {
    slug: slug.toLowerCase(),
    title: extractTitle(body),
    description: metadata.description ?? "",
    content: htmlContent,
  };
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
    else if (doc.slug.startsWith("configuration") || doc.slug.startsWith("strict_standards")) sections["Configuration"].push({ slug: doc.slug, title: doc.title });
    else if (doc.slug.startsWith("build_system") || doc.slug.startsWith("github_action") || doc.slug.startsWith("pr_previews") || doc.slug.startsWith("sites")) sections["Deployment"].push({ slug: doc.slug, title: doc.title });
    else if (doc.slug.startsWith("databases") || doc.slug.startsWith("phpstan_fixes")) sections["Guides"].push({ slug: doc.slug, title: doc.title });
    else sections["Reference"].push({ slug: doc.slug, title: doc.title });
  });

  Object.keys(sections).forEach((k) => {
    if (sections[k].length === 0) delete sections[k];
  });

  return sections;
}
