"use client";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    college: "",
    field: "",
    graduation: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill required fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    // UI-only: pretend to create account, show success and stay on signup
    setError("");
    setSuccess(true);
  }

  return (
    <main className="container py-16">
      <div className="max-w-4xl mx-auto card">
        <h2 className="text-2xl font-semibold">Create your OwnGCC student profile</h2>
        <p className="text-slate-600 mt-1">A professional profile for enterprise hiring demos.</p>
        <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input name="password" value={form.password} onChange={handleChange} type="password" className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm password</label>
            <input name="confirm" value={form.confirm} onChange={handleChange} type="password" className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">College / University</label>
            <input name="college" value={form.college} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Field of study</label>
            <input name="field" value={form.field} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Graduation year</label>
            <input name="graduation" value={form.graduation} onChange={handleChange} type="number" className="w-full rounded-md border px-3 py-2" />
          </div>
          <div className="md:col-span-2 flex items-center justify-between mt-2">
            <div className="text-sm text-slate-600">By creating an account you agree to the demo terms.</div>
            <div className="flex gap-2">
              <button type="submit" className="btn bg-primary-500 text-white">Sign up</button>
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && (
            <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-md">
              <div className="font-medium">Account created</div>
              <div className="text-sm text-slate-600">Your account was created successfully. Please login to continue.</div>
              <div className="mt-3">
                <button onClick={() => (window.location.href = "/login")} className="btn bg-primary-500 text-white">Go to Login</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
