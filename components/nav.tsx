"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./nav.css";

export default function Nav({ active }: { active?: "docs" | "specs" | "providers" }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <Link href="/">
          <Image
            src="https://raw.githubusercontent.com/shippercli/assets/main/logo-transparent.svg"
            alt="Shipper"
            width={28}
            height={28}
            className="h-7 w-auto"
          />
        </Link>

        <div className="hidden sm:flex items-center gap-6 text-sm">
          <Link href="/docs" style={{ color: active === "docs" ? "var(--accent)" : "var(--text-secondary)" }}>Docs</Link>
          <Link href="/providers" style={{ color: active === "providers" ? "var(--accent)" : "var(--text-secondary)" }}>Providers</Link>
          <Link href="/specs" style={{ color: active === "specs" ? "var(--accent)" : "var(--text-secondary)" }}>Specs</Link>
          <Link href="/docs" className="nav-button">Get Started</Link>
        </div>

        <button
          className="sm:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {open ? (
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            ) : (
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="sm:hidden border-t" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
            <Link href="/docs" style={{ color: "var(--text-secondary)" }}>Docs</Link>
            <Link href="/specs" style={{ color: "var(--text-secondary)" }}>Specs</Link>
            <Link href="/docs" className="nav-button text-center">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}