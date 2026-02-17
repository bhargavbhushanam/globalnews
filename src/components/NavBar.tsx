"use client";

import { useState, useEffect } from "react";
import { useGlobeStore } from "@/store/useGlobeStore";
import { motion } from "framer-motion";

export default function NavBar() {
  const { searchQuery, setSearchQuery, trendingHeadlines, countries, newsLoading } =
    useGlobeStore();
  const [tickerIndex, setTickerIndex] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    if (trendingHeadlines.length === 0) return;
    const interval = setInterval(() => {
      setTickerIndex((i) => (i + 1) % trendingHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [trendingHeadlines.length]);

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      {/* Trending ticker */}
      <div
        className="h-7 flex items-center justify-center overflow-hidden"
        style={{
          background: "rgba(10, 10, 14, 0.85)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
        }}
      >
        <div className="flex items-center gap-2.5 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
          <span className="text-red-400/70 font-semibold uppercase tracking-wider text-[9px]">
            Trending
          </span>
          <span className="text-white/12">|</span>
          <motion.span
            key={tickerIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-white/50 text-[11px]"
          >
            {trendingHeadlines[tickerIndex] || "Loading headlines..."}
          </motion.span>
        </div>
      </div>

      {/* Main nav */}
      <div
        className="h-14 flex items-center justify-between px-6"
        style={{
          background: "rgba(8, 9, 14, 0.8)",
          backdropFilter: "blur(24px) saturate(1.2)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            🌐
          </div>
          <h1 className="text-xl font-bold text-white/95 tracking-tight">
            Global<span className="text-white/50 font-medium">News</span>
          </h1>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div
            className={`relative transition-all duration-300 ${
              searchFocused ? "w-72" : "w-56"
            }`}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search countries or topics..."
              className="w-full h-9 pl-9 pr-3 rounded-xl text-[13px] text-white/80 placeholder:text-white/20 outline-none transition-all"
              style={{
                background: searchFocused
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(255, 255, 255, 0.04)",
                border: searchFocused
                  ? "1px solid rgba(255, 255, 255, 0.15)"
                  : "1px solid rgba(255, 255, 255, 0.06)",
              }}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Info badge */}
          <div className="hidden md:flex items-center gap-1.5 text-[10px] text-white/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
            {countries.length} countries {newsLoading ? "" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
