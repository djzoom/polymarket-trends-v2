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

/* 示例数据 — 展示风格规范的正确用法 */
const DEMO_ARBITRAGE = [
  { id: 1, market: "BTC > $105K (5min)", yes: 0.48, no: 0.49, spread: 3.0, time: new Date(Date.now() - 120_000) },
  { id: 2, market: "ETH > $4200 (15min)", yes: 0.52, no: 0.46, spread: 2.0, time: new Date(Date.now() - 300_000) },
  { id: 3, market: "SOL > $180 (5min)", yes: 0.61, no: 0.37, spread: 2.0, time: new Date(Date.now() - 45_000) },
];

const DEMO_WALLETS = [
  { address: "0xdE17a9028c1F4a5b6cf5e7b2B9f2B0000000001", pnl: 238006, winRate: 87.5, trades: 1247 },
  { address: "0x3aB7c0000000000000000000000000000000002", pnl: -12400, winRate: 43.2, trades: 89 },
  { address: "0x9fC2d0000000000000000000000000000000003", pnl: 45700, winRate: 62.1, trades: 456 },
];

export default function OverviewPage() {
  return (
    <>
      <PageHeader
        title="概览"
        description="Polymarket 套利信号 · 聪明钱追踪 · 实时行情"
      />

      {/* ── 统计卡片行 ─────────────────────────────────── */}
      <div className="mb-4 grid grid-cols-4 gap-3">
        <Panel>
          <h4>活跃套利机会</h4>
          <p className="mt-2 text-2xl font-semibold font-tabular" data-numeric>
            12
          </p>
        </Panel>
        <Panel>
          <h4>24h 套利收益</h4>
          <p
            className="mt-2 text-2xl font-semibold font-tabular"
            data-numeric
            data-trend="up"
          >
            {formatCompact(4230)}
          </p>
        </Panel>
        <Panel>
          <h4>追踪钱包</h4>
          <p className="mt-2 text-2xl font-semibold font-tabular" data-numeric>
            38
          </p>
        </Panel>
        <Panel>
          <h4>市场数</h4>
          <p className="mt-2 text-2xl font-semibold font-tabular" data-numeric>
            247
          </p>
        </Panel>
      </div>

      {/* ── 主内容区 ───────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        {/* 套利信号 Panel */}
        <Panel colSpan={2}>
          <PanelHeader title="套利信号" status="live" />
          <table>
            <thead>
              <tr>
                <th>市场</th>
                <th>YES</th>
                <th>NO</th>
                <th>价差</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_ARBITRAGE.map((row) => {
                const spreadTrend = row.spread >= 2.5 ? "up" : "flat";
                return (
                  <tr key={row.id}>
                    <td className="text-foreground">{row.market}</td>
                    <td data-numeric>{formatPrice(row.yes)}</td>
                    <td data-numeric>{formatPrice(row.no)}</td>
                    <td data-numeric data-trend={spreadTrend}>
                      {formatChange(row.spread)}
                      {row.spread >= 2.5 && (
                        <Badge variant="bull" className="ml-2">
                          可套利
                        </Badge>
                      )}
                    </td>
                    <td className="text-foreground-muted">
                      {formatTimeAgo(row.time)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>

        {/* 聪明钱 Panel */}
        <Panel>
          <PanelHeader title="聪明钱排行" status="live" />
          <table>
            <thead>
              <tr>
                <th>地址</th>
                <th>PnL</th>
                <th>胜率</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_WALLETS.map((w) => {
                const pnlTrend = getTrend(w.pnl);
                return (
                  <tr key={w.address}>
                    <td className="text-foreground-muted">
                      {formatAddress(w.address)}
                    </td>
                    <td data-numeric data-trend={pnlTrend}>
                      {formatCompact(w.pnl)}
                    </td>
                    <td data-numeric>
                      {w.winRate.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>
      </div>
    </>
  );
}
