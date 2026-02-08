"use client";
import { useState } from "react";

export default function Preferences({ preferences }) {
  const [roles, setRoles] = useState(preferences.roles || []);
  const [type, setType] = useState(preferences.employmentType || "Full-time");
  const [mode, setMode] = useState(preferences.workMode || "Remote");

  function toggleRole(role) {
    if (roles.includes(role)) setRoles(roles.filter(r => r !== role));
    else setRoles([...roles, role]);
  }

  return (
    <div className="mt-3 space-y-4">
      <div>
        <label className="block text-sm font-medium">Preferred roles</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Frontend Engineer","Fullstack Engineer","Data Analyst","UI/UX Designer"].map(r => (
            <button
              key={r}
              onClick={() => toggleRole(r)}
              className={`chip ${roles.includes(r) ? "bg-primary-100 text-primary-700" : ""}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Employment type</label>
        <div className="mt-2 flex gap-2">
          {["Internship","Full-time","Contract"].map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`btn border ${type===t ? "bg-primary-50 border-primary-200" : "bg-white"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Work mode</label>
        <div className="mt-2 flex gap-2">
          {["Remote","Hybrid","Onsite"].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`btn border ${mode===m ? "bg-primary-50" : "bg-white"}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
