"use client";
export default function Skills({ skills = [], summary = "" }) {
  return (
    <div className="mt-3">
      <p className="text-sm text-slate-600">{summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((s, i) => (
          <span key={i} className="chip">{s}</span>
        ))}
      </div>
    </div>
  );
}
