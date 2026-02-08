import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 rounded-md bg-slate-100">☰</button>
          <div className="text-lg font-semibold">Dashboard</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-600 hidden sm:block">Welcome,</div>
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 bg-white border rounded-full px-3 py-1">
              <img src="/avatar-placeholder.svg" alt="avatar" className="w-8 h-8 rounded-full" loading="lazy" />
              <span className="hidden sm:inline-block">Alex Johnson</span>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md py-2 z-10">
                <a className="block px-3 py-2 text-sm hover:bg-slate-50" href="#">Profile</a>
                <a className="block px-3 py-2 text-sm hover:bg-slate-50" href="#">Settings</a>
                <a className="block px-3 py-2 text-sm hover:bg-slate-50" href="#">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
