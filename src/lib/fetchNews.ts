import { NewsArticle, NewsCategory, CountryData } from "@/types";

// ─── Country metadata ───────────────────────────────────────────────────────
export interface CountryMeta {
  code: string;
  name: string;
  lat: number;
  lng: number;
}

export const COUNTRIES: CountryMeta[] = [
  { code: "US", name: "United States", lat: 39.8, lng: -98.5 },
  { code: "GB", name: "United Kingdom", lat: 55.3, lng: -3.4 },
  { code: "FR", name: "France", lat: 46.2, lng: 2.2 },
  { code: "DE", name: "Germany", lat: 51.2, lng: 10.4 },
  { code: "JP", name: "Japan", lat: 36.2, lng: 138.3 },
  { code: "CN", name: "China", lat: 35.9, lng: 104.2 },
  { code: "IN", name: "India", lat: 20.6, lng: 79.0 },
  { code: "BR", name: "Brazil", lat: -14.2, lng: -51.9 },
  { code: "AU", name: "Australia", lat: -25.3, lng: 133.8 },
  { code: "NG", name: "Nigeria", lat: 9.1, lng: 8.7 },
  { code: "ZA", name: "South Africa", lat: -30.6, lng: 22.9 },
  { code: "EG", name: "Egypt", lat: 26.8, lng: 30.8 },
  { code: "SA", name: "Saudi Arabia", lat: 23.9, lng: 45.1 },
  { code: "KR", name: "South Korea", lat: 35.9, lng: 127.8 },
  { code: "MX", name: "Mexico", lat: 23.6, lng: -102.6 },
  { code: "RU", name: "Russia", lat: 61.5, lng: 105.3 },
  { code: "CA", name: "Canada", lat: 56.1, lng: -106.3 },
  { code: "KE", name: "Kenya", lat: -0.02, lng: 37.9 },
  { code: "IL", name: "Israel", lat: 31.0, lng: 34.9 },
  { code: "AR", name: "Argentina", lat: -38.4, lng: -63.6 },
  { code: "IT", name: "Italy", lat: 41.9, lng: 12.6 },
  { code: "ES", name: "Spain", lat: 40.5, lng: -3.7 },
  { code: "PL", name: "Poland", lat: 51.9, lng: 19.1 },
  { code: "NL", name: "Netherlands", lat: 52.1, lng: 5.3 },
  { code: "SE", name: "Sweden", lat: 60.1, lng: 18.6 },
  { code: "UA", name: "Ukraine", lat: 48.4, lng: 31.2 },
  { code: "CH", name: "Switzerland", lat: 46.8, lng: 8.2 },
  { code: "TR", name: "Turkey", lat: 38.9, lng: 35.2 },
  { code: "GR", name: "Greece", lat: 39.1, lng: 21.8 },
  { code: "NO", name: "Norway", lat: 60.5, lng: 8.5 },
  { code: "ID", name: "Indonesia", lat: -0.8, lng: 113.9 },
  { code: "TH", name: "Thailand", lat: 15.9, lng: 100.9 },
  { code: "VN", name: "Vietnam", lat: 14.1, lng: 108.3 },
  { code: "PH", name: "Philippines", lat: 12.9, lng: 121.8 },
  { code: "SG", name: "Singapore", lat: 1.4, lng: 103.8 },
  { code: "PK", name: "Pakistan", lat: 30.4, lng: 69.3 },
  { code: "BD", name: "Bangladesh", lat: 23.7, lng: 90.4 },
  { code: "MY", name: "Malaysia", lat: 4.2, lng: 101.9 },
  { code: "CO", name: "Colombia", lat: 4.6, lng: -74.1 },
  { code: "CL", name: "Chile", lat: -35.7, lng: -71.5 },
  { code: "PE", name: "Peru", lat: -9.2, lng: -75.0 },
  { code: "ET", name: "Ethiopia", lat: 9.1, lng: 40.5 },
  { code: "GH", name: "Ghana", lat: 7.9, lng: -1.0 },
  { code: "MA", name: "Morocco", lat: 31.8, lng: -7.1 },
  { code: "TZ", name: "Tanzania", lat: -6.4, lng: 34.9 },
  { code: "AE", name: "United Arab Emirates", lat: 23.4, lng: 53.8 },
  { code: "JO", name: "Jordan", lat: 30.6, lng: 36.2 },
  { code: "NZ", name: "New Zealand", lat: -40.9, lng: 174.9 },
];

// ─── Google News locale config ──────────────────────────────────────────────
// Countries with English Google News editions get direct feeds.
// Others use English search for the country name.
const ENGLISH_EDITIONS: Record<string, { hl: string; gl: string; ceid: string }> = {
  US: { hl: "en-US", gl: "US", ceid: "US:en" },
  GB: { hl: "en-GB", gl: "GB", ceid: "GB:en" },
  CA: { hl: "en-CA", gl: "CA", ceid: "CA:en" },
  AU: { hl: "en-AU", gl: "AU", ceid: "AU:en" },
  NZ: { hl: "en-NZ", gl: "NZ", ceid: "NZ:en" },
  IN: { hl: "en-IN", gl: "IN", ceid: "IN:en" },
  SG: { hl: "en-SG", gl: "SG", ceid: "SG:en" },
  PH: { hl: "en-PH", gl: "PH", ceid: "PH:en" },
  NG: { hl: "en-NG", gl: "NG", ceid: "NG:en" },
  KE: { hl: "en-KE", gl: "KE", ceid: "KE:en" },
  ZA: { hl: "en-ZA", gl: "ZA", ceid: "ZA:en" },
  GH: { hl: "en-GH", gl: "GH", ceid: "GH:en" },
  TZ: { hl: "en-TZ", gl: "TZ", ceid: "TZ:en" },
  PK: { hl: "en-PK", gl: "PK", ceid: "PK:en" },
  MY: { hl: "en-MY", gl: "MY", ceid: "MY:en" },
  AE: { hl: "en-AE", gl: "AE", ceid: "AE:en" },
  IL: { hl: "en-IL", gl: "IL", ceid: "IL:en" },
  BD: { hl: "en-BD", gl: "BD", ceid: "BD:en" },
  ET: { hl: "en-ET", gl: "ET", ceid: "ET:en" },
  EG: { hl: "en-EG", gl: "EG", ceid: "EG:en" },
  SA: { hl: "en-SA", gl: "SA", ceid: "SA:en" },
  JO: { hl: "en-JO", gl: "JO", ceid: "JO:en" },
};

// ─── Category inference ─────────────────────────────────────────────────────
const CATEGORY_RULES: [RegExp, NewsCategory][] = [
  [/election|parliament|congress|senat|president|minister|government|law\b|legislation|vote|policy|political|governor|mayor|cabinet|democrat|republican|party\b/i, "politics"],
  [/stock|market|econom|trade\b|gdp|bank\b|financ|invest|revenue|earning|profit|billion|million|startup|ipo\b|merger|acquisition|dow\b|nasdaq|s&p/i, "business"],
  [/\bai\b|tech|software|app\b|digital|cyber|robot|chip\b|semiconductor|quantum|machine.?learn|openai|google|apple|microsoft|meta\b|amazon|tesla|spacex/i, "technology"],
  [/football|soccer|basketball|cricket|tennis|match\b|tournament|championship|fifa|olympic|athlete|medal|sport|league|nfl|nba|mlb|f1\b|formula|rugby|boxing|mma|ufc/i, "sports"],
  [/health|medical|hospital|disease|vaccin|who\b|doctor|patient|drug\b|treatment|cancer|virus|pandemic|clinical|pharma|surgery|mental.?health/i, "health"],
  [/research|scientist|space\b|nasa|climate|discover|study\b|experiment|physic|biolog|species|fossil|planet|orbit|archaeolog|genome|coral|reef/i, "science"],
  [/movie|film\b|music|artist|album|concert|netflix|disney|series|celebrit|award|grammy|oscar|festival|show\b|entertainment|actor|singer|stream|spotify|box.?office/i, "entertainment"],
];

function inferCategory(title: string): NewsCategory {
  for (const [regex, category] of CATEGORY_RULES) {
    if (regex.test(title)) return category;
  }
  return "world";
}

// ─── RSS parsing ────────────────────────────────────────────────────────────
function extractTagContent(xml: string, tag: string): string {
  // Handle CDATA
  const cdataRegex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "i");
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1].trim();

  const simpleRegex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const simpleMatch = xml.match(simpleRegex);
  return simpleMatch ? simpleMatch[1].trim() : "";
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function extractImageFromDescription(rawHtml: string): string {
  const html = decodeHtmlEntities(rawHtml);
  const imgMatch = html.match(/src="([^"]+)"/);
  return imgMatch ? imgMatch[1] : "";
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function parseRSSItems(xml: string, countryCode: string): NewsArticle[] {
  const articles: NewsArticle[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  let idx = 0;

  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const fullTitle = extractTagContent(itemXml, "title");
    const link = extractTagContent(itemXml, "link");
    const pubDateStr = extractTagContent(itemXml, "pubDate");
    const description = extractTagContent(itemXml, "description");

    if (!fullTitle || !pubDateStr) continue;

    const pubDate = new Date(pubDateStr).getTime();
    if (isNaN(pubDate) || pubDate < oneDayAgo) continue;

    // Source from <source> tag or from title suffix
    const sourceTagMatch = itemXml.match(/<source[^>]*>([^<]+)<\/source>/i);
    const titleParts = fullTitle.split(" - ");
    const source = sourceTagMatch
      ? sourceTagMatch[1].trim()
      : titleParts.length > 1
        ? titleParts.pop()!.trim()
        : "Unknown";
    const title = titleParts.join(" - ").trim() || fullTitle;

    // Source URL from <source url="...">
    const sourceUrlMatch = itemXml.match(/<source\s+url="([^"]+)"/i);
    const sourceUrl = sourceUrlMatch ? sourceUrlMatch[1] : link;

    const imageUrl = extractImageFromDescription(description);
    // Extract clean snippet: decode HTML entities, strip tags, grab text
    const decodedDesc = decodeHtmlEntities(description);
    const snippet = stripHtml(decodedDesc).slice(0, 200);

    const id = `${countryCode.toLowerCase()}_${idx}`;

    articles.push({
      id,
      title,
      snippet,
      source,
      sourceUrl,
      category: inferCategory(title),
      timestamp: new Date(pubDateStr).toISOString(),
      imageUrl: imageUrl || `https://picsum.photos/seed/${id}_${Date.now()}/400/240`,
      url: link,
      countryCode,
    });

    idx++;
  }

  return articles;
}

// ─── Fetching ───────────────────────────────────────────────────────────────
const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/rss+xml, application/xml, text/xml, */*",
};

async function fetchWithTimeout(url: string, timeoutMs = 8000): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: FETCH_HEADERS,
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function getRSSUrl(code: string, countryName: string): string {
  const edition = ENGLISH_EDITIONS[code];
  if (edition) {
    return `https://news.google.com/rss?gl=${edition.gl}&hl=${edition.hl}&ceid=${edition.ceid}`;
  }
  // For non-English countries, search for country name in English
  const q = encodeURIComponent(countryName + " when:1d");
  return `https://news.google.com/rss/search?q=${q}&hl=en&gl=US&ceid=US:en`;
}

async function fetchCountryNews(
  code: string,
  name: string
): Promise<NewsArticle[]> {
  try {
    const url = getRSSUrl(code, name);
    const xml = await fetchWithTimeout(url);
    const articles = parseRSSItems(xml, code);
    return articles.slice(0, 15); // Cap at 15 articles per country
  } catch {
    return [];
  }
}

// Concurrency limiter
async function pMap<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency: number
): Promise<R[]> {
  const results: R[] = [];
  let idx = 0;

  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await fn(items[i]);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => worker()
  );
  await Promise.all(workers);
  return results;
}

export async function fetchAllNews(): Promise<{
  countries: CountryData[];
  trending: string[];
}> {
  const countryResults = await pMap(
    COUNTRIES,
    async (c) => {
      const articles = await fetchCountryNews(c.code, c.name);
      return { ...c, articles } as CountryData;
    },
    10 // Fetch 10 countries concurrently
  );

  // Only include countries that have articles
  const countriesWithNews = countryResults.filter((c) => c.articles.length > 0);

  // Generate trending headlines from top stories
  const trending = countriesWithNews
    .filter((c) => c.articles.length > 0)
    .map((c) => c.articles[0].title)
    .filter((t) => t.length > 20 && t.length < 100)
    .slice(0, 15);

  return { countries: countriesWithNews, trending };
}
