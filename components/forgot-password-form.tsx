"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {success ? (
        <div className="apple-auth-card">
          <div className="flex flex-col items-center mb-8">
            <div className="apple-logo-ring mb-5" style={{ background: "linear-gradient(135deg, #30d158 0%, #25a244 100%)" }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </div>
            <h1 className="apple-heading">Check Your Email</h1>
            <p className="apple-subheading">Password reset instructions sent</p>
          </div>
          <div className="apple-input-group">
            <div className="apple-input-field">
              <p className="text-sm text-center" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>
                If an account exists for <strong style={{ color: "rgba(255,255,255,0.9)" }}>{email}</strong>, you will receive a password reset link shortly.
              </p>
            </div>
          </div>
          <p className="apple-footer-text mt-6">
            <Link href="/auth/login" className="apple-link">
              Back to Sign In
            </Link>
          </p>
        </div>
      ) : (
        <div className="apple-auth-card">
          <div className="flex flex-col items-center mb-8">
            <div className="apple-logo-ring mb-5" style={{ background: "linear-gradient(135deg, #ff9f0a 0%, #ff6b00 100%)" }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <h1 className="apple-heading">Reset Password</h1>
            <p className="apple-subheading">We&apos;ll send you a reset link</p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="apple-input-group">
              <div className="apple-input-field">
                <label className="apple-label" htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="apple-input"
                />
              </div>
            </div>

            {error && (
              <div className="apple-error-box">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="apple-btn-primary">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Sending…
                </span>
              ) : "Send Reset Link"}
            </button>
          </form>

          <p className="apple-footer-text mt-6">
            Remember your password?{" "}
            <Link href="/auth/login" className="apple-link">
              Sign In
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
