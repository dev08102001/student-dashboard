"use client";
export default function Projects({ projects = [] }) {
  return (
    <div className="mt-3 space-y-4">
      {projects.map((p, idx) => (
        <div key={idx} className="border rounded-lg p-4 hover:shadow-sm transition">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">{p.title}</h4>
              <p className="text-sm text-slate-600 mt-1">{p.description}</p>
              <div className="mt-2 text-sm text-slate-500">Tech: {p.tech.join(", ")}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="btn border border-slate-200">GitHub</button>
              <button className="btn bg-primary-500 text-white">Live Demo</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
