import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Land Development & Land Clearance Services in Nashik, Maharashtra — HB Realty India",
  description:
    "HB Realty India provides expert land development and land clearance services in Nashik and across Maharashtra. From title verification, zoning compliance, and legal clearances to layout planning, infrastructure design, utility setup, landscaping, and final delivery — we handle it all.",
  keywords: [
    "land development in Nashik",
    "land clearance in Nashik",
    "land development Maharashtra",
    "land clearance services Maharashtra",
    "land title clearance Nashik",
    "industrial plot development",
    "land legal approvals Maharashtra",
    "plot layout design Nashik",
    "commercial land development",
    "real estate compliance Nashik",
    "land acquisition Maharashtra",
    "land development company Nashik",
    "agricultural land clearance Nashik",
    "NA clearance Nashik",
  ],
  alternates: { canonical: "/land-development" },
  openGraph: {
    title: "Land Development & Land Clearance in Nashik — HB Realty India",
    description: "End-to-end land development, land clearance, site planning, legal clearances, utilities, and landscaping services in Nashik, Maharashtra.",
    url: "https://hbrealtyindia.com/land-development",
  },
};

export default function LandDevelopmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
