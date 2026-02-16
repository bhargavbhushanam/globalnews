import { create } from "zustand";
import { NewsCategory } from "@/types";

interface GlobeState {
  selectedCountry: string | null;
  hoveredCountry: string | null;
  mousePos: { x: number; y: number };
  panelOpen: boolean;
  activeCategory: NewsCategory | null;
  hoverCategory: NewsCategory | null;
  searchQuery: string;
  globeReady: boolean;

  selectCountry: (code: string | null) => void;
  setHoveredCountry: (code: string | null) => void;
  setMousePos: (pos: { x: number; y: number }) => void;
  setActiveCategory: (cat: NewsCategory | null) => void;
  setHoverCategory: (cat: NewsCategory | null) => void;
  setSearchQuery: (q: string) => void;
  setGlobeReady: (ready: boolean) => void;
  closePanel: () => void;
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
}));
