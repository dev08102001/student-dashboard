'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage(){
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
      setShowSuccess(true)
      setTimeout(()=> router.push('/login'), 1700)
    }, 900)
  }

  return (
    <div className="pt-24 max-w-2xl mx-auto">
      <div className="p-8 rounded-2xl bg-white shadow-soft-md">
        <h2 className="text-2xl font-semibold">Sign up</h2>
        <p className="text-sm text-slate-600 mt-1">Create your OwnGCC student account</p>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
          <input required placeholder="Full name" className="px-4 py-3 rounded-md border" />
          <input required type="email" placeholder="Email" className="px-4 py-3 rounded-md border" />
          <input required type="password" placeholder="Create password" className="px-4 py-3 rounded-md border" />
          <input required type="password" placeholder="Confirm password" className="px-4 py-3 rounded-md border" />
          <button disabled={loading} className="mt-2 bg-ogg-500 text-white px-4 py-2 rounded-md">Create account</button>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 flex items-end md:items-center justify-center p-6">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <div className="text-ogg-500 font-bold text-2xl">✓</div>
            <h3 className="mt-3 font-semibold">Account created</h3>
            <p className="mt-2 text-sm text-slate-600">Your account was created successfully. Redirecting to Login…</p>
          </div>
        </div>
      )}
    </div>
  )
}

