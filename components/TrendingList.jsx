import { motion } from 'framer-motion';

export default function TrendingList({ markets }) {
  return (
    <section className="p-4">
      <h2 className="text-2xl mb-4">Trending Today</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {markets.slice(0, 20).map((m) => (
          <motion.article
            key={m.id}
            className="bg-neutral-800 p-4 rounded-lg shadow hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold">{m.title}</h3>
            <p className="text-sm text-gray-400">
              Yes: {(m.yesPrice * 100).toFixed(1)}% | Vol: ${(m.volume / 1e6).toFixed(2)}M
            </p>
            <p className="mt-2 text-emerald-400">
              ΔP: {(m.deltaP * 100).toFixed(1)}% | ΔV: ${(m.deltaV / 1e6).toFixed(2)}M
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

