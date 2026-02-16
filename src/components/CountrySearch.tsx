"use client";

import { useGlobeStore } from "@/store/useGlobeStore";
import { mockCountries } from "@/data/mockNews";
import { motion, AnimatePresence } from "framer-motion";

const COUNTRY_FLAGS: Record<string, string> = {
  US: "🇺🇸", GB: "🇬🇧", FR: "🇫🇷", DE: "🇩🇪", JP: "🇯🇵", CN: "🇨🇳",
  IN: "🇮🇳", BR: "🇧🇷", AU: "🇦🇺", NG: "🇳🇬", ZA: "🇿🇦", EG: "🇪🇬",
  SA: "🇸🇦", KR: "🇰🇷", MX: "🇲🇽", RU: "🇷🇺", CA: "🇨🇦", KE: "🇰🇪",
  IL: "🇮🇱", AR: "🇦🇷",
};

export default function CountrySearch() {
  const { searchQuery, selectCountry, setSearchQuery } = useGlobeStore();

  const filtered =
    searchQuery.length > 0
      ? mockCountries.filter(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.articles.some(
              (a) =>
                a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.category.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
      : [];

  return (
    <AnimatePresence>
      {filtered.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-[5.5rem] right-5 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-80 max-h-72 overflow-y-auto rounded-xl z-50"
          style={{
            background: "rgba(10, 18, 40, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 180, 255, 0.15)",
          }}
        >
          {filtered.map((country) => (
            <button
              key={country.code}
              onClick={() => {
                selectCountry(country.code);
                setSearchQuery("");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left border-b border-white/[0.04] last:border-0"
            >
              <span className="text-xl">
                {COUNTRY_FLAGS[country.code] || "🌐"}
              </span>
              <div>
                <div className="text-sm font-medium text-white/80">
                  {country.name}
                </div>
                <div className="text-[10px] text-white/30">
                  {country.articles.length} stories
                </div>
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
