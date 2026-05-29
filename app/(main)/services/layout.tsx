import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warehousing & Land Development Services in Nashik — HB Realty India",
  description:
    "Explore our comprehensive services: Grade-A warehouse construction in Nashik, industrial land development, legal liaisoning, warehouse lease advisory, cold storage solutions, and land consultancy across Maharashtra. Trusted by businesses for end-to-end real estate execution.",
  keywords: [
    "warehousing services Nashik",
    "land development services Nashik",
    "warehouse construction Nashik",
    "warehouse lease advisory",
    "cold storage Nashik",
    "land legal services Nashik",
    "industrial land development Maharashtra",
    "logistics park development Maharashtra",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Warehousing & Land Development in Nashik",
    description: "Grade-A warehousing, land development, legal services, and lease advisory across Nashik and Maharashtra.",
    url: "https://hbrealtyindia.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
