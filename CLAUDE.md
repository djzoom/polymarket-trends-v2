# CLAUDE.md

## Project Overview

Polymarket Trends Terminal — 套利信号 · 聪明钱追踪 · 实时行情 Dashboard。

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: Tailwind CSS v4 + shadcn/ui pattern (CVA + clsx + tailwind-merge)
- **Language**: TypeScript (strict)
- **Icons**: Lucide React

## Commands

```bash
cd dashboard
npm run dev      # 开发服务器
npm run build    # 生产构建
npm run lint     # ESLint 检查
```

## Project Structure

```
dashboard/
├── src/
│   ├── app/
│   │   ├── (dashboard)/           # Dashboard 路由组（含壳布局）
│   │   │   ├── layout.tsx         # Sidebar + Header 壳
│   │   │   ├── page.tsx           # 概览首页
│   │   │   ├── arbitrage/         # 套利信号页
│   │   │   ├── smart-money/       # 聪明钱追踪页
│   │   │   └── markets/           # 实时行情页
│   │   ├── globals.css            # Design Tokens + 全局样式
│   │   └── layout.tsx             # Root Layout
│   ├── components/
│   │   ├── layout/                # Sidebar, Header, PageHeader
│   │   └── ui/                    # Badge, Panel, StatusDot
│   ├── hooks/                     # 共享 hooks
│   ├── lib/                       # utils.ts, format.ts, api.ts
│   └── types/                     # TypeScript 类型定义
├── STYLE_GUIDE.md                 # 强制风格排版规则 & 内容添加规则
└── package.json
```

## Critical Rules for AI Assistants

> 所有规则详见 `dashboard/STYLE_GUIDE.md`，以下为摘要。

### 色彩：禁止硬编码
```
✅ text-bull / bg-surface / border-border
❌ text-green-500 / bg-[#151720] / border-gray-800
```

### 数字：必须 tabular-nums
```tsx
<span className="font-tabular">{price.toFixed(2)}</span>
<td data-numeric data-trend="up">{value}</td>
```

### Panel：必须有 header + 状态灯
```tsx
<Panel>
  <PanelHeader title="标题" status="live" />
  {/* 内容 */}
</Panel>
```

### 文件命名
- 页面目录: `kebab-case/`
- 组件: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`

### 禁止事项
1. 硬编码颜色值
2. 非 4px 倍数间距
3. Panel 无 header
4. 数字无 tabular-nums
5. 涨跌数据无 data-trend
6. 过渡动画 > 300ms
7. 组件不接受 className prop
