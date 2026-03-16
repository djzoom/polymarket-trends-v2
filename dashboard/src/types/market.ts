/** 市场基础信息 */
export interface Market {
  id: string;
  slug: string;
  question: string;
  yesPrice: number;
  noPrice: number;
  volume24h: number;
  liquidity: number;
  endDate: string;
  category: string;
}

/** 套利机会 */
export interface ArbitrageOpportunity {
  id: string;
  market: Market;
  type: "parity" | "cross-platform" | "logical" | "latency";
  spread: number;
  expectedProfit: number;
  confidence: number;
  detectedAt: string;
  expiresIn: number; // ms
}

/** 钱包画像 */
export interface WalletProfile {
  address: string;
  label?: string;
  totalPnl: number;
  winRate: number;
  totalTrades: number;
  avgTradeSize: number;
  lastActive: string;
  topMarkets: string[];
  strategy: "arb" | "momentum" | "contrarian" | "market-maker" | "unknown";
}

/** 实时价格 tick */
export interface PriceTick {
  marketId: string;
  yesPrice: number;
  noPrice: number;
  timestamp: number;
  source: "polymarket" | "kalshi";
}
