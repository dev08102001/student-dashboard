export default function Hero(){
  return (
    <section className="rounded-2xl overflow-hidden bg-gradient-to-r from-ogg-50/60 to-white p-8 shadow-soft-md border border-transparent">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-ogg-700">OwnGCC — Graduates. Verified. Hired.</h1>
          <p className="mt-4 text-lg text-slate-700 max-w-2xl">Enterprise hiring that treats students like potential, not credentials. Showcase projects, skills, and real experience — and get matched to roles that value your work.</p>
          <div className="mt-6 flex gap-3">
            <a href="#how" className="inline-flex items-center px-6 py-3 rounded-lg bg-ogg-500 text-white shadow-md hover:brightness-95 transition">Get Started</a>
            <a href="#how" className="inline-flex items-center px-6 py-3 rounded-lg border border-ogg-100 text-ogg-700 hover:bg-ogg-50 transition">Learn how it works</a>
          </div>

          <div className="mt-8">
            <div className="p-4 rounded-lg bg-white shadow-sm">
              <div className="text-xs text-slate-500">Average shortlist time</div>
              <div className="mt-2 font-semibold">2 weeks from application</div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="rounded-xl bg-gradient-to-b from-ogg-50 to-white p-6 shadow-md border border-ogg-100">
            <div className="text-sm font-semibold text-slate-600">Why OwnGCC?</div>
            <div className="mt-3 text-slate-700">We combine skills-first profiles with enterprise-grade processes to create fair, fast hiring for students. Beautiful profiles. Better matches.</div>
            <div className="mt-4 grid gap-3">
              <div className="p-4 rounded-lg bg-white shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 bg-ogg-100 rounded flex items-center justify-center text-ogg-700 font-bold">★</div>
                <div>
                  <div className="font-medium">Skills-first matching</div>
                  <div className="text-sm text-slate-500">Recruiters hire based on what you can do, not just your degree.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

