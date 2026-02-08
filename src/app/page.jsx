import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-white">
      <section className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
              OwnGCC — <span className="text-primary-700">Student Dashboard</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              Connect with hiring teams through a curated profile that highlights real projects, verified skills and role preferences — built to increase interview invites.
            </p>

            <div className="flex gap-3 items-center">
              {/* Login / Sign up are in the top-right nav only */}
            </div>

            <div className="mt-6 hero-chat">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">OG</div>
                <div>
                  <div className="chat-bubble sent">
                    Hi Alex — welcome to OwnGCC! Tell me about your top project or skill and I’ll show you roles that match.
                  </div>
                  <div className="mt-3 chat-bubble recv">
                    I built a portfolio builder using Next.js and Tailwind — looking for frontend internships.
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-start gap-3">
                  <div className="feature-icon">⚡</div>
                  <div>
                    <div className="text-sm text-slate-500">Fast discovery</div>
                    <div className="font-medium">Employers find you quickly</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="feature-icon">🔎</div>
                  <div>
                    <div className="text-sm text-slate-500">Smart matching</div>
                    <div className="font-medium">Skills-first role suggestions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-lg">
              <img src="/hero-illustration.svg" alt="hero" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-8">
        <h3 className="text-2xl font-semibold text-slate-900">How OwnGCC helps you get hired</h3>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="card">
            <div className="text-sm text-slate-500">Visibility</div>
            <div className="font-medium mt-1">Curated profiles and portfolio evidence that recruiters trust.</div>
          </div>
          <div className="card">
            <div className="text-sm text-slate-500">Match quality</div>
            <div className="font-medium mt-1">AI-prioritized shortlists that focus on practical skills.</div>
          </div>
          <div className="card">
            <div className="text-sm text-slate-500">Faster interviews</div>
            <div className="font-medium mt-1">Streamlined scheduling and feedback to speed hiring.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
