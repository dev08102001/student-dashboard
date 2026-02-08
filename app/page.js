import Hero from '../components/Hero'
import FeatureCard from '../components/FeatureCard'

export default function Home() {
  return (
    <div className="pt-24">
      <Hero />
      {/* Full-width marquee below hero / above features */}
      <div className="mt-8 py-4 bg-ogg-50 rounded-md">
        <div className="max-w-7xl mx-auto overflow-hidden">
          <div className="ogg-marquee">
            <div className="inner flex gap-8 items-center">
              <span className="font-semibold">ACME Corp</span>
              <span className="font-semibold">Globex</span>
              <span className="font-semibold">FinServe</span>
              <span className="font-semibold">ACME Corp</span>
              <span className="font-semibold">Globex</span>
              <span className="font-semibold">FinServe</span>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-3">
        <FeatureCard title="Verified Employers" description="Enterprises vetted for quality hiring and high-impact roles." />
        <FeatureCard title="Skills-first Matching" description="Profiles matched by skills, projects & aptitude, not just degrees." />
        <FeatureCard title="Fast Shortlists" description="Streamlined evaluation — faster interviews for qualified students." />
      </section>

      <section id="how" className="mt-12">
        <h2 className="text-2xl font-semibold">How OwnGCC works — in plain terms</h2>
        <p className="mt-3 text-slate-600 max-w-3xl">
          OwnGCC connects ambitious students to enterprise hiring through skills-first profiles, guided onboarding, and verified employer shortlists.
          Students build a profile with projects, skills, and role preferences; our enterprise partners shortlist and interview the best fits.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="p-6 rounded-xl bg-white shadow-soft-md">
            <h3 className="font-semibold">Create a standout profile</h3>
            <p className="mt-2 text-sm text-slate-600">Upload work, add projects and skills, and highlight your achievements with clean, recruiter-focused cards.</p>
          </div>
          <div className="p-6 rounded-xl bg-white shadow-soft-md">
            <h3 className="font-semibold">Get matched to roles</h3>
            <p className="mt-2 text-sm text-slate-600">Employers search by skills and project evidence — you get fair, transparent shortlists.</p>
          </div>
          <div className="p-6 rounded-xl bg-white shadow-soft-md">
            <h3 className="font-semibold">Interview & hire</h3>
            <p className="mt-2 text-sm text-slate-600">Enterprise-grade process with clear feedback and protected candidate data.</p>
          </div>
        </div>
      </section>
      
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-center">Testimonials</h2>
        <p className="text-sm text-slate-600 mt-2 text-center">Real feedback from students who found roles through OwnGCC.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1,2,3].map((i)=>(
            <div key={i} className="p-6 rounded-xl bg-white shadow-md flex flex-col items-center text-center">
              <img src="/test1.png" alt={`student-${i}`} className="w-24 h-24 rounded-full object-cover shadow-md" />
              <div className="mt-4 font-medium text-lg">Maria Smantha</div>
              <div className="text-sm text-ogg-500">Web Developer</div>
              <p className="mt-4 text-sm text-slate-600">“OwnGCC helped me get noticed by top companies — the skills-first profile made all the difference.”</p>
              <div className="mt-4 flex items-center gap-1">
                {Array.from({length:4}).map((_,idx)=>(<svg key={idx} width="16" height="16" viewBox="0 0 24 24" fill="#FFB74D" xmlns="http://www.w3.org/2000/svg"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.173L12 18.896l-7.336 3.875 1.402-8.173L.132 9.21l8.2-1.192z"/></svg>))}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#F3F4F6" xmlns="http://www.w3.org/2000/svg"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.173L12 18.896l-7.336 3.875 1.402-8.173L.132 9.21l8.2-1.192z"/></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our partners grid (centered heading like testimonials) */}
      <section className="mt-10">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-lg font-semibold">Partners & Team</h3>
          <h2 className="mt-3 text-2xl font-bold">Collaborative Excellence: Building Bridges, Driving Success</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">We partner with industry leaders to open opportunities and create pathways for students. Our curated partners trust OwnGCC's skills-first profiles for reliable hiring.</p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {['/logo.png','/test1.png','/logo.png','/test1.png','/logo.png','/test1.png','/logo.png','/test1.png'].map((src, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <img src={src} alt={`partner-${i}`} className="max-h-12 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

