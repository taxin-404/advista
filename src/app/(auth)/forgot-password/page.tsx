"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-slate-50">
        <div className="w-full max-w-md text-center">
          <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h1>
          <p className="text-slate-500 mb-8">
            We&apos;ve sent a password reset link to <strong>{email}</strong>
          </p>
          <Link href="/login">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Forgot password?</h1>
          <p className="text-slate-500">Enter your email and we&apos;ll send you a reset link.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>We&apos;ll send instructions to your email</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Send Reset Link
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-slate-500 mt-6">
          <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-medium inline-flex items-center">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
