"use client";

import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";
import NewsPanel from "@/components/NewsPanel";
import CountrySearch from "@/components/CountrySearch";
import LoadingScreen from "@/components/LoadingScreen";
import HoverNewsPopup from "@/components/HoverNewsPopup";
import NewsLoader from "@/components/NewsLoader";

const Globe = dynamic(() => import("@/components/Globe"), { ssr: false });

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#040810]">
      <NewsLoader />
      <LoadingScreen />
      <NavBar />
      <CountrySearch />
      <Globe />
      <HoverNewsPopup />
      <NewsPanel />

      {/* Bottom hint */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] text-white/25 bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm">
          <span>🌍</span>
          Drag to explore · Scroll to zoom · Click a country for news
        </div>
      </div>
    </main>
  );
}
