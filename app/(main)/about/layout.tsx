import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About HB Realty India — Land Development Experts in Nashik, Maharashtra",
  description:
    "Learn about HB Realty India, Nashik's trusted land development company led by Mr. Hitesh Bafana. With decades of experience in warehousing, industrial plot development, and real estate legal consultancy across Maharashtra, we deliver transparent, compliant, and future-ready infrastructure solutions.",
  keywords: [
    "about HB Realty India",
    "land development experts Nashik",
    "Hitesh Bafana",
    "real estate company Nashik",
    "warehousing company Maharashtra",
    "industrial development Nashik",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About HB Realty India — Land Development Experts in Nashik",
    description: "Decades of experience in land development, warehousing, and real estate legal consultancy in Nashik, Maharashtra.",
    url: "https://hbrealtyindia.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
