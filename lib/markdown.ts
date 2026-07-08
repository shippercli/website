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

  const isParentLink = href.startsWith("../");
  const isCurrentDirLink = href.startsWith("./");
  if (!isParentLink && !isCurrentDirLink) return href;

  const [pathPart, hash = ""] = href.split("#", 2);
  const sanitizedPath = pathPart.replace(/\.md$/i, "").replace(/^\.\.\/|^\.\//, "").toLowerCase();

  if (isParentLink && sanitizedPath === "README") return `/${hash ? `${hash.startsWith("#") ? "" : "#"}${hash}` : ""}` || "/";
  if (isParentLink && sanitizedPath === "ROADMAP") return "/";

  if (isCurrentDirLink || isParentLink) {
    const fragment = hash ? `#${hash}` : "";
    return `${base}/${sanitizedPath}${fragment}`;
  }

  return href;
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
