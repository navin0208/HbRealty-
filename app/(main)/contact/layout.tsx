import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact HB Realty India — Warehousing & Land Development Consultants in Nashik",
  description:
    "Get in touch with HB Realty India for warehousing solutions, land development, industrial plots, and real estate legal services in Nashik, Maharashtra. Visit our office at Samrat Qubism, Gangapur Road, Nashik or call +91 91758 48355.",
  keywords: [
    "contact HB Realty",
    "warehousing consultants Nashik",
    "land development consultants Nashik",
    "real estate consultant Nashik",
    "HB Realty office Nashik",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact HB Realty India — Nashik Office",
    description: "Reach out for warehousing, land development, and real estate consultancy services in Nashik, Maharashtra.",
    url: "https://hbrealtyindia.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
