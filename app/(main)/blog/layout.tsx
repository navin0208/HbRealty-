import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Land Development & Warehousing Insights from Nashik",
  description:
    "Read industry insights on warehousing, land development, and real estate in Nashik and Maharashtra. Expert articles on warehouse construction, cold storage, logistics parks, and property investment from HB Realty India.",
  keywords: [
    "warehousing blog Nashik",
    "land development insights Maharashtra",
    "real estate blog Nashik",
    "warehouse construction tips",
    "industrial development news",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Industry Insights from HB Realty India",
    description: "Expert articles on warehousing, land development, and real estate in Nashik and Maharashtra.",
    url: "https://hbrealtyindia.com/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
