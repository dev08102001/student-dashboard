'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function BranchSelector({ degree, value, onChange }){
  const mapping = {
    'Bachelor of Technology (B.Tech)': ['Computer Science & Engineering','Information Technology','Artificial Intelligence & Machine Learning','Data Science','Electronics & Communication Engineering','Electrical Engineering','Mechanical Engineering','Civil Engineering','Chemical Engineering'],
    'Bachelor of Engineering (B.E.)': ['Computer Engineering','Electronics Engineering','Electrical Engineering','Mechanical Engineering','Civil Engineering','Instrumentation Engineering'],
    'Master of Technology (M.Tech)': ['Computer Science & Engineering','Artificial Intelligence','Data Science','Software Engineering','Cyber Security','VLSI Design','Power Systems','Structural Engineering'],
    'Master of Engineering (M.E.)': ['Computer Engineering','Electronics & Communication','Electrical Systems','Mechanical Systems','Civil Engineering'],
    'Bachelor of Science (B.Sc)': ['Computer Science','Information Technology','Data Science','Mathematics','Physics','Chemistry','Statistics'],
    'Master of Science (M.Sc)': ['Computer Science','Data Science','Artificial Intelligence','Mathematics','Physics','Chemistry','Statistics'],
    'Bachelor of Computer Applications (BCA)': ['Computer Applications','Software Development','Cloud Computing','Data Analytics'],
    'Master of Computer Applications (MCA)': ['Software Engineering','Data Science','Artificial Intelligence','Cyber Security','Cloud Computing'],
    'Bachelor of Business Administration (BBA)': ['Marketing','Finance','Human Resource Management','International Business','Entrepreneurship'],
    'Master of Business Administration (MBA)': ['Marketing','Finance','Human Resources','Operations Management','Business Analytics','Information Systems','International Business'],
    'Bachelor of Commerce (B.Com)': ['Accounting','Finance','Banking & Insurance','Taxation','Business Economics'],
    'Master of Commerce (M.Com)': ['Accounting','Finance','Banking','Taxation','Business Management'],
    'Bachelor of Arts (B.A.)': ['Economics','Political Science','Psychology','Sociology','English Literature','History'],
    'Master of Arts (M.A.)': ['Economics','Psychology','Political Science','Sociology','English'],
    'Bachelor of Design (B.Des)': ['UI/UX Design','Graphic Design','Product Design','Industrial Design','Interaction Design'],
    'Master of Design (M.Des)': ['UI/UX Design','Product Design','Industrial Design','Interaction Design'],
    'Bachelor of Fine Arts (BFA)': ['Graphic Design','Visual Arts','Animation','Photography'],
    'Bachelor of Laws (LLB)': ['Corporate Law','Criminal Law','Intellectual Property Law','International Law'],
    'Diploma': ['Computer Engineering','Mechanical Engineering','Electrical Engineering','Civil Engineering','Information Technology'],
    'Integrated Program': ['Integrated B.Tech + M.Tech','Integrated BBA + MBA','Integrated B.Com + M.Com','Integrated B.A + LLB']
  }
  const options = mapping[degree] || []
  return (
    <select value={value} onChange={e=>onChange(e.target.value)} className="px-3 py-2 border rounded-md w-full mt-2">
      <option value="">Select specialization (optional)</option>
      {options.map(opt => <option key={opt}>{opt}</option>)}
    </select>
  )
}

function getRolesForCategory(cat){
  const map = {
    'Technical': ['Frontend Engineer','Backend Engineer','Full Stack Developer','Data Analyst','DevOps Engineer','QA Engineer','SDE Intern'],
    'Business & Operations': ['Business Analyst','Operations Executive','Sales Executive','Business Development Associate','Customer Success Associate','Operations Intern'],
    'Design & Creative': ['UI/UX Designer','Graphic Designer','Product Designer','Content Creator','Social Media Manager'],
    'Finance & HR': ['HR Executive','Talent Acquisition Intern','HR Operations','Finance Analyst','Accounts Executive']
  }
  return map[cat] || []
}

export default function OnboardingWizard(){
  const router = useRouter()
  const totalSteps = 6
  const [step, setStep] = useState(1)
  const [state, setState] = useState({
    name: '',
    email: '',
    contact: '',
    location: '',
    college: '',
    degree: '',
    branch: '',
    gradYear: '',
    skills: { technical: [], professional: [] },
    skillType: 'Technical',
    experience: '',
    projects: [],
    preferences: { roles: [], type: 'Internship', mode: 'Remote', roleCategory: 'Technical', openToMultiple: false }
  })

  const [projectFormOpen, setProjectFormOpen] = useState(false)
  const [projectForm, setProjectForm] = useState({ title:'', desc:'', tag:'Personal', tech:[], codeLink:'', liveLink:'' })
  const [projectEditIndex, setProjectEditIndex] = useState(null)
  const [customRoleCategory, setCustomRoleCategory] = useState('')

  function next() { setStep(s => Math.min(totalSteps, s+1)) }
  function prev() { setStep(s => Math.max(1, s-1)) }
  function saveAndGoDashboard(){
    localStorage.setItem('ogg_profile', JSON.stringify(state))
    router.push('/dashboard')
  }

  const remaining = Math.max(0, totalSteps - step)
  const progress = Math.round(((step - 1) / (totalSteps - 1)) * 100)

  function addSkill(skill){
    if(!skill) return
    const key = state.skillType === 'Technical' ? 'technical' : 'professional'
    const skills = state.skills[key] || []
    if(skills.includes(skill)) return
    setState(s => ({ ...s, skills: { ...s.skills, [key]: [...skills, skill] } }))
  }

  function removeSkill(skill, type){
    const key = type === 'Technical' ? 'technical' : 'professional'
    setState(s => ({ ...s, skills: { ...s.skills, [key]: (s.skills[key]||[]).filter(sk => sk !== skill) } }))
  }

  function getSuggestedSkills(degree){
    const d = (degree || '').toLowerCase()
    if(d.includes('computer') || d.includes('cs') || d.includes('engineering')) return ['React','TypeScript','Node.js','SQL','Git']
    if(d.includes('data') || d.includes('analytics')) return ['Python','SQL','Pandas','Tableau','R']
    return ['Communication','Problem Solving','Excel','JavaScript']
  }

  function openAddProject(){
    setProjectForm({ title:'', desc:'', tag:'Personal', tech:[], codeLink:'', liveLink:'' })
    setProjectEditIndex(null)
    setProjectFormOpen(true)
  }

  function saveProject(){
    if(!projectForm.title) return
    if(projectEditIndex !== null && projectEditIndex >= 0){
      const projects = [...state.projects]
      projects[projectEditIndex] = projectForm
      setState(s => ({ ...s, projects }))
    } else {
      setState(s => ({ ...s, projects: [...(s.projects||[]), projectForm] }))
    }
    setProjectFormOpen(false)
    setProjectForm({ title:'', desc:'', tag:'Personal', tech:[], codeLink:'', liveLink:'' })
    setProjectEditIndex(null)
  }

  function editProject(i){
    setProjectForm(state.projects[i])
    setProjectEditIndex(i)
    setProjectFormOpen(true)
  }

  function deleteProject(i){
    setState(s => ({ ...s, projects: s.projects.filter((_,idx)=>idx!==i) }))
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-8">
      <div className="w-[90vw] max-w-[90vw] h-[90vh] overflow-auto p-6 rounded-xl bg-white shadow-soft-md">
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Onboarding — Step {step} / {totalSteps}</h3>
            <div className="text-sm text-slate-500">Take your time — you can edit later</div>
          </div>

          {/* Progress bar + micro copy */}
          <div className="mt-3">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-2 bg-ogg-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-2 text-sm text-slate-600">{remaining > 0 ? `Almost there — ${remaining} more step${remaining>1?'s':''} to go 🚀` : 'One last step — you’re almost done! 🎉'}</div>
          </div>
        </div>

        <div className="mt-6">
          {/* STEP 1: Basic Professional Information */}
          {step === 1 && (
            <div>
              <h4 className="font-semibold">Basic Professional Information</h4>
              <div className="text-sm text-slate-600 mt-1">This helps recruiters recognize and contact you — it takes less than a minute.</div>

              {/* Resume upload */}
              <div className="mt-4">
                <label className="text-sm font-medium">Resume (optional)</label>
                <div className="mt-2 flex items-center gap-3">
                  <input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={e=>{
                    const f = e.target.files && e.target.files[0]
                    if(f) setState(s=>({...s, resumeName: f.name}))
                  }} className="block" />
                  <div className="text-sm text-slate-500">{state.resumeName ? state.resumeName : 'Upload a PDF or DOC — optional'}</div>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input placeholder="Full name" value={state.name} onChange={e=>setState(s=>({...s, name: e.target.value}))} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <input placeholder="you@college.edu" type="email" value={state.email} onChange={e=>setState(s=>({...s, email: e.target.value}))} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="text-sm font-medium">Contact Number</label>
                  <input placeholder="+91 98765 43210" value={state.contact} onChange={e=>setState(s=>({...s, contact: e.target.value}))} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="text-sm font-medium">Current Location (City & Country)</label>
                  <input placeholder="Bengaluru, India" value={state.location} onChange={e=>setState(s=>({...s, location: e.target.value}))} className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Academic Details */}
          {step === 2 && (
            <div>
              <h4 className="font-semibold">Academic background</h4>
              <div className="text-sm text-slate-600 mt-1">Helps recruiters understand your educational foundation. This helps recruiters understand you better — it takes less than a minute.</div>

              <div className="mt-4 grid md:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm">College name</label>
                  <input placeholder="College name" value={state.college} onChange={e=>setState(s=>({...s, college: e.target.value}))} className="px-3 py-2 border rounded-md w-full" />
                </div>
                <div>
                  <label className="text-sm">Degree</label>
                  <select value={state.degree} onChange={e=>setState(s=>({...s, degree: e.target.value, branch: ''}))} className="px-3 py-2 border rounded-md w-full">
                    <option value="">Select degree</option>
                    <option>Bachelor of Technology (B.Tech)</option>
                    <option>Bachelor of Engineering (B.E.)</option>
                    <option>Master of Technology (M.Tech)</option>
                    <option>Master of Engineering (M.E.)</option>
                    <option>Bachelor of Science (B.Sc)</option>
                    <option>Master of Science (M.Sc)</option>
                    <option>Bachelor of Computer Applications (BCA)</option>
                    <option>Master of Computer Applications (MCA)</option>
                    <option>Bachelor of Business Administration (BBA)</option>
                    <option>Master of Business Administration (MBA)</option>
                    <option>Bachelor of Commerce (B.Com)</option>
                    <option>Master of Commerce (M.Com)</option>
                    <option>Bachelor of Arts (B.A.)</option>
                    <option>Master of Arts (M.A.)</option>
                    <option>Bachelor of Design (B.Des)</option>
                    <option>Master of Design (M.Des)</option>
                    <option>Bachelor of Fine Arts (BFA)</option>
                    <option>Bachelor of Laws (LLB)</option>
                    <option>Diploma</option>
                    <option>Integrated Program</option>
                  </select>
                  <div className="text-xs text-slate-500 mt-1">Select the degree you are currently pursuing or have completed.</div>
                </div>
                <div>
                  <label className="text-sm">Graduation year</label>
                  <input placeholder="Graduation year" value={state.gradYear} onChange={e=>setState(s=>({...s, gradYear: e.target.value}))} className="px-3 py-2 border rounded-md w-full" />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm">Specialization / Branch</label>
                <BranchSelector degree={state.degree} value={state.branch || ''} onChange={val=>setState(s=>({...s, branch: val}))} />
                <div className="text-xs text-slate-500 mt-1">Choose the branch or specialization that best matches your study focus.</div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 text-sm bg-slate-50 px-3 py-1 rounded">
                <span>🎓</span>
                <span className="font-medium">Verified Academic Info</span>
              </div>
            </div>
          )}

          {/* STEP 3: Skills & Experience */}
          {step === 3 && (
            <div>
              <h4 className="font-semibold">Skills, tools & real-world experience</h4>
              <div className="text-sm text-slate-600 mt-1">Whether you’re technical or non-technical, practical skills and real-world exposure matter more than job titles. This helps recruiters understand you better — it takes less than a minute.</div>

              <div className="mt-4">
                <label className="text-sm">Skill type</label>
                <div className="mt-2 inline-flex rounded bg-slate-100 p-1">
                  {['Technical','Professional'].map(type => (
                    <button key={type} onClick={()=>setState(s=>({...s, skillType: type}))} className={`px-3 py-1 rounded ${state.skillType===type ? 'bg-white shadow' : 'bg-transparent'}`}>{type}</button>
                  ))}
                </div>

                <label className="text-sm mt-3">Add skills</label>
                <input placeholder={state.skillType === 'Technical' ? 'Start typing a technical skill (e.g., React, Python, SQL)' : 'Start typing a skill (e.g., Communication, Sales, HR Operations)'} onKeyDown={(e)=>{
                  if(e.key === 'Enter'){
                    e.preventDefault()
                    const val = e.target.value.trim()
                    if(val){
                      addSkill(val)
                      e.target.value = ''
                    }
                  }
                }} className="px-3 py-2 border rounded-md w-full" />

                <div className="mt-3 flex flex-wrap gap-2">
                  {(state.skills.technical||[]).map((sk,i)=>(
                    <div key={`t-${i}`} className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-sm">
                      <span>{sk}</span>
                      <button aria-label={`Remove ${sk}`} onClick={()=>removeSkill(sk,'Technical')} className="text-xs text-slate-500">✕</button>
                    </div>
                  ))}
                  {(state.skills.professional||[]).map((sk,i)=>(
                    <div key={`p-${i}`} className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-sm">
                      <span>{sk}</span>
                      <button aria-label={`Remove ${sk}`} onClick={()=>removeSkill(sk,'Professional')} className="text-xs text-slate-500">✕</button>
                    </div>
                  ))}
                </div>

                <div className="mt-3">
                  <div className="text-sm text-slate-500 mb-2">Suggested technical skills</div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getSuggestedSkills(state.degree).map(sug => (
                      <button key={`s-${sug}`} onClick={()=>{ setState(s=>({...s, skillType: 'Technical'})); addSkill(sug) }} className="px-3 py-1 rounded bg-slate-100 text-sm">{sug}</button>
                    ))}
                  </div>
                  <div className="text-sm text-slate-500 mb-2">Suggested professional skills</div>
                  <div className="flex flex-wrap gap-2">
                    {['Communication','Problem Solving','Sales & Negotiation','Client Handling','HR Operations','Digital Marketing'].map(sug => (
                      <button key={`ps-${sug}`} onClick={()=>{ setState(s => ({ ...s, skillType: 'Professional', skills: { ...s.skills, professional: [...(s.skills.professional||[]), sug] } })) }} className="px-3 py-1 rounded bg-slate-100 text-sm">{sug}</button>
                    ))}
                  </div>
                </div>

                <label className="text-sm mt-4">Experience summary</label>
                <div className="text-xs text-slate-500">Briefly describe what you’ve worked on, contributed to, or learned (projects, internships, college work, operations, sales, research, etc.). Recruiters prefer concise summaries.</div>
                <textarea maxLength={500} placeholder="Briefly describe your experience in 2–3 lines" value={state.experience} onChange={e=>setState(s=>({...s, experience: e.target.value}))} className="mt-2 w-full p-3 border rounded-md" />
                <div className="text-xs text-slate-400 mt-1">{state.experience.length}/500</div>
              </div>
            </div>
          )}

          {/* STEP 4: Projects */}
          {step === 4 && (
            <div>
              <h4 className="font-semibold">Projects that showcase your skills</h4>
              <div className="text-sm text-slate-600 mt-1">Projects help recruiters evaluate real-world experience, not just resumes. This helps recruiters understand you better — it takes less than a minute.</div>

              <div className="mt-4">
                {/* Empty state */}
                {(!state.projects || state.projects.length === 0) && (
                  <div className="p-6 rounded-md border text-center">
                    <div className="text-xl">📁</div>
                    <div className="font-medium mt-2">Showcase work that represents you</div>
                    <div className="text-sm text-slate-500 mt-1">Showcase work that best represents what you’ve done — academic, professional, or personal.</div>
                    <button onClick={openAddProject} className="mt-4 px-4 py-2 rounded bg-ogg-50">Add your first project</button>
                  </div>
                )}

                {/* Projects list */}
                {(state.projects||[]).map((p,idx)=>(
                  <div key={idx} className="p-3 rounded-md border flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{p.title}</div>
                        <div className="text-xs text-slate-500">{p.tag || 'Personal'}</div>
                      </div>
                      <div className="text-sm text-slate-500 mt-1">{p.desc}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(p.tech||[]).map((t,i)=> <span key={i} className="text-xs px-2 py-1 rounded bg-ogg-50 text-ogg-700">{t}</span>)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <div className="flex gap-2">
                        <button onClick={()=>editProject(idx)} className="px-3 py-1 rounded bg-white border text-sm">✏️ Edit</button>
                        <button onClick={()=>deleteProject(idx)} className="px-3 py-1 rounded bg-white border text-sm">🗑 Delete</button>
                      </div>
                      <div className="flex flex-col">
                        <button className="px-3 py-1 rounded bg-slate-100 text-sm">View Code</button>
                        <button className="px-3 py-1 rounded bg-slate-100 text-sm">Live Preview</button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-4">
                  <div className="text-sm text-slate-600">Even small or academic projects are valuable.</div>
                  <button onClick={openAddProject} className="mt-2 px-4 py-2 rounded bg-ogg-50">Add project</button>
                </div>
              </div>

              {/* Project form (inline) */}
              {projectFormOpen && (
                <div className="mt-4 p-4 border rounded-md bg-white">
                  <h5 className="font-medium">{(projectEditIndex !== null && projectEditIndex >= 0) ? 'Edit project' : 'Add project'}</h5>
                  <div className="mt-3 grid gap-2">
                    <input placeholder="Project / Work Title (e.g., College ERP System)" value={projectForm.title} onChange={e=>setProjectForm(prev=>({...prev, title: e.target.value}))} className="px-3 py-2 border rounded-md" />
                    <textarea placeholder="Description — goal, your role, outcome (what you learned)" value={projectForm.desc} onChange={e=>setProjectForm(prev=>({...prev, desc: e.target.value}))} className="px-3 py-2 border rounded-md" />
                    <label className="text-sm">Project Type</label>
                    <select value={projectForm.tag} onChange={e=>setProjectForm(prev=>({...prev, tag: e.target.value}))} className="px-3 py-2 border rounded-md">
                      <option>Personal</option>
                      <option>Academic</option>
                      <option>Internship</option>
                      <option>Professional</option>
                      <option>Freelance</option>
                      <option>Research</option>
                      <option>Case Study</option>
                    </select>
                    <input placeholder="Tools / Tech (comma separated, e.g., React, Python, Excel)" value={(projectForm.tech || []).join(', ')} onChange={e=>setProjectForm(prev=>({...prev, tech: e.target.value.split(',').map(t=>t.trim()).filter(Boolean)}))} className="px-3 py-2 border rounded-md" />
                    <input placeholder="Code / Work link (optional)" value={projectForm.codeLink} onChange={e=>setProjectForm(prev=>({...prev, codeLink: e.target.value}))} className="px-3 py-2 border rounded-md" />
                    <input placeholder="Live / Demo link (optional)" value={projectForm.liveLink} onChange={e=>setProjectForm(prev=>({...prev, liveLink: e.target.value}))} className="px-3 py-2 border rounded-md" />
                    <div className="flex gap-2">
                      <button onClick={saveProject} className="px-4 py-2 rounded bg-ogg-500 text-white">Save project</button>
                      <button onClick={()=>{ setProjectFormOpen(false); setProjectForm({ title:'', desc:'', tag:'Personal', tech:[], codeLink:'', liveLink:'' }); setProjectEditIndex(null) }} className="px-4 py-2 rounded border">Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Career Preferences */}
          {step === 5 && (
            <div>
              <h4 className="font-semibold">Your career preferences</h4>
              <div className="text-sm text-slate-600 mt-1">This helps OwnGCC match you with the right opportunities faster. This helps recruiters understand you better — it takes less than a minute.</div>

              <div className="mt-4 grid gap-3">
                <div>
                  <label className="text-sm">Role category</label>
                  <div className="mt-2 inline-flex rounded bg-slate-100 p-1">
                    {['Technical','Business & Operations','Design & Creative','Finance & HR','Other'].map(cat => (
                      <button key={cat} onClick={()=>{
                        setState(s=>({...s, preferences: {...s.preferences, roleCategory: cat}}))
                        if(cat !== 'Other') setCustomRoleCategory('')
                      }} className={`px-3 py-1 rounded ${state.preferences.roleCategory===cat ? 'bg-white shadow' : 'bg-transparent'}`}>{cat}</button>
                    ))}
                  </div>
                  {state.preferences.roleCategory === 'Other' && (
                    <div className="mt-2">
                      <input placeholder="Specify role category (e.g., Sustainability, Legal, Research)" value={customRoleCategory} onChange={e=>setCustomRoleCategory(e.target.value)} className="px-3 py-2 border rounded-md w-full" />
                      <div className="text-xs text-slate-500 mt-1">This custom category will be used to guide suggested roles (UI-only).</div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm">Preferred roles</label>
                  <div className="text-xs text-slate-500">Select up to 3 roles that best describe what you want to work on right now.</div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    { (state.preferences.roleCategory === 'Other' ? [] : getRolesForCategory(state.preferences.roleCategory)).map(role => {
                      const selected = (state.preferences.roles||[]).includes(role)
                      return (
                        <button key={role} onClick={()=>{
                          const roles = state.preferences.roles||[]
                          if(selected) setState(s=>({...s, preferences: {...(s.preferences||{}), roles: roles.filter(r=>r!==role)}}))
                          else setState(s=>({...s, preferences: {...(s.preferences||{}), roles: [...roles, role].slice(0,3)}}))
                        }} className={`px-3 py-1 rounded ${selected ? 'bg-ogg-500 text-white' : 'bg-slate-100 text-slate-700'}`}>{role}</button>
                      )
                    })}
                    {state.preferences.roleCategory === 'Other' && (
                      <input placeholder="Add preferred role (free text)" value={state.preferences.customRoles || ''} onChange={e=>setState(s=>({...s, preferences: {...s.preferences, customRoles: e.target.value}}))} className="px-3 py-1 rounded border w-full" />
                    )}
                  </div>
                  <div className="mt-2">
                    <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={state.preferences.openToMultiple} onChange={e=>setState(s=>({...s, preferences: {...s.preferences, openToMultiple: e.target.checked}}))} /> I’m open to multiple roles based on opportunities</label>
                  </div>
                </div>

                <div>
                  <label className="text-sm">Job type</label>
                  <div className="text-xs text-slate-500">Applies to both technical and non-technical roles. You can change this anytime as your goals evolve.</div>
                  <div className="mt-2 flex gap-2">
                    {['Internship','Full-time','Contract'].map(t => (
                      <button key={t} onClick={()=>setState(s=>({...s, preferences: {...(s.preferences||{}), type: t}}))} className={`px-3 py-1 rounded ${state.preferences?.type===t ? 'bg-ogg-500 text-white' : 'bg-slate-100'}`}>{t}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm">Work mode</label>
                  <div className="text-xs text-slate-500">Choose the work environment you’re most comfortable with.</div>
                  <div className="mt-2 flex gap-2">
                    {['Remote','Hybrid','Onsite'].map(m => (
                      <button key={m} onClick={()=>setState(s=>({...s, preferences: {...(s.preferences||{}), mode: m}}))} className={`px-3 py-1 rounded ${state.preferences?.mode===m ? 'bg-ogg-500 text-white' : 'bg-slate-100'}`}>{m}</button>
                    ))}
                  </div>
                </div>

                <div className="mt-3 inline-flex items-center gap-2 text-sm bg-slate-50 px-3 py-1 rounded">
                  <span>⚡</span>
                  <span className="font-medium">Used for smart role matching</span>
                </div>

                <div className="mt-3 text-sm text-slate-600">
                  <strong>Summary:</strong> {state.preferences.roleCategory} • {(state.preferences.roles||[]).join(', ') || 'No specific roles selected'} • {state.preferences.type} • {state.preferences.mode} {state.preferences.openToMultiple ? '• Open to multiple roles' : ''}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Final Review / Motivation */}
          {step === 6 && (
            <div>
              <h4 className="font-semibold">You’re all set 🎉</h4>
              <div className="text-sm text-slate-600 mt-1">Your profile is ready to be discovered by hiring partners on OwnGCC. This helps recruiters understand you better — it takes less than a minute.</div>

              <div className="mt-4 grid gap-4">
                <div className="p-4 rounded-md bg-slate-50">
                  <div className="font-medium">Profile</div>
                  <div className="text-sm text-slate-600">{state.name || '—'} • {state.college || '—'}</div>
                </div>
                <div className="p-4 rounded-md bg-slate-50">
                  <div className="font-medium">Academic</div>
                  <div className="text-sm text-slate-600">{state.degree || '—'} {state.branch ? `• ${state.branch}` : ''} • {state.gradYear || '—'}</div>
                </div>
                <div className="p-4 rounded-md bg-slate-50">
                  <div className="font-medium">Skills</div>
                  <div className="text-sm text-slate-600">{[(state.skills.technical||[]).join(', '),(state.skills.professional||[]).join(', ')].filter(Boolean).join(' • ') || '—'}</div>
                </div>
                <div className="p-4 rounded-md bg-slate-50">
                  <div className="font-medium">Projects</div>
                  <div className="text-sm text-slate-600">{(state.projects||[]).length} project(s)</div>
                </div>
                <div className="p-4 rounded-md bg-slate-50">
                  <div className="font-medium">Preferences</div>
                  <div className="text-sm text-slate-600">{(state.preferences?.roles||[]).join(', ') || '—'} • {state.preferences?.type} • {state.preferences?.mode}</div>
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-600">Your information is only visible to verified recruiters on OwnGCC.</div>
            </div>
          )}

          {/* Trust signal at bottom of each step */}
          <div className="mt-6 text-xs text-slate-400">Your information is only visible to verified recruiters on OwnGCC.</div>

          <div className="mt-6 flex justify-between">
            <div>
              {step > 1 && <button onClick={prev} className="px-4 py-2 rounded border">Back</button>}
            </div>
            <div className="flex gap-2">
              {step < totalSteps && <button onClick={next} className="px-4 py-2 rounded bg-ogg-500 text-white">Next</button>}
              {step === totalSteps && <button onClick={saveAndGoDashboard} className="px-4 py-2 rounded bg-ogg-500 text-white">Go to Dashboard</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

