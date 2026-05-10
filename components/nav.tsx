import Link from "next/link";
import Image from "next/image";
import "./nav.css";

export default function Nav({ active }: { active?: "docs" | "specs" }) {
  return (
    <>
      <div className="w-full py-1.5 relative" style={{ background: "linear-gradient(135deg, #7aa2ff 0%, #5b8cf0 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-end gap-6">
          <a href="https://github.com/shippercli/cli" target="_blank" rel="noopener" className="text-white/90 hover:text-white transition-colors text-sm">GitHub</a>
          <a href="https://twitter.com/shippercli" target="_blank" rel="noopener" className="text-white/90 hover:text-white transition-colors text-sm">Twitter</a>
        </div>
      </div>
      <nav
        className="border-b backdrop-blur-md"
        style={{
          borderColor: "var(--border)",
          background: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://raw.githubusercontent.com/shippercli/assets/main/logo-v2.png"
              alt="Shipper"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-8 text-sm">
            <Link
              href="/docs"
              className="transition-colors"
              style={{
                color: active === "docs" ? "var(--accent)" : "var(--text-secondary)",
                fontWeight: active === "docs" ? 500 : 400,
              }}
            >
              Docs
            </Link>
            <Link
              href="/specs"
              className="transition-colors"
              style={{
                color: active === "specs" ? "var(--accent)" : "var(--text-secondary)",
                fontWeight: active === "specs" ? 500 : 400,
              }}
            >
              Specs
            </Link>
            <Link
              href="/docs"
              className="nav-button"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}