// Domaine principal (canonical, sitemap, données structurées).
// Doit correspondre au domaine "primaire" configuré dans Vercel.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rentdriver.fr").replace(/\/$/, "");
