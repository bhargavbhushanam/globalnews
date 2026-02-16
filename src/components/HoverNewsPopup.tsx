"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useGlobeStore } from "@/store/useGlobeStore";
import { NewsCategory, NewsArticle } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CATEGORIES: { key: NewsCategory; label: string; icon: string }[] = [
  { key: "politics", label: "Politics", icon: "🏛" },
  { key: "business", label: "Business", icon: "📈" },
  { key: "technology", label: "Tech", icon: "💻" },
  { key: "science", label: "Science", icon: "🔬" },
  { key: "health", label: "Health", icon: "🏥" },
  { key: "sports", label: "Sports", icon: "⚽" },
  { key: "entertainment", label: "Culture", icon: "🎬" },
  { key: "world", label: "World", icon: "🌍" },
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
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours === 1) return "1h ago";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "1d ago" : `${days}d ago`;
}

function categoryPillStyle(cat: NewsCategory, active: boolean): string {
  if (active) return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
  return "bg-white/[0.03] text-white/35 border-white/[0.05] hover:bg-white/[0.06] hover:text-white/50";
}

function ArticleRow({
  article,
  onClick,
}: {
  article: NewsArticle;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="group flex gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
    >
      <div className="relative w-[88px] h-[58px] rounded-lg overflow-hidden flex-shrink-0 bg-white/[0.03]">
        {!imgError ? (
          <Image
            src={article.imageUrl || ""}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="88px"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10 text-lg">
            📰
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-[12px] font-semibold text-white/85 leading-[1.35] line-clamp-2 group-hover:text-cyan-300 transition-colors">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] text-cyan-400/60 font-medium">
            {article.source}
          </span>
          <span className="text-white/10">·</span>
          <span className="text-[10px] text-white/25">
            {timeAgo(article.timestamp)}
          </span>
        </div>
      </div>
      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          className="w-3.5 h-3.5 text-cyan-400/50"
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
      </div>
    </motion.div>
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

  // The country to display: locked (mouse in popup) or hovered
  const countries = useGlobeStore((s) => s.countries);

  const displayCode = isMouseInPopup ? lockedCountry : hoveredCountry;
  const countryData = displayCode
    ? countries.find((c) => c.code === displayCode) || null
    : null;

  // Track mouse position and anchor popup when entering a new country
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredCountry && hoveredCountry !== lastCountryRef.current) {
        lastCountryRef.current = hoveredCountry;
        setLockedCountry(hoveredCountry);

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const popupW = 480;
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

  // Show/hide logic with delays — keeps popup when mouse is inside it
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
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ type: "spring", damping: 28, stiffness: 380 }}
          className="fixed z-50"
          style={{
            left: position.x,
            top: position.y,
            width: 480,
          }}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(12, 16, 36, 0.97) 0%, rgba(8, 14, 32, 0.98) 100%)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(0, 180, 255, 0.12)",
              boxShadow:
                "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 100, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 pt-4 pb-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 120, 255, 0.08) 0%, transparent 60%)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl leading-none">
                  {COUNTRY_FLAGS[countryData.code] || "🌐"}
                </span>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-white tracking-tight">
                    {countryData.name}
                  </h3>
                  <p className="text-[10px] text-white/30 mt-0.5">
                    {countryData.articles.length} stories from trusted sources
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
                  </span>
                  <span className="text-[9px] text-cyan-400/80 font-semibold uppercase tracking-wider">
                    Live
                  </span>
                </div>
              </div>

              {/* Category pills — clickable */}
              <div className="flex gap-1.5 flex-wrap">
                {availableCategories.map((cat) => {
                  const count = groupedArticles[cat.key]?.length || 0;
                  const isActive = hoverCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setHoverCategory(cat.key)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-all border cursor-pointer ${categoryPillStyle(
                        cat.key,
                        isActive
                      )}`}
                    >
                      <span className="text-[10px]">{cat.icon}</span>
                      {cat.label}
                      <span className="text-[9px] opacity-50">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            {/* Articles */}
            <div className="px-3 py-2 max-h-[360px] overflow-y-auto scrollbar-thin">
              {displayArticles.slice(0, 8).map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <ArticleRow
                    article={article}
                    onClick={() => handleArticleClick(article.countryCode)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Footer — clickable */}
            <button
              onClick={handleViewAll}
              className="w-full px-5 py-3 border-t border-white/[0.04] flex items-center justify-between cursor-pointer hover:bg-white/[0.03] transition-colors"
              style={{ background: "rgba(0, 120, 255, 0.03)" }}
            >
              <span className="text-[11px] text-white/30">
                View all {countryData.articles.length} stories
              </span>
              <span className="text-[11px] text-cyan-400/50 flex items-center gap-1">
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
