# Dashboard 强制风格排版规则 & 内容添加规则

> 所有为此 dashboard 贡献的代码（人工或 AI）必须遵守以下规则。违反规则的 PR 不予合并。

---

## 一、风格排版规则（强制）

### 1.1 色彩系统

**绝对禁止硬编码颜色值。** 所有颜色必须通过 CSS 变量或 Tailwind 语义色引用。

```
✅ 正确: text-bull / bg-surface / border-border
❌ 错误: text-green-500 / bg-[#151720] / border-gray-800
```

语义色分类：

| 用途 | CSS 变量 | Tailwind class | Hex 值 |
|---|---|---|---|
| 背景-主 | `--background` | `bg-background` | `#0a0b0f` |
| 背景-次 | `--background-alt` | `bg-background-alt` | `#0f1117` |
| 面板 | `--surface` | `bg-surface` | `#151720` |
| 面板悬停 | `--surface-hover` | `bg-surface-hover` | `#1a1d2a` |
| 边框 | `--border` | `border-border` | `#1e2235` |
| 主文字 | `--foreground` | `text-foreground` | `#e8eaf0` |
| 次要文字 | `--foreground-muted` | `text-foreground-muted` | `#7a7f96` |
| 涨/YES | `--bull` | `text-bull` | `#00e676` |
| 跌/NO | `--bear` | `text-bear` | `#ff1744` |
| 中性 | `--neutral` | `text-neutral` | `#448aff` |
| 强调 | `--accent` | `text-accent` | `#7c4dff` |
| 警告 | `--warning` | `text-warning` | `#ffab00` |

### 1.2 字体规则

- **默认字体**：等宽字体（Geist Mono），适合数据密集的 Trading Terminal 风格
- **所有数字**必须使用 `font-tabular` class 或 `data-numeric` 属性，确保数位对齐不跳动
- 禁止使用 serif 字体

```tsx
// ✅ 正确
<span className="font-tabular">{price.toFixed(2)}</span>
<td data-numeric>{volume}</td>

// ❌ 错误
<span>{price}</span>  // 无 tabular-nums
```

### 1.3 标题层级（严格遵守）

| 层级 | 用途 | 限制 |
|---|---|---|
| `h1` | 页面主标题 | 每页最多 1 个 |
| `h2` | Panel/模块标题 | 位于 `.panel-header` 内 |
| `h3` | 卡片/子区域标题 | — |
| `h4` | 标签/分类名 | 自动大写 + 增大字间距 |

**禁止跳级**：不允许 h1 后直接出现 h3。

### 1.4 间距规则

- 所有间距必须是 **4px 的倍数**（Tailwind: `p-1`=4px, `p-2`=8px, `p-3`=12px, `p-4`=16px）
- Panel 间距统一使用 `gap-3`（12px）
- Panel 内边距统一使用 `p-4`（16px）
- 禁止使用任意值间距如 `p-[13px]`、`m-[7px]`

### 1.5 圆角规则

- 面板/卡片: `rounded-md`（6px）
- 按钮/输入框: `rounded-sm`（4px）
- 头像/状态点: `rounded-full`
- 禁止使用 `rounded-none`（0）或 `rounded-3xl`

### 1.6 边框规则

- 所有面板必须有 `border border-border`
- Hover 时边框变为 `border-border-hover`
- 分隔线使用 `border-b border-border`
- 涨跌相关面板使用语义边框：`border-bull-border` / `border-bear-border`

### 1.7 动效规则

- 过渡时间：快速交互用 `120ms`，常规用 `200ms`
- 所有 hover 效果必须有 `transition` 声明
- 价格变化使用 `.flash-up` / `.flash-down` 动画
- 禁止使用超过 `300ms` 的过渡（Trading Terminal 需要即时反馈）

### 1.8 布局规则

- 顶部导航栏固定高度：`56px`（`--header-height`）
- 左侧边栏固定宽度：`260px`（`--sidebar-width`）
- 主内容区使用 CSS Grid 布局
- 最小内容宽度：`1024px`
- Grid 列：3 列或 4 列，按模块需要配置

---

## 二、内容添加规则（强制）

### 2.1 新增页面

每个新页面必须包含：

```
src/app/(dashboard)/[page-name]/
├── page.tsx          # 页面入口，仅负责布局编排
├── _components/      # 页面私有组件
│   ├── SomePanel.tsx
│   └── SomeTable.tsx
└── _hooks/           # 页面私有 hooks（可选）
```

**页面 page.tsx 结构模板：**

```tsx
export default function SomePage() {
  return (
    <>
      <PageHeader
        title="页面标题"
        description="简短描述"
      />
      <div className="grid grid-cols-3 gap-3">
        <PanelA />
        <PanelB />
        <PanelC />
      </div>
    </>
  );
}
```

### 2.2 新增 Panel（面板组件）

每个数据面板必须遵循统一结构：

```tsx
// ✅ 标准 Panel 结构
export function ArbitragePanel() {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Panel 标题</h2>
        <StatusDot status="live" />
      </div>

      <div className="panel-body">
        {/* 数据内容 */}
      </div>
    </div>
  );
}
```

必须包含：
- `panel-header` 带标题 + 状态指示灯
- 数据区域使用 `data-numeric` / `font-tabular` 显示数字
- 涨跌数据使用 `data-trend="up|down|flat"`

### 2.3 新增数据表格

```tsx
// ✅ 标准表格结构
<table>
  <thead>
    <tr>
      <th>市场</th>
      <th>YES</th>
      <th>NO</th>
      <th>价差</th>
    </tr>
  </thead>
  <tbody>
    {rows.map(row => (
      <tr key={row.id}>
        <td>{row.market}</td>
        <td data-numeric data-trend={row.yesTrend}>${row.yes}</td>
        <td data-numeric data-trend={row.noTrend}>${row.no}</td>
        <td data-numeric data-trend={row.spreadTrend}>{row.spread}%</td>
      </tr>
    ))}
  </tbody>
</table>
```

### 2.4 新增共享组件

共享组件放在 `src/components/ui/`，必须：

1. 使用 `cn()` 工具函数合并 class
2. 支持 `className` prop 传入
3. 使用 `cva` 管理变体

```tsx
// src/components/ui/badge.tsx
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium font-tabular",
  {
    variants: {
      variant: {
        bull:    "bg-bull-bg text-bull border border-bull-border",
        bear:    "bg-bear-bg text-bear border border-bear-border",
        neutral: "bg-neutral-bg text-neutral border border-neutral-border",
        warning: "bg-warning-bg text-warning",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
```

### 2.5 数据格式化规则

| 数据类型 | 格式 | 示例 |
|---|---|---|
| 价格 | 保留2位小数，前加 `$` | `$0.48` |
| 百分比 | 保留1位小数，后加 `%` | `+3.2%` |
| 涨跌百分比 | 正数前加 `+`，带涨跌色 | `+5.1%` / `-2.3%` |
| 大数字 | 使用 `K`/`M` 缩写 | `$1.2M` |
| 时间戳 | 相对时间，<24h 显示 `3m ago`，>24h 显示日期 | `3m ago` / `Mar 15` |
| 钱包地址 | 截断显示 `0x1234...abcd` | `0xdE17...9f2B` |

### 2.6 文件命名规则

| 类型 | 命名 | 示例 |
|---|---|---|
| 页面目录 | kebab-case | `arbitrage-signals/` |
| 组件文件 | PascalCase | `ArbitragePanel.tsx` |
| Hook 文件 | camelCase，`use` 前缀 | `useMarketData.ts` |
| 工具函数 | camelCase | `formatPrice.ts` |
| 类型文件 | camelCase | `types.ts` 或 `market.types.ts` |
| 常量文件 | camelCase | `constants.ts` |

### 2.7 目录结构（强制）

```
src/
├── app/
│   ├── (dashboard)/           # Dashboard 路由组
│   │   ├── layout.tsx         # 含 Sidebar + Header 的壳布局
│   │   ├── page.tsx           # 首页（概览）
│   │   ├── arbitrage/         # 套利信号页
│   │   ├── smart-money/       # 聪明钱追踪页
│   │   └── markets/           # 实时行情页
│   ├── globals.css            # Design Tokens + 全局样式
│   └── layout.tsx             # Root Layout
│
├── components/
│   ├── layout/                # 布局组件
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── PageHeader.tsx
│   └── ui/                    # 基础 UI 组件
│       ├── badge.tsx
│       ├── button.tsx
│       ├── status-dot.tsx
│       └── ...
│
├── hooks/                     # 全局共享 hooks
│   ├── useWebSocket.ts
│   └── useMarketData.ts
│
├── lib/                       # 工具函数
│   ├── utils.ts               # cn() 等
│   ├── format.ts              # 数据格式化
│   └── api.ts                 # API client
│
└── types/                     # 全局类型定义
    ├── market.ts
    ├── arbitrage.ts
    └── wallet.ts
```

---

## 三、禁止事项（红线）

1. **禁止** 在组件中硬编码颜色值（hex/rgb/hsl）
2. **禁止** 使用非 4px 倍数的间距
3. **禁止** 在 Panel 中省略 `panel-header`
4. **禁止** 数字不加 `tabular-nums`
5. **禁止** 涨跌数据不标注 `data-trend`
6. **禁止** 使用 `px` 单位定义字体大小（用 `rem`）
7. **禁止** 过渡动画超过 300ms
8. **禁止** 组件不接受 `className` prop
9. **禁止** 在共享组件中使用业务逻辑
10. **禁止** 直接在页面中写内联 `fetch`，必须通过 `lib/api.ts` 或 hooks
