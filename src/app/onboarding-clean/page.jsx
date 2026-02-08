 "use client";
 import React, { useState, useEffect } from "react";
 import { useRouter } from "next/navigation";

 export default function OnboardingCleanPage() {
   const router = useRouter();
   const [step, setStep] = useState(0);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");

   function next() {
     if (step === 0 && (!name.trim() || !email.trim())) {
       alert("Please enter name and email.");
       return;
     }
     setStep(s => Math.min(s + 1, 2));
   }
   function back() { setStep(s => Math.max(s - 1, 0)); }
   function finish() { router.push("/dashboard"); }

   return (
     <main className="container py-10">
       <div className="mx-auto w-[90vw] max-w-[800px]">
         <div className="card">
           <h2 className="text-2xl font-semibold mb-2">Onboarding (clean)</h2>
           <p className="text-sm text-slate-600 mb-4">A small, validated onboarding flow to test navigation.</p>

           {step === 0 && (
             <div className="grid gap-3">
               <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="rounded-md border px-3 py-2" />
               <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="rounded-md border px-3 py-2" />
             </div>
           )}

           {step === 1 && (
             <div>
               <p className="text-sm text-slate-600">Step 2 — Academic (placeholder)</p>
             </div>
           )}

           {step === 2 && (
             <div>
               <p className="text-sm text-slate-600">Step 3 — Finish</p>
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

