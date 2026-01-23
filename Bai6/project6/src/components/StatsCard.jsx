function StatsCard({ title, value, delay = 0 }) {
  return (
    <div 
      className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-teal-100 shadow-lg shadow-teal-100/50 animate-slide-up hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-sm text-teal-600 mb-2">{title}</p>
      <p className="text-2xl font-bold text-teal-800">{value}</p>
    </div>
  )
}

export default StatsCard
