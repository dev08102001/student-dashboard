"use client";
import { useState } from "react";

export default function ProfileCard({ student }) {
  const [preview, setPreview] = useState(student.photo || "");

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <div className="card">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center">
          {preview ? <img src={preview} alt="profile" className="w-full h-full object-cover" /> : <span className="text-slate-400">No photo</span>}
        </div>
        <div>
          <h3 className="text-lg font-medium">{student.name}</h3>
          <p className="text-sm text-slate-600">{student.academic.college}</p>
          <p className="text-sm text-slate-500 mt-1">Status: <span className="font-medium">{student.status}</span></p>
        </div>
      </div>
      <div className="mt-4">
        <label className="btn border border-slate-200">
          Upload photo
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      </div>
    </div>
  );
}
