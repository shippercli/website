/** @param {Window} browser @param {() => void} advance */
export function scheduleProviderRotation(browser, advance) {
  let preference;
  try {
    preference = browser.matchMedia("(prefers-reduced-motion: reduce)");
    if (!preference || typeof preference.matches !== "boolean") return () => {};
  } catch {
    // Keep the manually controlled example usable when preferences are unavailable.
    return () => {};
  }

  let active = true;
  let interval;
  const stop = () => {
    if (interval !== undefined) browser.clearInterval(interval);
    interval = undefined;
  };
  const tick = () => {
    if (active && !preference.matches) advance();
  };
  const update = () => {
    stop();
    if (active && !preference.matches) interval = browser.setInterval(tick, 2000);
  };
  let unsubscribe = () => {};
  let subscribed = false;
  try {
    if (typeof preference.addEventListener === "function" && typeof preference.removeEventListener === "function") {
      unsubscribe = () => preference.removeEventListener("change", update);
      preference.addEventListener("change", update);
      subscribed = true;
    } else if (typeof preference.addListener === "function" && typeof preference.removeListener === "function") {
      unsubscribe = () => preference.removeListener(update);
      preference.addListener(update);
      subscribed = true;
    }
  } catch {
    // Fall back to reading the preference on each tick when subscription is denied.
  }
  if (subscribed) update();
  else interval = browser.setInterval(tick, 2000);

  return () => {
    active = false;
    stop();
    try { unsubscribe(); } catch { /* Timer remains stopped if browser cleanup is denied. */ }
  };
}
