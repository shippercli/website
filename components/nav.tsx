import Link from "next/link";
import Image from "next/image";

export default function Nav({ active }: { active?: "docs" | "specs" }) {
  return (
    <>
      <div
        className="w-full py-3 relative"
        style={{ background: "linear-gradient(135deg, #7aa2ff 0%, #5b8cf0 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Image
            src="https://raw.githubusercontent.com/shippercli/assets/main/banner.png"
            alt="Shipper"
            width={180}
            height={28}
            className="h-7 w-auto object-contain brightness-0 invert"
          />
          <div className="flex items-center gap-8 text-sm">
            <a
              href="https://github.com/shippercli/cli"
              target="_blank"
              rel="noopener"
              className="text-white/90 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/shippercli"
              target="_blank"
              rel="noopener"
              className="text-white/90 hover:text-white transition-colors"
            >
              Twitter
            </a>
          </div>
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
          <Link
            href="/"
            className="text-lg font-bold transition-colors"
            style={{ color: "var(--foreground)" }}
          >
            Shipper
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
              className="rounded-lg px-5 py-2 font-medium transition-all"
              style={{
                background: "var(--accent)",
                color: "white",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}