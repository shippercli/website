/**
 * Keep this function self-contained: it also runs before hydration as a script.
 * @param {Window} browser
 * @returns {"light" | "dark"}
 */
export function initializeTheme(browser) {
  let saved;
  try {
    saved = browser.localStorage.getItem("shipper-theme");
  } catch {
    // Storage can be blocked while the rest of the page remains usable.
  }

  let systemDark = false;
  if (saved !== "light" && saved !== "dark") {
    try {
      systemDark = browser.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      // Use the default light theme when system preferences are unavailable.
    }
  }

  const theme = saved === "light" || saved === "dark"
    ? saved
    : systemDark ? "dark" : "light";
  browser.document.documentElement.dataset.theme = theme;
  browser.document.documentElement.classList.toggle("dark", theme === "dark");
  return theme;
}

/** @param {Window} browser @param {"light" | "dark"} theme */
export function persistTheme(browser, theme) {
  try {
    browser.localStorage.setItem("shipper-theme", theme);
  } catch {
    // The selected theme still applies for this page when persistence fails.
  }
}

export const themeInitializationScript = `(${initializeTheme.toString()})(window);`;
