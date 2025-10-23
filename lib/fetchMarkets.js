// lib/fetchMarkets.js
const fs = require("fs");
const path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const API_URL =
  "https://gamma-api.polymarket.com/markets?closed=false&limit=200&order=id&ascending=false";

// 综合关键词：政治 / 科技 / 加密 / 热点事件
const KEYWORDS = [
  "trump", "xi", "biden", "election", "china", "taiwan", "ukraine",
  "fed", "inflation", "interest rate",
  "bitcoin", "ethereum", "crypto", "blockchain",
  "nvidia", "tesla", "apple", "google", "openai", "gpt", "ai",
  "sports", "football", "olympic", "nba", "world cup"
];

// 智能分类函数
function inferCategory(title) {
  const t = title.toLowerCase();
  if (t.includes("trump") || t.includes("biden") || t.includes("election") || t.includes("senate") || t.includes("congress"))
    return "politics";
  if (t.includes("bitcoin") || t.includes("ethereum") || t.includes("crypto") || t.includes("blockchain"))
    return "crypto";
  if (t.includes("nvidia") || t.includes("ai") || t.includes("openai") || t.includes("tesla") || t.includes("apple") || t.includes("google"))
    return "tech";
  if (t.includes("sports") || t.includes("football") || t.includes("nba") || t.includes("olympic") || t.includes("world cup"))
    return "sports";
  return "other";
}

// 计算 yes 价格与成交量
function computeBasicMetrics(market) {
  let yesPrice = 0;
  if (market.outcomePrices) {
    try {
      const arr = JSON.parse(market.outcomePrices);
      yesPrice = parseFloat(arr[0]);
    } catch (e) {
      console.warn("⚠️ Invalid outcomePrices JSON:", market.outcomePrices);
    }
  } else if (market.outcomes && market.outcomes[0]) {
    yesPrice = market.outcomes[0].price;
  }
  const volume = parseFloat(market.volume || market.volumeNum || 0);
  return { yesPrice, volume };
}

// 新闻价值评分
function scoreMarket(m) {
  const volumeScore = m.volume > 1_000_000 ? 3 : m.volume > 100_000 ? 2 : m.volume > 10_000 ? 1 : 0;
  const deltaPScore = Math.abs(m.deltaP) > 0.15 ? 3 : Math.abs(m.deltaP) > 0.08 ? 2 : Math.abs(m.deltaP) > 0.03 ? 1 : 0;
  const keywordScore = KEYWORDS.some((k) => m.title.toLowerCase().includes(k)) ? 2 : 0;
  const controversyScore = Math.abs(m.yesPrice - 0.5) < 0.1 ? 1 : 0;
  const categoryPriority = ["politics", "crypto", "tech"].includes((m.category || "").toLowerCase()) ? 1 : 0;
  return volumeScore + deltaPScore + keywordScore + controversyScore + categoryPriority;
}

async function fetchMarkets() {
  console.log("🔍 Fetching latest Polymarket markets...");
  const res = await fetch(API_URL);
  const data = await res.json();
  const markets = Array.isArray(data) ? data : data.data || [];

  const enriched = markets.map((market) => {
    const { yesPrice, volume } = computeBasicMetrics(market);
    const deltaP = market.change24Hours || market.priceChange24h || 0;
    const deltaV = market.volume24Hours || 0;
    const category = inferCategory(market.question || market.title || market.category || "");

    return {
      id: market.id,
      title: market.question || market.title || "",
      slug: market.slug,
      category,
      yesPrice,
      volume,
      deltaP,
      deltaV,
      volatilityIndex: Math.abs(deltaP) * Math.log(volume + 1),
      score: 0,
    };
  });

  // 综合过滤：去除空标题、无成交量、无意义市场
  const filtered = enriched.filter(
    (m) =>
      m.title &&
      m.title.length > 10 &&
      m.yesPrice > 0 &&
      m.yesPrice < 1
  );

  // 评分排序
  filtered.forEach((m) => (m.score = scoreMarket(m)));
  filtered.sort((a, b) => b.score - a.score);

  // 写入 JSON
  const dateStr = new Date().toISOString().split("T")[0];
  const dir = path.join(__dirname, "..", "public", "data");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, `${dateStr}.json`),
    JSON.stringify(filtered, null, 2)
  );
  console.log(`✅ Saved ${filtered.length} curated markets to ${dateStr}.json`);
}

fetchMarkets().catch(console.error);