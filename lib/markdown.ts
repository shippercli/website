import { marked } from "marked";

type DocSectionBase = "/docs" | "/specs";

marked.setOptions({
  gfm: true,
  breaks: false,
});

function rewriteRelativeHref(href: string, base: DocSectionBase): string {
  if (!href) return href;
  if (href.startsWith("#")) return href;
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|mailto:|tel:)/i.test(href)) return href;
  if (href.startsWith("/")) return href;

  const match = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  if (!match) return href;
  const [, pathPart, query = "", fragment = ""] = match;
  const isParentLink = pathPart.startsWith("../");
  const isCurrentDirLink = pathPart.startsWith("./");
  if (!isParentLink && !isCurrentDirLink && !/\.md$/i.test(pathPart)) return href;

  const sanitizedPath = pathPart.replace(/\.md$/i, "").replace(/^\.\.\/|^\.\//, "").toLowerCase();
  if (isParentLink && (sanitizedPath === "readme" || sanitizedPath === "roadmap")) {
    return `/${query}${fragment}`;
  }

  return `${base}/${sanitizedPath}${query}${fragment}`;
}

function rewriteMarkdownLinks(html: string, base: DocSectionBase): string {
  return html.replace(/<a\b[^>]*\bhref=(["'])(.*?)\1[^>]*>/gi, (match, quote, href) => {
    const rewritten = rewriteRelativeHref(href, base);
    if (rewritten === href) return match;
    return match.replace(`${quote}${href}${quote}`, `${quote}${rewritten}${quote}`);
  });
}

export function parseMarkdownToHtml(content: string, base: DocSectionBase): string {
  const htmlContent = marked.parse(content) as string;
  return rewriteMarkdownLinks(htmlContent, base);
}
