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

  return (
    <div className="kb-page">
      <div className="kb-page-inner">
        <section className="kb-hero">
          <div className="kb-hero-copy">
            <div className="kb-eyebrow">{eyebrow}</div>
            <h1 className="kb-title">{title}</h1>
            <p className="kb-description">{description}</p>
            <div className="kb-hero-actions">
              <Link href={`/${kind}/${startSlug ?? entries[0]?.slug ?? ""}`} className="kb-primary-action">
                Start reading
              </Link>
              <div className="kb-meta-strip">
                <span>{entryCount} pages</span>
                <span>{sectionNames.length} sections</span>
                <span>{kind === "docs" ? "Operational guides" : "Internal design notes"}</span>
              </div>
            </div>
          </div>

          <div className="kb-hero-panel">
            <div className="kb-panel-label">Sections</div>
            <div className="kb-section-chips">
              {sectionNames.map((section) => (
                <span key={section} className="kb-chip">
                  {section}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="kb-grid">
          {entries.map((entry, index) => (
            <Link key={entry.slug} href={`/${kind}/${entry.slug}`} className="kb-card">
              <div className="kb-card-topline">
                <span className="kb-card-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="kb-card-kind">{kind === "docs" ? "Guide" : "Spec"}</span>
              </div>
              <h2 className="kb-card-title">{entry.title}</h2>
              <p className="kb-card-copy">{entry.description}</p>
              <div className="kb-card-link">Open page</div>
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
  currentSlug,
  navigation,
  html,
  prev,
  next,
}: {
  kind: "docs" | "specs";
  sectionLabel: string;
  title: string;
  currentSlug: string;
  navigation: NavSections;
  html: string;
  prev: NavPage | null;
  next: NavPage | null;
}) {
  return (
    <div className="kb-page">
      <div className="kb-article-layout">
        <aside className="kb-sidebar">
          <div className="kb-sidebar-inner">
            <div className="kb-sidebar-header">
              <div className="kb-panel-label">{kind === "docs" ? "Documentation" : "Specifications"}</div>
              <p className="kb-sidebar-copy">
                {kind === "docs"
                  ? "Implementation guides, deployment flows, and operational setup."
                  : "Architecture, standards, and design rationale for the product."}
              </p>
            </div>

            <nav className="kb-sidebar-nav">
              {Object.entries(navigation).map(([section, pages]) => (
                <div key={section} className="kb-sidebar-section">
                  <h4 className="kb-sidebar-title">{section}</h4>
                  <div className="kb-sidebar-links">
                    {pages.map((page) => (
                      <Link
                        key={page.slug}
                        href={`/${kind}/${page.slug}`}
                        className={`kb-sidebar-link ${page.slug === currentSlug ? "is-active" : ""}`}
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
              <Link href={`/${kind}`}>{kind === "docs" ? "Docs" : "Specs"}</Link>
              <span>/</span>
              <span>{sectionLabel}</span>
            </div>
            <h1 className="kb-article-title">{title}</h1>
            <p className="kb-article-description">
              {kind === "docs"
                ? "Practical guidance for using Shipper in real deployment workflows."
                : "Reference material for how the system is designed and expected to behave."}
            </p>
          </header>

          <article className="kb-prose" dangerouslySetInnerHTML={{ __html: html }} />

          <div className="kb-pager">
            {prev ? (
              <Link href={`/${kind}/${prev.slug}`} className="kb-pager-card">
                <span className="kb-pager-label">Previous</span>
                <span className="kb-pager-title">{prev.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link href={`/${kind}/${next.slug}`} className="kb-pager-card kb-pager-card-next">
                <span className="kb-pager-label">Next</span>
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
