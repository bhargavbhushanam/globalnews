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
        className="h-8 flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 50, 50, 0.15) 0%, rgba(255, 100, 50, 0.1) 50%, rgba(255, 50, 50, 0.15) 100%)",
          borderBottom: "1px solid rgba(255, 80, 50, 0.15)",
        }}
      >
        <div className="flex items-center gap-2 text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-red-400/80 font-semibold uppercase tracking-wider text-[10px]">
            Trending
          </span>
          <span className="text-white/20">|</span>
          <motion.span
            key={tickerIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-white/60"
          >
            {trendingHeadlines[tickerIndex] || "Loading headlines..."}
          </motion.span>
        </div>
      </div>

      {/* Main nav */}
      <div
        className="h-14 flex items-center justify-between px-5"
        style={{
          background:
            "linear-gradient(180deg, rgba(8, 12, 30, 0.9) 0%, rgba(8, 12, 30, 0.7) 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 180, 255, 0.3), rgba(0, 120, 255, 0.2))",
              border: "1px solid rgba(0, 180, 255, 0.3)",
            }}
          >
            🌐
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">
              Global<span className="text-cyan-400">News</span>
            </h1>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div
            className={`relative transition-all duration-300 ${
              searchFocused ? "w-72" : "w-52"
            }`}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search countries or topics..."
              className="w-full h-9 pl-9 pr-3 rounded-full text-xs text-white/80 placeholder:text-white/20 outline-none transition-all"
              style={{
                background: searchFocused
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(255, 255, 255, 0.04)",
                border: searchFocused
                  ? "1px solid rgba(0, 180, 255, 0.3)"
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
          <div className="hidden md:flex items-center gap-1.5 text-[10px] text-white/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {countries.length} countries · {newsLoading ? "Loading..." : "Live data"}
          </div>
        </div>
      </div>
    </div>
  );
}
