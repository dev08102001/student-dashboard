import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-full p-6 bg-white border-r border-slate-100">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-primary-700">OwnGCC</h2>
        <p className="text-sm text-slate-500 mt-1">Student Dashboard</p>
      </div>
      <nav className="space-y-2">
        <Link href="/dashboard" className="block px-3 py-2 rounded-md hover:bg-slate-50">Overview</Link>
        <Link href="#" className="block px-3 py-2 rounded-md hover:bg-slate-50">Projects</Link>
        <Link href="#" className="block px-3 py-2 rounded-md hover:bg-slate-50">Skills</Link>
        <Link href="#" className="block px-3 py-2 rounded-md hover:bg-slate-50">Preferences</Link>
        <div className="mt-6 border-t pt-4 text-sm text-slate-500">© OwnGCC</div>
      </nav>
    </div>
  );
}

