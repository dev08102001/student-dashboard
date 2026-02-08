import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <aside className="w-72 hidden md:block">
          <Sidebar />
        </aside>
        <div className="flex-1">
          <div className="pt-6" />
          <main className="container py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

