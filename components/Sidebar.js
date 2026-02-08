import Link from 'next/link'

export default function Sidebar(){
  return (
    <nav className="sticky top-28">
      <div className="p-4 rounded-xl bg-white shadow-soft-md">
        <ul className="space-y-2">
          <li><Link href="/dashboard" className="block px-3 py-2 rounded hover:bg-slate-50">Overview</Link></li>
          <li><a className="block px-3 py-2 rounded hover:bg-slate-50">Applications</a></li>
          <li><a className="block px-3 py-2 rounded hover:bg-slate-50">Projects</a></li>
          <li><a className="block px-3 py-2 rounded hover:bg-slate-50">Settings</a></li>
        </ul>
      </div>
    </nav>
  )
}

