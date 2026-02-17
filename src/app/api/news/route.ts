import { fetchAllNews } from "@/lib/fetchNews";
import { CountryData } from "@/types";

// In-memory cache
let cache: {
  data: { countries: CountryData[]; trending: string[] };
  timestamp: number;
} | null = null;

const CACHE_TTL = 20 * 60 * 1000; // 20 minutes (heavier fetch with topic feeds)

export async function GET() {
  // Return cached data if fresh
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return Response.json(cache.data, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
        "X-Cache": "HIT",
      },
    });
  }

  try {
    const data = await fetchAllNews();
    cache = { data, timestamp: Date.now() };

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("Failed to fetch news:", error);

    // Return stale cache if available
    if (cache) {
      return Response.json(cache.data, {
        headers: { "X-Cache": "STALE" },
      });
    }

    return Response.json(
      { countries: [], trending: [] },
      { status: 500 }
    );
  }
}
