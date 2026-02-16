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
  "La Repubblica": "https://www.repubblica.it",
  "El País": "https://elpais.com",
  "Straits Times": "https://www.straitstimes.com",
  "Bangkok Post": "https://www.bangkokpost.com",
  "NZ Herald": "https://www.nzherald.co.nz",
  "The News International": "https://www.thenews.com.pk",
  "Dhaka Tribune": "https://www.dhakatribune.com",
  "Jakarta Post": "https://www.thejakartapost.com",
  "VnExpress": "https://e.vnexpress.net",
  "Philippine Star": "https://www.philstar.com",
  "Malay Mail": "https://www.malaymail.com",
  "El Tiempo": "https://www.eltiempo.com",
  "Ghana Web": "https://www.ghanaweb.com",
  "Daily Star": "https://www.thedailystar.net",
  "Jordan Times": "https://www.jordantimes.com",
  "The National": "https://www.thenationalnews.com",
  "Kathimerini": "https://www.ekathimerini.com",
  "Aftenposten": "https://www.aftenposten.no",
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
  // ===================== NEW COUNTRIES =====================
  // EUROPE
  {
    code: "IT",
    name: "Italy",
    lat: 41.9,
    lng: 12.6,
    articles: [
      article("it1", "IT", "Venice Film Festival Awards Golden Lion to Italian Director's AI Drama", "The critically acclaimed film explores the ethics of artificial intelligence through a deeply human lens.", "La Repubblica", "entertainment", 2, 200),
      article("it2", "IT", "Serie A Introduces Salary Cap for 2026-27 Season", "Italian football's governing body votes to implement spending limits to improve competitive balance.", "Reuters", "sports", 5, 201),
      article("it3", "IT", "Italy Approves €12 Billion Plan to Restore Crumbling Infrastructure", "The government allocates funds for bridge, tunnel, and highway repairs across the southern regions.", "La Repubblica", "politics", 9, 202),
      article("it4", "IT", "Italian Researchers Develop New Olive Oil Compound That Fights Inflammation", "Scientists at the University of Naples identify a polyphenol with significant anti-inflammatory properties.", "Reuters", "health", 14, 203),
    ],
  },
  {
    code: "ES",
    name: "Spain",
    lat: 40.5,
    lng: -3.7,
    articles: [
      article("es1", "ES", "Spain's Renewable Energy Output Surpasses 60% of Total Grid Supply", "Wind and solar generation set new records as the country accelerates its clean energy transition.", "El País", "science", 1, 205),
      article("es2", "ES", "La Liga Announces Global Streaming Deal Worth €4.8 Billion", "Spanish football secures its most lucrative broadcast agreement, rivaling the Premier League.", "El País", "sports", 4, 206),
      article("es3", "ES", "Barcelona Hosts World Mobile Congress with Record 120,000 Attendees", "The annual tech event showcases breakthroughs in 6G connectivity and wearable AI devices.", "Reuters", "technology", 8, 207),
      article("es4", "ES", "Spain Launches National Mental Health Hotline for Young People", "The government introduces a 24/7 support line amid rising anxiety and depression rates among teens.", "El País", "health", 13, 208),
    ],
  },
  {
    code: "PL",
    name: "Poland",
    lat: 51.9,
    lng: 19.1,
    articles: [
      article("pl1", "PL", "Poland's Gaming Industry Revenue Tops €3 Billion", "CD Projekt and a wave of indie studios cement the country's status as a European gaming powerhouse.", "Reuters", "entertainment", 3, 210),
      article("pl2", "PL", "Warsaw Metro Expansion Reaches City's Eastern Districts", "The third metro line project breaks ground, promising to connect 800,000 additional residents.", "AP News", "world", 7, 211),
      article("pl3", "PL", "Polish Scientists Discover New High-Temperature Superconductor Material", "Researchers at the University of Warsaw achieve superconductivity at minus 23 degrees Celsius.", "AFP", "science", 12, 212),
      article("pl4", "PL", "Poland Qualifies for 2026 FIFA World Cup with Dominant Campaign", "The national team secures qualification with two matches to spare after a 3-0 victory over Austria.", "Reuters", "sports", 18, 213),
    ],
  },
  {
    code: "NL",
    name: "Netherlands",
    lat: 52.1,
    lng: 5.3,
    articles: [
      article("nl1", "NL", "Dutch Engineers Complete World's Largest Floating Solar Farm", "The 300-megawatt installation on a former mining lake sets a new benchmark for aquatic renewables.", "Reuters", "technology", 2, 215),
      article("nl2", "NL", "Amsterdam Dance Event Draws 500,000 Electronic Music Fans", "The annual festival expands to a full week of programming across 200 venues in the Dutch capital.", "AFP", "entertainment", 6, 216),
      article("nl3", "NL", "Netherlands Announces Universal Four-Day Work Week Pilot", "The government will trial a reduced work week across public sector agencies starting in September.", "BBC News", "politics", 10, 217),
      article("nl4", "NL", "Dutch Speed Skating Team Unveils AI-Optimized Training Program", "National coaches partner with Eindhoven University to use machine learning for performance analysis.", "Reuters", "sports", 15, 218),
    ],
  },
  {
    code: "SE",
    name: "Sweden",
    lat: 60.1,
    lng: 18.6,
    articles: [
      article("se1", "SE", "Sweden's Green Steel Plant Begins Commercial Production", "H2 Green Steel's Boden facility ships its first carbon-free steel, a milestone for heavy industry decarbonization.", "Reuters", "science", 3, 220),
      article("se2", "SE", "Stockholm Named Europe's Top Startup City for Fifth Consecutive Year", "The Swedish capital produces more unicorns per capita than any other European city.", "AFP", "business", 7, 221),
      article("se3", "SE", "Swedish Pop Sensation Breaks Spotify's Single-Day Streaming Record", "The debut single from the Stockholm-based artist amasses 45 million streams in 24 hours.", "BBC News", "entertainment", 11, 222),
    ],
  },
  {
    code: "UA",
    name: "Ukraine",
    lat: 48.4,
    lng: 31.2,
    articles: [
      article("ua1", "UA", "Ukraine's Tech Sector Grows 25% Despite Ongoing Challenges", "Remote-first companies and defense tech startups drive resilient economic growth in the digital sector.", "Reuters", "technology", 2, 225),
      article("ua2", "UA", "Kyiv Hosts International Reconstruction Conference", "Donor nations pledge $45 billion for infrastructure rebuilding and economic recovery programs.", "AP News", "world", 6, 226),
      article("ua3", "UA", "Ukrainian Gymnast Wins Gold at European Championships", "The 19-year-old athlete's floor routine earns a perfect 15.0 in a historic performance.", "AFP", "sports", 10, 227),
      article("ua4", "UA", "Ukraine Launches National Digital Health Records System", "The Ministry of Health rolls out electronic medical records accessible to all citizens via smartphone.", "BBC News", "health", 16, 228),
    ],
  },
  {
    code: "CH",
    name: "Switzerland",
    lat: 46.8,
    lng: 8.2,
    articles: [
      article("ch1", "CH", "CERN Scientists Observe New Particle Consistent with Theoretical Predictions", "The Large Hadron Collider experiment detects a tetraquark state that could reshape quantum physics models.", "Reuters", "science", 1, 230),
      article("ch2", "CH", "Swiss Voters Approve Universal Basic Income Pilot in Geneva", "The canton becomes the first in the world to trial a government-funded basic income program.", "AFP", "politics", 5, 231),
      article("ch3", "CH", "Roger Federer Foundation Opens 100th School in Southern Africa", "The tennis legend's charity reaches its milestone goal of providing education to 250,000 children.", "AP News", "world", 9, 232),
      article("ch4", "CH", "Zurich Film Festival Premieres Oscar-Tipped Documentary on Climate Migration", "The feature-length film follows families displaced by rising sea levels across three continents.", "AFP", "entertainment", 14, 233),
    ],
  },
  {
    code: "TR",
    name: "Turkey",
    lat: 38.9,
    lng: 35.2,
    articles: [
      article("tr1", "TR", "Istanbul's New Airport Becomes World's Busiest by Passenger Volume", "The mega-hub handles 105 million passengers in 2025, overtaking Dubai International.", "Reuters", "business", 3, 235),
      article("tr2", "TR", "Turkish Space Agency Successfully Launches Observation Satellite", "The domestically built GOKTURK-4 satellite enters orbit, boosting national surveillance capabilities.", "AP News", "science", 7, 236),
      article("tr3", "TR", "Galatasaray Reaches Champions League Semi-Finals for First Time in 25 Years", "The Istanbul club stuns defending champions with a dramatic aggregate victory.", "AFP", "sports", 11, 237),
      article("tr4", "TR", "Turkey Unveils Massive Earthquake-Resistant Housing Program", "The government commits $20 billion to rebuild and retrofit homes across seismic zones.", "Al Jazeera", "world", 17, 238),
    ],
  },
  {
    code: "GR",
    name: "Greece",
    lat: 39.1,
    lng: 21.8,
    articles: [
      article("gr1", "GR", "Greece's Tourism Revenue Reaches Record €25 Billion in 2025", "The Mediterranean nation welcomes 35 million visitors despite efforts to manage overtourism.", "Kathimerini", "business", 2, 240),
      article("gr2", "GR", "Ancient Greek Shipwreck Yields Unprecedented Archaeological Finds", "Divers recover 2,400-year-old bronze statues and pottery from a wreck near the island of Antikythera.", "Kathimerini", "science", 6, 241),
      article("gr3", "GR", "Athens Launches Free Public Wi-Fi Network Across Historic Center", "The initiative aims to boost digital access for residents and tourists in the capital's core neighborhoods.", "Reuters", "technology", 12, 242),
    ],
  },
  {
    code: "NO",
    name: "Norway",
    lat: 60.5,
    lng: 8.5,
    articles: [
      article("no1", "NO", "Norway's Sovereign Wealth Fund Surpasses $2 Trillion in Assets", "The world's largest sovereign fund reports record returns driven by technology and renewable energy holdings.", "Aftenposten", "business", 1, 245),
      article("no2", "NO", "Norwegian Researchers Map New Deep-Sea Coral Ecosystem in Arctic", "Marine biologists discover a thriving coral reef system 400 meters below the Barents Sea surface.", "Aftenposten", "science", 5, 246),
      article("no3", "NO", "Oslo Becomes First Capital to Ban All Fossil Fuel Vehicles from City Center", "The comprehensive restriction covers private cars, taxis, and delivery vehicles within the ring road.", "Reuters", "world", 9, 247),
      article("no4", "NO", "Norway Dominates Biathlon World Championships with Seven Gold Medals", "The national team delivers its best-ever performance at the annual winter event.", "AFP", "sports", 14, 248),
    ],
  },
  // ASIA
  {
    code: "ID",
    name: "Indonesia",
    lat: -0.8,
    lng: 113.9,
    articles: [
      article("id1", "ID", "Indonesia's New Capital Nusantara Welcomes First Government Offices", "Civil servants begin relocating to the purpose-built city on Borneo as Jakarta congestion worsens.", "Jakarta Post", "politics", 2, 250),
      article("id2", "ID", "Bali Introduces Tourist Levy to Fund Environmental Conservation", "Visitors will pay a $10 entry fee to support coral reef restoration and waste management programs.", "Jakarta Post", "world", 6, 251),
      article("id3", "ID", "Indonesian Badminton Star Clinches All England Open Title", "The 22-year-old phenom defeats the world number one in a five-game thriller at Birmingham.", "Reuters", "sports", 10, 252),
      article("id4", "ID", "Jakarta Startup Raises $500 Million for Electric Motorcycle Network", "The ride-hailing company plans to deploy 200,000 electric scooters across Southeast Asian cities.", "Jakarta Post", "technology", 16, 253),
    ],
  },
  {
    code: "TH",
    name: "Thailand",
    lat: 15.9,
    lng: 100.9,
    articles: [
      article("th1", "TH", "Thailand Legalizes Same-Sex Marriage in Historic Parliamentary Vote", "The landmark legislation makes Thailand the first Southeast Asian nation to guarantee marriage equality.", "Bangkok Post", "politics", 1, 255),
      article("th2", "TH", "Thai Film Wins Palme d'Or at Cannes Film Festival", "The haunting drama about rural life in Isan province earns Thailand's first top prize at Cannes.", "Bangkok Post", "entertainment", 5, 256),
      article("th3", "TH", "Bangkok Launches Mass Rapid Transit Orange Line", "The new 35-kilometer rail line connects the capital's eastern suburbs to the city center.", "Bangkok Post", "world", 9, 257),
      article("th4", "TH", "Thailand's Medical Tourism Industry Surpasses $8 Billion", "International patients flock to Thai hospitals for affordable high-quality healthcare procedures.", "Reuters", "health", 14, 258),
    ],
  },
  {
    code: "VN",
    name: "Vietnam",
    lat: 14.1,
    lng: 108.3,
    articles: [
      article("vn1", "VN", "Vietnam Overtakes Bangladesh as World's Second-Largest Garment Exporter", "Textile and apparel exports reach $48 billion as global brands diversify supply chains.", "VnExpress", "business", 2, 260),
      article("vn2", "VN", "Ho Chi Minh City Metro Opens After Years of Delays", "The first metro line begins operations, carrying 200,000 passengers daily on its inaugural route.", "VnExpress", "world", 6, 261),
      article("vn3", "VN", "Vietnamese AI Startup Wins Global Healthcare Innovation Prize", "The Hanoi-based company's diagnostic tool for tropical diseases earns recognition at the Web Summit.", "VnExpress", "technology", 11, 262),
      article("vn4", "VN", "Vietnam's Football League Attracts First Major European Coach", "A former Serie A manager signs on to lead the V-League's most decorated club.", "Reuters", "sports", 17, 263),
    ],
  },
  {
    code: "PH",
    name: "Philippines",
    lat: 12.9,
    lng: 121.8,
    articles: [
      article("ph1", "PH", "Philippines Launches Massive Typhoon-Resilient Housing Program", "The government commits 200 billion pesos to build storm-proof homes in the most vulnerable provinces.", "Philippine Star", "world", 2, 265),
      article("ph2", "PH", "Filipino Boxer Wins WBC World Title in Las Vegas", "The 24-year-old fighter earns a unanimous decision to claim the bantamweight championship belt.", "Philippine Star", "sports", 5, 266),
      article("ph3", "PH", "Philippine Coral Triangle Expedition Discovers New Marine Species", "Researchers catalog 45 previously unknown fish and invertebrate species in the biodiversity hotspot.", "Reuters", "science", 10, 267),
      article("ph4", "PH", "Manila's Booming BPO Sector Adds 150,000 Jobs in First Quarter", "The business process outsourcing industry continues its expansion into AI-assisted services.", "Philippine Star", "business", 16, 268),
    ],
  },
  {
    code: "SG",
    name: "Singapore",
    lat: 1.4,
    lng: 103.8,
    articles: [
      article("sg1", "SG", "Singapore Unveils Plan to Become World's First AI-Governed Smart City", "The government announces a comprehensive strategy to integrate AI into all public services by 2028.", "Straits Times", "technology", 1, 270),
      article("sg2", "SG", "Changi Airport Terminal 5 Opens with Capacity for 50 Million Passengers", "The long-awaited expansion makes Singapore's airport one of the largest aviation hubs in the world.", "Straits Times", "business", 4, 271),
      article("sg3", "SG", "Singapore Grand Prix Extended Through 2030 in New Formula 1 Deal", "The Marina Bay Street Circuit night race secures a long-term contract with F1 organizers.", "Straits Times", "sports", 8, 272),
      article("sg4", "SG", "Singapore Scientists Develop Lab-Grown Shrimp at Commercial Scale", "The cultured seafood startup secures regulatory approval and plans to supply local restaurants.", "Reuters", "science", 13, 273),
    ],
  },
  {
    code: "PK",
    name: "Pakistan",
    lat: 30.4,
    lng: 69.3,
    articles: [
      article("pk1", "PK", "Pakistan's IT Exports Cross $5 Billion Milestone for First Time", "The technology sector emerges as the country's fastest-growing export category.", "The News International", "technology", 2, 275),
      article("pk2", "PK", "Pakistan Cricket Board Announces Franchise League Expansion", "The Pakistan Super League adds two new teams as broadcast revenues surge.", "The News International", "sports", 6, 276),
      article("pk3", "PK", "Lahore Launches South Asia's Largest Urban Reforestation Project", "The city plants 5 million trees across parks, highways, and riverbanks to combat heat island effects.", "The News International", "science", 11, 277),
      article("pk4", "PK", "Pakistan Polio Campaign Reports Zero New Cases for Six Months", "Health officials celebrate a major milestone in the decades-long effort to eradicate the disease.", "Reuters", "health", 16, 278),
    ],
  },
  {
    code: "BD",
    name: "Bangladesh",
    lat: 23.7,
    lng: 90.4,
    articles: [
      article("bd1", "BD", "Bangladesh Launches First Satellite-Based Flood Warning System", "The early warning network aims to give 48 hours advance notice to vulnerable river communities.", "Dhaka Tribune", "technology", 3, 280),
      article("bd2", "BD", "Dhaka Stock Exchange Posts Record Gains on Garment Sector Earnings", "The benchmark index rises 18% year-to-date as textile exports continue their strong performance.", "Dhaka Tribune", "business", 7, 281),
      article("bd3", "BD", "Bangladesh Women's Cricket Team Reaches First-Ever World Cup Semi-Final", "The team defeats New Zealand in a thrilling group stage match to advance.", "Daily Star", "sports", 12, 282),
      article("bd4", "BD", "Sundarbans Mangrove Restoration Covers 10,000 New Hectares", "The conservation program helps protect coastal communities from cyclones and rising sea levels.", "Dhaka Tribune", "science", 18, 283),
    ],
  },
  {
    code: "MY",
    name: "Malaysia",
    lat: 4.2,
    lng: 101.9,
    articles: [
      article("my1", "MY", "Malaysia's Semiconductor Industry Attracts $15 Billion in New Investments", "Global chip manufacturers expand production facilities in Penang and Kulim.", "Malay Mail", "business", 2, 285),
      article("my2", "MY", "Kuala Lumpur Tower Wins World's Best Tall Building Award", "The 500-meter Merdeka 118 skyscraper earns recognition for its sustainable design features.", "Malay Mail", "world", 6, 286),
      article("my3", "MY", "Malaysian Badminton Legend Announces Comeback for Paris 2028 Olympics", "The former world champion declares fitness after a two-year injury layoff.", "Malay Mail", "sports", 10, 287),
      article("my4", "MY", "Malaysia Rolls Out Free HPV Vaccination for All School-Age Children", "The expanded immunization program targets boys and girls aged 9 to 15 nationwide.", "Reuters", "health", 15, 288),
    ],
  },
  // AMERICAS
  {
    code: "CO",
    name: "Colombia",
    lat: 4.6,
    lng: -74.1,
    articles: [
      article("co1", "CO", "Colombia's Coffee Exports Hit Record as Global Prices Surge", "The country ships 14 million bags of arabica beans, benefiting from supply shortages elsewhere.", "El Tiempo", "business", 2, 290),
      article("co2", "CO", "Bogota Opens Latin America's Largest Urban Cable Car Network", "The new TransMiCable lines connect hillside communities to the city's transit network.", "El Tiempo", "world", 5, 291),
      article("co3", "CO", "Colombian Singer Sweeps Latin Grammy Awards with Five Wins", "The Medellin-born artist wins Album of the Year and Record of the Year in the same night.", "El Tiempo", "entertainment", 9, 292),
      article("co4", "CO", "Colombia's Amazon Biodiversity Survey Catalogs 1,200 New Species", "A three-year expedition reveals hundreds of previously unknown plants, insects, and amphibians.", "Reuters", "science", 15, 293),
    ],
  },
  {
    code: "CL",
    name: "Chile",
    lat: -35.7,
    lng: -71.5,
    articles: [
      article("cl1", "CL", "Chile's Atacama Desert Hosts World's Largest Telescope First Light", "The Extremely Large Telescope captures its initial images, peering deeper into the universe than ever before.", "Reuters", "science", 1, 295),
      article("cl2", "CL", "Santiago Metro Becomes First in South America to Run Entirely on Renewables", "The system's 140 stations are now powered exclusively by solar and wind energy.", "AP News", "technology", 5, 296),
      article("cl3", "CL", "Chilean Wine Industry Shifts to Higher-Altitude Vineyards Amid Climate Change", "Winemakers relocate production to cooler elevations as traditional valleys grow too warm.", "AFP", "business", 10, 297),
    ],
  },
  {
    code: "PE",
    name: "Peru",
    lat: -9.2,
    lng: -75.0,
    articles: [
      article("pe1", "PE", "Peru's Machu Picchu Introduces AI-Powered Visitor Management System", "The new technology limits daily entries and optimizes crowd flow at the ancient citadel.", "Reuters", "technology", 3, 300),
      article("pe2", "PE", "Lima Named World's Best Culinary Destination for Third Consecutive Year", "The Peruvian capital's diverse gastronomy scene continues to dominate international food rankings.", "AFP", "entertainment", 7, 301),
      article("pe3", "PE", "Peruvian Archaeologists Uncover New Nazca Lines Using Drone Survey", "Over 160 previously unseen geoglyphs are revealed in the desert through aerial imaging technology.", "AP News", "science", 12, 302),
    ],
  },
  // AFRICA
  {
    code: "ET",
    name: "Ethiopia",
    lat: 9.1,
    lng: 40.5,
    articles: [
      article("et1", "ET", "Ethiopia's Grand Renaissance Dam Begins Full Power Generation", "The 6,000-megawatt hydroelectric project reaches operational capacity after more than a decade of construction.", "Al Jazeera", "world", 2, 305),
      article("et2", "ET", "Ethiopian Airlines Becomes Africa's First Carbon-Neutral Carrier", "The airline achieves net-zero emissions through fleet modernization and sustainable fuel adoption.", "Reuters", "business", 6, 306),
      article("et3", "ET", "Addis Ababa Marathon Attracts Record 60,000 Runners", "The annual race through the Ethiopian capital draws participants from 85 countries.", "AFP", "sports", 11, 307),
      article("et4", "ET", "Ethiopian Coffee Ceremony Receives UNESCO Intangible Heritage Status", "The centuries-old tradition is recognized as a significant cultural practice worth preserving.", "AP News", "entertainment", 17, 308),
    ],
  },
  {
    code: "GH",
    name: "Ghana",
    lat: 7.9,
    lng: -1.0,
    articles: [
      article("gh1", "GH", "Ghana's Year of Return Sequel Campaign Draws 1 Million Diaspora Visitors", "The 'Beyond the Return' initiative generates $3 billion in tourism revenue.", "Ghana Web", "business", 3, 310),
      article("gh2", "GH", "Accra Hosts Africa's Largest Gaming Convention", "The three-day event showcases Africa's growing video game development industry.", "Ghana Web", "entertainment", 7, 311),
      article("gh3", "GH", "Ghana Eliminates Trachoma, Becoming 50th Country to Do So", "The WHO certifies the West African nation free of the blinding eye disease after a 20-year campaign.", "Reuters", "health", 12, 312),
      article("gh4", "GH", "Ghanaian Scientists Develop Drought-Resistant Cocoa Variety", "The new cultivar can thrive with 30% less rainfall, securing the future of the nation's top export.", "AFP", "science", 18, 313),
    ],
  },
  {
    code: "MA",
    name: "Morocco",
    lat: 31.8,
    lng: -7.1,
    articles: [
      article("ma1", "MA", "Morocco's Solar Megaproject Noor-Midelt Begins Exporting Power to Europe", "The 800-megawatt facility transmits electricity via undersea cable to Spain.", "Al Jazeera", "technology", 2, 315),
      article("ma2", "MA", "Morocco Ramps Up 2030 FIFA World Cup Preparations", "Stadium construction accelerates in Casablanca, Marrakech, and Rabat ahead of the co-hosted tournament.", "Reuters", "sports", 5, 316),
      article("ma3", "MA", "Marrakech International Film Festival Celebrates 25th Anniversary", "The milestone edition attracts Hollywood and Bollywood stars for a week of screenings and panels.", "AFP", "entertainment", 10, 317),
      article("ma4", "MA", "Morocco Launches Universal Healthcare System for Rural Communities", "The program extends medical coverage to 12 million previously uninsured citizens.", "AP News", "health", 16, 318),
    ],
  },
  {
    code: "TZ",
    name: "Tanzania",
    lat: -6.4,
    lng: 34.9,
    articles: [
      article("tz1", "TZ", "Tanzania's Standard Gauge Railway Connects Dar es Salaam to Dodoma", "The $7 billion rail project cuts travel time between the two cities from 12 hours to 4.", "Daily Nation", "world", 3, 320),
      article("tz2", "TZ", "Serengeti Great Migration Draws Record Number of Eco-Tourists", "Sustainable tourism initiatives help Tanzania welcome 2 million visitors without harming ecosystems.", "Reuters", "science", 8, 321),
      article("tz3", "TZ", "Tanzanian Runner Breaks Women's Marathon World Record in Berlin", "The 26-year-old athlete finishes in 2 hours 11 minutes, shattering the previous mark by 47 seconds.", "AFP", "sports", 13, 322),
    ],
  },
  // MIDDLE EAST
  {
    code: "AE",
    name: "United Arab Emirates",
    lat: 23.4,
    lng: 53.8,
    articles: [
      article("ae1", "AE", "Dubai Launches World's First Autonomous Air Taxi Service", "The electric vertical takeoff vehicles begin regular passenger routes across the city.", "The National", "technology", 1, 325),
      article("ae2", "AE", "Abu Dhabi's Louvre Expansion Doubles Exhibition Space", "The architectural addition by a Japanese firm transforms the cultural landmark on Saadiyat Island.", "The National", "entertainment", 4, 326),
      article("ae3", "AE", "UAE Sovereign Wealth Fund Invests $10 Billion in Global AI Companies", "Mubadala and ADQ lead a coordinated push to position the UAE as an AI superpower.", "Reuters", "business", 8, 327),
      article("ae4", "AE", "UAE Launches Mars Sample Return Mission in Partnership with Japan", "The ambitious joint venture aims to bring Martian soil back to Earth by 2032.", "AP News", "science", 14, 328),
      article("ae5", "AE", "Dubai Sevens Rugby Tournament Breaks Attendance Records", "Over 100,000 spectators attend the three-day event as rugby's popularity surges in the Gulf.", "The National", "sports", 19, 329),
    ],
  },
  {
    code: "JO",
    name: "Jordan",
    lat: 30.6,
    lng: 36.2,
    articles: [
      article("jo1", "JO", "Jordan Opens Massive Desalination Plant on Red Sea Coast", "The $1.8 billion facility will provide 300 million cubic meters of fresh water annually.", "Jordan Times", "world", 3, 330),
      article("jo2", "JO", "Amman International Book Fair Draws 2 Million Visitors", "The cultural event features authors from 40 countries and 800 publishing houses.", "Jordan Times", "entertainment", 7, 331),
      article("jo3", "JO", "Jordan's Archaeological Site Petra Adopts Virtual Reality Guided Tours", "Tourists can now experience reconstructions of the ancient city at its peak using VR headsets.", "Jordan Times", "technology", 12, 332),
    ],
  },
  // OCEANIA
  {
    code: "NZ",
    name: "New Zealand",
    lat: -40.9,
    lng: 174.9,
    articles: [
      article("nz1", "NZ", "New Zealand Passes World's First Comprehensive River Rights Legislation", "All major waterways are granted legal personhood, extending protections beyond the Whanganui precedent.", "NZ Herald", "politics", 2, 335),
      article("nz2", "NZ", "All Blacks Introduce Groundbreaking Concussion Detection Technology", "Rugby New Zealand partners with a local startup to deploy real-time brain injury monitoring.", "NZ Herald", "sports", 5, 336),
      article("nz3", "NZ", "New Zealand's Film Industry Booms as Amazon and Netflix Expand Studios", "Wellington-based production facilities see $2 billion in new investment.", "NZ Herald", "entertainment", 9, 337),
      article("nz4", "NZ", "Kiwi Scientists Map New Deep-Sea Volcanic System off Kermadec Islands", "The expedition discovers 12 previously unknown underwater volcanoes along the Pacific Ring of Fire.", "Reuters", "science", 14, 338),
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
  "CERN Scientists Observe New Particle at LHC",
  "Dubai Launches Autonomous Air Taxi Service",
  "Chile's Atacama Telescope Captures First Light",
  "Morocco Exports Solar Power to Europe",
  "New Zealand Grants Legal Personhood to All Rivers",
];

export function getCountryByCode(code: string): CountryData | undefined {
  return mockCountries.find((c) => c.code === code);
}

export function getAllCountryCodes(): string[] {
  return mockCountries.map((c) => c.code);
}
