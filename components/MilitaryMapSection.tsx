"use client";

import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Marker = {
  label: string;
  description?: string;
  latitude: number;
  longitude: number;
  color?: string;
};

type CountryConfig = {
  code: string;
  name?: string;
  enabled?: boolean;
};

type HeaderConfig = {
  show?: boolean;
  title?: string;
  subtitle?: string;
  titleColor?: string;
  subtitleColor?: string;
};

type MapStyleConfig = {
  oceanColor?: string;
  landFill?: string;
  landStroke?: string;
  strokeWidth?: number;
  hoverColor?: string;
  disabledColor?: string;
};

type TooltipConfig = {
  show?: boolean;
  background?: string;
  textColor?: string;
  borderColor?: string;
};

type GridConfig = {
  show?: boolean;
  color?: string;
  opacity?: number;
};

type LayoutConfig = {
  cornerRadius?: number;
  padding?: number;
  showBorder?: boolean;
  borderColor?: string;
};

type ViewportConfig = {
  minLongitude: number;
  maxLongitude: number;
  minLatitude: number;
  maxLatitude: number;
  padding?: number;
};

export type MilitaryMapSectionProps = {
  className?: string;
  style?: CSSProperties;
  markers?: Marker[];
  countries?: CountryConfig[];
  header?: HeaderConfig;
  mapStyle?: MapStyleConfig;
  tooltip?: TooltipConfig;
  grid?: GridConfig;
  layout?: LayoutConfig;
  viewport?: ViewportConfig;
};

type Feature = {
  id: string;
  type: "Polygon" | "MultiPolygon";
  coords: number[][][] | number[][][][];
};

type CountryPath = {
  id: string;
  name: string;
  pathD: string;
  cx: number;
  cy: number;
};

type HoveredMarker = {
  screenX: number;
  screenY: number;
  label: string;
  description?: string;
} | null;

type HoveredCountry = {
  screenX: number;
  screenY: number;
  name: string;
} | null;

type Topology = {
  transform?: {
    scale: [number, number];
    translate: [number, number];
  };
  arcs: number[][][];
  objects: {
    countries?: {
      geometries: Array<{
        id?: string | number;
        type: "Polygon" | "MultiPolygon";
        arcs: number[][] | number[][][];
      }>;
    };
  };
};

const COUNTRY_DATA: Record<string, [string, string]> = {
  "004": ["AFG", "Afghanistan"],
  "008": ["ALB", "Albania"],
  "010": ["ATA", "Antarctica"],
  "012": ["DZA", "Algeria"],
  "024": ["AGO", "Angola"],
  "031": ["AZE", "Azerbaijan"],
  "032": ["ARG", "Argentina"],
  "036": ["AUS", "Australia"],
  "040": ["AUT", "Austria"],
  "050": ["BGD", "Bangladesh"],
  "051": ["ARM", "Armenia"],
  "056": ["BEL", "Belgium"],
  "064": ["BTN", "Bhutan"],
  "068": ["BOL", "Bolivia"],
  "070": ["BIH", "Bosnia and Herz."],
  "072": ["BWA", "Botswana"],
  "076": ["BRA", "Brazil"],
  "084": ["BLZ", "Belize"],
  "090": ["SLB", "Solomon Islands"],
  "096": ["BRN", "Brunei"],
  "100": ["BGR", "Bulgaria"],
  "104": ["MMR", "Myanmar"],
  "108": ["BDI", "Burundi"],
  "112": ["BLR", "Belarus"],
  "116": ["KHM", "Cambodia"],
  "120": ["CMR", "Cameroon"],
  "124": ["CAN", "Canada"],
  "140": ["CAF", "Central African Rep."],
  "144": ["LKA", "Sri Lanka"],
  "148": ["TCD", "Chad"],
  "152": ["CHL", "Chile"],
  "156": ["CHN", "China"],
  "158": ["TWN", "Taiwan"],
  "170": ["COL", "Colombia"],
  "174": ["COM", "Comoros"],
  "178": ["COG", "Congo"],
  "180": ["COD", "Dem. Rep. Congo"],
  "188": ["CRI", "Costa Rica"],
  "191": ["HRV", "Croatia"],
  "192": ["CUB", "Cuba"],
  "196": ["CYP", "Cyprus"],
  "203": ["CZE", "Czechia"],
  "204": ["BEN", "Benin"],
  "208": ["DNK", "Denmark"],
  "214": ["DOM", "Dominican Rep."],
  "218": ["ECU", "Ecuador"],
  "222": ["SLV", "El Salvador"],
  "226": ["GNQ", "Eq. Guinea"],
  "231": ["ETH", "Ethiopia"],
  "232": ["ERI", "Eritrea"],
  "233": ["EST", "Estonia"],
  "242": ["FJI", "Fiji"],
  "246": ["FIN", "Finland"],
  "250": ["FRA", "France"],
  "262": ["DJI", "Djibouti"],
  "266": ["GAB", "Gabon"],
  "268": ["GEO", "Georgia"],
  "270": ["GMB", "Gambia"],
  "275": ["PSE", "Palestine"],
  "276": ["DEU", "Germany"],
  "288": ["GHA", "Ghana"],
  "300": ["GRC", "Greece"],
  "304": ["GRL", "Greenland"],
  "320": ["GTM", "Guatemala"],
  "324": ["GIN", "Guinea"],
  "328": ["GUY", "Guyana"],
  "332": ["HTI", "Haiti"],
  "340": ["HND", "Honduras"],
  "348": ["HUN", "Hungary"],
  "352": ["ISL", "Iceland"],
  "356": ["IND", "India"],
  "360": ["IDN", "Indonesia"],
  "364": ["IRN", "Iran"],
  "368": ["IRQ", "Iraq"],
  "372": ["IRL", "Ireland"],
  "376": ["ISR", "Israel"],
  "380": ["ITA", "Italy"],
  "384": ["CIV", "Cote d'Ivoire"],
  "388": ["JAM", "Jamaica"],
  "392": ["JPN", "Japan"],
  "398": ["KAZ", "Kazakhstan"],
  "400": ["JOR", "Jordan"],
  "404": ["KEN", "Kenya"],
  "408": ["PRK", "North Korea"],
  "410": ["KOR", "South Korea"],
  "414": ["KWT", "Kuwait"],
  "417": ["KGZ", "Kyrgyzstan"],
  "418": ["LAO", "Laos"],
  "422": ["LBN", "Lebanon"],
  "426": ["LSO", "Lesotho"],
  "428": ["LVA", "Latvia"],
  "430": ["LBR", "Liberia"],
  "434": ["LBY", "Libya"],
  "440": ["LTU", "Lithuania"],
  "442": ["LUX", "Luxembourg"],
  "450": ["MDG", "Madagascar"],
  "454": ["MWI", "Malawi"],
  "458": ["MYS", "Malaysia"],
  "466": ["MLI", "Mali"],
  "478": ["MRT", "Mauritania"],
  "484": ["MEX", "Mexico"],
  "496": ["MNG", "Mongolia"],
  "498": ["MDA", "Moldova"],
  "499": ["MNE", "Montenegro"],
  "504": ["MAR", "Morocco"],
  "508": ["MOZ", "Mozambique"],
  "512": ["OMN", "Oman"],
  "516": ["NAM", "Namibia"],
  "524": ["NPL", "Nepal"],
  "528": ["NLD", "Netherlands"],
  "540": ["NCL", "New Caledonia"],
  "548": ["VUT", "Vanuatu"],
  "554": ["NZL", "New Zealand"],
  "558": ["NIC", "Nicaragua"],
  "562": ["NER", "Niger"],
  "566": ["NGA", "Nigeria"],
  "578": ["NOR", "Norway"],
  "586": ["PAK", "Pakistan"],
  "591": ["PAN", "Panama"],
  "598": ["PNG", "Papua New Guinea"],
  "600": ["PRY", "Paraguay"],
  "604": ["PER", "Peru"],
  "608": ["PHL", "Philippines"],
  "616": ["POL", "Poland"],
  "620": ["PRT", "Portugal"],
  "624": ["GNB", "Guinea-Bissau"],
  "626": ["TLS", "Timor-Leste"],
  "634": ["QAT", "Qatar"],
  "642": ["ROU", "Romania"],
  "643": ["RUS", "Russia"],
  "646": ["RWA", "Rwanda"],
  "682": ["SAU", "Saudi Arabia"],
  "686": ["SEN", "Senegal"],
  "688": ["SRB", "Serbia"],
  "694": ["SLE", "Sierra Leone"],
  "702": ["SGP", "Singapore"],
  "703": ["SVK", "Slovakia"],
  "704": ["VNM", "Vietnam"],
  "705": ["SVN", "Slovenia"],
  "706": ["SOM", "Somalia"],
  "710": ["ZAF", "South Africa"],
  "716": ["ZWE", "Zimbabwe"],
  "724": ["ESP", "Spain"],
  "728": ["SSD", "South Sudan"],
  "729": ["SDN", "Sudan"],
  "740": ["SUR", "Suriname"],
  "748": ["SWZ", "Eswatini"],
  "752": ["SWE", "Sweden"],
  "756": ["CHE", "Switzerland"],
  "760": ["SYR", "Syria"],
  "762": ["TJK", "Tajikistan"],
  "764": ["THA", "Thailand"],
  "768": ["TGO", "Togo"],
  "780": ["TTO", "Trinidad and Tobago"],
  "784": ["ARE", "UAE"],
  "788": ["TUN", "Tunisia"],
  "792": ["TUR", "Turkey"],
  "795": ["TKM", "Turkmenistan"],
  "800": ["UGA", "Uganda"],
  "804": ["UKR", "Ukraine"],
  "807": ["MKD", "North Macedonia"],
  "818": ["EGY", "Egypt"],
  "826": ["GBR", "United Kingdom"],
  "834": ["TZA", "Tanzania"],
  "840": ["USA", "United States"],
  "854": ["BFA", "Burkina Faso"],
  "858": ["URY", "Uruguay"],
  "860": ["UZB", "Uzbekistan"],
  "862": ["VEN", "Venezuela"],
  "887": ["YEM", "Yemen"],
  "894": ["ZMB", "Zambia"],
  "-99": ["XKX", "Kosovo"],
};

const DEFAULT_MARKERS: Marker[] = [
  {
    label: "Sarajevo",
    description: "Relay node - Active",
    latitude: 43.8563,
    longitude: 18.4131,
    color: "#E53E3E",
  },
  {
    label: "Berlin",
    description: "Central hub - Online",
    latitude: 52.52,
    longitude: 13.405,
    color: "#E53E3E",
  },
  {
    label: "Tokyo",
    description: "Command post - Standby",
    latitude: 35.6762,
    longitude: 139.6503,
    color: "#E53E3E",
  },
];

const DEFAULT_COUNTRIES: CountryConfig[] = [
  { code: "USA", name: "United States", enabled: true },
  { code: "CAN", name: "Canada", enabled: true },
  { code: "BRA", name: "Brazil", enabled: true },
  { code: "GBR", name: "United Kingdom", enabled: true },
  { code: "FRA", name: "France", enabled: true },
  { code: "DEU", name: "Germany", enabled: true },
  { code: "UKR", name: "Ukraine", enabled: true },
  { code: "RUS", name: "Russia", enabled: true },
  { code: "TUR", name: "Turkey", enabled: true },
  { code: "IND", name: "India", enabled: true },
  { code: "CHN", name: "China", enabled: true },
  { code: "JPN", name: "Japan", enabled: true },
  { code: "AUS", name: "Australia", enabled: true },
  { code: "ZAF", name: "South Africa", enabled: true },
];

const DEFAULT_HEADER: Required<HeaderConfig> = {
  show: true,
  title: "Global Tactical Overview",
  subtitle: "Mercator Projection",
  titleColor: "#d8ddd9",
  subtitleColor: "#93a098",
};

const DEFAULT_MAP_STYLE: Required<MapStyleConfig> = {
  oceanColor: "#111417",
  landFill: "#23282d",
  landStroke: "#4d555d",
  strokeWidth: 0.5,
  hoverColor: "#5f686f",
  disabledColor: "#1a1e22",
};

const DEFAULT_TOOLTIP: Required<TooltipConfig> = {
  show: true,
  background: "rgba(18, 20, 23, 0.92)",
  textColor: "#e7ece9",
  borderColor: "rgba(140, 150, 145, 0.32)",
};

const DEFAULT_GRID: Required<GridConfig> = {
  show: true,
  color: "#5b636a",
  opacity: 0.12,
};

const DEFAULT_LAYOUT: Required<LayoutConfig> = {
  cornerRadius: 20,
  padding: 12,
  showBorder: true,
  borderColor: "rgba(120, 128, 126, 0.24)",
};

const DEFAULT_VIEWPORT_PADDING = 24;

const DATA_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const D2R = Math.PI / 180;
const MAX_LATITUDE = 85.05113;

function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

function mercatorProject(
  lng: number,
  lat: number,
  scale: number,
  offsetX: number,
  offsetY: number,
) {
  const projectedLat = clamp(lat, -MAX_LATITUDE, MAX_LATITUDE) * D2R;
  return [
    scale * lng * D2R + offsetX,
    -scale * Math.log(Math.tan(Math.PI / 4 + projectedLat / 2)) + offsetY,
  ] as const;
}

function getProjection(width: number, height: number) {
  const scale = width / (2 * Math.PI);
  const offsetX = width / 2;
  const yNorth = -scale * Math.log(Math.tan(Math.PI / 4 + (72 * D2R) / 2));
  const ySouth = -scale * Math.log(Math.tan(Math.PI / 4 + (-56 * D2R) / 2));
  return [scale, offsetX, height / 2 - (yNorth + ySouth) / 2] as const;
}

function decodeArcs(topology: Topology) {
  const transform = topology.transform;
  if (!transform) return topology.arcs;

  const [scaleX, scaleY] = transform.scale;
  const [translateX, translateY] = transform.translate;

  return topology.arcs.map((arc) => {
    let x = 0;
    let y = 0;

    return arc.map((point) => {
      x += point[0];
      y += point[1];
      return [x * scaleX + translateX, y * scaleY + translateY];
    });
  });
}

function resolveRing(indices: number[], arcs: number[][][]) {
  const output: number[][] = [];

  for (const index of indices) {
    const arc = index >= 0 ? arcs[index] : arcs[~index].slice().reverse();
    for (let i = output.length > 0 ? 1 : 0; i < arc.length; i += 1) {
      output.push(arc[i]);
    }
  }

  return output;
}

function extractFeatures(topology: Topology): Feature[] {
  const arcs = decodeArcs(topology);
  const geometries = topology.objects.countries?.geometries;

  if (!geometries) return [];

  return geometries.map((geometry) => {
    let coords: Feature["coords"] = [];

    if (geometry.type === "Polygon") {
      coords = (geometry.arcs as number[][]).map((ring) => resolveRing(ring, arcs));
    } else {
      coords = (geometry.arcs as number[][][]).map((polygon) =>
        polygon.map((ring) => resolveRing(ring, arcs)),
      );
    }

    return {
      id: String(geometry.id ?? ""),
      type: geometry.type,
      coords,
    };
  });
}

function ringToPath(
  ring: number[][],
  scale: number,
  offsetX: number,
  offsetY: number,
  width: number,
) {
  if (ring.length < 3) return "";

  const points = ring.map((point) =>
    mercatorProject(point[0], point[1], scale, offsetX, offsetY),
  );
  const threshold = width / 3;
  const segments: Array<ReadonlyArray<readonly [number, number]>> = [];
  let current: Array<readonly [number, number]> = [points[0]];

  for (let i = 1; i < points.length; i += 1) {
    if (Math.abs(points[i][0] - points[i - 1][0]) > threshold) {
      if (current.length >= 2) segments.push(current);
      current = [points[i]];
    } else {
      current.push(points[i]);
    }
  }

  if (current.length >= 2) segments.push(current);
  if (segments.length === 0) return "";

  if (segments.length === 1 && segments[0].length === points.length) {
    return (
      segments[0]
        .map((point, index) =>
          `${index === 0 ? "M" : "L"}${point[0].toFixed(1)},${point[1].toFixed(1)}`,
        )
        .join("") + "Z"
    );
  }

  return segments
    .map((segment) =>
      segment
        .map((point, index) =>
          `${index === 0 ? "M" : "L"}${point[0].toFixed(1)},${point[1].toFixed(1)}`,
        )
        .join(""),
    )
    .join("");
}

function buildPath(
  type: Feature["type"],
  coords: Feature["coords"],
  scale: number,
  offsetX: number,
  offsetY: number,
  width: number,
) {
  if (type === "Polygon") {
    return (coords as number[][][]).map((ring) => ringToPath(ring, scale, offsetX, offsetY, width)).join("");
  }

  return (coords as number[][][][])
    .map((polygon) =>
      polygon.map((ring) => ringToPath(ring, scale, offsetX, offsetY, width)).join(""),
    )
    .join("");
}

function getCentroid(
  type: Feature["type"],
  coords: Feature["coords"],
  scale: number,
  offsetX: number,
  offsetY: number,
  width: number,
) {
  const threshold = width / 3;
  let bestRing: number[][] | null = null;
  let bestSize = 0;

  const inspectRing = (ring: number[][]) => {
    const points = ring.map((point) =>
      mercatorProject(point[0], point[1], scale, offsetX, offsetY),
    );

    for (let i = 1; i < points.length; i += 1) {
      if (Math.abs(points[i][0] - points[i - 1][0]) > threshold) return;
    }

    if (ring.length > bestSize) {
      bestSize = ring.length;
      bestRing = ring;
    }
  };

  if (type === "Polygon") {
    (coords as number[][][]).forEach(inspectRing);
  } else {
    (coords as number[][][][]).forEach((polygon) => polygon.forEach(inspectRing));
  }

  const best = bestRing as number[][] | null;
  if (!best || best.length === 0) {
    return [-9999, -9999] as const;
  }

  let sumX = 0;
  let sumY = 0;

  for (const point of best) {
    const [x, y] = mercatorProject(point[0], point[1], scale, offsetX, offsetY);
    sumX += x;
    sumY += y;
  }

  return [sumX / best.length, sumY / best.length] as const;
}

function buildGraticule(
  scale: number,
  offsetX: number,
  offsetY: number,
  width: number,
  height: number,
) {
  const parts: string[] = [];

  for (let lat = -60; lat <= 60; lat += 30) {
    const segments: string[] = [];
    for (let lng = -180; lng <= 180; lng += 3) {
      const [x, y] = mercatorProject(lng, lat, scale, offsetX, offsetY);
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        segments.push(`${segments.length === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
      }
    }
    if (segments.length > 1) parts.push(segments.join(""));
  }

  for (let lng = -180; lng <= 180; lng += 30) {
    const segments: string[] = [];
    for (let lat = -80; lat <= 80; lat += 2) {
      const [x, y] = mercatorProject(lng, lat, scale, offsetX, offsetY);
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        segments.push(`${segments.length === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
      }
    }
    if (segments.length > 1) parts.push(segments.join(""));
  }

  return parts.join(" ");
}

function withOpacity(color: string, opacity: number) {
  if (color.startsWith("rgba")) return color;
  if (color.startsWith("rgb(")) {
    return color.replace("rgb(", "rgba(").replace(")", `,${opacity})`);
  }

  const hex = color.replace("#", "");
  if (hex.length !== 3 && hex.length !== 6) return color;

  const normalized = hex.length === 3 ? hex.split("").map((char) => char + char).join("") : hex;
  return `rgba(${parseInt(normalized.slice(0, 2), 16)},${parseInt(normalized.slice(2, 4), 16)},${parseInt(normalized.slice(4, 6), 16)},${opacity})`;
}

function getViewportTransform(
  viewport: ViewportConfig | undefined,
  width: number,
  height: number,
  scale: number,
  offsetX: number,
  offsetY: number,
) {
  if (!viewport) {
    return { scale: 1, translateX: 0, translateY: 0 };
  }

  const padding = viewport.padding ?? DEFAULT_VIEWPORT_PADDING;
  const corners = [
    mercatorProject(viewport.minLongitude, viewport.maxLatitude, scale, offsetX, offsetY),
    mercatorProject(viewport.maxLongitude, viewport.maxLatitude, scale, offsetX, offsetY),
    mercatorProject(viewport.minLongitude, viewport.minLatitude, scale, offsetX, offsetY),
    mercatorProject(viewport.maxLongitude, viewport.minLatitude, scale, offsetX, offsetY),
  ];

  const xs = corners.map(([x]) => x);
  const ys = corners.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const boundsWidth = Math.max(1, maxX - minX);
  const boundsHeight = Math.max(1, maxY - minY);
  const availableWidth = Math.max(1, width - padding * 2);
  const availableHeight = Math.max(1, height - padding * 2);
  const zoom = Math.min(availableWidth / boundsWidth, availableHeight / boundsHeight);

  return {
    scale: zoom,
    translateX: padding - minX * zoom + (availableWidth - boundsWidth * zoom) / 2,
    translateY: padding - minY * zoom + (availableHeight - boundsHeight * zoom) / 2,
  };
}

export default function MilitaryMapSection({
  className,
  style,
  markers = DEFAULT_MARKERS,
  countries = DEFAULT_COUNTRIES,
  header: headerProp,
  mapStyle: mapStyleProp,
  tooltip: tooltipProp,
  grid: gridProp,
  layout: layoutProp,
  viewport,
}: MilitaryMapSectionProps) {
  const header = { ...DEFAULT_HEADER, ...headerProp };
  const mapStyle = { ...DEFAULT_MAP_STYLE, ...mapStyleProp };
  const tooltip = { ...DEFAULT_TOOLTIP, ...tooltipProp };
  const grid = { ...DEFAULT_GRID, ...gridProp };
  const layout = { ...DEFAULT_LAYOUT, ...layoutProp };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const uniqueId = useRef(Math.random().toString(36).slice(2, 6)).current;

  const [dimensions, setDimensions] = useState({ w: 900, h: 500 });
  const [features, setFeatures] = useState<Feature[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<HoveredMarker>(null);
  const [hoveredCountry, setHoveredCountry] = useState<HoveredCountry>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect && rect.width > 0 && rect.height > 0) {
        setDimensions({ w: rect.width, h: rect.height });
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch(DATA_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch world map data");
        }
        return response.json() as Promise<Topology>;
      })
      .then((topology) => {
        if (!cancelled) {
          setFeatures(extractFeatures(topology));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const { w: width, h: height } = dimensions;
  const [scale, offsetX, offsetY] = useMemo(() => getProjection(width, height), [width, height]);

  const countryPaths = useMemo<CountryPath[]>(() => {
    if (!features) return [];

    const output: CountryPath[] = [];

    for (const feature of features) {
      const code = String(feature.id).padStart(3, "0");
      const countryEntry = COUNTRY_DATA[code];
      const alpha3 = countryEntry ? countryEntry[0] : code;
      const name = countryEntry ? countryEntry[1] : alpha3;

      if (alpha3 === "ATA") continue;

      const pathD = buildPath(feature.type, feature.coords, scale, offsetX, offsetY, width);
      if (!pathD) continue;

      const [cx, cy] = getCentroid(feature.type, feature.coords, scale, offsetX, offsetY, width);
      output.push({ id: alpha3, name, pathD, cx, cy });
    }

    return output;
  }, [features, offsetX, offsetY, scale, width]);

  const graticule = useMemo(
    () => buildGraticule(scale, offsetX, offsetY, width, height),
    [height, offsetX, offsetY, scale, width],
  );

  const viewportTransform = useMemo(
    () => getViewportTransform(viewport, width, height, scale, offsetX, offsetY),
    [viewport, width, height, scale, offsetX, offsetY],
  );

  const countryConfigMap = useMemo(() => {
    const map = new Map<string, CountryConfig>();
    countries.forEach((country) => map.set(country.code, country));
    return map;
  }, [countries]);

  const getMousePosition = useCallback((event: ReactMouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }, []);

  const loading = !features && !hasError;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 420,
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        borderRadius: layout.cornerRadius,
        padding: layout.padding,
        background:
          "radial-gradient(ellipse at 50% 40%, rgba(38,40,44,0.8) 0%, rgba(20,21,24,1) 55%, rgba(12,13,15,1) 100%)",
        border: layout.showBorder ? `1px solid ${layout.borderColor}` : "none",
        fontFamily:
          '"SF Mono", ui-monospace, SFMono-Regular, "Cascadia Mono", Menlo, Monaco, Consolas, monospace',
        color: header.titleColor,
        ...style,
      }}
    >
      <style>{`
        .military-map-country {
          transition: fill 140ms ease, filter 140ms ease;
        }

        .military-map-country:hover {
          filter: brightness(1.15);
        }
      `}</style>

      {header.show ? (
        <div
          style={{
            position: "absolute",
            top: layout.padding + 10,
            left: layout.padding + 14,
            zIndex: 5,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: header.titleColor,
            }}
          >
            {header.title}
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: header.subtitleColor,
              opacity: 0.85,
            }}
          >
            {header.subtitle}
          </div>
        </div>
      ) : null}

      {loading ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: withOpacity(header.titleColor, 0.4),
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Loading map data...
        </div>
      ) : null}

      {hasError ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 6,
            color: withOpacity("#ff6b6b", 0.7),
            fontSize: 11,
          }}
        >
          <span>Map data unavailable</span>
          <span style={{ fontSize: 9, opacity: 0.6 }}>
            Check network access to cdn.jsdelivr.net
          </span>
        </div>
      ) : null}

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          display: "block",
          borderRadius: Math.max(6, layout.cornerRadius - layout.padding),
          background: mapStyle.oceanColor,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <filter id={`glow-${uniqueId}`} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`land-shadow-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.22 0"
            />
          </filter>

          <linearGradient id={`ocean-overlay-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={withOpacity("#2c3137", 0.25)} />
            <stop offset="50%" stopColor={withOpacity("#171a1e", 0.06)} />
            <stop offset="100%" stopColor={withOpacity("#0f1114", 0.2)} />
          </linearGradient>
        </defs>

        <rect width={width} height={height} fill={mapStyle.oceanColor} />
        <rect width={width} height={height} fill={`url(#ocean-overlay-${uniqueId})`} />

        <g
          transform={`translate(${viewportTransform.translateX.toFixed(2)} ${viewportTransform.translateY.toFixed(2)}) scale(${viewportTransform.scale.toFixed(4)})`}
        >
          {grid.show && graticule ? (
            <path
              d={graticule}
              fill="none"
              stroke={grid.color}
              strokeWidth={0.5}
              strokeOpacity={grid.opacity}
              vectorEffect="non-scaling-stroke"
            />
          ) : null}

          {countryPaths.length > 0 ? (
            <g opacity={0.18} filter={`url(#land-shadow-${uniqueId})`}>
              {countryPaths.map((country) => (
                <path key={`glow-${country.id}`} d={country.pathD} fill={mapStyle.landFill} stroke="none" />
              ))}
            </g>
          ) : null}

          {countryPaths.map((country) => {
            const config = countryConfigMap.get(country.id);
            const enabled = config ? config.enabled !== false : true;
            const isHovered = hoveredCountry?.name === country.name;
            const fill = !enabled ? mapStyle.disabledColor : isHovered ? mapStyle.hoverColor : mapStyle.landFill;

            return (
              <path
                key={country.id}
                d={country.pathD}
                className="military-map-country"
                fill={fill}
                stroke={mapStyle.landStroke}
                strokeWidth={mapStyle.strokeWidth}
                vectorEffect="non-scaling-stroke"
                style={{ cursor: "default" }}
                onMouseMove={(event) => {
                  const position = getMousePosition(event);
                  setHoveredCountry({
                    screenX: position.x,
                    screenY: position.y,
                    name: config?.name || country.name,
                  });
                }}
                onMouseLeave={() => setHoveredCountry(null)}
              />
            );
          })}

          {markers.map((marker, index) => {
            const [x, y] = mercatorProject(marker.longitude, marker.latitude, scale, offsetX, offsetY);
            if (x < -20 || x > width + 20 || y < -20 || y > height + 20) return null;

            const markerColor = marker.color || "#E53E3E";
            const size = 5;

            return (
              <g
                key={`${marker.label}-${index}`}
                transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`}
                style={{ cursor: "pointer" }}
                onMouseEnter={(event) => {
                  const position = getMousePosition(event);
                  setHoveredMarker({
                    screenX: position.x,
                    screenY: position.y,
                    label: marker.label,
                    description: marker.description,
                  });
                }}
                onMouseMove={(event) => {
                  const position = getMousePosition(event);
                  setHoveredMarker({
                    screenX: position.x,
                    screenY: position.y,
                    label: marker.label,
                    description: marker.description,
                  });
                }}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                <circle r={size * 2} fill={withOpacity(markerColor, 0.12)} />
                <circle r={size} fill={markerColor} filter={`url(#glow-${uniqueId})`} />
              </g>
            );
          })}
        </g>
      </svg>

      {tooltip.show && hoveredMarker ? (
        <div
          style={{
            position: "absolute",
            left: hoveredMarker.screenX + 14,
            top: hoveredMarker.screenY - 14,
            transform: "translateY(-100%)",
            background: tooltip.background,
            color: tooltip.textColor,
            border: `1px solid ${tooltip.borderColor}`,
            borderRadius: 10,
            padding: "8px 12px",
            pointerEvents: "none",
            zIndex: 20,
            boxShadow: `0 6px 24px ${withOpacity("#000", 0.45)}`,
            backdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 220,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            {hoveredMarker.label}
          </div>
          {hoveredMarker.description ? (
            <div
              style={{
                fontSize: 10,
                fontWeight: 400,
                opacity: 0.65,
                letterSpacing: "0.02em",
                lineHeight: 1.35,
              }}
            >
              {hoveredMarker.description}
            </div>
          ) : null}
        </div>
      ) : null}

      {tooltip.show && !hoveredMarker && hoveredCountry ? (
        <div
          style={{
            position: "absolute",
            left: hoveredCountry.screenX + 14,
            top: hoveredCountry.screenY - 10,
            transform: "translateY(-100%)",
            background: tooltip.background,
            color: tooltip.textColor,
            border: `1px solid ${tooltip.borderColor}`,
            borderRadius: 10,
            padding: "7px 10px",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.03em",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 20,
            boxShadow: `0 6px 24px ${withOpacity("#000", 0.45)}`,
            backdropFilter: "blur(8px)",
          }}
        >
          {hoveredCountry.name}
        </div>
      ) : null}
    </div>
  );
}
