'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/60 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="OwnGCC" width={180} height={48} />
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium px-4 py-2 rounded-md hover:bg-slate-50 transition">Login</Link>
          <Link href="/signup" className="bg-ogg-500 text-white px-4 py-2 rounded-md shadow-sm hover:brightness-95 transition">Sign Up</Link>
        </div>
      </div>
    </header>
  )
}

