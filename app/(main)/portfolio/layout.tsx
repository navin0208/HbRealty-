import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects — Industrial & Residential Developments in Nashik",
  description:
    "Explore HB Realty India's portfolio of landmark projects in Nashik and Maharashtra — from Grade-A warehousing at Osiyan MIDC to wellness communities like Vinyasa in Igatpuri. View our plotted developments, industrial parks, and premium row house projects across Nashik, Sinnar, and Dindori.",
  keywords: [
    "real estate projects Nashik",
    "industrial development Nashik",
    "Osiyan warehousing Nashik",
    "plotted development Sinnar",
    "land projects Dindori",
    "Vinyasa Igatpuri",
    "row houses Nashik",
    "warehouse projects Maharashtra",
  ],
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio — Industrial & Residential Projects in Nashik",
    description: "Landmark warehousing, land development, and residential projects by HB Realty India across Nashik and Maharashtra.",
    url: "https://hbrealtyindia.com/portfolio",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
