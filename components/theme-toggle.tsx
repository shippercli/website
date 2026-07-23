"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("shipper-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme: Theme = savedTheme === "dark" || savedTheme === "light"
      ? (savedTheme as Theme)
      : systemDark
        ? "dark"
        : "light";

    applyTheme(initialTheme);
    setTheme(initialTheme);
    setReady(true);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem("shipper-theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={ready && theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface-glass)",
        color: "var(--foreground)",
      }}
    >
      {ready && theme === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3V5.5M12 18.5V21M4.93 4.93L6.7 6.7M17.3 17.3L19.07 19.07M3 12H5.5M18.5 12H21M4.93 19.07L6.7 17.3M17.3 6.7L19.07 4.93M16 12A4 4 0 1 1 8 12A4 4 0 0 1 16 12Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3C11.08 3.53 11 4.09 11 4.67C11 8.72 14.28 12 18.33 12C19.46 12 20.53 11.74 21.5 11.27C21.5 11.78 21.33 12.3 21 12.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
