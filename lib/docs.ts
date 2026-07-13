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
  section: string;
  order: number;
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

function defaultSectionForSlug(slug: string): string {
  if (slug === "getting-started") return "Getting Started";
  if (slug === "configuration") return "Configuration";
  if (slug === "sites" || slug === "server_lifecycle" || slug === "databases" || slug === "pr_previews") {
    return "Deployment Features";
  }
  if (slug === "github_actions" || slug === "github_action") return "Automation";
  if (slug === "build_system") return "Tooling";
  return "Internal Notes";
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
        section: metadata.section ?? defaultSectionForSlug(slug),
        order: metadata.order ?? 999,
        hidden: metadata.hidden ?? false,
      };
    })
    .filter((doc) => !doc.hidden)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
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
    section: metadata.section ?? defaultSectionForSlug(slug.toLowerCase()),
    order: metadata.order ?? 999,
  };
}

export function getDocsNavigation(): Record<string, { slug: string; title: string }[]> {
  const docs = getAllDocs();
  const sections: Record<string, { slug: string; title: string }[]> = {};

  docs.forEach((doc) => {
    sections[doc.section] ??= [];
    sections[doc.section].push({ slug: doc.slug, title: doc.title });
  });

  return sections;
}
