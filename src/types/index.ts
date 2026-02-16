export interface NewsArticle {
  id: string;
  title: string;
  snippet: string;
  source: string;
  sourceUrl: string;
  category: NewsCategory;
  timestamp: string;
  imageUrl?: string;
  url: string;
  countryCode: string;
}

export type NewsCategory =
  | "politics"
  | "business"
  | "technology"
  | "sports"
  | "health"
  | "science"
  | "entertainment"
  | "environment"
  | "crime"
  | "education"
  | "lifestyle"
  | "opinion"
  | "world";

export interface CountryData {
  code: string;
  name: string;
  lat: number;
  lng: number;
  articles: NewsArticle[];
}
