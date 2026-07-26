import Link from "next/link";

type NavPage = {
  slug: string;
  title: string;
};

type NavSections = Record<string, NavPage[]>;

type Entry = {
  slug: string;
  title: string;
  description: string;
  label?: string;
};

export function KnowledgeIndex({
  kind,
  title,
  eyebrow,
  description,
  entries,
  navigation,
  startSlug,
}: {
  kind: "docs" | "specs";
  title: string;
  eyebrow: string;
  description: string;
  entries: Entry[];
  navigation: NavSections;
  startSlug?: string;
}) {
  const sectionNames = Object.keys(navigation);
  const entryCount = entries.length;
  const firstEntry = entries[0];

  return (
    <div className={"kb-page kb-index-page kb-index-page-" + kind}>
      <div className="kb-page-inner">
        <section className="kb-hero">
          <div className="kb-hero-copy">
            <div className="kb-hero-topline">
              <div className="kb-eyebrow">{eyebrow}</div>
              <span className="kb-hero-mark">{kind === "docs" ? "01 / Manual" : "02 / Reference"}</span>
            </div>
            <h1 className="kb-title">{title}</h1>
            <p className="kb-description">{description}</p>
            <div className="kb-hero-actions">
              <Link href={"/" + kind + "/" + (startSlug ?? firstEntry?.slug ?? "")} className="kb-primary-action">
                Read the first page <span aria-hidden="true">-&gt;</span>
              </Link>
              <div className="kb-meta-strip" aria-label="Collection summary">
                <span><strong>{entryCount}</strong> pages</span>
                <span><strong>{sectionNames.length}</strong> sections</span>
                <span>{kind === "docs" ? "Feature reference" : "Design reference"}</span>
              </div>
            </div>
          </div>

          <div className="kb-hero-panel">
            <div className="kb-panel-heading">
              <div className="kb-panel-label">Browse by section</div>
              <span className="kb-panel-count">{sectionNames.length} areas</span>
            </div>
            <div className="kb-section-list">
              {sectionNames.map((section, index) => (
                <div key={section} className="kb-section-row">
                  <span className="kb-section-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="kb-section-name">{section}</span>
                  <span className="kb-section-pages">{navigation[section]?.length ?? 0}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="kb-collection-heading">
          <div>
            <div className="kb-panel-label">Complete index</div>
            <h2>{kind === "docs" ? "Everything you need to ship" : "How the system is shaped"}</h2>
          </div>
          <span>{entryCount} {entryCount === 1 ? "entry" : "entries"}</span>
        </div>

        <section className="kb-grid">
          {entries.map((entry, index) => (
            <Link key={entry.slug} href={"/" + kind + "/" + entry.slug} className="kb-card">
              <div className="kb-card-topline">
                <span className="kb-card-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="kb-card-kind">{entry.label ?? (kind === "docs" ? "Doc" : "Spec")}</span>
              </div>
              <h2 className="kb-card-title">{entry.title}</h2>
              <p className="kb-card-copy">{entry.description}</p>
              <div className="kb-card-footer">
                <span className="kb-card-section">{entry.label ?? (kind === "docs" ? "Documentation" : "Specification")}</span>
                <span className="kb-card-link">Read page <span aria-hidden="true">-&gt;</span></span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

export function KnowledgeArticle({
  kind,
  sectionLabel,
  title,
  description,
  currentSlug,
  navigation,
  html,
  prev,
  next,
}: {
  kind: "docs" | "specs";
  sectionLabel: string;
  title: string;
  description: string;
  currentSlug: string;
  navigation: NavSections;
  html: string;
  prev: NavPage | null;
  next: NavPage | null;
}) {
  const sectionPages = navigation[sectionLabel] ?? [];
  const sectionIndex = sectionPages.findIndex((page) => page.slug === currentSlug);

  return (
    <div className={"kb-page kb-article-page kb-article-page-" + kind}>
      <div className="kb-article-layout">
        <aside className="kb-sidebar">
          <div className="kb-sidebar-inner">
            <div className="kb-sidebar-header">
              <Link href={"/" + kind} className="kb-back-link">&lt;- Back to {kind === "docs" ? "docs" : "specs"}</Link>
              <div className="kb-panel-label">{kind === "docs" ? "Documentation" : "Specifications"}</div>
              <p className="kb-sidebar-copy">
                {kind === "docs"
                  ? "Feature-by-feature reference for configuring and operating Shipper."
                  : "Architecture, standards, and design rationale for the product."}
              </p>
            </div>

            <nav className="kb-sidebar-nav">
              {Object.entries(navigation).map(([section, pages]) => (
                <div key={section} className="kb-sidebar-section">
                  <h4 className="kb-sidebar-title"><span>{section}</span><span>{pages.length}</span></h4>
                  <div className="kb-sidebar-links">
                    {pages.map((page) => (
                      <Link
                        key={page.slug}
                        href={"/" + kind + "/" + page.slug}
                        className={"kb-sidebar-link " + (page.slug === currentSlug ? "is-active" : "")}
                      >
                        {page.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <main className="kb-article">
          <header className="kb-article-hero">
            <div className="kb-breadcrumbs">
              <Link href={"/" + kind}>{kind === "docs" ? "Docs" : "Specs"}</Link>
              <span>/</span>
              <span>{sectionLabel}</span>
            </div>
            <div className="kb-article-kicker">
              <span>{kind === "docs" ? "Feature guide" : "System note"}</span>
              {sectionPages.length > 0 ? <span>{sectionIndex + 1} of {sectionPages.length} in section</span> : null}
            </div>
            <h1 className="kb-article-title">{title}</h1>
            <p className="kb-article-description">{description}</p>
          </header>

          <article className="kb-prose" dangerouslySetInnerHTML={{ __html: html }} />

          <div className="kb-pager">
            {prev ? (
              <Link href={"/" + kind + "/" + prev.slug} className="kb-pager-card">
                <span className="kb-pager-label">&lt;- Previous page</span>
                <span className="kb-pager-title">{prev.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link href={"/" + kind + "/" + next.slug} className="kb-pager-card kb-pager-card-next">
                <span className="kb-pager-label">Next page -&gt;</span>
                <span className="kb-pager-title">{next.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
