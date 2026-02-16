import { create } from "zustand";
import { NewsCategory } from "@/types";

interface GlobeState {
  selectedCountry: string | null;
  hoveredCountry: string | null;
  panelOpen: boolean;
  activeCategory: NewsCategory | null;
  searchQuery: string;
  globeReady: boolean;

  selectCountry: (code: string | null) => void;
  setHoveredCountry: (code: string | null) => void;
  setActiveCategory: (cat: NewsCategory | null) => void;
  setSearchQuery: (q: string) => void;
  setGlobeReady: (ready: boolean) => void;
  closePanel: () => void;
}

export const useGlobeStore = create<GlobeState>((set) => ({
  selectedCountry: null,
  hoveredCountry: null,
  panelOpen: false,
  activeCategory: null,
  searchQuery: "",
  globeReady: false,

  selectCountry: (code) =>
    set({
      selectedCountry: code,
      panelOpen: code !== null,
      activeCategory: null,
    }),

  setHoveredCountry: (code) => set({ hoveredCountry: code }),

  setActiveCategory: (cat) =>
    set((state) => ({
      activeCategory: state.activeCategory === cat ? null : cat,
    })),

  setSearchQuery: (q) => set({ searchQuery: q }),
  setGlobeReady: (ready) => set({ globeReady: ready }),
  closePanel: () =>
    set({ panelOpen: false, selectedCountry: null, activeCategory: null }),
}));
