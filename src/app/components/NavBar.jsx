import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm border-b">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="OwnGCC" className="h-10 w-auto" />
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="btn bg-white border border-primary-200 text-primary-700 hover:shadow">
            Login
          </Link>
          <Link href="/signup" className="btn bg-primary-500 text-white hover:bg-primary-700">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}

