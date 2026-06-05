import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Land & Development Services in Maharashtra — HB Realty India",
  description:
    "HB Realty India specializes in turning land into high-value assets across Maharashtra. We manage title verification, zoning compliance, layout planning, infrastructure design, utility setup, landscaping, and final delivery.",
  keywords: [
    "land development Maharashtra",
    "land development Nashik",
    "industrial plot development",
    "land legal approvals Maharashtra",
    "plot layout design Nashik",
    "commercial land development",
    "real estate compliance Nashik",
    "land acquisition Maharashtra",
    "Manoj Bafana legal advisory",
  ],
  alternates: { canonical: "/land-development" },
  openGraph: {
    title: "Land & Development Services in Maharashtra — HB Realty India",
    description: "End-to-end strategic land development, site planning, utilities, landscaping, and legal clearance services.",
    url: "https://hbrealtyindia.com/land-development",
  },
};

export default function LandDevelopmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
