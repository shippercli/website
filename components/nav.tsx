import Link from "next/link";

export default function Nav({ active }: { active?: "docs" | "specs" }) {
  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <Link href="/" className="text-lg font-bold text-foreground hover:text-blue-500 transition-colors">
          Shipper
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/docs" className={`transition-colors ${active === "docs" ? "text-blue-500 font-medium" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground"}`}>
            Docs
          </Link>
          <Link href="/specs" className={`transition-colors ${active === "specs" ? "text-blue-500 font-medium" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground"}`}>
            Specs
          </Link>
          <a href="https://github.com/shippercli/cli" target="_blank" rel="noopener" className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors">
            GitHub
          </a>
          <Link href="/docs" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md font-medium transition-colors text-sm">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}