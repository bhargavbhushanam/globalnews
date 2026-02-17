"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useGlobeStore } from "@/store/useGlobeStore";
import { NewsCategory, NewsArticle } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CATEGORIES: { key: NewsCategory; label: string }[] = [
  { key: "politics", label: "Politics" },
  { key: "business", label: "Business" },
  { key: "technology", label: "Tech" },
  { key: "science", label: "Science" },
  { key: "health", label: "Health" },
  { key: "sports", label: "Sports" },
  { key: "entertainment", label: "Culture" },
  { key: "environment", label: "Climate" },
  { key: "crime", label: "Crime" },
  { key: "education", label: "Education" },
  { key: "lifestyle", label: "Lifestyle" },
  { key: "opinion", label: "Opinion" },
  { key: "world", label: "World" },
];

const COUNTRY_FLAGS: Record<string, string> = {
  US: "🇺🇸", GB: "🇬🇧", FR: "🇫🇷", DE: "🇩🇪", JP: "🇯🇵", CN: "🇨🇳",
  IN: "🇮🇳", BR: "🇧🇷", AU: "🇦🇺", NG: "🇳🇬", ZA: "🇿🇦", EG: "🇪🇬",
  SA: "🇸🇦", KR: "🇰🇷", MX: "🇲🇽", RU: "🇷🇺", CA: "🇨🇦", KE: "🇰🇪",
  IL: "🇮🇱", AR: "🇦🇷",
  IT: "🇮🇹", ES: "🇪🇸", PL: "🇵🇱", NL: "🇳🇱", SE: "🇸🇪", UA: "🇺🇦",
  CH: "🇨🇭", TR: "🇹🇷", GR: "🇬🇷", NO: "🇳🇴",
  ID: "🇮🇩", TH: "🇹🇭", VN: "🇻🇳", PH: "🇵🇭", SG: "🇸🇬", PK: "🇵🇰",
  BD: "🇧🇩", MY: "🇲🇾",
  CO: "🇨🇴", CL: "🇨🇱", PE: "🇵🇪",
  ET: "🇪🇹", GH: "🇬🇭", MA: "🇲🇦", TZ: "🇹🇿",
  AE: "🇦🇪", JO: "🇯🇴",
  NZ: "🇳🇿",
};

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 5) return "Just now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

function ArticleRow({
  article,
  onClick,
  isFirst,
}: {
  article: NewsArticle;
  onClick: () => void;
  isFirst?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={onClick}
      className="group flex gap-3.5 py-3 px-4 cursor-pointer hover:bg-white/[0.03] transition-colors duration-150"
    >
      {/* Thumbnail */}
      <div className="relative w-[72px] h-[54px] rounded-lg overflow-hidden flex-shrink-0 bg-white/[0.04]">
        {!imgError ? (
          <Image
            src={article.imageUrl || ""}
            alt=""
            fill
            className="object-cover"
            sizes="72px"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-5 h-5 rounded bg-white/[0.06]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4
          className={`font-medium leading-[1.4] line-clamp-2 transition-colors duration-150 ${
            isFirst
              ? "text-[13px] text-white/90 group-hover:text-white"
              : "text-[12.5px] text-white/75 group-hover:text-white/90"
          }`}
        >
          {article.title}
        </h4>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-[10.5px] text-white/35 font-medium truncate max-w-[140px]">
            {article.source}
          </span>
          <span className="text-white/15 text-[8px]">&bull;</span>
          <span className="text-[10.5px] text-white/25">
            {timeAgo(article.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HoverNewsPopup() {
  const {
    hoveredCountry,
    panelOpen,
    hoverCategory,
    setHoverCategory,
    selectCountry,
  } = useGlobeStore();

  const popupRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [visible, setVisible] = useState(false);
  const [isMouseInPopup, setIsMouseInPopup] = useState(false);
  const [lockedCountry, setLockedCountry] = useState<string | null>(null);

  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCountryRef = useRef<string | null>(null);

  const countries = useGlobeStore((s) => s.countries);

  const displayCode = isMouseInPopup ? lockedCountry : hoveredCountry;
  const countryData = displayCode
    ? countries.find((c) => c.code === displayCode) || null
    : null;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredCountry && hoveredCountry !== lastCountryRef.current) {
        lastCountryRef.current = hoveredCountry;
        setLockedCountry(hoveredCountry);

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const popupW = 420;
        const popupH = 520;

        let x = e.clientX + 24;
        let y = e.clientY - 60;

        if (x + popupW > vw - 20) x = e.clientX - popupW - 24;
        if (y + popupH > vh - 20) y = vh - popupH - 20;
        if (y < 100) y = 100;

        setPosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hoveredCountry]);

  useEffect(() => {
    const shouldShow =
      (hoveredCountry || isMouseInPopup) && !panelOpen;

    if (shouldShow) {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      if (!visible) {
        showTimerRef.current = setTimeout(() => setVisible(true), 250);
      }
    } else {
      if (showTimerRef.current) {
        clearTimeout(showTimerRef.current);
        showTimerRef.current = null;
      }
      hideTimerRef.current = setTimeout(() => {
        setVisible(false);
        setLockedCountry(null);
        lastCountryRef.current = null;
      }, 300);
    }

    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [hoveredCountry, isMouseInPopup, panelOpen, visible]);

  const handlePopupMouseEnter = useCallback(() => {
    setIsMouseInPopup(true);
  }, []);

  const handlePopupMouseLeave = useCallback(() => {
    setIsMouseInPopup(false);
  }, []);

  const handleArticleClick = useCallback(
    (countryCode: string) => {
      setIsMouseInPopup(false);
      setVisible(false);
      selectCountry(countryCode);
    },
    [selectCountry]
  );

  const handleViewAll = useCallback(() => {
    if (displayCode) {
      setIsMouseInPopup(false);
      setVisible(false);
      selectCountry(displayCode);
    }
  }, [displayCode, selectCountry]);

  // Group articles by category
  const groupedArticles = countryData
    ? countryData.articles.reduce((acc, a) => {
        if (!acc[a.category]) acc[a.category] = [];
        acc[a.category].push(a);
        return acc;
      }, {} as Record<string, NewsArticle[]>)
    : {};

  const availableCategories = CATEGORIES.filter((c) => groupedArticles[c.key]);
  const displayArticles = hoverCategory
    ? groupedArticles[hoverCategory] || []
    : countryData?.articles || [];

  if (!position) return null;

  return (
    <AnimatePresence>
      {visible && countryData && (
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, scale: 0.96, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 4 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          className="fixed z-50"
          style={{
            left: position.x,
            top: position.y,
            width: 420,
          }}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(14, 15, 20, 0.96)",
              backdropFilter: "blur(40px) saturate(1.3)",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              boxShadow:
                "0 24px 80px rgba(0, 0, 0, 0.55), 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Header */}
            <div className="px-5 pt-4 pb-3">
              <div className="flex items-center gap-3 mb-3.5">
                <span className="text-[22px] leading-none">
                  {COUNTRY_FLAGS[countryData.code] || "🌐"}
                </span>
                <div className="flex-1">
                  <h3 className="text-[15px] font-semibold text-white/95 tracking-[-0.01em]">
                    {countryData.name}
                  </h3>
                  <p className="text-[10.5px] text-white/30 mt-0.5">
                    {countryData.articles.length} headlines today
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/[0.12]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                  <span className="text-[9px] text-emerald-400/70 font-medium uppercase tracking-wider">
                    Live
                  </span>
                </div>
              </div>

              {/* Category pills — clean, no emojis */}
              <div className="flex gap-1 flex-wrap">
                <button
                  onClick={() => setHoverCategory(null)}
                  className={`px-2.5 py-1 rounded-md text-[10.5px] font-medium transition-all duration-150 ${
                    !hoverCategory
                      ? "bg-white/[0.1] text-white/70"
                      : "text-white/30 hover:text-white/50 hover:bg-white/[0.04]"
                  }`}
                >
                  All
                </button>
                {availableCategories.map((cat) => {
                  const count = groupedArticles[cat.key]?.length || 0;
                  const isActive = hoverCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setHoverCategory(cat.key)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10.5px] font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-white/[0.1] text-white/70"
                          : "text-white/30 hover:text-white/50 hover:bg-white/[0.04]"
                      }`}
                    >
                      {cat.label}
                      <span className="text-[9px] opacity-40">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.05] mx-4" />

            {/* Articles */}
            <div className="py-1 max-h-[380px] overflow-y-auto scrollbar-thin">
              {displayArticles.slice(0, 8).map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <ArticleRow
                    article={article}
                    isFirst={i === 0}
                    onClick={() => handleArticleClick(article.countryCode)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="h-px bg-white/[0.05] mx-4" />
            <button
              onClick={handleViewAll}
              className="w-full px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-white/[0.03] transition-colors duration-150"
            >
              <span className="text-[11px] text-white/30">
                View all {countryData.articles.length} stories
              </span>
              <span className="text-[11px] text-white/40 flex items-center gap-1 group">
                Open
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
