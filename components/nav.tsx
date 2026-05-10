import Link from "next/link";
import Image from "next/image";
import "./nav.css";

export default function Nav({ active }: { active?: "docs" | "specs" }) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.8)" }}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://raw.githubusercontent.com/shippercli/assets/main/logo-transparent.svg"
            alt="Shipper"
            width={28}
            height={28}
            className="h-7 w-auto"
          />
          <span className="font-bold text-lg" style={{ color: "var(--foreground)" }}>Shipper</span>
        </Link>

        <div className="hidden sm:flex items-center gap-8 text-sm">
          <Link href="/docs" style={{ color: active === "docs" ? "var(--accent)" : "var(--text-secondary)" }}>Docs</Link>
          <Link href="/specs" style={{ color: active === "specs" ? "var(--accent)" : "var(--text-secondary)" }}>Specs</Link>
          <a href="https://github.com/shippercli/cli" target="_blank" rel="noopener" style={{ color: "var(--text-secondary)" }}>GitHub</a>
          <Link href="/docs" className="nav-button">Get Started</Link>
        </div>

        <button className="sm:hidden p-2" aria-label="Menu">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}