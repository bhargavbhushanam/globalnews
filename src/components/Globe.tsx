"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useGlobeStore } from "@/store/useGlobeStore";
import { mockCountries, getAllCountryCodes } from "@/data/mockNews";

const GlobeTmpl = dynamic(() => import("react-globe.gl"), { ssr: false });

interface CountryFeature {
  properties: {
    ISO_A2: string;
    ADMIN: string;
    ISO_A2_EH?: string;
  };
}

const COUNTRY_CODES_WITH_NEWS = new Set(getAllCountryCodes());

function getCountryCode(feat: CountryFeature): string {
  return feat.properties.ISO_A2 === "-99"
    ? feat.properties.ISO_A2_EH || ""
    : feat.properties.ISO_A2;
}

function getArticleCount(code: string): number {
  const c = mockCountries.find((m) => m.code === code);
  return c ? c.articles.length : 0;
}

function heatColor(count: number): string {
  if (count === 0) return "rgba(30, 60, 120, 0.08)";
  if (count <= 2) return "rgba(0, 200, 255, 0.35)";
  if (count <= 3) return "rgba(0, 255, 170, 0.4)";
  if (count <= 4) return "rgba(255, 220, 50, 0.45)";
  return "rgba(255, 90, 50, 0.5)";
}

export default function Globe() {
  const globeRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [countries, setCountries] = useState<{ features: CountryFeature[] }>({
    features: [],
  });
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const { selectedCountry, hoveredCountry, setHoveredCountry, selectCountry, setGlobeReady } =
    useGlobeStore();

  useEffect(() => {
    const updateSize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"
    )
      .then((r) => r.json())
      .then((data) => {
        setCountries(data);
        setGlobeReady(true);
      });
  }, [setGlobeReady]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.4;
    globe.controls().enableDamping = true;
    globe.controls().dampingFactor = 0.1;
    globe.controls().minDistance = 180;
    globe.controls().maxDistance = 600;

    globe.pointOfView({ lat: 20, lng: 0, altitude: 2.2 });
  }, [countries]);

  const handleCountryClick = useCallback(
    (polygon: object) => {
      const feat = polygon as CountryFeature;
      const code = getCountryCode(feat);
      if (!COUNTRY_CODES_WITH_NEWS.has(code)) return;

      const country = mockCountries.find((c) => c.code === code);
      if (!country) return;

      selectCountry(code);

      const globe = globeRef.current;
      if (globe) {
        globe.controls().autoRotate = false;
        globe.pointOfView(
          { lat: country.lat, lng: country.lng, altitude: 1.6 },
          800
        );
      }
    },
    [selectCountry]
  );

  const handleCountryHover = useCallback(
    (polygon: object | null) => {
      if (!polygon) {
        setHoveredCountry(null);
        return;
      }
      const feat = polygon as CountryFeature;
      const code = getCountryCode(feat);
      setHoveredCountry(COUNTRY_CODES_WITH_NEWS.has(code) ? code : null);
    },
    [setHoveredCountry]
  );

  const polygonCapColor = useCallback(
    (obj: object) => {
      const feat = obj as CountryFeature;
      const code = getCountryCode(feat);
      if (code === selectedCountry) return "rgba(0, 180, 255, 0.6)";
      if (code === hoveredCountry) return "rgba(0, 220, 255, 0.45)";
      return heatColor(getArticleCount(code));
    },
    [selectedCountry, hoveredCountry]
  );

  const polygonSideColor = useCallback(
    (obj: object) => {
      const feat = obj as CountryFeature;
      const code = getCountryCode(feat);
      if (code === selectedCountry) return "rgba(0, 180, 255, 0.3)";
      if (code === hoveredCountry) return "rgba(0, 220, 255, 0.2)";
      return "rgba(30, 60, 120, 0.05)";
    },
    [selectedCountry, hoveredCountry]
  );

  const polygonAltitude = useCallback(
    (obj: object) => {
      const feat = obj as CountryFeature;
      const code = getCountryCode(feat);
      if (code === selectedCountry) return 0.04;
      if (code === hoveredCountry) return 0.025;
      const count = getArticleCount(code);
      return count > 0 ? 0.008 : 0.002;
    },
    [selectedCountry, hoveredCountry]
  );

  // Tooltip disabled — using HoverNewsPopup instead
  const polygonLabel = useCallback(() => "", []);

  // Breaking news markers
  const breakingPoints = mockCountries
    .filter((c) => c.articles.length >= 4)
    .map((c) => ({
      lat: c.lat,
      lng: c.lng,
      size: 0.6,
      color: "#ff4444",
      code: c.code,
      label: c.name,
    }));

  return (
    <div className="globe-container">
      <GlobeTmpl
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        polygonsData={countries.features}
        polygonCapColor={polygonCapColor}
        polygonSideColor={polygonSideColor}
        polygonStrokeColor={() => "rgba(100, 180, 255, 0.15)"}
        polygonAltitude={polygonAltitude}
        polygonLabel={polygonLabel}
        onPolygonClick={handleCountryClick}
        onPolygonHover={handleCountryHover}
        polygonsTransitionDuration={300}
        pointsData={breakingPoints}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.05}
        pointRadius="size"
        pointsMerge={false}
        atmosphereColor="rgba(0, 150, 255, 1)"
        atmosphereAltitude={0.2}
        animateIn={true}
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
}
