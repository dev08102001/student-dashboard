 "use client";
 import React, { useState, useEffect } from "react";
 import { useRouter } from "next/navigation";

 // Clean, minimal onboarding page (single module only)
 const STEPS = ["Basic", "Academic", "Skills", "Projects", "Experience", "Preferences"];

 const INITIAL = {
   basic: { name: "", email: "" },
   academic: { college: "", degree: "", graduationYear: "" },
   skills: { technical: [], tools: [], soft: [] },
   projects: [],
   experience: [],
   preferences: { workMode: "Remote", availability: "" },
 };

 export default function OnboardingPage() {
   const router = useRouter();
   const [step, setStep] = useState(0);
   const [data, setData] = useState(() => {
     try { return JSON.parse(localStorage.getItem("owngcc_profile")) || INITIAL; } catch { return INITIAL; }
   });
   const [input, setInput] = useState("");

   useEffect(() => {
     localStorage.setItem("owngcc_profile", JSON.stringify(data));
   }, [data]);

   function update(path, value) {
     setData(prev => {
       const out = JSON.parse(JSON.stringify(prev));
       const keys = path.split(".");
       let cur = out;
       for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
       cur[keys[keys.length - 1]] = value;
       return out;
     });
   }

   function canNext() {
     if (step === 0) return !!(data.basic.name.trim() && data.basic.email.trim());
     return true;
   }

   function next() {
     if (!canNext()) { alert("Please complete required fields."); return; }
     setStep(s => Math.min(s + 1, STEPS.length - 1));
   }

   function back() { setStep(s => Math.max(s - 1, 0)); }

   function finish() {
     localStorage.setItem("owngcc_profile", JSON.stringify(data));
     router.push("/dashboard");
   }

   function addSkill() {
     const v = input.trim();
     if (!v) return;
     if (!data.skills.technical.includes(v)) update("skills.technical", [...data.skills.technical, v]);
     setInput("");
   }

   return (
     <main className="container py-10">
       <div className="mx-auto w-[90vw] max-w-[900px]">
         <div className="card">
           <div className="flex items-center justify-between mb-4">
             <div>
               <h2 className="text-2xl font-semibold">Profile setup</h2>
               <p className="text-sm text-slate-600">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
             </div>
           </div>

           <div className="mt-4">
             {step === 0 && (
               <div className="grid gap-3">
                 <input value={data.basic.name} onChange={e => update("basic.name", e.target.value)} placeholder="Full name *" className="rounded-md border px-3 py-2" />
                 <input value={data.basic.email} onChange={e => update("basic.email", e.target.value)} placeholder="Email *" className="rounded-md border px-3 py-2" />
               </div>
             )}

             {step === 1 && (
               <div className="grid gap-3">
                 <input value={data.academic.college} onChange={e => update("academic.college", e.target.value)} placeholder="College / University" className="rounded-md border px-3 py-2" />
                 <input value={data.academic.degree} onChange={e => update("academic.degree", e.target.value)} placeholder="Degree" className="rounded-md border px-3 py-2" />
                 <input value={data.academic.graduationYear} onChange={e => update("academic.graduationYear", e.target.value)} placeholder="Graduation year" className="rounded-md border px-3 py-2" />
               </div>
             )}

             {step === 2 && (
               <div className="grid gap-3">
                 <div className="flex gap-2">
                   <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} placeholder="Add a skill and press Enter" className="rounded-md border px-3 py-2 flex-1" />
                   <button onClick={addSkill} className="btn bg-primary-500 text-white">Add</button>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {data.skills.technical.map((s, i) => <span key={i} className="chip">{s}</span>)}
                 </div>
               </div>
             )}

             {step === 3 && (
               <div>
                 <p className="text-sm text-slate-600">Projects (demo)</p>
                 <div className="mt-2">
                   <button onClick={() => update("projects", [...data.projects, { title: "Demo project", description: "Demo", tech: ["React"] }])} className="btn bg-white border">Add demo project</button>
                 </div>
               </div>
             )}

             {step === 4 && (
               <div>
                 <p className="text-sm text-slate-600">Experience (demo)</p>
                 <div className="mt-2">
                   <button onClick={() => update("experience", [...data.experience, { role: "Intern", organization: "Company", duration: "2 months" }])} className="btn bg-white border">Add demo experience</button>
                 </div>
               </div>
             )}

             {step === 5 && (
               <div>
                 <label className="text-sm block">Availability</label>
                 <select value={data.preferences.availability} onChange={e => update("preferences.availability", e.target.value)} className="rounded-md border px-3 py-2">
                   <option value="">Select</option>
                   <option value="Immediate">Immediate</option>
                   <option value="15 days">In 15 days</option>
                   <option value="30 days">In 30 days</option>
                   <option value="60 days">In 60 days</option>
                 </select>
               </div>
             )}
           </div>

           <div className="mt-6 flex justify-between">
             <div>{step > 0 && <button onClick={back} className="btn border">Back</button>}</div>
             <div>
               {step < STEPS.length - 1 ? (
                 <button onClick={next} className="btn bg-primary-500 text-white">Next</button>
               ) : (
                 <button onClick={finish} className="btn bg-primary-700 text-white">Finish</button>
               )}
             </div>
           </div>
         </div>
       </div>
     </main>
   );
 }

 "use client";
 import React, { useState, useEffect } from "react";
 import { useRouter } from "next/navigation";
 
 // Clean single onboarding component (overwrites any previous content)
 const STEPS = ["Basic", "Academic", "Skills", "Projects", "Experience", "Preferences"];
 const INITIAL = {
   basic: { name: "", email: "" },
   academic: { college: "", degree: "", graduationYear: "" },
   skills: { technical: [], tools: [], soft: [] },
   projects: [],
   experience: [],
   preferences: { workMode: "Remote", availability: "" },
 };
 
 export default function OnboardingPage() {
   const router = useRouter();
   const [step, setStep] = useState(0);
   const [data, setData] = useState(() => {
     try { return JSON.parse(localStorage.getItem("owngcc_profile")) || INITIAL; } catch { return INITIAL; }
   });
   const [input, setInput] = useState("");
 
   useEffect(() => {
     localStorage.setItem("owngcc_profile", JSON.stringify(data));
   }, [data]);
 
   function update(path, value) {
     setData(prev => {
       const out = JSON.parse(JSON.stringify(prev));
       const keys = path.split(".");
       let cur = out;
       for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
       cur[keys[keys.length - 1]] = value;
       return out;
     });
   }
 
   function canNext() {
     if (step === 0) return data.basic.name.trim() && data.basic.email.trim();
     return true;
   }
 
   function next() {
     if (!canNext()) { alert("Please complete required fields."); return; }
     setStep(s => Math.min(s + 1, STEPS.length - 1));
   }
   function back() { setStep(s => Math.max(s - 1, 0)); }
   function finish() { localStorage.setItem("owngcc_profile", JSON.stringify(data)); router.push("/dashboard"); }
 
   function addSkill() {
     const v = input.trim();
     if (!v) return;
     if (!data.skills.technical.includes(v)) update("skills.technical", [...data.skills.technical, v]);
     setInput("");
   }
 
   return (
     <main className="container py-10">
       <div className="mx-auto w-[90vw] max-w-[900px]">
         <div className="card">
           <div className="flex items-center justify-between mb-4">
             <div>
               <h2 className="text-2xl font-semibold">Profile setup</h2>
               <p className="text-sm text-slate-600">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
             </div>
           </div>

           <div className="mt-4">
             {step === 0 && (
               <div className="grid gap-3">
                 <input value={data.basic.name} onChange={e => update("basic.name", e.target.value)} placeholder="Full name *" className="rounded-md border px-3 py-2" />
                 <input value={data.basic.email} onChange={e => update("basic.email", e.target.value)} placeholder="Email *" className="rounded-md border px-3 py-2" />
               </div>
             )}

             {step === 1 && (
               <div className="grid gap-3">
                 <input value={data.academic.college} onChange={e => update("academic.college", e.target.value)} placeholder="College / University" className="rounded-md border px-3 py-2" />
                 <input value={data.academic.degree} onChange={e => update("academic.degree", e.target.value)} placeholder="Degree" className="rounded-md border px-3 py-2" />
                 <input value={data.academic.graduationYear} onChange={e => update("academic.graduationYear", e.target.value)} placeholder="Graduation year" className="rounded-md border px-3 py-2" />
               </div>
             )}

             {step === 2 && (
               <div className="grid gap-3">
                 <div className="flex gap-2">
                   <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} placeholder="Add a skill and press Enter" className="rounded-md border px-3 py-2 flex-1" />
                   <button onClick={addSkill} className="btn bg-primary-500 text-white">Add</button>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {data.skills.technical.map((s, i) => <span key={i} className="chip">{s}</span>)}
                 </div>
               </div>
             )}

             {step === 3 && (
               <div>
                 <p className="text-sm text-slate-600">Projects (demo)</p>
                 <div className="mt-2">
                   <button onClick={() => update("projects", [...data.projects, { title: "Demo project", description: "Demo", tech: ["React"] }])} className="btn bg-white border">Add demo project</button>
                 </div>
               </div>
             )}

             {step === 4 && (
               <div>
                 <p className="text-sm text-slate-600">Experience (demo)</p>
                 <div className="mt-2">
                   <button onClick={() => update("experience", [...data.experience, { role: "Intern", organization: "Company", duration: "2 months" }])} className="btn bg-white border">Add demo experience</button>
                 </div>
               </div>
             )}

             {step === 5 && (
               <div>
                 <label className="text-sm block">Availability</label>
                 <select value={data.preferences.availability} onChange={e => update("preferences.availability", e.target.value)} className="rounded-md border px-3 py-2">
                   <option value="">Select</option>
                   <option value="Immediate">Immediate</option>
                   <option value="15 days">In 15 days</option>
                   <option value="30 days">In 30 days</option>
                   <option value="60 days">In 60 days</option>
                 </select>
               </div>
             )}
           </div>

           <div className="mt-6 flex justify-between">
             <div>{step > 0 && <button onClick={back} className="btn border">Back</button>}</div>
             <div>
               {step < STEPS.length - 1 ? (
                 <button onClick={next} className="btn bg-primary-500 text-white">Next</button>
               ) : (
                 <button onClick={finish} className="btn bg-primary-700 text-white">Finish</button>
               )}
             </div>
           </div>
         </div>
       </div>
     </main>
   );
 }
 "use client";
 import React, { useState, useEffect } from "react";
 import { useRouter } from "next/navigation";

 // Simple, single-component onboarding page (clean and valid)
 const STEPS = ["Basic", "Academic", "Skills", "Projects", "Experience", "Preferences"];

 const INITIAL = {
   basic: { name: "", email: "" },
   academic: { college: "", degree: "", graduationYear: "" },
   skills: { technical: [], tools: [], soft: [] },
   projects: [],
   experience: [],
   preferences: { workMode: "Remote", availability: "" },
 };

 export default function OnboardingPage() {
   const router = useRouter();
   const [step, setStep] = useState(0);
   const [data, setData] = useState(() => {
     try { return JSON.parse(localStorage.getItem("owngcc_profile")) || INITIAL; } catch { return INITIAL; }
   });
   const [skillInput, setSkillInput] = useState("");

   useEffect(() => {
     localStorage.setItem("owngcc_profile", JSON.stringify(data));
   }, [data]);

   function update(path, value) {
     setData(prev => {
       const out = JSON.parse(JSON.stringify(prev));
       const keys = path.split(".");
       let cur = out;
       for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
       cur[keys[keys.length - 1]] = value;
       return out;
     });
   }

   function canNext() {
     if (step === 0) {
       return data.basic.name.trim() && data.basic.email.trim();
     }
     return true;
   }

   function next() {
     if (!canNext()) {
       alert("Please complete required fields for this step.");
       return;
     }
     setStep(s => Math.min(s + 1, STEPS.length - 1));
   }

   function back() {
     setStep(s => Math.max(s - 1, 0));
   }

   function finish() {
     localStorage.setItem("owngcc_profile", JSON.stringify(data));
     router.push("/dashboard");
   }

   function addSkill() {
     const v = skillInput.trim();
     if (!v) return;
     if (!data.skills.technical.includes(v)) update("skills.technical", [...data.skills.technical, v]);
     setSkillInput("");
   }

   return (
     <main className="container py-10">
       <div className="mx-auto w-[90vw] max-w-[900px]">
         <div className="card">
           <div className="flex items-center justify-between mb-4">
             <div>
               <h2 className="text-2xl font-semibold">Profile setup</h2>
               <p className="text-sm text-slate-600">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
             </div>
           </div>

           <div className="mt-4">
             {step === 0 && (
               <div className="grid gap-3">
                 <input value={data.basic.name} onChange={e => update("basic.name", e.target.value)} placeholder="Full name *" className="rounded-md border px-3 py-2" />
                 <input value={data.basic.email} onChange={e => update("basic.email", e.target.value)} placeholder="Email *" className="rounded-md border px-3 py-2" />
               </div>
             )}

             {step === 1 && (
               <div className="grid gap-3">
                 <input value={data.academic.college} onChange={e => update("academic.college", e.target.value)} placeholder="College / University" className="rounded-md border px-3 py-2" />
                 <input value={data.academic.degree} onChange={e => update("academic.degree", e.target.value)} placeholder="Degree" className="rounded-md border px-3 py-2" />
                 <input value={data.academic.graduationYear} onChange={e => update("academic.graduationYear", e.target.value)} placeholder="Graduation year" className="rounded-md border px-3 py-2" />
               </div>
             )}

             {step === 2 && (
               <div className="grid gap-3">
                 <div className="flex gap-2">
                   <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} placeholder="Add a skill and press Enter" className="rounded-md border px-3 py-2 flex-1" />
                   <button onClick={addSkill} className="btn bg-primary-500 text-white">Add</button>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {data.skills.technical.map((s, i) => <span key={i} className="chip">{s}</span>)}
                 </div>
               </div>
             )}

             {step === 3 && (
               <div>
                 <p className="text-sm text-slate-600">Add project (demo)</p>
                 <div className="mt-2">
                   <button onClick={() => update("projects", [...data.projects, { title: "Demo project", description: "Description", tech: ["React"] }])} className="btn bg-white border">Add demo project</button>
                 </div>
                 <div className="mt-3 space-y-2">
                   {data.projects.map((p, i) => (
                     <div key={i} className="border rounded-md p-3">{p.title} — {p.description}</div>
                   ))}
                 </div>
               </div>
             )}

             {step === 4 && (
               <div>
                 <p className="text-sm text-slate-600">Experience (demo)</p>
                 <div className="mt-2">
                   <button onClick={() => update("experience", [...data.experience, { role: "Intern", organization: "Company", duration: "2 months" }])} className="btn bg-white border">Add demo experience</button>
                 </div>
               </div>
             )}

             {step === 5 && (
               <div>
                 <label className="text-sm block">Availability</label>
                 <select value={data.preferences.availability} onChange={e => update("preferences.availability", e.target.value)} className="rounded-md border px-3 py-2">
                   <option value="">Select</option>
                   <option value="Immediate">Immediate</option>
                   <option value="15 days">In 15 days</option>
                   <option value="30 days">In 30 days</option>
                   <option value="60 days">In 60 days</option>
                 </select>
               </div>
             )}
           </div>

           <div className="mt-6 flex justify-between">
             <div>{step > 0 && <button onClick={back} className="btn border">Back</button>}</div>
             <div>
               {step < STEPS.length - 1 ? (
                 <button onClick={next} className="btn bg-primary-500 text-white">Next</button>
               ) : (
                 <button onClick={finish} className="btn bg-primary-700 text-white">Finish</button>
               )}
             </div>
           </div>
         </div>
       </div>
     </main>
   );
 }

 "use client";
 import React, { useState, useEffect } from "react";
 import { useRouter } from "next/navigation";

 // Minimal, stable onboarding page — focuses on navigation working correctly
 const INITIAL = {
   basic: { name: "", email: "", phone: "", location: "" },
 };

 export default function OnboardingPage() {
   const router = useRouter();
   const [step, setStep] = useState(0);
   const [data, setData] = useState(() => {
     try { return JSON.parse(localStorage.getItem("owngcc_profile")) || INITIAL; } catch { return INITIAL; }
   });

   useEffect(() => { localStorage.setItem("owngcc_profile", JSON.stringify(data)); }, [data]);

   function update(path, value) {
     setData(prev => ({ ...prev, [path]: value }));
   }

   function next() {
     // simple validation for step 0
     if (step === 0) {
       const b = data.basic || {};
       if (!b.name || !b.email) return alert("Please enter name and email to continue.");
     }
     setStep(s => Math.min(s + 1, 2));
   }
   function back() { setStep(s => Math.max(s - 1, 0)); }
   function finish() { router.push("/dashboard"); }

   return (
     <main className="container py-10">
       <div className="mx-auto w-[90vw] max-w-[900px]">
         <div className="card">
           <h2 className="text-xl font-semibold mb-4">Quick profile builder</h2>
           <div className="mb-6">
             <div className="text-sm text-slate-600">Step {step + 1} / 3</div>
           </div>

           {step === 0 && (
             <div className="space-y-3">
               <input placeholder="Full name" value={(data.basic||{}).name||""} onChange={e=>update("basic", {...(data.basic||{}), name: e.target.value})} className="w-full rounded-md border px-3 py-2" />
               <input placeholder="Email" value={(data.basic||{}).email||""} onChange={e=>update("basic", {...(data.basic||{}), email: e.target.value})} className="w-full rounded-md border px-3 py-2" />
             </div>
           )}

           {step === 1 && (
             <div className="space-y-3">
               <div className="text-sm text-slate-600">This is a placeholder step — navigation should work.</div>
             </div>
           )}

           {step === 2 && (
             <div className="space-y-3">
               <div className="text-sm text-slate-600">Finish and view dashboard.</div>
             </div>
           )}

           <div className="mt-6 flex justify-between">
             <div>{step > 0 && <button onClick={back} className="btn border">Back</button>}</div>
             <div>
               {step < 2 ? <button onClick={next} className="btn bg-primary-500 text-white">Next</button> : <button onClick={finish} className="btn bg-primary-700 text-white">Finish</button>}
             </div>
           </div>
         </div>
       </div>
     </main>
   );
 }

 "use client";
 import React, { useState, useEffect } from "react";
 import { useRouter } from "next/navigation";

 const STEP_TITLES = ["Basic","Academic","Opportunities","Skills","Projects","Experience","Preferences"];

 const DEFAULT = {
   basic: { name: "", email: "", phone: "", location: "" },
   academic: { college: "", degree: "", specialization: "", graduationYear: "" },
   opportunities: { types: [], roles: [], objective: "" },
   skills: { technical: [], tools: [], soft: [] },
   projects: [],
   experience: [],
   preferences: { workMode: "Remote", availability: "" }
 };

 const SAMPLE_TECH = ["Programming Fundamentals","OOP","Data Structures & Algorithms","Frontend Development","Backend Development","Machine Learning"];
 const SAMPLE_TOOLS = ["JavaScript","TypeScript","React","Next.js","Node.js","Python","Django"];
 const SAMPLE_SOFT = ["Communication","Problem Solving","Teamwork","Leadership","Time Management"];

 export default function OnboardingPage() {
   const router = useRouter();
   const [step, setStep] = useState(0);
   const [data, setData] = useState(() => {
     try { return JSON.parse(localStorage.getItem("owngcc_profile")) || DEFAULT; } catch { return DEFAULT; }
   });
   const [skillQuery, setSkillQuery] = useState("");
   const [toolQuery, setToolQuery] = useState("");

   useEffect(() => { localStorage.setItem("owngcc_profile", JSON.stringify(data)); }, [data]);

   function update(path, value) {
     setData(prev => {
       const out = JSON.parse(JSON.stringify(prev));
       const keys = path.split(".");
       let cur = out;
       for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
       cur[keys[keys.length - 1]] = value;
       return out;
     });
   }

   function toggle(path, item) {
     const arr = path.split(".").reduce((a,k) => a[k], data) || [];
     update(path, arr.includes(item) ? arr.filter(x=>x!==item) : [...arr, item]);
   }

   function addCustom(path, item) {
     if (!item) return;
     const arr = path.split(".").reduce((a,k) => a[k], data) || [];
     if (!arr.includes(item)) update(path, [...arr, item]);
   }

   function canProceed() {
     if (step === 0) {
       const b = data.basic; return b.name && b.email && b.phone && b.location;
     }
     if (step === 1) {
       const a = data.academic; return a.college && a.degree && a.graduationYear;
     }
     if (step === 3) {
       return data.skills.technical.length || data.skills.tools.length;
     }
     return true;
   }

   function next() { if (!canProceed()) return alert("Please complete required fields for this step."); setStep(s=>Math.min(s+1, STEP_TITLES.length-1)); }
   function back() { setStep(s=>Math.max(s-1,0)); }
   function finish() { localStorage.setItem("owngcc_profile", JSON.stringify(data)); router.push("/dashboard"); }

   return (
     <main className="container py-10">
       <div className="mx-auto w-[90vw] max-w-[1100px]">
         <div className="flex items-center justify-between mb-6">
           <div>
             <h2 className="text-2xl font-semibold">Conversational profile setup</h2>
             <p className="text-slate-600">Answer one focused step at a time.</p>
           </div>
           <div className="text-sm text-primary-700 font-medium">{step+1} / {STEP_TITLES.length}</div>
         </div>

         <div className="card">
           <div className="mb-4">
             <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
               <div style={{width:`${((step+1)/STEP_TITLES.length)*100}%`}} className="h-2 bg-primary-500 transition-all" />
             </div>
           </div>

           <div className="flex gap-6">
             <div className="flex-1">
               <div className="space-y-4">
                 <div className="flex items-start gap-3">
                   <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">OG</div>
                   <div className="chat-bubble sent max-w-prose">
                     {STEP_TITLES[step] === "Basic" && "Let's start with your contact details."}
                     {STEP_TITLES[step] === "Academic" && "Tell us about your college and degree."}
                     {STEP_TITLES[step] === "Opportunities" && "Which opportunities are you looking for?"}
                     {STEP_TITLES[step] === "Skills" && "Select your core skills and tools."}
                     {STEP_TITLES[step] === "Projects" && "Add projects that showcase your work."}
                     {STEP_TITLES[step] === "Experience" && "Share internships or work experience."}
                     {STEP_TITLES[step] === "Preferences" && "Set your work preferences and availability."}
                   </div>
                 </div>

                 <div className="chat-bubble recv">
                   {step === 0 && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                       <input placeholder="Full name *" value={data.basic.name} onChange={e=>update("basic.name", e.target.value)} className="rounded-md border px-3 py-2" />
                       <input placeholder="Email *" value={data.basic.email} onChange={e=>update("basic.email", e.target.value)} className="rounded-md border px-3 py-2" />
                       <input placeholder="Phone *" value={data.basic.phone} onChange={e=>update("basic.phone", e.target.value)} className="rounded-md border px-3 py-2" />
                       <input placeholder="Location *" value={data.basic.location} onChange={e=>update("basic.location", e.target.value)} className="rounded-md border px-3 py-2" />
                     </div>
                   )}

                   {step === 1 && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                       <input placeholder="College / University *" value={data.academic.college} onChange={e=>update("academic.college", e.target.value)} className="rounded-md border px-3 py-2" />
                       <input placeholder="Degree *" value={data.academic.degree} onChange={e=>update("academic.degree", e.target.value)} className="rounded-md border px-3 py-2" />
                       <input placeholder="Specialization" value={data.academic.specialization} onChange={e=>update("academic.specialization", e.target.value)} className="rounded-md border px-3 py-2" />
                       <input placeholder="Graduation year *" value={data.academic.graduationYear} onChange={e=>update("academic.graduationYear", e.target.value)} className="rounded-md border px-3 py-2" />
                     </div>
                   )}

                   {step === 2 && (
                     <div className="space-y-3">
                       <div className="flex gap-2">
                         {["Internship","Full-time","Contract","Freelance"].map(t=> {
                           const active = data.opportunities.types.includes(t);
                           return <button key={t} onClick={()=>toggle("opportunities.types", t)} className={`btn border ${active ? "bg-primary-50" : "bg-white"}`}>{t}</button>;
                         })}
                       </div>
                       <input placeholder="Preferred roles (comma separated)" value={data.opportunities.roles.join(", ")} onChange={e=>update("opportunities.roles", e.target.value.split(",").map(s=>s.trim()).filter(Boolean))} className="rounded-md border px-3 py-2" />
                       <textarea placeholder="Career objective" value={data.opportunities.objective} onChange={e=>update("opportunities.objective", e.target.value)} className="rounded-md border px-3 py-2" rows={3} />
                     </div>
                   )}

                   {step === 3 && (
                     <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <div className="text-sm text-slate-500">Technical skills</div>
                         <input value={skillQuery} onChange={e=>setSkillQuery(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"){ e.preventDefault(); addCustom("skills.technical", skillQuery.trim()); setSkillQuery(""); } }} placeholder="Search or press Enter to add" className="rounded-md border px-3 py-1 text-sm w-48" />
                       </div>
                       <div className="flex flex-wrap gap-2">
                         {SAMPLE_TECH.map(s=> {
                           const active = data.skills.technical.includes(s);
                           return <button key={s} onClick={()=>toggle("skills.technical", s)} className={`chip ${active ? "bg-primary-700 text-white" : "bg-white text-slate-700"}`}>{s}</button>;
                         })}
                       </div>
                       <div className="mt-3">
                         <div className="flex items-center justify-between">
                           <div className="text-sm text-slate-500">Tools & technologies</div>
                           <input value={toolQuery} onChange={e=>setToolQuery(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"){ e.preventDefault(); addCustom("skills.tools", toolQuery.trim()); setToolQuery(""); } }} placeholder="Search or press Enter to add" className="rounded-md border px-3 py-1 text-sm w-48" />
                         </div>
                         <div className="flex flex-wrap gap-2 mt-2">
                           {SAMPLE_TOOLS.map(t=> {
                             const active = data.skills.tools.includes(t);
                             return <button key={t} onClick={()=>toggle("skills.tools", t)} className={`chip ${active ? "bg-primary-700 text-white" : "bg-white text-slate-700"}`}>{t}</button>;
                           })}
                         </div>
                       </div>
                       <div className="mt-3">
                         <div className="text-sm text-slate-500">Soft skills</div>
                         <div className="flex flex-wrap gap-2 mt-2">
                           {SAMPLE_SOFT.map(s=> {
                             const active = data.skills.soft.includes(s);
                             return <button key={s} onClick={()=>toggle("skills.soft", s)} className={`chip ${active ? "bg-primary-700 text-white" : "bg-white text-slate-700"}`}>{s}</button>;
                           })}
                         </div>
                       </div>
                     </div>
                   )}

                   {step === 4 && (
                     <div>
                       <ProjectForm onAdd={(p)=>update("projects", [...data.projects, p])} />
                       <div className="mt-3 space-y-2">
                         {data.projects.map((p,i)=>(
                           <div key={i} className="border rounded-md p-3 flex justify-between items-start">
                             <div>
                               <div className="font-medium">{p.title}</div>
                               <div className="text-sm text-slate-600">{p.description}</div>
                               <div className="text-xs text-slate-500 mt-1">Tech: {p.tech.join(", ")}</div>
                             </div>
                             <div className="flex gap-2">
                               <button onClick={()=>alert("Edit project (demo)")} className="btn border">Edit</button>
                               <button onClick={()=>update("projects", data.projects.filter((_,idx)=>idx!==i))} className="btn bg-white border text-red-600">Delete</button>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                   {step === 5 && (
                     <div>
                       <ExperienceForm onAdd={(e)=>update("experience", [...data.experience, e])} />
                       <div className="mt-3 space-y-2">
                         {data.experience.map((ex,i)=>(
                           <div key={i} className="border rounded-md p-3 flex justify-between items-start">
                             <div>
                               <div className="font-medium">{ex.role} — {ex.organization}</div>
                               <div className="text-sm text-slate-600">{ex.duration}</div>
                               <div className="text-xs text-slate-500 mt-1">{ex.responsibilities}</div>
                             </div>
                             <div className="flex gap-2">
                               <button onClick={()=>alert("Edit experience (demo)")} className="btn border">Edit</button>
                               <button onClick={()=>update("experience", data.experience.filter((_,idx)=>idx!==i))} className="btn bg-white border text-red-600">Delete</button>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                   {step === 6 && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                       <select value={data.preferences.workMode} onChange={e=>update("preferences.workMode", e.target.value)} className="rounded-md border px-3 py-2">
                         <option>Remote</option><option>Hybrid</option><option>Onsite</option>
                       </select>
                       <select value={data.preferences.availability} onChange={e=>update("preferences.availability", e.target.value)} className="rounded-md border px-3 py-2">
                         <option value="">Select</option><option value="Immediate">Immediate</option><option value="15 days">In 15 days</option><option value="30 days">In 30 days</option><option value="60 days">In 60 days</option>
                       </select>
                     </div>
                   )}
                 </div>
               </div>
             </div>

             <aside className="w-64 hidden md:block">
               <div className="text-sm text-slate-500 mb-2">Selected</div>
               <div className="space-y-3">
                 <div>
                   <div className="text-xs text-slate-500 mb-1">Technical</div>
                   <div className="flex flex-wrap gap-2">{data.skills.technical.length ? data.skills.technical.map((s,i)=><span key={i} className="chip">{s}</span>) : <div className="text-xs text-slate-400">— none</div>}</div>
                 </div>
                 <div>
                   <div className="text-xs text-slate-500 mb-1">Tools</div>
                   <div className="flex flex-wrap gap-2">{data.skills.tools.length ? data.skills.tools.map((s,i)=><span key={i} className="chip">{s}</span>) : <div className="text-xs text-slate-400">— none</div>}</div>
                 </div>
               </div>
             </aside>
           </div>

           <div className="mt-4 flex items-center justify-between">
             <div className="text-sm text-slate-500">{STEP_TITLES[step]}</div>
             <div className="flex gap-2">
               {step>0 && <button onClick={back} className="btn border">Back</button>}
               {step<STEP_TITLES.length-1 ? <button onClick={next} className="btn bg-primary-500 text-white">Next</button> : <button onClick={finish} className="btn bg-primary-700 text-white">Finish</button>}
             </div>
           </div>
         </div>
       </div>
     </main>
   );
 }

 function ProjectForm({ onAdd }) {
   const [form, setForm] = useState({ title: "", description: "", tech: "" });
   return (
     <div className="space-y-3">
       <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} placeholder="Project title" className="w-full rounded-md border px-3 py-2" />
       <input value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Short description" className="w-full rounded-md border px-3 py-2" />
       <input value={form.tech} onChange={e=>setForm({...form, tech: e.target.value})} placeholder="Tech (comma separated)" className="w-full rounded-md border px-3 py-2" />
       <div className="flex gap-2">
         <button onClick={()=>{ onAdd && onAdd({ title: form.title, description: form.description, tech: form.tech.split(",").map(t=>t.trim()).filter(Boolean) }); setForm({ title:"", description:"", tech:"" }); }} className="btn bg-white border">Add project</button>
       </div>
     </div>
   );
 }

 function ExperienceForm({ onAdd }) {
   const [f, setF] = useState({ role: "", organization: "", duration: "", responsibilities: "" });
   return (
     <div className="space-y-3">
       <input value={f.role} onChange={e=>setF({...f, role: e.target.value})} placeholder="Role" className="w-full rounded-md border px-3 py-2" />
       <input value={f.organization} onChange={e=>setF({...f, organization: e.target.value})} placeholder="Organization" className="w-full rounded-md border px-3 py-2" />
       <input value={f.duration} onChange={e=>setF({...f, duration: e.target.value})} placeholder="Duration" className="w-full rounded-md border px-3 py-2" />
       <textarea value={f.responsibilities} onChange={e=>setF({...f, responsibilities: e.target.value})} placeholder="Key responsibilities" className="w-full rounded-md border px-3 py-2" />
       <div className="flex gap-2">
         <button onClick={()=>{ onAdd && onAdd(f); setF({ role:"", organization:"", duration:"", responsibilities:"" }); }} className="btn bg-white border">Add experience</button>
       </div>
     </div>
   );
 }

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Clean, minimal conversational onboarding page
const TECH = ["Programming Fundamentals","OOP","DSA","System Design","Frontend Development","Backend Development","Machine Learning"];
const TOOLS = ["JavaScript","TypeScript","React","Next.js","Node.js","Python","Django"];
const SOFT = ["Communication","Problem Solving","Teamwork","Leadership","Time Management"];

const INITIAL = {
  basic: { name: "", email: "", phone: "", location: "" },
  academic: { college: "", degree: "", specialization: "", graduationYear: "" },
  opportunities: { types: [], roles: [], objective: "" },
  skills: { technical: [], tools: [], soft: [] },
  projects: [],
  experience: [],
  preferences: { workMode: "Remote", availability: "" }
};

export default function OnboardingPage() {
  const router = useRouter();
  const [state, setState] = useState(() => {
    try { return JSON.parse(localStorage.getItem("owngcc_profile")) || INITIAL; } catch { return INITIAL; }
  });
  const [step, setStep] = useState(0);
  const [qSkill, setQSkill] = useState("");
  const [qTool, setQTool] = useState("");

  const STEP_TITLES = ["Basic","Academic","Opportunities","Skills","Projects","Experience","Preferences"];

  useEffect(() => { localStorage.setItem("owngcc_profile", JSON.stringify(state)); }, [state]);

  function update(path, val) {
    setState(prev => {
      const out = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let cur = out;
      for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
      cur[keys[keys.length - 1]] = val;
      return out;
    });
  }

  function toggle(path, item) {
    const arr = path.split(".").reduce((a, k) => a[k], state) || [];
    update(path, arr.includes(item) ? arr.filter(x=>x!==item) : [...arr, item]);
  }

  function canNext() {
    if (step === 0) {
      const b = state.basic; return b.name && b.email && b.phone && b.location;
    }
    if (step === 1) {
      const a = state.academic; return a.college && a.degree && a.graduationYear;
    }
    if (step === 3) {
      return state.skills.technical.length || state.skills.tools.length;
    }
    return true;
  }

  function next() { if (!canNext()) return alert("Please complete required fields."); setStep(s=>Math.min(s+1,6)); }
  function back() { setStep(s=>Math.max(s-1,0)); }
  function finish() { localStorage.setItem("owngcc_profile", JSON.stringify(state)); router.push("/dashboard"); }

  return (
    <main className="container py-10">
      <div className="mx-auto w-[90vw] max-w-[1100px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Conversational profile setup</h2>
            <p className="text-slate-600">One focused step at a time — complete required fields to continue.</p>
          </div>
          <div className="text-sm text-primary-700 font-medium">{step+1} / 7</div>
        </div>

        <div className="card">
          <div className="mb-4">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div style={{width:`${((step+1)/7)*100}%`}} className="h-2 bg-primary-500" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">OG</div>
                <div className="chat-bubble sent max-w-prose">
                  {step===0 && "Let's start with your contact details."}
                  {step===1 && "Tell us about your academics."}
                  {step===2 && "Choose opportunity types and roles."}
                  {step===3 && "Select key skills and tools."}
                  {step===4 && "Add projects."}
                  {step===5 && "Share experience."}
                  {step===6 && "Set preferences."}
                </div>
              </div>

              <div className="chat-bubble recv">
                {step===0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input placeholder="Full name *" value={state.basic.name} onChange={e=>update("basic.name", e.target.value)} className="rounded-md border px-3 py-2" />
                    <input placeholder="Email *" value={state.basic.email} onChange={e=>update("basic.email", e.target.value)} className="rounded-md border px-3 py-2" />
                    <input placeholder="Phone *" value={state.basic.phone} onChange={e=>update("basic.phone", e.target.value)} className="rounded-md border px-3 py-2" />
                    <input placeholder="Location *" value={state.basic.location} onChange={e=>update("basic.location", e.target.value)} className="rounded-md border px-3 py-2" />
                  </div>
                )}

                {step===1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input placeholder="College / University *" value={state.academic.college} onChange={e=>update("academic.college", e.target.value)} className="rounded-md border px-3 py-2" />
                    <input placeholder="Degree *" value={state.academic.degree} onChange={e=>update("academic.degree", e.target.value)} className="rounded-md border px-3 py-2" />
                    <input placeholder="Specialization" value={state.academic.specialization} onChange={e=>update("academic.specialization", e.target.value)} className="rounded-md border px-3 py-2" />
                    <input placeholder="Graduation year *" value={state.academic.graduationYear} onChange={e=>update("academic.graduationYear", e.target.value)} className="rounded-md border px-3 py-2" />
                  </div>
                )}

                {step===2 && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      {["Internship","Full-time","Contract","Freelance"].map(t=> <button key={t} onClick={()=>toggle("opportunities.types",t)} className="btn border">{t}</button>)}
                    </div>
                    <input placeholder="Preferred roles" value={state.opportunities.roles.join(", ")} onChange={e=>update("opportunities.roles", e.target.value.split(",").map(s=>s.trim()).filter(Boolean))} className="rounded-md border px-3 py-2" />
                  </div>
                )}

                {step===3 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-500">Technical skills</div>
                      <input value={qSkill} onChange={e=>setQSkill(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"){ e.preventDefault(); addCustom("skills.technical", qSkill.trim()); setQSkill(""); } }} placeholder="Search or press Enter" className="rounded-md border px-3 py-1 text-sm w-48" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TECH.map(s=> <button key={s} onClick={()=>toggle("skills.technical",s)} className="chip">{s}</button>)}
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-500">Tools</div>
                        <input value={qTool} onChange={e=>setQTool(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"){ e.preventDefault(); addCustom("skills.tools", qTool.trim()); setQTool(""); } }} placeholder="Search or press Enter" className="rounded-md border px-3 py-1 text-sm w-48" />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {TOOLS.map(t=> <button key={t} onClick={()=>toggle("skills.tools",t)} className="chip">{t}</button>)}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-sm text-slate-500">Soft skills</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {SOFT.map(s=> <button key={s} onClick={()=>toggle("skills.soft",s)} className="chip">{s}</button>)}
                      </div>
                    </div>
                  </div>
                )}

                {step===4 && <div><ProjectForm onAdd={(p)=>setState(prev=>({...prev, projects:[...prev.projects,p]}))} /></div>}
                {step===5 && <div><ExperienceForm onAdd={(e)=>setState(prev=>({...prev, experience:[...prev.experience,e]}))} /></div>}
                {step===6 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <select value={state.preferences.workMode} onChange={e=>update("preferences.workMode", e.target.value)} className="rounded-md border px-3 py-2">
                      <option>Remote</option><option>Hybrid</option><option>Onsite</option>
                    </select>
                    <select value={state.preferences.availability} onChange={e=>update("preferences.availability", e.target.value)} className="rounded-md border px-3 py-2">
                      <option value="">Select</option><option value="Immediate">Immediate</option><option value="15 days">In 15 days</option><option value="30 days">In 30 days</option><option value="60 days">In 60 days</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <aside className="w-64 hidden md:block">
              <div className="text-sm text-slate-500 mb-2">Selected</div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Technical</div>
                  <div className="flex flex-wrap gap-2">{state.skills.technical.length ? state.skills.technical.map((s,i)=><span key={i} className="chip">{s}</span>) : <div className="text-xs text-slate-400">— none</div>}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Tools</div>
                  <div className="flex flex-wrap gap-2">{state.skills.tools.length ? state.skills.tools.map((s,i)=><span key={i} className="chip">{s}</span>) : <div className="text-xs text-slate-400">— none</div>}</div>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-500">Step {step+1}</div>
            <div className="flex gap-2">
              {step>0 && <button onClick={back} className="btn border">Back</button>}
              {step<6 ? <button onClick={next} className="btn bg-primary-500 text-white">Next</button> : <button onClick={finish} className="btn bg-primary-700 text-white">Finish</button>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProjectForm({ onAdd }) {
  const [form, setForm] = useState({ title: "", description: "", tech: "" });
  return (
    <div className="space-y-3">
      <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Project title" className="w-full rounded-md border px-3 py-2" />
      <input value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Short description" className="w-full rounded-md border px-3 py-2" />
      <input value={form.tech} onChange={e=>setForm({...form,tech:e.target.value})} placeholder="Tech (comma separated)" className="w-full rounded-md border px-3 py-2" />
      <div className="flex gap-2">
        <button onClick={()=>{ onAdd && onAdd({ title: form.title, description: form.description, tech: form.tech.split(",").map(t=>t.trim()).filter(Boolean) }); setForm({ title:"", description:"", tech:"" }); }} className="btn bg-white border">Add project</button>
      </div>
    </div>
  );
}

function ExperienceForm({ onAdd }) {
  const [f, setF] = useState({ role:"", organization:"", duration:"", responsibilities:"" });
  return (
    <div className="space-y-3">
      <input value={f.role} onChange={e=>setF({...f,role:e.target.value})} placeholder="Role" className="w-full rounded-md border px-3 py-2" />
      <input value={f.organization} onChange={e=>setF({...f,organization:e.target.value})} placeholder="Organization" className="w-full rounded-md border px-3 py-2" />
      <input value={f.duration} onChange={e=>setF({...f,duration:e.target.value})} placeholder="Duration" className="w-full rounded-md border px-3 py-2" />
      <textarea value={f.responsibilities} onChange={e=>setF({...f,responsibilities:e.target.value})} placeholder="Key responsibilities" className="w-full rounded-md border px-3 py-2" />
      <div className="flex gap-2">
        <button onClick={()=>{ onAdd && onAdd(f); setF({ role:"", organization:"", duration:"", responsibilities:"" }); }} className="btn bg-white border">Add experience</button>
      </div>
    </div>
  );

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Minimal, single-source onboarding component (stable, validated JSX)
const TECH_GROUPS = {
  "Core CS": ["Programming Fundamentals", "OOP", "Data Structures & Algorithms", "System Design"],
  "Web": ["Frontend Development", "Backend Development", "API Development", "Full-Stack Development"],
  "Data & AI": ["Data Analysis", "Machine Learning", "Deep Learning", "NLP"]
};

const TOOL_GROUPS = {
  Languages: ["JavaScript", "TypeScript", "Python", "Java"],
  Frontend: ["React", "Next.js", "Vue", "Tailwind"],
  Backend: ["Node.js", "Express", "Django", "Flask"]
};

const SOFT = ["Communication", "Problem Solving", "Teamwork", "Leadership", "Time Management"];

const INITIAL = {
  basic: { name: "", email: "", phone: "", location: "" },
  academic: { college: "", degree: "", specialization: "", graduationYear: "" },
  opportunities: { types: [], roles: [], objective: "" },
  skills: { technical: [], tools: [], soft: [] },
  projects: [],
  experience: [],
  preferences: { workMode: "Remote", availability: "" }
};

export default function OnboardingPage() {
  const router = useRouter();
  const [state, setState] = useState(() => {
    try { return JSON.parse(localStorage.getItem("owngcc_profile")) || INITIAL; } catch { return INITIAL; }
  });
  const [step, setStep] = useState(0);
  const [skillQuery, setSkillQuery] = useState("");
  const [toolQuery, setToolQuery] = useState("");

  useEffect(() => { localStorage.setItem("owngcc_profile", JSON.stringify(state)); }, [state]);

  function update(path, value) {
    setState(prev => {
      const out = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let cur = out;
      for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
      cur[keys[keys.length - 1]] = value;
      return out;
    });
  }

  function toggle(path, value) {
    const arr = path.split(".").reduce((a, k) => a[k], state) || [];
    const has = arr.includes(value);
    update(path, has ? arr.filter(x => x !== value) : [...arr, value]);
  }

  function addCustom(path, value) {
    if (!value) return;
    const arr = path.split(".").reduce((a, k) => a[k], state) || [];
    if (!arr.includes(value)) update(path, [...arr, value]);
  }

  function canProceed() {
    if (step === 0) {
      const b = state.basic;
      return b.name && b.email && b.phone && b.location;
    }
    if (step === 1) {
      const a = state.academic;
      return a.college && a.degree && a.graduationYear;
    }
    if (step === 3) {
      return state.skills.technical.length || state.skills.tools.length;
    }
    return true;
  }

  function next() { if (!canProceed()) return alert("Please complete required fields for this step."); setStep(s => Math.min(s + 1, 6)); }
  function back() { setStep(s => Math.max(s - 1, 0)); }
  function finish() { localStorage.setItem("owngcc_profile", JSON.stringify(state)); router.push("/dashboard"); }

  return (
    <main className="container py-10">
      <div className="mx-auto w-[90vw] max-w-[1100px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Quick profile builder</h2>
            <p className="text-slate-600">Complete each step to build your student profile.</p>
          </div>
          <div className="text-sm text-primary-700 font-medium">{step + 1} / 7</div>
        </div>

        <div className="card">
          <div className="mb-4">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div style={{ width: `${((step + 1) / 7) * 100}%` }} className="h-2 bg-primary-500" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">OG</div>
                  <div className="chat-bubble sent max-w-prose">
                    {step === 0 && "Let's start with basic contact details."}
                    {step === 1 && "Tell us about your academic background."}
                    {step === 2 && "Which opportunities interest you?"}
                    {step === 3 && "Add core skills and tools."}
                    {step === 4 && "Add projects."}
                    {step === 5 && "Share experience (if any)."}
                    {step === 6 && "Set preferences & availability."}
                  </div>
                </div>

                <div className="chat-bubble recv">
                  {step === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input placeholder="Full name *" value={state.basic.name} onChange={e => update("basic.name", e.target.value)} className="rounded-md border px-3 py-2" />
                      <input placeholder="Email *" value={state.basic.email} onChange={e => update("basic.email", e.target.value)} className="rounded-md border px-3 py-2" />
                      <input placeholder="Phone *" value={state.basic.phone} onChange={e => update("basic.phone", e.target.value)} className="rounded-md border px-3 py-2" />
                      <input placeholder="Location *" value={state.basic.location} onChange={e => update("basic.location", e.target.value)} className="rounded-md border px-3 py-2" />
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input placeholder="College / University *" value={state.academic.college} onChange={e => update("academic.college", e.target.value)} className="rounded-md border px-3 py-2" />
                      <input placeholder="Degree *" value={state.academic.degree} onChange={e => update("academic.degree", e.target.value)} className="rounded-md border px-3 py-2" />
                      <input placeholder="Specialization" value={state.academic.specialization} onChange={e => update("academic.specialization", e.target.value)} className="rounded-md border px-3 py-2" />
                      <input placeholder="Graduation year *" value={state.academic.graduationYear} onChange={e => update("academic.graduationYear", e.target.value)} className="rounded-md border px-3 py-2" />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        {["Internship", "Full-time", "Contract", "Freelance"].map(t => {
                          const active = state.opportunities.types.includes(t);
                          return <button key={t} onClick={() => toggle("opportunities.types", t)} className={`btn border ${active ? "bg-primary-50" : "bg-white"}`}>{t}</button>;
                        })}
                      </div>
                      <input placeholder="Preferred roles" value={state.opportunities.roles.join(", ")} onChange={e => update("opportunities.roles", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} className="rounded-md border px-3 py-2" />
                      <textarea placeholder="Career objective" value={state.opportunities.objective} onChange={e => update("opportunities.objective", e.target.value)} className="rounded-md border px-3 py-2" rows={3} />
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-slate-500">Technical skills</div>
                        <input value={skillQuery} onChange={e => setSkillQuery(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addCustom("skills.technical", skillQuery.trim()); setSkillQuery(""); } }} placeholder="Search or press Enter to add" className="rounded-md border px-3 py-1 text-sm w-48" />
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {Object.values(TECH_GROUPS).flat().map(s => {
                          const active = state.skills.technical.includes(s);
                          return <button key={s} onClick={() => toggle("skills.technical", s)} className={`chip ${active ? "bg-primary-700 text-white" : "bg-white text-slate-700"}`}>{s}</button>;
                        })}
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-500">Tools & technologies</div>
                        <input value={toolQuery} onChange={e => setToolQuery(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addCustom("skills.tools", toolQuery.trim()); setToolQuery(""); } }} placeholder="Search or press Enter to add" className="rounded-md border px-3 py-1 text-sm w-48" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Object.values(TOOL_GROUPS).flat().map(t => {
                          const active = state.skills.tools.includes(t);
                          return <button key={t} onClick={() => toggle("skills.tools", t)} className={`chip ${active ? "bg-primary-700 text-white" : "bg-white text-slate-700"}`}>{t}</button>;
                        })}
                      </div>
                      <div className="mt-3">
                        <div className="text-sm text-slate-500 mb-2">Soft skills</div>
                        <div className="flex flex-wrap gap-2">
                          {SOFT.map(s => {
                            const active = state.skills.soft.includes(s);
                            return <button key={s} onClick={() => toggle("skills.soft", s)} className={`chip ${active ? "bg-primary-700 text-white" : "bg-white text-slate-700"}`}>{s}</button>;
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <ProjectForm onAdd={(p) => setState(prev => ({ ...prev, projects: [...prev.projects, p] }))} />
                      <div className="mt-3 space-y-2">
                        {state.projects.map((p, i) => (
                          <div key={i} className="border rounded-md p-3 flex justify-between items-start">
                            <div>
                              <div className="font-medium">{p.title}</div>
                              <div className="text-sm text-slate-600">{p.description}</div>
                              <div className="text-xs text-slate-500 mt-1">Tech: {p.tech.join(", ")}</div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => alert("Edit project (demo)")} className="btn border">Edit</button>
                              <button onClick={() => setState(prev => ({ ...prev, projects: prev.projects.filter((_, idx) => idx !== i) }))} className="btn bg-white border text-red-600">Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div>
                      <ExperienceForm onAdd={(e) => setState(prev => ({ ...prev, experience: [...prev.experience, e] }))} />
                      <div className="mt-3 space-y-2">
                        {state.experience.map((ex, i) => (
                          <div key={i} className="border rounded-md p-3 flex justify-between items-start">
                            <div>
                              <div className="font-medium">{ex.role} — {ex.organization}</div>
                              <div className="text-sm text-slate-600">{ex.duration}</div>
                              <div className="text-xs text-slate-500 mt-1">{ex.responsibilities}</div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => alert("Edit experience (demo)")} className="btn border">Edit</button>
                              <button onClick={() => setState(prev => ({ ...prev, experience: prev.experience.filter((_, idx) => idx !== i) }))} className="btn bg-white border text-red-600">Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 6 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-slate-500 block">Preferred work mode</label>
                        <select value={state.preferences.workMode} onChange={e => update("preferences.workMode", e.target.value)} className="w-full rounded-md border px-3 py-2 mt-2">
                          <option>Remote</option>
                          <option>Hybrid</option>
                          <option>Onsite</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-slate-500 block">Preferred locations</label>
                        <input value={state.preferences.locations?.join(", ") || ""} onChange={e => update("preferences.locations", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} className="w-full rounded-md border px-3 py-2 mt-2" />
                      </div>
                      <div>
                        <label className="text-sm text-slate-500 block">Availability to start</label>
                        <select value={state.preferences.availability} onChange={e => update("preferences.availability", e.target.value)} className="w-full rounded-md border px-3 py-2 mt-2">
                          <option value="">Select</option>
                          <option value="Immediate">Immediate</option>
                          <option value="15 days">In 15 days</option>
                          <option value="30 days">In 30 days</option>
                          <option value="60 days">In 60 days</option>
                        </select>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
            <aside className="w-64 hidden md:block">
              <div className="text-sm text-slate-500 mb-2">Selected</div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Technical</div>
                  <div className="flex flex-wrap gap-2">
                    {state.skills.technical.length ? state.skills.technical.map((s, i) => <span key={i} className="chip">{s}</span>) : <div className="text-xs text-slate-400">— none</div>}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {state.skills.tools.length ? state.skills.tools.map((s, i) => <span key={i} className="chip">{s}</span>) : <div className="text-xs text-slate-400">— none</div>}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-500">Step {step + 1}</div>
            <div className="flex gap-2">
              {step > 0 && <button onClick={back} className="btn border">Back</button>}
              {step < 6 ? <button onClick={next} className="btn bg-primary-500 text-white">Next</button> : <button onClick={finish} className="btn bg-primary-700 text-white">Finish</button>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProjectForm({ onAdd, initial }) {
  const [form, setForm] = useState(initial || { title: "", description: "", tech: "" });
  useEffect(() => setForm(initial || { title: "", description: "", tech: "" }), [initial]);
  return (
    <div className="space-y-3">
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Project title" className="w-full rounded-md border px-3 py-2" />
      <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" className="w-full rounded-md border px-3 py-2" />
      <input value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} placeholder="Tech (comma separated)" className="w-full rounded-md border px-3 py-2" />
      <div className="flex gap-2">
        <button onClick={() => { onAdd && onAdd({ title: form.title, description: form.description, tech: form.tech.split(",").map(t => t.trim()).filter(Boolean) }); setForm({ title: "", description: "", tech: "" }); }} className="btn bg-white border">Add project</button>
      </div>
    </div>
  );
}

function ExperienceForm({ onAdd, initial }) {
  const [f, setF] = useState(initial || { role: "", organization: "", duration: "", responsibilities: "" });
  useEffect(() => setF(initial || { role: "", organization: "", duration: "", responsibilities: "" }), [initial]);
  return (
    <div className="space-y-3">
      <input value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} placeholder="Role" className="w-full rounded-md border px-3 py-2" />
      <input value={f.organization} onChange={(e) => setF({ ...f, organization: e.target.value })} placeholder="Organization" className="w-full rounded-md border px-3 py-2" />
      <input value={f.duration} onChange={(e) => setF({ ...f, duration: e.target.value })} placeholder="Duration" className="w-full rounded-md border px-3 py-2" />
      <textarea value={f.responsibilities} onChange={(e) => setF({ ...f, responsibilities: e.target.value })} placeholder="Key responsibilities" className="w-full rounded-md border px-3 py-2" />
      <div className="flex gap-2">
        <button onClick={() => { onAdd && onAdd(f); setF({ role: "", organization: "", duration: "", responsibilities: "" }); }} className="btn bg-white border">Add experience</button>
      </div>
    </div>
  );

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const groupedTechnical = {
  "Core CS": ["Programming Fundamentals", "OOP", "Data Structures & Algorithms", "System Design"],
  "Web": ["Frontend Development", "Backend Development", "Full-Stack Development", "API Development"],
  "Data & AI": ["Data Analysis", "Machine Learning", "Deep Learning", "NLP"]
};

const groupedTools = {
  Languages: ["JavaScript", "TypeScript", "Python", "Java"],
  Frontend: ["React", "Next.js", "Vue", "Tailwind"],
  Backend: ["Node.js", "Express", "Django", "Flask"],
  DBs: ["MySQL", "Postgres", "MongoDB"]
};

const softSkills = ["Communication", "Problem Solving", "Teamwork", "Leadership", "Time Management"];

const initial = {
  basic: { name: "", email: "", phone: "", location: "" },
  academic: { degree: "", specialization: "", college: "", graduationYear: "" },
  opportunities: { types: [], roles: [], objective: "" },
  skills: { technical: [], tools: [], soft: [] },
  projects: [],
  experience: [],
  preferences: { workMode: "Remote", availability: "" },
};

export default function OnboardingPage() {
  const router = useRouter();
  const [state, setState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("owngcc_profile")) || initial;
    } catch {
      return initial;
    }
  });
  const [step, setStep] = useState(0);
  const [skillQuery, setSkillQuery] = useState("");
  const [toolQuery, setToolQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("owngcc_profile", JSON.stringify(state));
  }, [state]);

  function update(path, value) {
    setState((prev) => {
      const out = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let cur = out;
      for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
      cur[keys[keys.length - 1]] = value;
      return out;
    });
  }

  function toggleArray(path, val) {
    const arr = (path.split(".").reduce((a, k) => a[k], state) || []);
    const has = arr.includes(val);
    update(path, has ? arr.filter((x) => x !== val) : [...arr, val]);
  }

  function addCustom(path, val) {
    if (!val) return;
    const arr = (path.split(".").reduce((a, k) => a[k], state) || []);
    if (!arr.includes(val)) update(path, [...arr, val]);
  }

  function addProject(p) {
    setState((s) => ({ ...s, projects: [...s.projects, p] }));
  }
  function deleteProject(idx) {
    setState((s) => ({ ...s, projects: s.projects.filter((_, i) => i !== idx) }));
  }

  function addExperience(e) {
    setState((s) => ({ ...s, experience: [...s.experience, e] }));
  }
  function deleteExperience(idx) {
    setState((s) => ({ ...s, experience: s.experience.filter((_, i) => i !== idx) }));
  }

  function canNext() {
    if (step === 0) {
      const b = state.basic;
      return b.name && b.email && b.phone && b.location;
    }
    if (step === 1) {
      const a = state.academic;
      return a.degree && a.college && a.graduationYear;
    }
    if (step === 3) {
      return state.skills.technical.length || state.skills.tools.length;
    }
    return true;
  }

  function next() {
    if (!canNext()) return alert("Please complete required fields for this step.");
    setStep((s) => Math.min(s + 1, 6));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }
  function finish() {
    localStorage.setItem("owngcc_profile", JSON.stringify(state));
    router.push("/dashboard");
  }

  return (
    <main className="container py-10">
      <div className="mx-auto w-[90vw] max-w-[1100px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Conversational profile setup</h2>
            <p className="text-slate-600">One focused step at a time — complete required fields to continue.</p>
          </div>
          <div className="text-sm text-primary-700 font-medium">{step + 1} / 7</div>
        </div>

        <div className="card">
          <div className="mb-4">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div style={{ width: `${((step + 1) / 7) * 100}%` }} className="h-2 bg-primary-500 transition-all" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">OG</div>
                  <div className="chat-bubble sent max-w-prose">
                    {step === 0 && "Let's start with your basic contact details."}
                    {step === 1 && "Tell us about your college and degree."}
                    {step === 2 && "Which opportunities and roles interest you?"}
                    {step === 3 && "Add your core skills and tools (search and press Enter to add custom)."}
                    {step === 4 && "Add projects — include tech stack and links."}
                    {step === 5 && "Share internship or work experience if any."}
                    {step === 6 && "Set preferences: work mode, locations & availability."}
                  </div>
                </div>

                <div className="chat-bubble recv">
                  {step === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input placeholder="Full name *" value={state.basic.name} onChange={(e) => update("basic.name", e.target.value)} className="rounded-md border px-3 py-2" />
                      <input placeholder="Email *" value={state.basic.email} onChange={(e) => update("basic.email", e.target.value)} className="rounded-md border px-3 py-2" />
                      <input placeholder="Contact number *" value={state.basic.phone} onChange={(e) => update("basic.phone", e.target.value)} className="rounded-md border px-3 py-2" />
                      <input placeholder="Current location *" value={state.basic.location} onChange={(e) => update("basic.location", e.target.value)} className="rounded-md border px-3 py-2" />
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input placeholder="College / University *" value={state.academic.college} onChange={(e) => update("academic.college", e.target.value)} className="rounded-md border px-3 py-2" />
                      <input placeholder="Degree *" value={state.academic.degree} onChange={(e) => update("academic.degree", e.target.value)} className="rounded-md border px-3 py-2" />
                      <input placeholder="Specialization" value={state.academic.specialization} onChange={(e) => update("academic.specialization", e.target.value)} className="rounded-md border px-3 py-2" />
                      <input placeholder="Graduation year *" value={state.academic.graduationYear} onChange={(e) => update("academic.graduationYear", e.target.value)} className="rounded-md border px-3 py-2" />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        {["Internship", "Full-time", "Contract", "Freelance"].map((t) => {
                          const active = state.opportunities.types.includes(t);
                          return (
                            <button key={t} onClick={() => toggleArray("opportunities.types", t)} className={`btn border ${active ? "bg-primary-50" : "bg-white"}`}>
                              {t}
                            </button>
                          );
                        })}
                      </div>
                      <input placeholder="Preferred roles (comma separated)" value={state.opportunities.roles.join(", ")} onChange={(e) => update("opportunities.roles", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className="rounded-md border px-3 py-2" />
                      <textarea placeholder="Career objective" value={state.opportunities.objective} onChange={(e) => update("opportunities.objective", e.target.value)} className="rounded-md border px-3 py-2" rows={3} />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-500">Technical skills</div>
                        <input value={skillQuery} onChange={(e) => setSkillQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustom("skills.technical", skillQuery.trim()); setSkillQuery(""); } }} placeholder="Search or press Enter to add" className="rounded-md border px-3 py-1 text-sm w-48" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Object.values(groupedTechnical).flat().map((s) => {
                          const active = state.skills.technical.includes(s);
                          return <button key={s} onClick={() => toggleArray("skills.technical", s)} className={`chip ${active ? "bg-primary-700 text-white" : "bg-white text-slate-700"}`}>{s}</button>;
                        })}
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-500">Tools & technologies</div>
                          <input value={toolQuery} onChange={(e) => setToolQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustom("skills.tools", toolQuery.trim()); setToolQuery(""); } }} placeholder="Search or press Enter to add" className="rounded-md border px-3 py-1 text-sm w-48" />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {Object.values(groupedTools).flat().map((t) => {
                            const active = state.skills.tools.includes(t);
                            return <button key={t} onClick={() => toggleArray("skills.tools", t)} className={`chip ${active ? "bg-primary-700 text-white" : "bg-white text-slate-700"}`}>{t}</button>;
                          })}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-slate-500 mb-2">Soft skills</div>
                        <div className="flex flex-wrap gap-2">
                          {softSkills.map((s) => {
                            const active = state.skills.soft.includes(s);
                            return <button key={s} onClick={() => toggleArray("skills.soft", s)} className={`chip ${active ? "bg-primary-700 text-white" : "bg-white text-slate-700"}`}>{s}</button>;
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <ProjectForm onAdd={(p) => addProject(p)} />
                      <div className="mt-3 space-y-2">
                        {state.projects.map((p, i) => (
                          <div key={i} className="border rounded-md p-3 flex justify-between items-start">
                            <div>
                              <div className="font-medium">{p.title}</div>
                              <div className="text-sm text-slate-600">{p.description}</div>
                              <div className="text-xs text-slate-500 mt-1">Tech: {p.tech.join(", ")}</div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => alert("Edit in demo")} className="btn border">Edit</button>
                              <button onClick={() => deleteProject(i)} className="btn bg-white border text-red-600">Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div>
                      <ExperienceForm onAdd={(e) => addExperience(e)} />
                      <div className="mt-3 space-y-2">
                        {state.experience.map((ex, i) => (
                          <div key={i} className="border rounded-md p-3 flex justify-between items-start">
                            <div>
                              <div className="font-medium">{ex.role} — {ex.organization}</div>
                              <div className="text-sm text-slate-600">{ex.duration}</div>
                              <div className="text-xs text-slate-500 mt-1">{ex.responsibilities}</div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => alert("Edit in demo")} className="btn border">Edit</button>
                              <button onClick={() => deleteExperience(i)} className="btn bg-white border text-red-600">Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 6 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-slate-500 block">Preferred work mode</label>
                        <select value={state.preferences.workMode} onChange={(e) => update("preferences.workMode", e.target.value)} className="w-full rounded-md border px-3 py-2 mt-2">
                          <option>Remote</option>
                          <option>Hybrid</option>
                          <option>Onsite</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-slate-500 block">Preferred locations</label>
                        <input value={state.preferences.locations?.join(", ") || ""} onChange={(e) => update("preferences.locations", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} className="w-full rounded-md border px-3 py-2 mt-2" />
                      </div>
                      <div>
                        <label className="text-sm text-slate-500 block">Availability to start</label>
                        <select value={state.preferences.availability} onChange={(e) => update("preferences.availability", e.target.value)} className="w-full rounded-md border px-3 py-2 mt-2">
                          <option value="">Select</option>
                          <option value="Immediate">Immediate</option>
                          <option value="15 days">In 15 days</option>
                          <option value="30 days">In 30 days</option>
                          <option value="60 days">In 60 days</option>
                        </select>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
            <aside className="w-64 hidden md:block">
              <div className="text-sm text-slate-500 mb-2">Selected</div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Technical</div>
                  <div className="flex flex-wrap gap-2">
                    {state.skills.technical.length ? state.skills.technical.map((s, i) => <span key={i} className="chip">{s}</span>) : <div className="text-xs text-slate-400">— none</div>}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {state.skills.tools.length ? state.skills.tools.map((s, i) => <span key={i} className="chip">{s}</span>) : <div className="text-xs text-slate-400">— none</div>}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-500">Step {step + 1}</div>
            <div className="flex gap-2">
              {step > 0 && <button onClick={back} className="btn border">Back</button>}
              {step < 6 ? <button onClick={next} className="btn bg-primary-500 text-white">Next</button> : <button onClick={finish} className="btn bg-primary-700 text-white">Finish</button>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProjectForm({ onAdd, initial }) {
  const [form, setForm] = useState(initial || { title: "", description: "", tech: "" });
  useEffect(() => setForm(initial || { title: "", description: "", tech: "" }), [initial]);
  return (
    <div className="space-y-3">
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Project title" className="w-full rounded-md border px-3 py-2" />
      <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" className="w-full rounded-md border px-3 py-2" />
      <input value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} placeholder="Tech (comma separated)" className="w-full rounded-md border px-3 py-2" />
      <div className="flex gap-2">
        <button onClick={() => { onAdd && onAdd({ title: form.title, description: form.description, tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean) }); setForm({ title: "", description: "", tech: "" }); }} className="btn bg-white border">Add project</button>
      </div>
    </div>
  );
}

function ExperienceForm({ onAdd, initial }) {
  const [f, setF] = useState(initial || { role: "", organization: "", duration: "", responsibilities: "" });
  useEffect(() => setF(initial || { role: "", organization: "", duration: "", responsibilities: "" }), [initial]);
  return (
    <div className="space-y-3">
      <input value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} placeholder="Role" className="w-full rounded-md border px-3 py-2" />
      <input value={f.organization} onChange={(e) => setF({ ...f, organization: e.target.value })} placeholder="Organization" className="w-full rounded-md border px-3 py-2" />
      <input value={f.duration} onChange={(e) => setF({ ...f, duration: e.target.value })} placeholder="Duration" className="w-full rounded-md border px-3 py-2" />
      <textarea value={f.responsibilities} onChange={(e) => setF({ ...f, responsibilities: e.target.value })} placeholder="Key responsibilities" className="w-full rounded-md border px-3 py-2" />
      <div className="flex gap-2">
        <button onClick={() => { onAdd && onAdd(f); setF({ role: "", organization: "", duration: "", responsibilities: "" }); }} className="btn bg-white border">Add experience</button>
      </div>
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// --- New simplified onboarding page ---
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [state, setState] = useState(() => {
    try { return JSON.parse(localStorage.getItem("owngcc_profile")) || initial; } catch { return initial; }
  });
  const [skillQuery, setSkillQuery] = useState("");
  const [toolQuery, setToolQuery] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);

  useEffect(() => { localStorage.setItem("owngcc_profile", JSON.stringify(state)); }, [state]);

  function update(path, value) {
    setState(prev => {
      const out = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let cur = out;
      for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
      cur[keys[keys.length - 1]] = value;
      return out;
    });
  }

  function addSkill(s) { if (!s) return; if (!state.skills.technical.includes(s)) update("skills.technical", [...state.skills.technical, s]); }
  function addTool(t) { if (!t) return; if (!state.skills.tools.includes(t)) update("skills.tools", [...state.skills.tools, t]); }
  function next() { setStep(s => Math.min(s+1, 6)); }
  function back() { setStep(s => Math.max(s-1, 0)); }
  function finish() { localStorage.setItem("owngcc_profile", JSON.stringify(state)); router.push("/dashboard"); }

  return (
    <main className="container py-10">
      <div className="mx-auto w-[90vw] max-w-[1100px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Profile setup — quick guided steps</h2>
            <p className="text-slate-600">Complete each section to build your dashboard profile.</p>
          </div>
          <div className="text-sm text-primary-700 font-medium">{step+1} / 7</div>
        </div>

        <div className="card">
          <div className="mb-4">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div style={{ width: `${((step+1)/7)*100}%` }} className="h-2 bg-primary-500 transition-all" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">OG</div>
                  <div className="chat-bubble sent max-w-prose">
                    {step===0 && "Let's start with your basic details."}
                    {step===1 && "Now tell us about your academics."}
                    {step===2 && "What kind of opportunities do you seek?"}
                    {step===3 && "Pick your skills and tools."}
                    {step===4 && "Add your projects (evidence matters)."} 
                    {step===5 && "Share any internships or work experience."}
                    {step===6 && "Finally, set your preferences."}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">You</div>
                  <div className="chat-bubble recv w-full">
                    {step===0 && (
                      <div className="space-y-3">
                        <input placeholder="Full name *" value={state.basic.name} onChange={e=>update("basic.name", e.target.value)} className="w-full rounded-md border px-3 py-2" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input placeholder="Email *" value={state.basic.email} onChange={e=>update("basic.email", e.target.value)} className="rounded-md border px-3 py-2" />
                          <input placeholder="Contact *" value={state.basic.phone} onChange={e=>update("basic.phone", e.target.value)} className="rounded-md border px-3 py-2" />
                        </div>
                      </div>
                    )}

                    {step===1 && (
                      <div className="space-y-3">
                        <input placeholder="College / University" value={state.academic.college} onChange={e=>update("academic.college", e.target.value)} className="w-full rounded-md border px-3 py-2" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input placeholder="Degree" value={state.academic.degree} onChange={e=>update("academic.degree", e.target.value)} className="rounded-md border px-3 py-2" />
                          <input placeholder="Graduation year" value={state.academic.graduationYear} onChange={e=>update("academic.graduationYear", e.target.value)} className="rounded-md border px-3 py-2" />
                        </div>
                      </div>
                    )}

                    {step===2 && (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          {["Internship","Full-time","Contract"].map(t=>{
                            const active = state.opportunities.types.includes(t);
                            return <button key={t} onClick={()=>update("opportunities.types", active? state.opportunities.types.filter(x=>x!==t): [...state.opportunities.types,t])} className={`btn border ${active? "bg-primary-50":"bg-white"}`}>{t}</button>;
                          })}
                        </div>
                        <input placeholder="Preferred roles (comma separated)" value={state.opportunities.roles.join(", ")} onChange={e=>update("opportunities.roles", e.target.value.split(",").map(s=>s.trim()).filter(Boolean))} className="w-full rounded-md border px-3 py-2" />
                      </div>
                    )}

                    {step===3 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-500">Add technical skill</div>
                          <input value={skillQuery} onChange={e=>setSkillQuery(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"){ e.preventDefault(); addSkill(skillQuery.trim()); setSkillQuery(""); } }} placeholder="Type and press Enter" className="rounded-md border px-3 py-1 text-sm w-48" />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {Object.values(groupedTechnical).flat().map(s=>{
                            const active = state.skills.technical.includes(s);
                            return <button key={s} onClick={()=>update("skills.technical", active? state.skills.technical.filter(x=>x!==s): [...state.skills.technical,s])} className={`chip ${active? "bg-primary-700 text-white":"bg-white text-slate-700"}`}>{s}</button>;
                          })}
                        </div>
                        <div className="mt-2">
                          <input value={toolQuery} onChange={e=>setToolQuery(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"){ e.preventDefault(); addTool(toolQuery.trim()); setToolQuery(""); } }} placeholder="Add tool and press Enter" className="w-full rounded-md border px-3 py-2" />
                        </div>
                      </div>
                    )}

                    {step===4 && <ProjectForm onAdd={(p)=>addProject(p)} initial={null} />}
                    {step===5 && <ExperienceForm onAdd={(e)=>addExperience(e)} initial={null} />}
                    {step===6 && (
                      <div className="space-y-3">
                        <label className="text-sm text-slate-500">Availability to start</label>
                        <select value={state.preferences.availability} onChange={e=>update("preferences.availability", e.target.value)} className="rounded-md border px-3 py-2">
                          <option value="">Select</option>
                          <option value="Immediate">Immediate</option>
                          <option value="15 days">In 15 days</option>
                          <option value="30 days">In 30 days</option>
                          <option value="60 days">In 60 days</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <aside className="w-64 hidden md:block">
              <div className="text-sm text-slate-500 mb-2">Selected</div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Technical</div>
                  <div className="flex flex-wrap gap-2">
                    {state.skills.technical.length ? state.skills.technical.map((s,i)=> <span key={i} className="chip">{s}</span>) : <div className="text-xs text-slate-400">— none</div>}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {state.skills.tools.length ? state.skills.tools.map((s,i)=> <span key={i} className="chip">{s}</span>) : <div className="text-xs text-slate-400">— none</div>}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-500">{["Basic","Academic","Opportunities","Skills","Projects","Experience","Preferences"][step]}</div>
            <div className="flex gap-2">
              {step>0 && <button onClick={back} className="btn border">Back</button>}
              {step<6 ? <button onClick={next} className="btn bg-primary-500 text-white">Next</button> : <button onClick={finish} className="btn bg-primary-700 text-white">Finish</button>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProjectForm({ onAdd, initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || { title: "", description: "", tech: "" });
  useEffect(() => setForm(initial || { title: "", description: "", tech: "" }), [initial]);
  return (
    <div className="space-y-3">
      <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Project title" className="w-full rounded-md border px-3 py-2" />
      <input value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Short description" className="w-full rounded-md border px-3 py-2" />
      <input value={form.tech} onChange={e=>setForm({...form,tech:e.target.value})} placeholder="Tech (comma separated)" className="w-full rounded-md border px-3 py-2" />
      <div className="flex gap-2">
        {initial ? (
          <>
            <button onClick={()=>onSave && onSave({...form, tech: form.tech.split(",").map(t=>t.trim()).filter(Boolean)})} className="btn bg-primary-500 text-white">Save</button>
            <button onClick={()=>onCancel && onCancel()} className="btn border">Cancel</button>
          </>
        ) : (
          <button onClick={()=>{ onAdd && onAdd({...form, tech: form.tech.split(",").map(t=>t.trim()).filter(Boolean)}); setForm({title:"",description:"",tech:""}); }} className="btn bg-white border">Add project</button>
        )}
      </div>
    </div>
  );
}

function ExperienceForm({ onAdd, initial, onSave, onCancel }) {
  const [f, setF] = useState(initial || { role: "", organization: "", duration: "", responsibilities: "" });
  useEffect(() => setF(initial || { role: "", organization: "", duration: "", responsibilities: "" }), [initial]);
  return (
    <div className="space-y-3">
      <input value={f.role} onChange={e=>setF({...f,role:e.target.value})} placeholder="Role" className="w-full rounded-md border px-3 py-2" />
      <input value={f.organization} onChange={e=>setF({...f,organization:e.target.value})} placeholder="Organization" className="w-full rounded-md border px-3 py-2" />
      <input value={f.duration} onChange={e=>setF({...f,duration:e.target.value})} placeholder="Duration" className="w-full rounded-md border px-3 py-2" />
      <textarea value={f.responsibilities} onChange={e=>setF({...f,responsibilities:e.target.value})} placeholder="Key responsibilities" className="w-full rounded-md border px-3 py-2" />
      <div className="flex gap-2">
        {initial ? <><button onClick={()=>onSave && onSave(f)} className="btn bg-primary-500 text-white">Save</button><button onClick={()=>onCancel && onCancel()} className="btn border">Cancel</button></> : <button onClick={()=>{ onAdd && onAdd(f); setF({ role:"", organization:"", duration:"", responsibilities:"" }); }} className="btn bg-white border">Add experience</button>}
      </div>
    </div>
  );
}
                    {step === 1 && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm text-slate-500 block">Degree *</label>
                            <select value={data.academic.degree} onChange={e => { update("academic.degree", e.target.value); update("academic.specialization", ""); }} className="w-full rounded-md border px-3 py-2">
                              <option value="">Select degree</option>
                              {degreeOptions.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="text-sm text-slate-500 block">Specialization *</label>
                            {specializationMap[data.academic.degree] ? (
                              <select value={data.academic.specialization} onChange={e => update("academic.specialization", e.target.value)} className="w-full rounded-md border px-3 py-2">
                                <option value="">Select specialization</option>
                                {specializationMap[data.academic.degree].map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                            ) : (
                              <input value={data.academic.specialization} onChange={e => update("academic.specialization", e.target.value)} placeholder="Enter specialization" className="w-full rounded-md border px-3 py-2" />
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input placeholder="College / University *" value={data.academic.college} onChange={e => update("academic.college", e.target.value)} className="rounded-md border px-3 py-2" />
                          <input placeholder="Expected graduation year *" value={data.academic.graduationYear} onChange={e => update("academic.graduationYear", e.target.value)} className="rounded-md border px-3 py-2" />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-slate-500">Opportunity types *</div>
                          <div className="mt-2 flex gap-2">
                            {["Internship","Full-time","Contract","Freelance"].map(t => (
                              <button key={t} onClick={() => {
                                const types = data.opportunities.types.includes(t) ? data.opportunities.types.filter(x=>x!==t) : [...data.opportunities.types, t];
                                update("opportunities.types", types);
                              }} className={`btn border ${data.opportunities.types.includes(t) ? "bg-primary-50 border-primary-200" : "bg-white"}`}>{t}</button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <input placeholder="Preferred roles (comma separated) *" value={data.opportunities.roles.join(", ")} onChange={e => update("opportunities.roles", e.target.value.split(",").map(s=>s.trim()).filter(Boolean))} className="w-full rounded-md border px-3 py-2" />
                        </div>
                        <div>
                          <textarea placeholder="Career objective (short)" value={data.opportunities.objective} onChange={e => update("opportunities.objective", e.target.value)} className="w-full rounded-md border px-3 py-2" rows={3} />
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-500">Core technical skills</div>
                            <input value={skillQuery} onChange={e=>setSkillQuery(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); const v = skillQuery.trim(); if (v && !data.skills.technical.includes(v)) update("skills.technical", [...data.skills.technical, v]); setSkillQuery(""); } }} placeholder="Search or press Enter to add" className="rounded-md border px-3 py-1 text-sm w-48" />
                          </div>
                          <div className="mt-3 space-y-3">
                            {Object.entries(groupedTechnical).map(([group, items]) => {
                              const filtered = items.filter(i => i.toLowerCase().includes(skillQuery.toLowerCase()));
                              if (filtered.length === 0) return null;
                              return (
                                <div key={group}>
                                  <div className="text-sm font-medium text-slate-700 mb-2">{group}</div>
                                  <div className="flex flex-wrap gap-2">
                                    {filtered.map(s => {
                                      const active = data.skills.technical.includes(s);
                                      return (
                                        <button key={s} onClick={() => {
                                          const arr = active ? data.skills.technical.filter(x => x !== s) : [...data.skills.technical, s];
                                          update("skills.technical", arr);
                                        }} className={`chip ${active ? "bg-primary-700 text-white ring-2 ring-primary-200" : "bg-white text-slate-700"}`}>{s}</button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-2">
                            <input placeholder="Add custom technical skill and press Enter" onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); const v = e.target.value.trim(); if (v) { update("skills.technical", [...data.skills.technical, v]); e.target.value = ""; } } }} className="w-full rounded-md border px-3 py-2" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-500">Tools & technologies</div>
                            <input value={toolQuery} onChange={e=>setToolQuery(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); const v = toolQuery.trim(); if (v && !data.skills.tools.includes(v)) update("skills.tools", [...data.skills.tools, v]); setToolQuery(""); } }} placeholder="Search or press Enter to add" className="rounded-md border px-3 py-1 text-sm w-48" />
                          </div>
                          <div className="mt-3 space-y-3">
                            {Object.entries(groupedTools).map(([group, items]) => {
                              const filtered = items.filter(i => i.toLowerCase().includes(toolQuery.toLowerCase()));
                              if (filtered.length === 0) return null;
                              return (
                                <div key={group}>
                                  <div className="text-sm font-medium text-slate-700 mb-2">{group}</div>
                                  <div className="flex flex-wrap gap-2">
                                    {filtered.map(t => {
                                      const active = data.skills.tools.includes(t);
                                      return (
                                        <button key={t} onClick={() => {
                                          const arr = active ? data.skills.tools.filter(x => x !== t) : [...data.skills.tools, t];
                                          update("skills.tools", arr);
                                        }} className={`chip ${active ? "bg-primary-700 text-white ring-2 ring-primary-200" : "bg-white text-slate-700"}`}>{t}</button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-2">
                            <input placeholder="Add tools (comma separated)" onBlur={e => { const vals = e.target.value.split(",").map(s=>s.trim()).filter(Boolean); if (vals.length) update("skills.tools", [...data.skills.tools, ...vals]); e.target.value = ""; }} className="w-full rounded-md border px-3 py-2" />
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-slate-500">Soft skills</div>
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            {softSkills.map(s => {
                              const active = data.skills.soft.includes(s);
                              return (
                                <button key={s} onClick={() => {
                                  const arr = active ? data.skills.soft.filter(x=>x!==s) : [...data.skills.soft, s];
                                  update("skills.soft", arr);
                                }} className={`chip ${active ? "bg-primary-700 text-white ring-2 ring-primary-200" : "bg-white text-slate-700"}`}>{s}</button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div>
                        {editingProject !== null ? (
                          <ProjectForm initial={data.projects[editingProject]} onSave={(p)=>updateProject(editingProject,p)} onCancel={()=>setEditingProject(null)} />
                        ) : (
                          <ProjectForm onAdd={(p)=>addProject(p)} />
                        )}
                        <div className="mt-3 space-y-2">
                          {data.projects.map((p,i)=>(
                            <div key={i} className="border rounded-md p-3 flex justify-between items-start">
                              <div>
                                <div className="font-medium">{p.title}</div>
                                <div className="text-sm text-slate-600">{p.description}</div>
                                <div className="text-xs text-slate-500 mt-1">Tech: {p.tech.join(", ")}</div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={()=>setEditingProject(i)} className="btn border">Edit</button>
                                <button onClick={()=>deleteProject(i)} className="btn bg-white border text-red-600">Delete</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div>
                        {editingExperience !== null ? (
                          <ExperienceForm initial={data.experience[editingExperience]} onSave={(exp)=>updateExperience(editingExperience,exp)} onCancel={()=>setEditingExperience(null)} />
                        ) : (
                          <ExperienceForm onAdd={(exp)=>addExperience(exp)} />
                        )}
                        <div className="mt-3 space-y-2">
                          {data.experience.map((e,i)=>(
                            <div key={i} className="border rounded-md p-3 flex justify-between items-start">
                              <div>
                                <div className="font-medium">{e.role} — {e.organization}</div>
                                <div className="text-sm text-slate-600">{e.duration}</div>
                                <div className="text-xs text-slate-500 mt-1">{e.responsibilities}</div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={()=>setEditingExperience(i)} className="btn border">Edit</button>
                                <button onClick={()=>deleteExperience(i)} className="btn bg-white border text-red-600">Delete</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 6 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm text-slate-500 block">Preferred work mode</label>
                          <select value={data.preferences.workMode} onChange={e=>update("preferences.workMode", e.target.value)} className="w-full rounded-md border px-3 py-2 mt-2">
                            <option>Remote</option><option>Hybrid</option><option>Onsite</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm text-slate-500 block">Preferred locations (comma separated)</label>
                          <input value={data.preferences.locations.join(", ")} onChange={e=>update("preferences.locations", e.target.value.split(",").map(s=>s.trim()).filter(Boolean))} className="w-full rounded-md border px-3 py-2 mt-2" />
                        </div>
                        <div>
                          <label className="text-sm text-slate-500 block">Availability to start</label>
                          <select value={data.preferences.availability} onChange={e=>update("preferences.availability", e.target.value)} className="w-full rounded-md border px-3 py-2 mt-2">
                            <option value="Immediate">Immediate</option>
                            <option value="15 days">In 15 days</option>
                            <option value="30 days">In 30 days</option>
                            <option value="60 days">In 60 days</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm text-slate-500 block">Expected compensation (optional)</label>
                          <input value={data.preferences.compensation} onChange={e=>update("preferences.compensation", e.target.value)} className="w-full rounded-md border px-3 py-2 mt-2" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm text-slate-500 block">Key strengths</label>
                          <textarea value={data.misc.strengths} onChange={e=>update("misc.strengths", e.target.value)} className="w-full rounded-md border px-3 py-2 mt-2" rows={2} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
            </div>

            <aside className="w-64 hidden md:block">
              <div className="text-sm text-slate-500 mb-2">Selected</div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Technical</div>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.technical.length ? data.skills.technical.map((s,i)=> <span key={i} className="chip">{s}</span>) : <div className="text-xs text-slate-400">— none</div>}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.tools.length ? data.skills.tools.map((s,i)=> <span key={i} className="chip">{s}</span>) : <div className="text-xs text-slate-400">— none</div>}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Soft skills</div>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.soft.length ? data.skills.soft.map((s,i)=> <span key={i} className="chip">{s}</span>) : <div className="text-xs text-slate-400">— none</div>}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-500">{STEP_TITLES[step]}</div>
            <div className="flex gap-2">
              {step > 0 && <button onClick={back} className="btn border">Back</button>}
              {step < STEP_TITLES.length - 1 ? (
                <button onClick={next} className="btn bg-primary-500 text-white">Next</button>
              ) : (
                <button onClick={finish} className="btn bg-primary-700 text-white">Finish & View Dashboard</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProjectForm({ onAdd, initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || { title: "", description: "", tech: "" });
  useEffect(() => setForm(initial || { title: "", description: "", tech: "" }), [initial]);
  return (
    <div className="mt-3 grid grid-cols-1 gap-2">
      <input placeholder="Project title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="rounded-md border px-3 py-2" />
      <input placeholder="Short description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="rounded-md border px-3 py-2" />
      <input placeholder="Tech (comma separated)" value={form.tech} onChange={e=>setForm({...form, tech:e.target.value})} className="rounded-md border px-3 py-2" />
      <div className="flex gap-2">
        {initial ? (
          <>
            <button onClick={() => { onSave({ title: form.title, description: form.description, tech: form.tech.split(",").map(t=>t.trim()).filter(Boolean) }); }} className="btn bg-primary-500 text-white">Save</button>
            <button onClick={onCancel} className="btn border">Cancel</button>
          </>
        ) : (
          <button onClick={() => { onAdd ? onAdd({ title: form.title, description: form.description, tech: form.tech.split(",").map(t=>t.trim()).filter(Boolean) }) : onSave && onSave({ title: form.title, description: form.description, tech: form.tech.split(",").map(t=>t.trim()).filter(Boolean) }); setForm({ title:"", description:"", tech:"" }); }} className="btn bg-white border">Add project</button>
        )}
      </div>
    </div>
  );
}

function ExperienceForm({ onAdd, initial, onSave, onCancel }) {
  const [f, setF] = useState(initial || { role: "", organization: "", duration: "", responsibilities: "" });
  useEffect(() => setF(initial || { role: "", organization: "", duration: "", responsibilities: "" }), [initial]);
  return (
    <div className="mt-3 grid grid-cols-1 gap-2">
      <input placeholder="Role" value={f.role} onChange={e=>setF({...f, role:e.target.value})} className="rounded-md border px-3 py-2" />
      <input placeholder="Organization" value={f.organization} onChange={e=>setF({...f, organization:e.target.value})} className="rounded-md border px-3 py-2" />
      <input placeholder="Duration (e.g. Jun 2023 - Aug 2023)" value={f.duration} onChange={e=>setF({...f, duration:e.target.value})} className="rounded-md border px-3 py-2" />
      <textarea placeholder="Key responsibilities" value={f.responsibilities} onChange={e=>setF({...f, responsibilities:e.target.value})} className="rounded-md border px-3 py-2" />
      <div className="flex gap-2">
        {initial ? (
          <>
            <button onClick={() => { onSave(f); }} className="btn bg-primary-500 text-white">Save</button>
            <button onClick={onCancel} className="btn border">Cancel</button>
          </>
        ) : (
          <button onClick={()=>{ onAdd(f); setF({ role:"", organization:"", duration:"", responsibilities:"" }); }} className="btn bg-white border">Add experience</button>
        )}
      </div>
    </div>
  );
}
