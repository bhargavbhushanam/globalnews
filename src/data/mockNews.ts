import { CountryData, NewsArticle } from "@/types";

const SOURCE_URLS: Record<string, string> = {
  "Reuters": "https://www.reuters.com",
  "AP News": "https://apnews.com",
  "AFP": "https://www.afp.com",
  "BBC News": "https://www.bbc.com/news",
  "The Guardian": "https://www.theguardian.com",
  "Washington Post": "https://www.washingtonpost.com",
  "ESPN": "https://www.espn.com",
  "Le Monde": "https://www.lemonde.fr",
  "Der Spiegel": "https://www.spiegel.de",
  "NHK": "https://www3.nhk.or.jp/nhkworld",
  "South China Morning Post": "https://www.scmp.com",
  "The Hindu": "https://www.thehindu.com",
  "ABC Australia": "https://www.abc.net.au/news",
  "Daily Nation": "https://nation.africa",
  "Mail & Guardian": "https://mg.co.za",
  "Al Jazeera": "https://www.aljazeera.com",
  "Haaretz": "https://www.haaretz.com",
  "CBC": "https://www.cbc.ca/news",
};

function article(
  id: string,
  countryCode: string,
  title: string,
  snippet: string,
  source: string,
  category: NewsArticle["category"],
  hoursAgo: number,
  imageId: number
): NewsArticle {
  const d = new Date();
  d.setHours(d.getHours() - hoursAgo);
  const sourceBase = SOURCE_URLS[source] || "https://news.google.com";
  return {
    id,
    title,
    snippet,
    source,
    sourceUrl: sourceBase,
    category,
    timestamp: d.toISOString(),
    imageUrl: `https://picsum.photos/seed/${id}/400/240`,
    url: `https://news.google.com/search?q=${encodeURIComponent(title + " " + source)}`,
    countryCode,
  };
}

export const mockCountries: CountryData[] = [
  {
    code: "US",
    name: "United States",
    lat: 39.8,
    lng: -98.5,
    articles: [
      article("us1", "US", "Federal Reserve Holds Interest Rates Steady Amid Inflation Concerns", "The Federal Reserve decided to maintain current interest rates, citing persistent inflation pressures and a resilient labor market.", "Reuters", "business", 1, 1),
      article("us2", "US", "NASA Artemis IV Mission Enters Final Testing Phase", "NASA engineers are conducting final systems checks on the Artemis IV spacecraft ahead of its planned lunar mission later this year.", "AP News", "science", 3, 2),
      article("us3", "US", "Supreme Court to Hear Landmark Digital Privacy Case", "The highest court will consider whether law enforcement needs warrants to access cloud-stored personal data.", "Washington Post", "politics", 5, 3),
      article("us4", "US", "Major Wildfire Contained in Northern California", "Firefighters have successfully contained a 50,000-acre wildfire that threatened several communities in Shasta County.", "AP News", "world", 7, 4),
      article("us5", "US", "NBA All-Star Weekend Draws Record Viewership", "This year's NBA All-Star game attracted 12 million viewers, the highest in a decade.", "ESPN", "sports", 9, 5),
    ],
  },
  {
    code: "GB",
    name: "United Kingdom",
    lat: 55.3,
    lng: -3.4,
    articles: [
      article("gb1", "GB", "UK Parliament Passes Sweeping AI Regulation Bill", "The landmark legislation establishes new oversight requirements for companies developing artificial intelligence systems.", "BBC News", "technology", 2, 10),
      article("gb2", "GB", "Bank of England Signals Potential Rate Cut in Spring", "Governor Andrew Bailey hinted at possible monetary easing as inflation approaches the 2% target.", "The Guardian", "business", 4, 11),
      article("gb3", "GB", "NHS Announces Major Investment in Mental Health Services", "A £2 billion funding package will expand access to mental health treatment across England and Wales.", "BBC News", "health", 6, 12),
      article("gb4", "GB", "Premier League Title Race Intensifies After Weekend Results", "Three teams are now separated by just two points at the top of the table with eight matches remaining.", "The Guardian", "sports", 8, 13),
    ],
  },
  {
    code: "FR",
    name: "France",
    lat: 46.2,
    lng: 2.2,
    articles: [
      article("fr1", "FR", "France Unveils €30 Billion Green Energy Investment Plan", "President announces massive funding for renewable energy infrastructure including nuclear and solar.", "Le Monde", "politics", 1, 20),
      article("fr2", "FR", "Paris Fashion Week Sets New Sustainability Standards", "Major fashion houses commit to carbon-neutral runway shows and sustainable materials.", "AFP", "entertainment", 5, 21),
      article("fr3", "FR", "French Farmers Block Highways in Protest Over EU Trade Deals", "Agricultural workers stage nationwide protests against cheaper imports they say undercut local production.", "Reuters", "business", 8, 22),
    ],
  },
  {
    code: "DE",
    name: "Germany",
    lat: 51.2,
    lng: 10.4,
    articles: [
      article("de1", "DE", "Germany's Industrial Output Rebounds Strongly in January", "Manufacturing sector shows strongest monthly growth in two years, driven by automotive and machinery exports.", "Reuters", "business", 2, 30),
      article("de2", "DE", "Bundesliga Introduces Video Referee Overhaul", "German football league announces comprehensive changes to VAR implementation starting next season.", "Der Spiegel", "sports", 6, 31),
      article("de3", "DE", "Berlin Startup Ecosystem Raises Record €8B in 2025", "Germany's capital cements its position as Europe's leading tech hub with unprecedented venture capital investment.", "Der Spiegel", "technology", 10, 32),
    ],
  },
  {
    code: "JP",
    name: "Japan",
    lat: 36.2,
    lng: 138.3,
    articles: [
      article("jp1", "JP", "Bank of Japan Raises Interest Rates for Third Time This Cycle", "The central bank continues its historic policy normalization as inflation stabilizes above target.", "NHK", "business", 1, 40),
      article("jp2", "JP", "Japan Launches Next-Generation Bullet Train on Tokyo-Osaka Route", "The new N700S Supreme travels at 360 km/h, cutting travel time between the two cities to under two hours.", "NHK", "technology", 4, 41),
      article("jp3", "JP", "Tokyo Olympics Legacy: Sports Participation Hits All-Time High", "Government data shows record numbers of Japanese citizens engaged in regular physical activity.", "NHK", "sports", 12, 42),
      article("jp4", "JP", "Japanese Scientists Achieve Breakthrough in Fusion Energy Research", "Researchers at NIFS sustain plasma at 150 million degrees for over 100 seconds, setting a new world record.", "Reuters", "science", 16, 43),
    ],
  },
  {
    code: "CN",
    name: "China",
    lat: 35.9,
    lng: 104.2,
    articles: [
      article("cn1", "CN", "China's Lunar Sample Return Mission Discovers New Mineral", "Scientists analyzing samples from Chang'e-7 identify a previously unknown crystalline structure.", "Reuters", "science", 3, 50),
      article("cn2", "CN", "Beijing Announces New Economic Stimulus Measures", "The State Council unveils a package of fiscal and monetary policies aimed at boosting consumer spending.", "AP News", "business", 6, 51),
      article("cn3", "CN", "Shenzhen Becomes World's First City with Fully Electric Bus Fleet", "The tech hub completes its transition to zero-emission public transportation across all routes.", "South China Morning Post", "technology", 9, 52),
    ],
  },
  {
    code: "IN",
    name: "India",
    lat: 20.6,
    lng: 79.0,
    articles: [
      article("in1", "IN", "India's Digital Public Infrastructure Model Adopted by 15 More Nations", "The UPI-based payment system framework is being replicated across Africa and Southeast Asia.", "The Hindu", "technology", 2, 60),
      article("in2", "IN", "Chandrayaan-4 Mission Approved with ₹20,000 Crore Budget", "ISRO's ambitious moon sample return mission receives government funding for 2027 launch.", "The Hindu", "science", 5, 61),
      article("in3", "IN", "Indian Premier League Breaks Global Streaming Records", "IPL 2026 opener attracts 35 million concurrent viewers on JioCinema, surpassing all previous records.", "Reuters", "sports", 8, 62),
      article("in4", "IN", "New Delhi Implements Emergency Air Quality Measures", "The capital restricts vehicle movement and construction as AQI levels exceed 400 for the third consecutive day.", "AP News", "health", 11, 63),
    ],
  },
  {
    code: "BR",
    name: "Brazil",
    lat: -14.2,
    lng: -51.9,
    articles: [
      article("br1", "BR", "Amazon Deforestation Falls to 15-Year Low Under New Enforcement", "Satellite data confirms a 40% reduction in forest clearing compared to the previous year.", "Reuters", "world", 3, 70),
      article("br2", "BR", "Brazil's Central Bank Cuts Rates as Inflation Cools", "The Selic rate is reduced by 50 basis points to 9.75%, signaling confidence in economic stability.", "AFP", "business", 7, 71),
      article("br3", "BR", "São Paulo Hosts World's Largest Street Carnival", "An estimated 6 million revelers participate in this year's Carnival celebrations across the city.", "AP News", "entertainment", 14, 72),
    ],
  },
  {
    code: "AU",
    name: "Australia",
    lat: -25.3,
    lng: 133.8,
    articles: [
      article("au1", "AU", "Great Barrier Reef Shows Signs of Recovery After Coral Restoration", "Marine biologists report a 20% increase in coral coverage following large-scale reef restoration efforts.", "ABC Australia", "science", 4, 80),
      article("au2", "AU", "Australia Passes Landmark Social Media Age Verification Law", "Users under 16 will be required to verify their age to access social media platforms starting July.", "ABC Australia", "technology", 8, 81),
      article("au3", "AU", "Sydney Housing Market Sees First Price Decline in Three Years", "Median house prices fall 2.3% as interest rate effects and increased supply take hold.", "ABC Australia", "business", 12, 82),
    ],
  },
  {
    code: "NG",
    name: "Nigeria",
    lat: 9.1,
    lng: 8.7,
    articles: [
      article("ng1", "NG", "Nigeria's Fintech Sector Attracts $2B in Foreign Investment", "Lagos-based startups lead Africa's financial technology revolution with record funding rounds.", "Reuters", "technology", 5, 90),
      article("ng2", "NG", "Nollywood Surpasses Bollywood in Annual Film Production", "Nigeria's film industry produced over 2,500 titles last year, making it the world's second-largest by volume.", "AFP", "entertainment", 10, 91),
      article("ng3", "NG", "Lagos Metro Blue Line Extension Opens to 500,000 Daily Commuters", "The expanded rail network reduces average commute times by 45 minutes across the megacity.", "Daily Nation", "world", 18, 92),
    ],
  },
  {
    code: "ZA",
    name: "South Africa",
    lat: -30.6,
    lng: 22.9,
    articles: [
      article("za1", "ZA", "South Africa's Renewable Energy Auctions Draw Record Bids", "International investors commit R85 billion to new solar and wind projects as load shedding ends.", "Mail & Guardian", "business", 3, 100),
      article("za2", "ZA", "Springboks Announce Squad for Historic Five-Nation Tour", "The world champions will face four top-10 teams in a grueling autumn schedule.", "Mail & Guardian", "sports", 9, 101),
    ],
  },
  {
    code: "EG",
    name: "Egypt",
    lat: 26.8,
    lng: 30.8,
    articles: [
      article("eg1", "EG", "Egypt Opens New Administrative Capital with Major Government Relocation", "Thousands of civil servants begin working in the purpose-built city east of Cairo.", "Al Jazeera", "politics", 6, 110),
      article("eg2", "EG", "Suez Canal Revenue Hits Record as Global Trade Normalizes", "The waterway processes a record 25,000 vessels in 2025, generating $9.4 billion in revenue.", "Reuters", "business", 14, 111),
    ],
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    lat: 23.9,
    lng: 45.1,
    articles: [
      article("sa1", "SA", "Saudi Arabia's NEOM Project Reaches Construction Milestone", "The $500 billion megacity project completes its first residential zone ahead of schedule.", "Reuters", "business", 4, 120),
      article("sa2", "SA", "Kingdom Hosts First Major International Film Festival", "Riyadh welcomes filmmakers from 60 countries for the inaugural Red Sea International Film Festival.", "Al Jazeera", "entertainment", 11, 121),
    ],
  },
  {
    code: "KR",
    name: "South Korea",
    lat: 35.9,
    lng: 127.8,
    articles: [
      article("kr1", "KR", "Samsung Unveils Revolutionary Solid-State Battery for EVs", "The new battery technology promises 600-mile range and 10-minute charging times.", "Reuters", "technology", 2, 130),
      article("kr2", "KR", "South Korea's Birth Rate Hits New Record Low Despite Incentives", "Government data shows fertility rate dropping to 0.65, prompting calls for more aggressive policy responses.", "AP News", "politics", 7, 131),
      article("kr3", "KR", "K-Pop Industry Revenue Surpasses $12 Billion Globally", "The cultural export continues its explosive growth with record concert and merchandise sales.", "AFP", "entertainment", 15, 132),
    ],
  },
  {
    code: "MX",
    name: "Mexico",
    lat: 23.6,
    lng: -102.6,
    articles: [
      article("mx1", "MX", "Mexico Becomes World's Top Nearshoring Destination", "Foreign direct investment surges 35% as manufacturers relocate supply chains from Asia.", "Reuters", "business", 3, 140),
      article("mx2", "MX", "Mexico City Metro Expansion Connects 3 Million More Residents", "The new Line 4 extension opens, dramatically reducing commute times in the capital's eastern districts.", "AP News", "world", 10, 141),
    ],
  },
  {
    code: "RU",
    name: "Russia",
    lat: 61.5,
    lng: 105.3,
    articles: [
      article("ru1", "RU", "Russia's Arctic Shipping Route Sees Record Traffic", "The Northern Sea Route handles 40 million tons of cargo as ice-free periods lengthen.", "Reuters", "business", 5, 150),
      article("ru2", "RU", "Russian Scientists Map New Deep-Sea Species in Lake Baikal", "Researchers discover 12 previously unknown species in the world's deepest freshwater lake.", "AFP", "science", 13, 151),
    ],
  },
  {
    code: "CA",
    name: "Canada",
    lat: 56.1,
    lng: -106.3,
    articles: [
      article("ca1", "CA", "Canada Announces Universal Pharmacare Program Launch Date", "The federal government confirms nationwide prescription drug coverage will begin in September.", "CBC", "health", 2, 160),
      article("ca2", "CA", "Toronto AI Corridor Attracts Major Tech Investments", "Three global AI companies announce Canadian headquarters, creating 5,000 new jobs.", "CBC", "technology", 8, 161),
      article("ca3", "CA", "Canadian Wildfires: Early Season Outlook Raises Concerns", "Meteorologists warn that dry conditions could lead to another severe wildfire season in western provinces.", "CBC", "world", 15, 162),
    ],
  },
  {
    code: "KE",
    name: "Kenya",
    lat: -0.02,
    lng: 37.9,
    articles: [
      article("ke1", "KE", "Kenya's M-Pesa Processes $1 Trillion in Annual Transactions", "The mobile money platform reaches a historic milestone, serving over 50 million active users.", "Daily Nation", "technology", 4, 170),
      article("ke2", "KE", "Nairobi Emerges as Africa's Leading Tech Hub", "The Kenyan capital attracts more startup funding than any other African city for the third consecutive year.", "Reuters", "business", 12, 171),
    ],
  },
  {
    code: "IL",
    name: "Israel",
    lat: 31.0,
    lng: 34.9,
    articles: [
      article("il1", "IL", "Israeli Desalination Technology Deployed Across Mediterranean Region", "Water-scarce nations adopt Israeli-developed reverse osmosis systems for municipal water supply.", "Haaretz", "technology", 6, 180),
      article("il2", "IL", "Tel Aviv Stock Exchange Reaches All-Time High", "The benchmark TA-35 index surges on strong tech sector earnings and foreign investment inflows.", "Reuters", "business", 11, 181),
    ],
  },
  {
    code: "AR",
    name: "Argentina",
    lat: -38.4,
    lng: -63.6,
    articles: [
      article("ar1", "AR", "Argentina's Lithium Production Doubles as Global EV Demand Soars", "The country's 'lithium triangle' region attracts $4 billion in new mining investments.", "Reuters", "business", 3, 190),
      article("ar2", "AR", "Buenos Aires Named World's Best City for Street Food", "The Argentine capital's diverse culinary scene earns top honors in an international food survey.", "AFP", "entertainment", 14, 191),
    ],
  },
];

export const trendingHeadlines = [
  "Federal Reserve Holds Rates Steady",
  "UK Passes AI Regulation Bill",
  "Japan Launches Next-Gen Bullet Train",
  "Amazon Deforestation Falls to 15-Year Low",
  "Samsung Unveils Solid-State Battery",
  "India's UPI Adopted by 15 Nations",
  "Great Barrier Reef Shows Recovery",
  "France Unveils €30B Green Energy Plan",
  "NEOM Reaches Construction Milestone",
  "Nigeria Fintech Attracts $2B Investment",
];

export function getCountryByCode(code: string): CountryData | undefined {
  return mockCountries.find((c) => c.code === code);
}

export function getAllCountryCodes(): string[] {
  return mockCountries.map((c) => c.code);
}
