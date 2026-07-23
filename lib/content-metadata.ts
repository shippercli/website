export interface ContentMetadata {
  description?: string;
  section?: string;
  order?: number;
  hidden?: boolean;
}

export function parseContentMetadata(content: string): {
  metadata: ContentMetadata;
  body: string;
} {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n*/);

  if (!frontmatterMatch) {
    return { metadata: {}, body: content };
  }

  const frontmatter = frontmatterMatch[1];
  const body = content.slice(frontmatterMatch[0].length);
  const metadata: ContentMetadata = {};

  for (const line of frontmatter.split("\n")) {
    const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    const value = rawValue.replace(/^"(.*)"$/, "$1").trim();

    if (key === "description") metadata.description = value;
    if (key === "section") metadata.section = value;
    if (key === "order") metadata.order = Number.parseInt(value, 10);
    if (key === "hidden") metadata.hidden = value === "true";
  }

  return { metadata, body };
}
