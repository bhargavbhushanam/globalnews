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
// Every country gets its OWN native Google News feed so articles are locally
// relevant. Native‑language feeds return domestic headlines, not just articles
// that happen to mention the country name.
interface Locale { hl: string; gl: string; ceid: string }

const LOCALE: Record<string, Locale> = {
  // English‑speaking
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
  AE: { hl: "ar",    gl: "AE", ceid: "AE:ar" },
  IL: { hl: "en-IL", gl: "IL", ceid: "IL:en" },
  BD: { hl: "bn",    gl: "BD", ceid: "BD:bn" },
  ET: { hl: "am",    gl: "ET", ceid: "ET:am" },
  EG: { hl: "ar",    gl: "EG", ceid: "EG:ar" },
  SA: { hl: "ar",    gl: "SA", ceid: "SA:ar" },
  JO: { hl: "ar",    gl: "JO", ceid: "JO:ar" },

  // Native‑language feeds — Google News curates LOCAL headlines for these
  FR: { hl: "fr",    gl: "FR", ceid: "FR:fr" },
  DE: { hl: "de",    gl: "DE", ceid: "DE:de" },
  JP: { hl: "ja",    gl: "JP", ceid: "JP:ja" },
  CN: { hl: "zh-CN", gl: "CN", ceid: "CN:zh-Hans" },
  BR: { hl: "pt-BR", gl: "BR", ceid: "BR:pt-419" },
  KR: { hl: "ko",    gl: "KR", ceid: "KR:ko" },
  MX: { hl: "es-419",gl: "MX", ceid: "MX:es-419" },
  RU: { hl: "ru",    gl: "RU", ceid: "RU:ru" },
  AR: { hl: "es-419",gl: "AR", ceid: "AR:es-419" },
  IT: { hl: "it",    gl: "IT", ceid: "IT:it" },
  ES: { hl: "es",    gl: "ES", ceid: "ES:es" },
  PL: { hl: "pl",    gl: "PL", ceid: "PL:pl" },
  NL: { hl: "nl",    gl: "NL", ceid: "NL:nl" },
  SE: { hl: "sv",    gl: "SE", ceid: "SE:sv" },
  UA: { hl: "uk",    gl: "UA", ceid: "UA:uk" },
  CH: { hl: "de",    gl: "CH", ceid: "CH:de" },
  TR: { hl: "tr",    gl: "TR", ceid: "TR:tr" },
  GR: { hl: "el",    gl: "GR", ceid: "GR:el" },
  NO: { hl: "no",    gl: "NO", ceid: "NO:no" },
  ID: { hl: "id",    gl: "ID", ceid: "ID:id" },
  TH: { hl: "th",    gl: "TH", ceid: "TH:th" },
  VN: { hl: "vi",    gl: "VN", ceid: "VN:vi" },
  CO: { hl: "es-419",gl: "CO", ceid: "CO:es-419" },
  CL: { hl: "es-419",gl: "CL", ceid: "CL:es-419" },
  PE: { hl: "es-419",gl: "PE", ceid: "PE:es-419" },
  MA: { hl: "fr",    gl: "MA", ceid: "MA:fr" },
};

// ─── Relevance filtering ────────────────────────────────────────────────────
//
// FIRST-PRINCIPLES APPROACH:
// The biggest source of noise is US/UK domestic news leaking into feeds for
// countries like Kenya, Nigeria, South Africa, etc. These countries get
// English-language Google News feeds that mix local news with US/UK content.
//
// Old approach (broken): try to match each article to a country via signals.
// Problem: "Maryland school board votes..." has NO country signal — it slips
// through because it doesn't mention "America" or "Trump".
//
// New approach (multi-layer):
//  1. Non-Latin script → trust it (came from native-language feed)
//  2. Feed is for US/GB/CA/AU/NZ → trust it (English-speaking, native feed)
//  3. For all other English feeds, check TWO things:
//     a. BLOCKLIST: Does title contain US states/cities/institutions,
//        UK-specific terms, or other Western domestic terms? → REJECT
//     b. FOREIGN SIGNAL: Does title match another country more than own? → REJECT
//  4. ALLOWLIST boost: If title positively mentions target country → PASS always

// ── US domestic content detection ──────────────────────────────────────────
// All 50 states, major cities, US-only institutions, US political terms.
// If an article matches this and it's NOT the US feed, it's almost certainly
// US domestic news that leaked into a foreign feed.
const US_STATES = /\balabama\b|\balaska\b|\barizona\b|\barkansas\b|\bcalifornia\b|\bcolorado\b|\bconnecticut\b|\bdelaware\b|\bflorida\b|\bgeorgia\b|\bhawaii\b|\bidaho\b|\billinois\b|\bindiana\b|\biowa\b|\bkansas\b|\bkentucky\b|\blouisiana\b|\bmaine\b|\bmaryland\b|\bmassachusetts\b|\bmichigan\b|\bminnesota\b|\bmississippi\b|\bmissouri\b|\bmontana\b|\bnebraska\b|\bnevada\b|\bnew\s?hampshire\b|\bnew\s?jersey\b|\bnew\s?mexico\b|\bnew\s?york\b|\bnorth\s?carolina\b|\bnorth\s?dakota\b|\bohio\b|\boklahoma\b|\boregon\b|\bpennsylvania\b|\brhode\s?island\b|\bsouth\s?carolina\b|\bsouth\s?dakota\b|\btennessee\b|\btexas\b|\butah\b|\bvermont\b|\bvirginia\b|\bwest\s?virginia\b|\bwashington\s?state\b|\bwisconsin\b|\bwyoming\b/i;

const US_CITIES = /\blos\s?angeles\b|\bchicago\b|\bhouston\b|\bphoenix\b|\bphiladelphia\b|\bsan\s?antonio\b|\bsan\s?diego\b|\bdallas\b|\bsan\s?jose\b|\baustin\b|\bjacksonville\b|\bsan\s?francisco\b|\bseattle\b|\bdenver\b|\bboston\b|\bel\s?paso\b|\bnashville\b|\bportland\b|\blas\s?vegas\b|\bmemphis\b|\blouisville\b|\bbaltimore\b|\bmilwaukee\b|\balbuquerque\b|\btucson\b|\bfresno\b|\bsacramento\b|\bmesa\b|\batlanta\b|\bkansas\s?city\b|\bmiami\b|\braleigh\b|\bdetroit\b|\bminneapolis\b|\btampa\b|\bst\.?\s?louis\b|\bpittsburgh\b|\bcincinnati\b|\borlando\b|\bcleveland\b|\bnew\s?orleans\b|\bcharlotte\b|\bbrooklyn\b|\bmanhattan\b|\bbronx\b|\bqueens\b|\bstaten\s?island\b|\bhollywood\b|\bsilicon\s?valley\b/i;

const US_INSTITUTIONS = /\bfbi\b|\bcia\b|\bnsa\b|\bdhs\b|\batf\b|\bdea\b|\bsecret\s?service\b|\bu\.?s\.?\s?(marshal|army|navy|marine|air\s?force|coast\s?guard)\b|\bnypd\b|\blapd\b|\bchicago\s?p[od]\b|\bscotus\b|\bsupreme\s?court\b(?!.*\b(india|canad|uk|brit|austral|philippin|pakistan|nigeria|kenya|south.africa))/i;

const US_POLITICS = /\btrump\b|\bbiden\b|\bobama\b|\bwhite\s?house\b|\bcongress\b|\bwashington\s?d\.?c\b|\brepublican\b|\bdemocrat\b|\bgop\b|\bcapitol\s?hill\b|\bpentagon\b|\boval\s?office\b|\bspeaker\s?of\s?the\s?house\b|\bsecretar[yi]\s?of\s?state\b|\battorney\s?general\b|\bstate\s?of\s?the\s?union\b|\bexecutive\s?order\b|\bsenate\b(?!.*\b(canad|philippin|australia|french|italy|brazil|mexico))|\bjd\s?vance\b|\bmike\s?johnson\b|\bnancy\s?pelosi\b|\bmitch\s?mcconnell\b|\bchuck\s?schumer\b|\bron\s?desantis\b|\bgavin\s?newsom\b|\baoc\b/i;

const US_CULTURE = /\bnfl\b|\bnba\b|\bmlb\b|\bnhl\b|\bsuper\s?bowl\b|\bmarch\s?madness\b|\bcollege\s?football\b|\bncaa\b|\bmajor\s?league\b|\bwall\s?street\b|\bblack\s?friday\b|\bthanksgiving\b|\b(4th|fourth)\s?of\s?july\b|\bindependence\s?day\b|\bsocial\s?security\b|\bmedicare\b|\bmedicaid\b|\b401k\b|\birs\b|\bpresidents?\s?day\b|\bmemorial\s?day\b|\blabor\s?day\b|\bveterans?\s?day\b|\bfederal\s?holiday\b|\bdmv\b|\bgreen\s?card\b|\bsnapchat\b|\bamerican\s?dream\b|\bgrand\s?jury\b|\bdistrict\s?attorney\b|\bda\s?office\b|\bsheriff\b/i;

function isUSDomestic(title: string): boolean {
  return US_STATES.test(title) || US_CITIES.test(title) || US_INSTITUTIONS.test(title) || US_POLITICS.test(title) || US_CULTURE.test(title);
}

// ── UK domestic content detection ──────────────────────────────────────────
const UK_DOMESTIC = /\bwestminster\b|\bdowning\s?street\b|\bsunak\b|\bstarmer\b|\bhouse\s?of\s?commons\b|\bhouse\s?of\s?lords\b|\bnhs\b|\bbritish\b|\bbritain\b|\bu\.?k\.?\b|\blondon\b(?!.*\b(ontario|kentucky))|(?<!\bnew\s)\byork\b|\bmanchester\b|\bbirmingham\b(?!.*\balabama\b)|\bliverpool\b|\bleeds\b|\bbristol\b|\bedinburgh\b|\bglasgow\b|\bcardiff\b|\bbelfast\b|\bscotland\b|\bwales\b|\bengland\b|\bnorthern\s?ireland\b|\bbarclays\b|\bbbc\b|\bpremier\s?league\b|\bbrexit\b|\btory\b|\btories\b|\blabour\s?party\b|\blib\s?dem/i;

function isUKDomestic(title: string): boolean {
  return UK_DOMESTIC.test(title);
}

// ── Canadian domestic ──────────────────────────────────────────────────────
const CA_DOMESTIC = /\bottawa\b|\btoronto\b|\bvancouver\b|\bmontreal\b|\bcalgary\b|\bedmonton\b|\bwinnipeg\b|\bquebec\b|\bontario\b|\balberta\b|\bbritish\s?columbia\b|\bmanitoba\b|\bsaskatchewan\b|\bnova\s?scotia\b|\btrudeau\b|\bcanadian\b|\bcanada\b|\brcmp\b/i;

// ── Australian domestic ────────────────────────────────────────────────────
const AU_DOMESTIC = /\bsydney\b|\bmelbourne\b|\bbrisbane\b|\bperth\b|\badelaide\b|\bcanberra\b|\baustralian\b|\baustralia\b|\bqueensland\b|\bvictoria\b(?!.*\b(secret|beckham|lake))|\bnew\s?south\s?wales\b|\btasmania\b/i;

// ── Positive country signals ───────────────────────────────────────────────
// If an article matches these for the TARGET country, it DEFINITELY belongs.
const COUNTRY_SIGNALS: Record<string, RegExp> = {
  US: /\bamerica\b|\bu\.?s\.?a?\b|\bunited\s?states\b/i,
  GB: /\bbritain\b|\bu\.?k\.?\b|\bunited\s?kingdom\b|\bengland\b/i,
  CN: /\bbeijing\b|\bxi\s?jinping\b|\bccp\b|\bchinese\b|\bchina\b/i,
  RU: /\bputin\b|\bkremlin\b|\bmoscow\b|\brussia\b|\brussian\b/i,
  UA: /\bzelensky\b|\bkyiv\b|\bukrain/i,
  IL: /\bnetanyahu\b|\bidf\b|\bisrael\b|\bgaza\b|\bwest\s?bank\b|\bpalestini/i,
  IN: /\bmodi\b|\bdelhi\b|\bmumbai\b|\bindia\b|\bindian\b|\bbollywood\b|\bbangalore\b|\bhyderabad\b|\bchennai\b|\bkolkata\b/i,
  JP: /\btokyo\b|\bjapan\b|\bjapanese\b|\bosaka\b/i,
  FR: /\bmacron\b|\bparis\b|\bfranc[e]\b|\bfrench\b/i,
  DE: /\bscholz\b|\bberlin\b|\bgerman[y]?\b|\bbundestag\b|\bmunich\b|\bfrankfurt\b/i,
  BR: /\blula\b|\bbrasilia\b|\bbrazil\b|\bbrazilian\b|\bsao\s?paulo\b|\brio\b/i,
  KR: /\bseoul\b|\bsouth\s?korea\b|\bkorean\b/i,
  AU: /\bcanberra\b|\baustralia\b|\baustralian\b/i,
  CA: /\bottawa\b|\bcanada\b|\bcanadian\b|\btrudeau\b/i,
  MX: /\bmexico\b|\bmexican\b|\bmexico\s?city\b/i,
  SA: /\briyadh\b|\bsaudi\b|\bjeddah\b/i,
  EG: /\bcairo\b|\begypt\b|\begyptian\b/i,
  TR: /\berdogan\b|\bankara\b|\bturk(ey|ish)\b|\bistanbul\b/i,
  NG: /\babuja\b|\blagos\b|\bnigeria\b|\bnigerian\b/i,
  AR: /\bbuenos\s?aires\b|\bargentin/i,
  IT: /\brome\b|\bitaly\b|\bitalian\b|\bmeloni\b|\bmilan\b/i,
  ES: /\bmadrid\b|\bspain\b|\bspanish\b|\bbarcelona\b/i,
  PL: /\bwarsaw\b|\bpoland\b|\bpolish\b|\bkrakow\b/i,
  NL: /\bnetherlands\b|\bdutch\b|\bamsterdam\b|\bthe\s?hague\b/i,
  SE: /\bsweden\b|\bswedish\b|\bstockholm\b/i,
  CH: /\bswitzerland\b|\bswiss\b|\bgeneva\b|\bzurich\b/i,
  GR: /\bgreece\b|\bgreek\b|\bathens\b/i,
  NO: /\bnorway\b|\bnorwegian\b|\boslo\b/i,
  ID: /\bindonesia\b|\bindonesian\b|\bjakarta\b/i,
  TH: /\bthailand\b|\bthai\b|\bbangkok\b/i,
  VN: /\bvietnam\b|\bvietnamese\b|\bhanoi\b|\bho\s?chi\s?minh\b/i,
  PH: /\bphilippines\b|\bfilipino\b|\bmanila\b|\bdutertes?\b|\bmarcos\b/i,
  SG: /\bsingapore\b|\bsingaporean\b/i,
  PK: /\bpakistan\b|\bpakistani\b|\bislamabad\b|\bkarachi\b|\blahore\b/i,
  BD: /\bbangladesh\b|\bbangladeshi\b|\bdhaka\b/i,
  MY: /\bmalaysia\b|\bmalaysian\b|\bkuala\s?lumpur\b/i,
  CO: /\bcolombia\b|\bcolombian\b|\bbogota\b|\bmedellin\b/i,
  CL: /\bchile\b|\bchilean\b|\bsantiago\b/i,
  PE: /\bperu\b|\bperuvian\b|\blima\b/i,
  ET: /\bethiopia\b|\bethiopian\b|\baddis\s?ababa\b/i,
  GH: /\bghana\b|\bghanaian\b|\baccra\b/i,
  MA: /\bmorocco\b|\bmoroccan\b|\brabat\b|\bcasablanca\b/i,
  TZ: /\btanzania\b|\btanzanian\b|\bdar\s?es\s?salaam\b/i,
  AE: /\bdubai\b|\babu\s?dhabi\b|\bemirati\b|\buae\b/i,
  JO: /\bjordan\b|\bjordanian\b|\bamman\b/i,
  NZ: /\bnew\s?zealand\b|\bkiwi\b|\bwellington\b|\bauckland\b/i,
  KE: /\bkenya\b|\bkenyan\b|\bnairobi\b/i,
  ZA: /\bsouth\s?africa\b|\bpretoria\b|\bjohannesburg\b|\bcape\s?town\b/i,
};

// Countries whose native Google News feed is their OWN domestic content.
// For these, we trust the feed and skip heavy filtering.
const ENGLISH_NATIVE = new Set(["US", "GB", "CA", "AU", "NZ"]);

/**
 * Multi-layer relevance filter. Decides if an article belongs to country X.
 *
 * Layer 1: Non-Latin script → PASS (native-language feed, inherently local)
 * Layer 2: Target is US/GB/CA/AU/NZ → PASS (English-native, trust their feed)
 * Layer 3: Title positively mentions target country → PASS (allowlist)
 * Layer 4: Title contains US/UK/CA/AU domestic terms → REJECT (blocklist)
 * Layer 5: Title matches a foreign country signal but not own → REJECT
 * Layer 6: Everything else → PASS (generic international news, acceptable)
 */
function isRelevantToCountry(title: string, countryCode: string): boolean {
  // Layer 1: Non-Latin script = native feed = trust it
  const asciiRatio = (title.match(/[a-zA-Z]/g) || []).length / Math.max(title.length, 1);
  if (asciiRatio < 0.5) return true;

  // Layer 2: English-native countries trust their own feed
  if (ENGLISH_NATIVE.has(countryCode)) return true;

  const t = title.toLowerCase();

  // Layer 3: Positive match for target country → always accept
  const ownSignal = COUNTRY_SIGNALS[countryCode];
  if (ownSignal && ownSignal.test(t)) return true;

  // Layer 4: Blocklist — US/UK/CA/AU domestic content appearing in foreign feeds
  if (countryCode !== "US" && isUSDomestic(t)) return false;
  if (countryCode !== "GB" && isUKDomestic(t)) return false;
  if (countryCode !== "CA" && CA_DOMESTIC.test(t)) return false;
  if (countryCode !== "AU" && AU_DOMESTIC.test(t)) return false;

  // Layer 5: Foreign country signal match without own match
  for (const [code, regex] of Object.entries(COUNTRY_SIGNALS)) {
    if (code === countryCode) continue;
    if (regex.test(t)) return false; // Mentions another country, not ours
  }

  // Layer 6: Generic news with no country signals — accept it
  // (Could be local news that doesn't mention the country by name,
  //  e.g. "Fuel prices rise 10%" from a Kenyan source about Kenya)
  return true;
}

// ─── Category inference ─────────────────────────────────────────────────────
const CATEGORY_RULES: [RegExp, NewsCategory][] = [
  // Crime & Justice
  [/murder|kill|shot|shoot|arrest|prison|jail|crime|criminal|police|suspect|victim|robbery|assault|fraud|theft|homicide|kidnap|cartel|drug.?bust|felon|indict|verdict|trial\b|prosecut|manslaughter|stabbing|burglary|trafficking|gang\b|fugitive/i, "crime"],

  // Politics & Government
  [/election|parliament|congress|senat|president|minister|government|law\b|legislation|vote|voter|ballot|policy|political|governor|mayor|cabinet|democrat|republican|party\b|diplomat|treaty|sanction|impeach|bipartisan|lobby|filibuster|geopolit|nato\b|summit|alliance|negotiate|bilateral|tariff|border.?wall|shutdown|campaign|primary|caucus|gop\b|liberal|conservative|opposition|coalition|referendum|constitutional|executive.?order|white.?house|capitol|pentagon|state.?department|foreign.?affairs|ambassador|envoy/i, "politics"],

  // Business & Economy
  [/stock|market|econom|trade\b|gdp|bank\b|financ|invest|revenue|earning|profit|billion|million|startup|ipo\b|merger|acquisition|dow\b|nasdaq|s.?p.?500|wall.?street|recession|inflation|interest.?rate|fed\b|federal.?reserve|crypto|bitcoin|housing.?market|real.?estate|layoff|hiring|unemployment|retail|consumer|supply.?chain|commodit|oil.?price|wage|salary|ceo\b|corporate|shareholder|dividend|bond\b|treasury|debt\b|deficit|budget\b|tax\b|tariff/i, "business"],

  // Technology
  [/\bai\b|artificial.?intelligen|tech\b|software|app\b|digital|cyber|robot|chip\b|semiconductor|quantum|machine.?learn|openai|google|apple|microsoft|meta\b|amazon|tesla|spacex|startup|silicon.?valley|smartphone|iphone|android|cloud\b|data.?center|5g\b|broadband|internet|social.?media|tiktok|instagram|twitter|elon.?musk|zuckerberg|algorithm|automation|drone|electric.?vehicle|ev\b|battery|neural|gpt\b|chatbot|deepfake|blockchain|nft\b|metaverse|vr\b|ar\b|wearable|self.?driving|autonomous/i, "technology"],

  // Sports
  [/football|soccer|basketball|cricket|tennis|match\b|tournament|championship|fifa|olympic|athlete|medal|sport|league|nfl|nba|mlb|nhl|f1\b|formula|rugby|boxing|mma|ufc|world.?cup|super.?bowl|playoff|coach|quarterback|striker|goalkeeper|batting|bowling|grand.?slam|wimbledon|premier.?league|champions.?league|serie.?a|la.?liga|bundesliga|transfer|signing|injury.?list|hat.?trick|touchdown|home.?run|slam.?dunk|goal\b|score|roster|draft\b|stadium|arena|season\b/i, "sports"],

  // Health & Medicine
  [/health|medical|hospital|disease|vaccin|who\b|doctor|patient|drug\b|treatment|cancer|virus|pandemic|clinical|pharma|surgery|mental.?health|obesity|diabetes|alzheimer|dementia|outbreak|epidemic|cdc\b|fda\b|therapy|diagnos|symptom|organ.?transplant|blood\b|nursing|medicare|medicaid|insurance.?coverage|wellness|nutrition|diet\b|exercise|fertility|abortion|reproductive|opioid|overdose|addiction/i, "health"],

  // Environment & Climate
  [/climate|environment|pollution|emission|carbon|fossil.?fuel|renewable|solar|wind.?energy|deforestation|biodiversity|endangered|extinction|wildfire|drought|flood|hurricane|tornado|earthquake|tsunami|glacier|arctic|antarctic|ocean|coral.?reef|recycl|sustainab|green.?energy|clean.?energy|electric.?grid|epa\b|conservation|national.?park|wildlife|ecosystem|plastic|waste|contamination|air.?quality|water.?quality|sea.?level|global.?warming|net.?zero|paris.?agreement|weather|storm|snow|heat.?wave|cold.?snap|temperature|forecast/i, "environment"],

  // Science & Research
  [/research|scientist|space\b|nasa|discover|study\b|experiment|physic|biolog|species|fossil|planet|orbit|archaeolog|genome|coral|reef|telescope|satellite|asteroid|comet|mars\b|moon\b|jupiter|quantum|particle|cern\b|evolution|dna\b|gene\b|genetic|neurosci|brain\b|lab\b|journal\b|peer.?review|breakthrough|innovation|observatory|expedition|specimen|molecule/i, "science"],

  // Entertainment & Culture
  [/movie|film\b|music|artist|album|concert|netflix|disney|hbo\b|series|celebrit|award|grammy|oscar|emmy|golden.?globe|festival|show\b|entertainment|actor|actress|singer|rapper|stream|spotify|box.?office|broadway|theater|theatre|television|tv\b|reality\b|podcast|bestsell|book\b|novel|author|gallery|museum|exhibit|art\b|painting|sculpture|fashion|design|comic|anime|manga|video.?game|gaming|esport|dance|ballet|opera/i, "entertainment"],

  // Education
  [/school|university|college|student|teacher|professor|education|campus|tuition|scholarship|graduat|academic|curriculum|exam|test.?score|literacy|enrollment|classroom|dean|faculty|research.?grant|stem\b|phd\b|degree|diploma|admission|charter.?school|public.?school|private.?school|kindergarten|preschool|superintendent/i, "education"],

  // Lifestyle & Travel
  [/travel|tourism|hotel|airline|flight|vacation|resort|restaurant|food\b|chef|recipe|cooking|wine\b|dining|celebrity.?chef|michelin|real.?estate|housing|home\b|apartment|mortgage|rent\b|interior.?design|architecture|wedding|marriage|divorce|family\b|parenting|pet\b|dog\b|cat\b|garden|hobby|wellness|yoga|meditation|fitness|beauty|cosmetic|luxury|brand/i, "lifestyle"],

  // Opinion & Analysis
  [/opinion|editorial|op.?ed|analysis|commentary|column|perspective|debate|argue|viewpoint|critic|review/i, "opinion"],
];

function inferCategory(title: string): NewsCategory {
  for (const [regex, category] of CATEGORY_RULES) {
    if (regex.test(title)) return category;
  }
  return "world";
}

// ─── RSS parsing ────────────────────────────────────────────────────────────
function extractTagContent(xml: string, tag: string): string {
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

function parseRSSItems(xml: string, countryCode: string, strict = false): NewsArticle[] {
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

    // ─── Relevance check ──────────────────────────────────────────────
    if (!isRelevantToCountry(title, countryCode)) continue;

    // In strict mode (search fallback), require a POSITIVE country mention.
    // Generic articles like "Quantum Computing Stock to Buy" with no country
    // signal should not appear in a specific country's feed.
    if (strict) {
      const t = title.toLowerCase();
      const countryMeta = COUNTRIES.find((c) => c.code === countryCode);
      const nameLower = countryMeta ? countryMeta.name.toLowerCase() : "";
      const ownSignal = COUNTRY_SIGNALS[countryCode];
      const hasPositiveMatch = t.includes(nameLower) || (ownSignal && ownSignal.test(t));
      if (!hasPositiveMatch) continue;
    }

    // Source URL from <source url="...">
    const sourceUrlMatch = itemXml.match(/<source\s+url="([^"]+)"/i);
    const sourceUrl = sourceUrlMatch ? sourceUrlMatch[1] : link;

    const imageUrl = extractImageFromDescription(description);
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

// ─── Google News topic sections ──────────────────────────────────────────────
// Google News has built-in topic feeds. We fetch these per-country to get
// deep category coverage (10+ articles per category).
const GOOGLE_TOPICS = [
  "NATION",        // → politics
  "BUSINESS",      // → business
  "TECHNOLOGY",    // → technology
  "SPORTS",        // → sports
  "ENTERTAINMENT", // → entertainment
  "SCIENCE",       // → science
  "HEALTH",        // → health
  "WORLD",         // → world
];

// Extra keyword searches for categories Google doesn't have built-in topics for
const EXTRA_SEARCHES: { keywords: string; hintCategory: NewsCategory }[] = [
  { keywords: "crime OR arrest OR murder OR police", hintCategory: "crime" },
  { keywords: "environment OR climate OR pollution OR wildlife", hintCategory: "environment" },
  { keywords: "school OR university OR education OR student", hintCategory: "education" },
  { keywords: "travel OR food OR lifestyle OR tourism", hintCategory: "lifestyle" },
  { keywords: "opinion OR editorial OR analysis", hintCategory: "opinion" },
];

/**
 * Fetch a single RSS feed, parse it, apply relevance filtering.
 * Returns articles or empty array on failure.
 */
async function fetchOneFeed(
  url: string,
  code: string,
  name: string,
  strict: boolean,
  overrideCategory?: NewsCategory
): Promise<NewsArticle[]> {
  try {
    const xml = await fetchWithTimeout(url, 6000);
    let articles = parseRSSItems(xml, code, strict);

    // If override category is set, force it for articles that would be "world"
    if (overrideCategory) {
      articles = articles.map((a) =>
        a.category === "world" ? { ...a, category: overrideCategory } : a
      );
    }

    return articles;
  } catch {
    return [];
  }
}

/**
 * Apply broken-feed detection for non-English locales that return English content.
 */
function filterBrokenFeed(
  articles: NewsArticle[],
  code: string,
  name: string,
  locale: Locale
): NewsArticle[] {
  const isEnglishLocale = locale.hl.startsWith("en");
  if (isEnglishLocale || ENGLISH_NATIVE.has(code) || articles.length === 0) {
    return articles;
  }

  const englishCount = articles.filter((a) => {
    const ratio = (a.title.match(/[a-zA-Z]/g) || []).length / Math.max(a.title.length, 1);
    return ratio > 0.7;
  }).length;

  if (englishCount / articles.length <= 0.5) return articles;

  // Non-English locale returned English articles → filter strictly
  const ownSignal = COUNTRY_SIGNALS[code];
  const nameLower = name.toLowerCase();
  return articles.filter((a) => {
    const ascRatio = (a.title.match(/[a-zA-Z]/g) || []).length / Math.max(a.title.length, 1);
    if (ascRatio < 0.5) return true;
    const t = a.title.toLowerCase();
    return t.includes(nameLower) || (ownSignal && ownSignal.test(t));
  });
}

/**
 * Fetch ALL news for a single country by hitting multiple feeds in parallel:
 *  1. Main headlines feed
 *  2. 8 Google News topic section feeds (Business, Sports, Tech, etc.)
 *  3. 5 keyword search feeds for missing categories (Crime, Education, etc.)
 *
 * This gives us ~150+ articles per country with broad category coverage.
 */
async function fetchCountryNews(
  code: string,
  name: string
): Promise<NewsArticle[]> {
  const locale = LOCALE[code];
  if (!locale) return [];

  const base = `gl=${locale.gl}&hl=${locale.hl}&ceid=${locale.ceid}`;
  const seen = new Set<string>(); // dedupe by title

  // Build all feed URLs to fetch in parallel
  const feedJobs: { url: string; strict: boolean; overrideCategory?: NewsCategory }[] = [];

  // 1. Main headlines
  feedJobs.push({
    url: `https://news.google.com/rss?${base}`,
    strict: false,
  });

  // 2. Topic section feeds
  for (const topic of GOOGLE_TOPICS) {
    feedJobs.push({
      url: `https://news.google.com/rss/headlines/section/topic/${topic}?${base}`,
      strict: false,
    });
  }

  // 3. Keyword search feeds for missing categories
  for (const extra of EXTRA_SEARCHES) {
    const q = encodeURIComponent(`${extra.keywords} when:1d`);
    feedJobs.push({
      url: `https://news.google.com/rss/search?q=${q}&${base}`,
      strict: false,
      overrideCategory: extra.hintCategory,
    });
  }

  // Fetch all feeds in parallel (within this country)
  const feedResults = await Promise.allSettled(
    feedJobs.map((job) =>
      fetchOneFeed(job.url, code, name, job.strict, job.overrideCategory)
    )
  );

  // Merge and deduplicate
  const allArticles: NewsArticle[] = [];
  for (const result of feedResults) {
    if (result.status !== "fulfilled") continue;
    let articles = result.value;

    // Apply broken-feed filter
    articles = filterBrokenFeed(articles, code, name, locale);

    for (const article of articles) {
      const key = article.title.toLowerCase().slice(0, 60);
      if (seen.has(key)) continue;
      seen.add(key);
      // Re-assign ID to be unique across feeds
      allArticles.push({
        ...article,
        id: `${code.toLowerCase()}_${allArticles.length}`,
      });
    }
  }

  // If we got very few from native feeds, try English search fallback
  if (allArticles.length < 5) {
    try {
      const q = encodeURIComponent(name + " when:1d");
      const url = `https://news.google.com/rss/search?q=${q}&hl=en&gl=US&ceid=US:en`;
      const fallback = await fetchOneFeed(url, code, name, true);
      for (const article of fallback) {
        const key = article.title.toLowerCase().slice(0, 60);
        if (seen.has(key)) continue;
        seen.add(key);
        allArticles.push({
          ...article,
          id: `${code.toLowerCase()}_${allArticles.length}`,
        });
      }
    } catch { /* ignore */ }
  }

  return allArticles;
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
    6 // Lower country concurrency since each country fires 14 parallel feeds
  );

  const countriesWithNews = countryResults.filter((c) => c.articles.length > 0);

  // Generate trending headlines — prefer English titles (high ASCII ratio)
  const trending = countriesWithNews
    .flatMap((c) => c.articles.slice(0, 2))
    .filter((a) => {
      const asciiRatio = (a.title.match(/[a-zA-Z]/g) || []).length / Math.max(a.title.length, 1);
      return asciiRatio > 0.7 && a.title.length > 20 && a.title.length < 100;
    })
    .map((a) => a.title)
    .slice(0, 20);

  return { countries: countriesWithNews, trending };
}
