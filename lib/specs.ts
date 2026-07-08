import fs from "fs";
import path from "path";
import { parseContentMetadata } from "@/lib/content-metadata";
import { parseMarkdownToHtml } from "@/lib/markdown";

const SPECS_PATH = path.join(process.cwd(), "spec");

export interface SpecPage {
  slug: string;
  title: string;
  description: string;
  content: string;
}

function slugFromFilename(file: string): string {
  return file.replace(/\.md$/i, "").toLowerCase();
}

function findSpecFile(slug: string): string | null {
  if (!fs.existsSync(SPECS_PATH)) return null;
  const normalizedSlug = slug.toLowerCase();
  const file = fs
    .readdirSync(SPECS_PATH)
    .find((entry) => entry.endsWith(".md") && slugFromFilename(entry) === normalizedSlug);

  return file ?? null;
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : "Untitled";
}

export function getAllSpecs(): SpecPage[] {
  if (!fs.existsSync(SPECS_PATH)) return [];
  return fs
    .readdirSync(SPECS_PATH)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = slugFromFilename(file);
      const content = fs.readFileSync(path.join(SPECS_PATH, file), "utf-8");
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

export function getSpec(slug: string): SpecPage | null {
  const file = findSpecFile(slug);
  if (!file) return null;
  const filePath = path.join(SPECS_PATH, file);
  const content = fs.readFileSync(filePath, "utf-8");
  const { metadata, body } = parseContentMetadata(content);
  const htmlContent = parseMarkdownToHtml(body, "/specs");
  return {
    slug: slug.toLowerCase(),
    title: extractTitle(body),
    description: metadata.description ?? "",
    content: htmlContent,
  };
}

export function getSpecsNavigation(): Record<string, { slug: string; title: string }[]> {
  const specs = getAllSpecs();
  const sections: Record<string, { slug: string; title: string }[]> = {
    "Architecture": [],
    "Commands": [],
    "Configuration": [],
    "Deployment": [],
    "Infrastructure": [],
    "Testing": [],
  };

  specs.forEach((spec) => {
    const s = spec.slug.toLowerCase();
    if (s.includes("architecture") || s.includes("provider")) sections["Architecture"].push({ slug: spec.slug, title: spec.title });
    else if (s.includes("command") || s.includes("cli")) sections["Commands"].push({ slug: spec.slug, title: spec.title });
    else if (s.includes("configuration") || s.includes("variable") || s.includes("strict")) sections["Configuration"].push({ slug: spec.slug, title: spec.title });
    else if (s.includes("deploy") || s.includes("execution") || s.includes("plan") || s.includes("apply") || s.includes("rollback")) sections["Deployment"].push({ slug: spec.slug, title: spec.title });
    else if (s.includes("database") || s.includes("queue") || s.includes("cron") || s.includes("nginx") || s.includes("ssl") || s.includes("network") || s.includes("redirect")) sections["Infrastructure"].push({ slug: spec.slug, title: spec.title });
    else sections["Testing"].push({ slug: spec.slug, title: spec.title });
  });

  Object.keys(sections).forEach((k) => {
    if (sections[k].length === 0) delete sections[k];
  });

  return sections;
}
