'use client';

import { useEffect, useState } from 'react';
import TrendingList from '../components/TrendingList';
import VolatilityChart from '../components/VolatilityChart';
import CategoryTabs from '../components/CategoryTabs';
import FocusStories from '../components/FocusStories';
import QuoteBanner from '../components/QuoteBanner';

interface Market {
  id: string;
  title: string;
  yesPrice: number;
  volume: number;
  deltaP: number;
  deltaV: number;
  category?: string;
  volatilityIndex?: number;
  score?: number;
}

export default function HomePage() {
  const [data, setData] = useState<Market[]>([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const dateStr = new Date().toISOString().split('T')[0];
    fetch(`/data/${dateStr}.json`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const filtered = category === 'all'
    ? data
    : data.filter((m) => (m.category || '').toLowerCase() === category);

  return (
    <main className="min-h-screen bg-neutral-900 text-gray-100">
      <header className="py-6 text-center text-3xl font-bold">
        Polymarket Prediction News Dashboard
      </header>
      <QuoteBanner />
      <CategoryTabs selected={category} onChange={setCategory} />
      <TrendingList markets={filtered} />
      <VolatilityChart markets={filtered} />
      <FocusStories markets={filtered} />
    </main>
  );
}
