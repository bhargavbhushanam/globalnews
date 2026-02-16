"use client";

import { useGlobeStore } from "@/store/useGlobeStore";
import { getCountryByCode } from "@/data/mockNews";
import { NewsCategory, NewsArticle } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

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
};

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}

function categoryColor(cat: NewsCategory): string {
  const map: Record<NewsCategory, string> = {
    politics: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    business: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    technology: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    science: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    health: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    sports: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    entertainment: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    world: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  };
  return map[cat];
}

function ArticleCard({ article }: { article: NewsArticle }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="group p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-cyan-500/20 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span
          className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${categoryColor(
            article.category
          )}`}
        >
          {article.category}
        </span>
        <span className="text-[11px] text-white/30 whitespace-nowrap">
          {timeAgo(article.timestamp)}
        </span>
      </div>

      <h3 className="text-[14px] font-semibold text-white/90 leading-snug mb-2 group-hover:text-cyan-300 transition-colors">
        {article.title}
      </h3>

      <p className="text-[12px] text-white/40 leading-relaxed mb-3">
        {article.snippet}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-[11px] text-cyan-400/70 font-medium">
          {article.source}
        </span>
        <span className="text-[11px] text-white/20 group-hover:text-cyan-400/50 transition-colors">
          Read more →
        </span>
      </div>
    </motion.div>
  );
}

export default function NewsPanel() {
  const { selectedCountry, panelOpen, activeCategory, closePanel, setActiveCategory } =
    useGlobeStore();

  const countryData = selectedCountry ? getCountryByCode(selectedCountry) : null;

  const filteredArticles = countryData
    ? activeCategory
      ? countryData.articles.filter((a) => a.category === activeCategory)
      : countryData.articles
    : [];

  return (
    <AnimatePresence>
      {panelOpen && countryData && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-full sm:w-[440px] z-50 flex flex-col"
          style={{
            background:
              "linear-gradient(135deg, rgba(8, 12, 30, 0.97) 0%, rgba(10, 18, 40, 0.98) 100%)",
            backdropFilter: "blur(40px)",
            borderLeft: "1px solid rgba(0, 180, 255, 0.1)",
          }}
        >
          {/* Header */}
          <div className="p-5 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {COUNTRY_FLAGS[countryData.code] || "🌐"}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {countryData.name}
                  </h2>
                  <p className="text-xs text-white/30">
                    {countryData.articles.length} stories from trusted sources
                  </p>
                </div>
              </div>
              <button
                onClick={closePanel}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
              >
                ✕
              </button>
            </div>

            {/* Category filters */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const count = countryData.articles.filter(
                  (a) => a.category === cat.key
                ).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all border ${
                      activeCategory === cat.key
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                        : "bg-white/[0.03] text-white/40 border-white/[0.06] hover:bg-white/[0.06] hover:text-white/60"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                    <span className="text-[10px] opacity-50">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Articles */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))
            ) : (
              <div className="text-center text-white/20 py-12 text-sm">
                No stories in this category
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/[0.06] text-center">
            <p className="text-[10px] text-white/20">
              Sources: Reuters, AP, BBC, and other trusted outlets
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
