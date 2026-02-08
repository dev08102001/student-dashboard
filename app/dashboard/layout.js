import Sidebar from '../../components/Sidebar'
import ProfileDropdown from '../../components/ProfileDropdown'

export default function DashboardLayout({ children }) {
  return (
    <div className="pt-24">
      <div className="flex gap-6 max-w-7xl mx-auto px-6">
        <aside className="w-64"><Sidebar /></aside>
        <div className="flex-1">
          <div className="flex items-center justify-end mb-6"><ProfileDropdown /></div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

