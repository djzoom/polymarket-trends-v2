export default function QuoteBanner() {
    const quote = "The best way to predict the future is to create it.";
    return (
      <div className="bg-neutral-800 text-center p-6 mb-4">
        <p className="text-xl italic text-emerald-400">{quote}</p>
      </div>
    );
  }