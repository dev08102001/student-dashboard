"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    // UI-only: validate and "navigate" to dashboard page
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    // After login, take user to onboarding flow to collect profile details
    window.location.href = "/onboarding";
  }

  return (
    <main className="container py-16">
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-slate-600">Sign in to continue to OwnGCC student dashboard.</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="you@college.edu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <Link href="#" className="text-primary-500 hover:underline">Forgot password?</Link>
              <button type="submit" className="btn bg-primary-500 text-white">Login</button>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </div>
        <div>
          <div className="card">
            <h3 className="text-lg font-medium">New to OwnGCC?</h3>
            <p className="text-slate-600 mt-2">Create a profile to showcase projects and preferences to hiring teams.</p>
            {/* Navigation to signup is available in the top-right nav */}
          </div>
        </div>
      </div>
    </main>
  );
}
