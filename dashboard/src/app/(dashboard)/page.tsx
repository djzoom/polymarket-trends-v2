import { PageHeader } from "@/components/layout";
import { Panel, PanelHeader, Badge } from "@/components/ui";
import {
  formatPrice,
  formatChange,
  formatCompact,
  formatTimeAgo,
  formatAddress,
  getTrend,
} from "@/lib/format";

/* ── 模拟数据 ─────────────────────────────────────────────── */

const STATS = [
  { label: "ARB OPPS",     value: 12,    trend: "up" as const },
  { label: "24H PNL",      value: 4230,  trend: "up" as const,   format: "compact" },
  { label: "WIN RATE",     value: 87.5,  trend: "up" as const,   format: "percent" },
  { label: "TRACKED",      value: 38,    trend: "flat" as const },
  { label: "MARKETS",      value: 247,   trend: "flat" as const },
  { label: "AVG SPREAD",   value: 2.7,   trend: "down" as const, format: "percent" },
];

const ARB_DATA = [
  { id: 1, market: "BTC > $105K",    tf: "5m",   yes: 0.48, no: 0.49, spread: 3.0,  vol: 125000, time: new Date(Date.now() - 12_000) },
  { id: 2, market: "ETH > $4200",    tf: "15m",  yes: 0.52, no: 0.46, spread: 2.0,  vol: 89000,  time: new Date(Date.now() - 45_000) },
  { id: 3, market: "SOL > $180",     tf: "5m",   yes: 0.61, no: 0.37, spread: 2.0,  vol: 67000,  time: new Date(Date.now() - 120_000) },
  { id: 4, market: "BTC > $106K",    tf: "5m",   yes: 0.33, no: 0.64, spread: 3.0,  vol: 203000, time: new Date(Date.now() - 8_000) },
  { id: 5, market: "DOGE > $0.20",   tf: "15m",  yes: 0.71, no: 0.26, spread: 3.0,  vol: 41000,  time: new Date(Date.now() - 180_000) },
];

const WALLET_DATA = [
  { addr: "0xdE17a9028c1F4a5b6cf5e7b2B9f2B0000000001", label: "gabagool22",     pnl: 238006,  winRate: 87.5, trades: 1247, last: new Date(Date.now() - 60_000) },
  { addr: "0x8f3Bc0000000000000000000000000000000002",  label: "distinct-bag",    pnl: 142300,  winRate: 72.1, trades: 892,  last: new Date(Date.now() - 300_000) },
  { addr: "0x3aB7c0000000000000000000000000000000003",  label: null,              pnl: 45700,   winRate: 62.1, trades: 456,  last: new Date(Date.now() - 900_000) },
  { addr: "0x9fC2d0000000000000000000000000000000004",  label: "LlamaEnjoyer",    pnl: -12400,  winRate: 43.2, trades: 89,   last: new Date(Date.now() - 1800_000) },
];

const MARKET_FEED = [
  { id: 1, event: "BTC 5min UP resolved YES",     pnl: "+$320",   ts: "2s ago" },
  { id: 2, event: "Whale 0xdE17 opened $50K YES",  pnl: null,      ts: "8s ago" },
  { id: 3, event: "Parity arb detected: SOL 5m",   pnl: "+$45",    ts: "12s ago" },
  { id: 4, event: "ETH 15min DOWN resolved NO",     pnl: "-$180",   ts: "23s ago" },
  { id: 5, event: "Cross-platform gap: Kalshi 4.2%", pnl: null,     ts: "31s ago" },
  { id: 6, event: "Smart $ alert: new position",    pnl: null,      ts: "45s ago" },
];

/* ── Helper ───────────────────────────────────────────────── */
function formatStat(value: number, format?: string): string {
  if (format === "compact") return formatCompact(value);
  if (format === "percent") return `${value.toFixed(1)}%`;
  return value.toLocaleString();
}

/* ── Page ──────────────────────────────────────────────────── */

export default function OverviewPage() {
  return (
    <>
      <PageHeader
        title="OVERVIEW"
        description="real-time arbitrage signals + smart money + market data"
      />

      {/* ── 顶部指标条 ─────────────────────────────────── */}
      <div className="mb-2 grid grid-cols-6 gap-2">
        {STATS.map((s) => (
          <Panel key={s.label}>
            <h4>{s.label}</h4>
            <p
              className="mt-1 text-lg font-bold font-tabular"
              data-numeric
              data-trend={s.trend}
            >
              {formatStat(s.value, s.format)}
            </p>
          </Panel>
        ))}
      </div>

      {/* ── 主区域：三栏 ──────────────────────────────── */}
      <div className="grid grid-cols-4 gap-2">

        {/* 套利信号（宽） */}
        <Panel colSpan={2}>
          <PanelHeader title="ARB SIGNALS" status="live">
            <Badge variant="bull">SCANNING</Badge>
          </PanelHeader>
          <table>
            <thead>
              <tr>
                <th>MARKET</th>
                <th>TF</th>
                <th>YES</th>
                <th>NO</th>
                <th>SPREAD</th>
                <th>VOL</th>
                <th>AGE</th>
              </tr>
            </thead>
            <tbody>
              {ARB_DATA.map((row) => {
                const isArb = row.spread >= 2.5;
                const spreadTrend = isArb ? "up" : "flat";
                return (
                  <tr key={row.id}>
                    <td className="text-foreground">{row.market}</td>
                    <td className="text-foreground-dim">{row.tf}</td>
                    <td data-numeric>{formatPrice(row.yes)}</td>
                    <td data-numeric>{formatPrice(row.no)}</td>
                    <td data-numeric data-trend={spreadTrend}>
                      {formatChange(row.spread)}
                      {isArb && (
                        <Badge variant="bull" className="ml-1">ARB</Badge>
                      )}
                    </td>
                    <td data-numeric className="text-foreground-muted">
                      {formatCompact(row.vol)}
                    </td>
                    <td className="text-foreground-dim">{formatTimeAgo(row.time)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>

        {/* 聪明钱 */}
        <Panel>
          <PanelHeader title="SMART MONEY" status="live" />
          <table>
            <thead>
              <tr>
                <th>WALLET</th>
                <th>PNL</th>
                <th>W%</th>
                <th>LAST</th>
              </tr>
            </thead>
            <tbody>
              {WALLET_DATA.map((w) => {
                const pnlTrend = getTrend(w.pnl);
                return (
                  <tr key={w.addr}>
                    <td>
                      <div className="text-foreground">
                        {w.label || formatAddress(w.addr)}
                      </div>
                      {w.label && (
                        <div className="text-foreground-dim" style={{ fontSize: "9px" }}>
                          {formatAddress(w.addr)}
                        </div>
                      )}
                    </td>
                    <td data-numeric data-trend={pnlTrend}>
                      {formatCompact(w.pnl)}
                    </td>
                    <td data-numeric>
                      {w.winRate.toFixed(1)}%
                    </td>
                    <td className="text-foreground-dim">
                      {formatTimeAgo(w.last)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>

        {/* 实时 feed */}
        <Panel>
          <PanelHeader title="LIVE FEED" status="live" />
          <div className="space-y-0">
            {MARKET_FEED.map((item) => {
              const isPnlUp = item.pnl?.startsWith("+");
              const isPnlDown = item.pnl?.startsWith("-");
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-2 border-b border-border px-1 py-1.5"
                >
                  <span className="mt-0.5 text-foreground-dim" style={{ fontSize: "9px", minWidth: "36px" }}>
                    {item.ts}
                  </span>
                  <span className="flex-1 text-xs text-foreground-muted">
                    {item.event}
                  </span>
                  {item.pnl && (
                    <span
                      className="font-tabular text-xs"
                      data-trend={isPnlUp ? "up" : isPnlDown ? "down" : "flat"}
                    >
                      {item.pnl}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {/* Terminal prompt */}
          <div className="mt-2 flex items-center gap-1 text-xs">
            <span style={{ color: "var(--bull)" }}>{">"}</span>
            <span className="text-foreground-dim">awaiting next signal</span>
            <span className="cursor-blink" style={{ color: "var(--bull)" }}>_</span>
          </div>
        </Panel>
      </div>
    </>
  );
}
