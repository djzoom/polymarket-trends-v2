export default function FocusStories({ markets }) {
    const focus = markets.slice(0, 3);
    return (
      <section className="p-4">
        <h2 className="text-2xl mb-4">Focus Stories</h2>
        <div className="grid gap-4">
          {focus.map((m, i) => (
            <article key={m.id} className="bg-neutral-800 p-4 rounded shadow">
              <h3 className="text-lg font-semibold">
                {i + 1}. {m.title}
              </h3>
              <p className="text-sm text-gray-400">
                Yes {(m.yesPrice * 100).toFixed(1)}%, ΔP {(m.deltaP * 100).toFixed(1)}%, Vol ${(m.volume / 1e6).toFixed(2)}M
              </p>
              {/* 这里可调用 OpenAI API 生成摘要，将摘要输出在下方 */}
              <p className="mt-2 text-gray-300 italic">
                {/* Placeholder summary */}
                A brief summary of why this prediction is gaining attention.
              </p>
            </article>
          ))}
        </div>
      </section>
    );
  }