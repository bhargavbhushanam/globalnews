"use client";

import { useState, useEffect } from "react";
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
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "1 day ago" : `${days}d ago`;
}

function catColor(cat: NewsCategory): string {
  const m: Record<NewsCategory, string> = {
    politics: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    business: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    technology: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    science: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    health: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    sports: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    entertainment: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    world: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  };
  return m[cat];
}

function catAccent(cat: NewsCategory): string {
  const m: Record<NewsCategory, string> = {
    politics: "border-violet-500/20",
    business: "border-emerald-500/20",
    technology: "border-cyan-500/20",
    science: "border-amber-500/20",
    health: "border-rose-500/20",
    sports: "border-orange-500/20",
    entertainment: "border-pink-500/20",
    world: "border-blue-500/20",
  };
  return m[cat];
}

/* ─── Featured hero card (first article) ──────────────────── */
function HeroCard({
  article,
  onSelect,
}: {
  article: NewsArticle;
  onSelect: (a: NewsArticle) => void;
}) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer"
      onClick={() => onSelect(article)}
    >
      <div
        className={`rounded-2xl overflow-hidden border ${catAccent(
          article.category
        )} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300`}
      >
        <div className="relative w-full h-[180px] overflow-hidden">
          {!imgErr && article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="420px"
              onError={() => setImgErr(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan-900/30 to-blue-900/30" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c1e] via-[#080c1e]/40 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <span
              className={`inline-block text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md border backdrop-blur-md mb-2 ${catColor(
                article.category
              )}`}
            >
              {article.category}
            </span>
            <h3 className="text-[16px] font-bold text-white leading-tight drop-shadow-lg">
              {article.title}
            </h3>
          </div>
        </div>
        <div className="px-4 py-3">
          <p className="text-[12px] text-white/40 leading-relaxed line-clamp-2 mb-3">
            {article.snippet}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-cyan-500/15 flex items-center justify-center">
                <span className="text-[8px] text-cyan-400 font-bold">
                  {article.source.charAt(0)}
                </span>
              </div>
              <span className="text-[11px] text-cyan-400/70 font-medium">
                {article.source}
              </span>
              <span className="text-white/10 text-[10px]">·</span>
              <span className="text-[10px] text-white/25">
                {timeAgo(article.timestamp)}
              </span>
            </div>
            <span className="text-[10px] text-white/20 group-hover:text-cyan-400/60 transition-colors font-medium">
              Read →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Compact article card ────────────────────────────────── */
function CompactCard({
  article,
  onSelect,
  index,
}: {
  article: NewsArticle;
  onSelect: (a: NewsArticle) => void;
  index: number;
}) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group cursor-pointer"
      onClick={() => onSelect(article)}
    >
      <div
        className={`flex gap-3.5 p-3 rounded-xl border ${catAccent(
          article.category
        )} bg-white/[0.015] hover:bg-white/[0.05] transition-all duration-200`}
      >
        <div className="relative w-[100px] h-[72px] rounded-lg overflow-hidden flex-shrink-0 bg-white/[0.03]">
          {!imgErr && article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="100px"
              onError={() => setImgErr(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan-900/20 to-blue-900/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[8px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded border ${catColor(
                  article.category
                )}`}
              >
                {article.category}
              </span>
              <span className="text-[10px] text-white/20">
                {timeAgo(article.timestamp)}
              </span>
            </div>
            <h4 className="text-[12.5px] font-semibold text-white/85 leading-snug line-clamp-2 group-hover:text-cyan-300 transition-colors">
              {article.title}
            </h4>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] text-cyan-400/60 font-medium">
              {article.source}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Article detail view ─────────────────────────────────── */
function ArticleDetail({
  article,
  onBack,
}: {
  article: NewsArticle;
  onBack: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ type: "spring", damping: 28, stiffness: 320 }}
      className="flex flex-col h-full"
    >
      {/* Sticky header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.05] bg-[#0a0e22]/80 backdrop-blur-lg">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[12px] text-white/40 hover:text-cyan-400 transition-colors group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          All headlines
        </button>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] text-cyan-400/70 hover:text-cyan-300 transition-colors font-medium"
        >
          {article.source}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Hero image */}
        <div className="relative w-full h-[220px] overflow-hidden">
          {!imgErr && article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="480px"
              onError={() => setImgErr(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan-900/30 to-blue-900/30" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e22] via-[#0a0e22]/30 to-transparent" />
        </div>

        <div className="px-6 -mt-8 relative z-10">
          {/* Category + time */}
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className={`text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md border backdrop-blur-sm ${catColor(
                article.category
              )}`}
            >
              {article.category}
            </span>
            <span className="text-[11px] text-white/25">
              {timeAgo(article.timestamp)}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-[20px] font-bold text-white leading-[1.3] mb-4 tracking-tight">
            {article.title}
          </h2>

          {/* Source bar */}
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/[0.06]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">
              <span className="text-[11px] text-cyan-400 font-bold">
                {article.source.charAt(0)}
              </span>
            </div>
            <div>
              <span className="text-[13px] text-white/80 font-medium block">
                {article.source}
              </span>
              <span className="text-[10px] text-white/25">
                Trusted news source
              </span>
            </div>
          </div>

          {/* Article body */}
          <div className="space-y-4 mb-8">
            <p className="text-[14px] text-white/60 leading-[1.8]">
              {article.snippet}
            </p>
            <p className="text-[14px] text-white/45 leading-[1.8]">
              This is a developing story. Our reporters on the ground continue
              to gather details and will provide updates as more information
              becomes available. The situation has drawn attention from
              international observers and analysts who are closely monitoring
              developments.
            </p>
            <p className="text-[14px] text-white/35 leading-[1.8]">
              Experts suggest that the implications of this story could be
              far-reaching, affecting multiple sectors and stakeholders across
              the region.
            </p>
          </div>

          {/* CTA */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-[13px] font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] mb-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 150, 255, 0.15), rgba(0, 80, 255, 0.1))",
              border: "1px solid rgba(0, 150, 255, 0.25)",
              color: "rgba(0, 200, 255, 0.85)",
              boxShadow: "0 4px 20px rgba(0, 100, 255, 0.1)",
            }}
          >
            Continue reading on {article.source}
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main panel ──────────────────────────────────────────── */
export default function NewsPanel() {
  const {
    selectedCountry,
    panelOpen,
    activeCategory,
    closePanel,
    setActiveCategory,
  } = useGlobeStore();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const countries = useGlobeStore((s) => s.countries);
  const countryData = selectedCountry
    ? countries.find((c) => c.code === selectedCountry) || null
    : null;

  // Reset article selection when country changes
  useEffect(() => {
    setSelectedArticle(null);
  }, [selectedCountry]);

  const filteredArticles = countryData
    ? activeCategory
      ? countryData.articles.filter((a) => a.category === activeCategory)
      : countryData.articles
    : [];

  const handleClose = () => {
    setSelectedArticle(null);
    closePanel();
  };

  return (
    <AnimatePresence>
      {panelOpen && countryData && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.6) 100%)",
            }}
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 500, opacity: 0 }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed top-0 right-0 h-full z-50 flex flex-col"
            style={{
              width: "min(480px, 100vw)",
              background:
                "linear-gradient(180deg, #0a0e22 0%, #080c1e 100%)",
              borderLeft: "1px solid rgba(0, 150, 255, 0.08)",
              boxShadow:
                "-30px 0 80px rgba(0, 0, 0, 0.6), -5px 0 30px rgba(0, 50, 150, 0.05)",
            }}
          >
            <AnimatePresence mode="wait">
              {selectedArticle ? (
                <ArticleDetail
                  key="detail"
                  article={selectedArticle}
                  onBack={() => setSelectedArticle(null)}
                />
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="px-5 pt-5 pb-4 border-b border-white/[0.05]">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-2xl">
                          {COUNTRY_FLAGS[countryData.code] || "🌐"}
                        </div>
                        <div>
                          <h2 className="text-[18px] font-bold text-white tracking-tight">
                            {countryData.name}
                          </h2>
                          <p className="text-[11px] text-white/25 mt-0.5">
                            {countryData.articles.length} stories · trusted
                            sources
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleClose}
                        className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white/60 transition-all text-sm"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Category filters */}
                    <div className="flex gap-1.5 mt-4 overflow-x-auto pb-1 scrollbar-hide">
                      <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all border ${
                          !activeCategory
                            ? "bg-white/[0.08] text-white/70 border-white/[0.1]"
                            : "bg-transparent text-white/30 border-transparent hover:text-white/50"
                        }`}
                      >
                        All
                      </button>
                      {CATEGORIES.map((cat) => {
                        const count = countryData.articles.filter(
                          (a) => a.category === cat.key
                        ).length;
                        if (count === 0) return null;
                        return (
                          <button
                            key={cat.key}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all border ${
                              activeCategory === cat.key
                                ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/25"
                                : "bg-transparent text-white/30 border-transparent hover:text-white/50"
                            }`}
                          >
                            <span className="text-[11px]">{cat.icon}</span>
                            {cat.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Articles feed */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
                    {filteredArticles.length > 0 ? (
                      filteredArticles.map((article, i) =>
                        i === 0 ? (
                          <HeroCard
                            key={article.id}
                            article={article}
                            onSelect={setSelectedArticle}
                          />
                        ) : (
                          <CompactCard
                            key={article.id}
                            article={article}
                            onSelect={setSelectedArticle}
                            index={i}
                          />
                        )
                      )
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-white/15">
                        <span className="text-3xl mb-3">📭</span>
                        <span className="text-[13px]">
                          No stories in this category
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t border-white/[0.04] bg-white/[0.01]">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-white/15">
                        Reuters · AP · BBC · and other trusted outlets
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60"></span>
                        <span className="text-[10px] text-white/20">
                          Updated live
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
