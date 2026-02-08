export default function FeatureCard({ title, description }) {
  return (
    <div className="p-6 rounded-xl bg-white shadow-soft-md hover:shadow-md transition transform hover:-translate-y-1 flex flex-col items-center text-center">
      <h4 className="mt-2 font-semibold text-ogg-700">{title}</h4>
      <p className="mt-3 text-sm text-slate-600">{description}</p>
      <div className="mt-4">
        <span className="text-amber-400 text-xl">★</span>
      </div>
    </div>
  )
}

