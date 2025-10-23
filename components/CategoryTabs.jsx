export default function CategoryTabs({ selected, onChange }) {
    const categories = ['all', 'politics', 'crypto', 'sports', 'tech'];
    return (
      <div className="flex space-x-4 p-4">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded ${
              selected === cat ? 'bg-emerald-500 text-white' : 'bg-neutral-700 text-gray-300'
            }`}
            onClick={() => onChange(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    );
  }