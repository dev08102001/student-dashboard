'use client'
import { useState } from 'react'

export default function ProfileDropdown(){
  const [open, setOpen] = useState(false)
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('ogg_user') || 'null') : null
  return (
    <div className="relative">
      <button onClick={()=>setOpen(o=>!o)} className="flex items-center gap-2 px-3 py-2 rounded bg-white border">
        <div className="w-8 h-8 rounded-full bg-slate-100" />
        <div className="text-sm">{user?.name || 'Student'}</div>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md p-2">
          <button className="w-full text-left px-2 py-2 rounded hover:bg-slate-50">View profile</button>
          <button onClick={()=>{
            localStorage.removeItem('ogg_user')
            window.location.href = '/'
          }} className="w-full text-left px-2 py-2 rounded hover:bg-slate-50">Logout</button>
        </div>
      )}
    </div>
  )
}

