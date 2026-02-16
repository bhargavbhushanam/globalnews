"use client";

import { useEffect, useRef } from "react";
import { useGlobeStore } from "@/store/useGlobeStore";
import { mockCountries, trendingHeadlines as mockTrending } from "@/data/mockNews";
import { CountryData } from "@/types";

const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

export default function NewsLoader() {
  const {
    setCountries,
    setTrendingHeadlines,
    setNewsLoading,
    setNewsError,
    setLastFetched,
    lastFetched,
  } = useGlobeStore();
  const fetchingRef = useRef(false);

  useEffect(() => {
    // Load mock data immediately so the globe has something to show
    setCountries(mockCountries);
    setTrendingHeadlines(mockTrending);

    async function fetchNews() {
      if (fetchingRef.current) return;
      fetchingRef.current = true;
      setNewsLoading(true);
      setNewsError(false);

      try {
        const res = await fetch("/api/news");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: { countries: CountryData[]; trending: string[] } =
          await res.json();

        if (data.countries.length > 0) {
          setCountries(data.countries);
        }
        if (data.trending.length > 0) {
          setTrendingHeadlines(data.trending);
        }
        setLastFetched(Date.now());
      } catch (err) {
        console.error("Failed to fetch live news, using mock data:", err);
        setNewsError(true);
        // Mock data already loaded, so the app still works
      } finally {
        setNewsLoading(false);
        fetchingRef.current = false;
      }
    }

    fetchNews();

    // Refresh every 15 minutes
    const interval = setInterval(fetchNews, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null; // This component renders nothing
}
