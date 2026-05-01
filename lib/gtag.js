export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export function pageview(url) {
  if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("config", GA_ID, {
    page_path: url
  });
}
