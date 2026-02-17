"use client";

import { useState, useEffect } from "react";
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
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "1 day ago" : `${days}d ago`;
}

function catLabel(cat: NewsCategory): string {
  const labels: Record<NewsCategory, string> = {
    politics: "Politics", business: "Business", technology: "Tech",
    science: "Science", health: "Health", sports: "Sports",
    entertainment: "Culture", environment: "Climate", crime: "Crime",
    education: "Education", lifestyle: "Lifestyle", opinion: "Opinion",
    world: "World",
  };
  return labels[cat];
}

function catColor(cat: NewsCategory): string {
  const m: Record<NewsCategory, string> = {
    politics: "text-violet-300/80",
    business: "text-emerald-300/80",
    technology: "text-sky-300/80",
    science: "text-amber-300/80",
    health: "text-rose-300/80",
    sports: "text-orange-300/80",
    entertainment: "text-pink-300/80",
    environment: "text-green-300/80",
    crime: "text-red-300/80",
    education: "text-indigo-300/80",
    lifestyle: "text-teal-300/80",
    opinion: "text-yellow-300/80",
    world: "text-blue-300/80",
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer"
      onClick={() => onSelect(article)}
    >
      <div className="rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.08] transition-all duration-200">
        <div className="relative w-full h-[180px] overflow-hidden">
          {!imgErr && article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="420px"
              onError={() => setImgErr(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-white/[0.04] to-white/[0.02]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/40 to-transparent" />
          <div className="absolute bottom-3.5 left-4 right-4">
            <span className={`text-[10px] uppercase tracking-widest font-semibold ${catColor(article.category)}`}>
              {catLabel(article.category)}
            </span>
            <h3 className="text-[17px] font-semibold text-white/95 leading-[1.35] mt-1.5 drop-shadow-lg">
              {article.title}
            </h3>
          </div>
        </div>
        <div className="px-4 py-3.5">
          <p className="text-[13px] text-white/45 leading-[1.7] line-clamp-2 mb-3">
            {article.snippet}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-white/40 font-medium">
                {article.source}
              </span>
              <span className="text-white/15">&middot;</span>
              <span className="text-[11px] text-white/25">
                {timeAgo(article.timestamp)}
              </span>
            </div>
            <span className="text-[11px] text-white/20 group-hover:text-white/40 transition-colors">
              Read &rarr;
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group cursor-pointer"
      onClick={() => onSelect(article)}
    >
      <div className="flex gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors duration-150">
        <div className="relative w-[100px] h-[72px] rounded-lg overflow-hidden flex-shrink-0 bg-white/[0.03]">
          {!imgErr && article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="100px"
              onError={() => setImgErr(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-white/[0.04]" />
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className={`text-[10px] uppercase tracking-wider font-semibold ${catColor(article.category)}`}>
                {catLabel(article.category)}
              </span>
              <span className="text-[10px] text-white/20">
                {timeAgo(article.timestamp)}
              </span>
            </div>
            <h4 className="text-[14px] font-medium text-white/80 leading-[1.4] line-clamp-2 group-hover:text-white/95 transition-colors">
              {article.title}
            </h4>
          </div>
          <span className="text-[11px] text-white/30 mt-1.5">
            {article.source}
          </span>
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: "spring", damping: 28, stiffness: 320 }}
      className="flex flex-col h-full"
    >
      {/* Sticky header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors group"
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
          className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/60 transition-colors"
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
            <div className="w-full h-full bg-gradient-to-br from-white/[0.04] to-white/[0.02]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/30 to-transparent" />
        </div>

        <div className="px-6 -mt-8 relative z-10">
          {/* Category + time */}
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-[10px] uppercase tracking-widest font-semibold ${catColor(article.category)}`}>
              {catLabel(article.category)}
            </span>
            <span className="text-[11px] text-white/25">
              {timeAgo(article.timestamp)}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-[22px] font-semibold text-white/95 leading-[1.35] mb-5 tracking-[-0.01em]">
            {article.title}
          </h2>

          {/* Source bar */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.06]">
            <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
              <span className="text-[12px] text-white/50 font-semibold">
                {article.source.charAt(0)}
              </span>
            </div>
            <div>
              <span className="text-[14px] text-white/70 font-medium block">
                {article.source}
              </span>
              <span className="text-[11px] text-white/25">
                News source
              </span>
            </div>
          </div>

          {/* Article body */}
          <div className="space-y-5 mb-8">
            <p className="text-[15px] text-white/55 leading-[1.8]">
              {article.snippet}
            </p>
            <p className="text-[15px] text-white/40 leading-[1.8]">
              This is a developing story. Our reporters on the ground continue
              to gather details and will provide updates as more information
              becomes available. The situation has drawn attention from
              international observers and analysts who are closely monitoring
              developments.
            </p>
          </div>

          {/* CTA */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-[14px] font-medium transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] mb-6 text-white/70 hover:text-white/90"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            Continue reading on {article.source}
            <svg
              className="w-4 h-4"
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
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.55) 100%)",
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
              background: "#0c0d12",
              borderLeft: "1px solid rgba(255, 255, 255, 0.06)",
              boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.5)",
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
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {COUNTRY_FLAGS[countryData.code] || "🌐"}
                        </span>
                        <div>
                          <h2 className="text-[20px] font-semibold text-white/95 tracking-[-0.01em]">
                            {countryData.name}
                          </h2>
                          <p className="text-[11px] text-white/30 mt-0.5">
                            {countryData.articles.length} stories today
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
                    <div className="flex gap-1 mt-4 overflow-x-auto pb-1 scrollbar-hide">
                      <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap transition-all ${
                          !activeCategory
                            ? "bg-white/[0.08] text-white/70"
                            : "text-white/30 hover:text-white/50 hover:bg-white/[0.03]"
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
                            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap transition-all ${
                              activeCategory === cat.key
                                ? "bg-white/[0.08] text-white/70"
                                : "text-white/30 hover:text-white/50 hover:bg-white/[0.03]"
                            }`}
                          >
                            {cat.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Articles feed */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 scrollbar-thin">
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
                      <div className="flex flex-col items-center justify-center py-16 text-white/20">
                        <span className="text-2xl mb-3">No stories</span>
                        <span className="text-[13px]">
                          in this category
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t border-white/[0.05]">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-white/20">
                        Sources: Reuters, AP, BBC &amp; local outlets
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                        <span className="text-[10px] text-white/20">
                          Live
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
