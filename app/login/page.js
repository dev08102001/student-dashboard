'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage(){
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
      localStorage.setItem('ogg_user', JSON.stringify({ id: 'student-123', name: 'Demo Student' }))
      router.push('/onboarding')
    }, 600)
  }

  return (
    <div className="pt-24 max-w-md mx-auto">
      <div className="p-8 rounded-2xl bg-white shadow-soft-md">
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p className="text-sm text-slate-600 mt-1">Log in to continue to your student onboarding</p>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
          <input required placeholder="Email" className="px-4 py-3 rounded-md border" />
          <input required type="password" placeholder="Password" className="px-4 py-3 rounded-md border" />
          <button disabled={loading} className="mt-2 bg-ogg-500 text-white px-4 py-2 rounded-md">Login</button>
        </form>
      </div>
    </div>
  )
}

