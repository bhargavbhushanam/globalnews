import { create } from "zustand";
import { NewsCategory, CountryData } from "@/types";

interface GlobeState {
  selectedCountry: string | null;
  hoveredCountry: string | null;
  mousePos: { x: number; y: number };
  panelOpen: boolean;
  activeCategory: NewsCategory | null;
  hoverCategory: NewsCategory | null;
  searchQuery: string;
  globeReady: boolean;

  // Dynamic news data
  countries: CountryData[];
  trendingHeadlines: string[];
  newsLoading: boolean;
  newsError: boolean;
  lastFetched: number | null;

  selectCountry: (code: string | null) => void;
  setHoveredCountry: (code: string | null) => void;
  setMousePos: (pos: { x: number; y: number }) => void;
  setActiveCategory: (cat: NewsCategory | null) => void;
  setHoverCategory: (cat: NewsCategory | null) => void;
  setSearchQuery: (q: string) => void;
  setGlobeReady: (ready: boolean) => void;
  closePanel: () => void;

  setCountries: (countries: CountryData[]) => void;
  setTrendingHeadlines: (headlines: string[]) => void;
  setNewsLoading: (loading: boolean) => void;
  setNewsError: (error: boolean) => void;
  setLastFetched: (ts: number) => void;
}

export const useGlobeStore = create<GlobeState>((set) => ({
  selectedCountry: null,
  hoveredCountry: null,
  mousePos: { x: 0, y: 0 },
  panelOpen: false,
  activeCategory: null,
  hoverCategory: null,
  searchQuery: "",
  globeReady: false,

  countries: [],
  trendingHeadlines: [],
  newsLoading: true,
  newsError: false,
  lastFetched: null,

  selectCountry: (code) =>
    set({
      selectedCountry: code,
      panelOpen: code !== null,
      activeCategory: null,
    }),

  setHoveredCountry: (code) => set({ hoveredCountry: code, hoverCategory: null }),
  setMousePos: (pos) => set({ mousePos: pos }),

  setActiveCategory: (cat) =>
    set((state) => ({
      activeCategory: state.activeCategory === cat ? null : cat,
    })),

  setHoverCategory: (cat) =>
    set((state) => ({
      hoverCategory: state.hoverCategory === cat ? null : cat,
    })),

  setSearchQuery: (q) => set({ searchQuery: q }),
  setGlobeReady: (ready) => set({ globeReady: ready }),
  closePanel: () =>
    set({ panelOpen: false, selectedCountry: null, activeCategory: null }),

  setCountries: (countries) => set({ countries }),
  setTrendingHeadlines: (headlines) => set({ trendingHeadlines: headlines }),
  setNewsLoading: (loading) => set({ newsLoading: loading }),
  setNewsError: (error) => set({ newsError: error }),
  setLastFetched: (ts) => set({ lastFetched: ts }),
}));
