# Long-Term Memory: HB Realty India Workspace

## Core Brand & Design System
- **Colors**:
  - Deep Blue: `#062B4A` (used for headers, primary CTAs, main interactive cards, active sections)
  - Gold: `#A98B55` (used for highlight tags, numbers, typography accents)
  - Light Ivory: `#FAF9F6` (used for informational panels, stats grid, and alternating body sections)
- **Navbar Rule**:
  - The top navbar uses a white glass/blur effect. Because of this, the first section on every page (Hero or Header) **must** use a solid dark-blue (`bg-[#062B4A]`) background or a dark gradient overlay. If the first section is white, the white navbar text/icons lose contrast and become invisible.

## Key Sub-Routes & Landing Pages
- `/warehousing-2`: End-to-end Warehousing Development landing page detailing construction, leasing, cold storage, and logistics.
- `/land-development`: Dedicated Land & Development services landing page detailing plot acquisition, site planning, utilities, and client testimonials.
- `/services`: Overview page of all 6 services stacked vertically in an alternating dark-blue and light ivory layout.

## Map Conventions
- **Map Style**: Street-level map view (normal realistic street name labels) instead of dark-mode/inverted maps.
- **Provider**: CartoDB Voyager (`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`) with Leaflet CSS background color set to `#f4f4f5` to avoid dark flashes.
- **Badges**: Properties on the map popups check status and render a bright red "SOLD" tag when marked as sold.

## Database & API Integration
- **Persistent Data**: `/data/properties.json` houses the listings.
- **Admin Actions**: Available at `/admin` (Dashboard). Implements property deletion and availability toggling via PATCH/DELETE REST calls under `/api/properties/[id]`.
