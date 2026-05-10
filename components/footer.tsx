import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-12 mt-20" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Shipper. Open source under MIT.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="https://github.com/shippercli/cli" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>GitHub</a>
            <a href="https://twitter.com/shippercli" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Twitter</a>
            <Link href="/docs" style={{ color: "var(--text-muted)" }}>Docs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}