/**
 * 数据格式化工具
 *
 * 强制规则：
 * - 价格：2位小数，前加 $
 * - 百分比：1位小数，后加 %
 * - 涨跌：正数前加 +
 * - 大数字：K/M 缩写
 * - 时间：<24h 用相对时间，>24h 用日期
 * - 地址：截断 0x1234...abcd
 */

/** 价格格式化：$0.48 */
export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

/** 百分比格式化：3.2% */
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

/** 涨跌百分比：+5.1% / -2.3% */
export function formatChange(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

/** 涨跌方向判定 */
export function getTrend(value: number): "up" | "down" | "flat" {
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "flat";
}

/** 大数字缩写：$1.2M / $45.3K */
export function formatCompact(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
}

/** 相对时间：3m ago / 2h ago / Mar 15 */
export function formatTimeAgo(date: Date | string | number): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;

  const d = new Date(date);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

/** 钱包地址截断：0xdE17...9f2B */
export function formatAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2 + 2) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
