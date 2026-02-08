export default function DashboardHome(){
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-white shadow-soft-md">
          <h4 className="font-semibold">Profile</h4>
          <p className="text-sm text-slate-600 mt-2">Your student profile summary and key skills.</p>
        </div>
        <div className="p-6 rounded-xl bg-white shadow-soft-md">
          <h4 className="font-semibold">Recommended Roles</h4>
          <ul className="mt-3 space-y-3">
            <li className="p-3 rounded border">Frontend Engineer — ACME Corp <span className="text-sm text-slate-500">• Remote</span></li>
            <li className="p-3 rounded border">Data Analyst — Bits Inc <span className="text-sm text-slate-500">• Hybrid</span></li>
          </ul>
        </div>
        <div className="p-6 rounded-xl bg-white shadow-soft-md">
          <h4 className="font-semibold">Applications</h4>
          <p className="text-sm text-slate-500 mt-2">Track shortlisted roles and interview status.</p>
        </div>
      </div>
    </div>
  )
}

