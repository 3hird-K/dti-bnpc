import Link from "next/link";

export default function Page() {
  return (
    <div className="apple-auth-page">
      <div className="apple-auth-bg" />
      <div className="w-full max-w-sm relative z-10">
        <div className="apple-auth-card">
          <div className="flex flex-col items-center mb-8">
            <div
              className="apple-logo-ring mb-5"
              style={{ background: "linear-gradient(135deg, #30d158 0%, #25a244 100%)" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <h1 className="apple-heading">You&apos;re Almost In!</h1>
            <p className="apple-subheading">Check your email to verify</p>
          </div>

          <div className="apple-input-group mb-6">
            <div className="apple-input-field">
              <p
                className="text-sm text-center"
                style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}
              >
                We&apos;ve sent a confirmation link to your email address. Please
                verify your account before you can sign in.
              </p>
            </div>
          </div>

          <p className="apple-footer-text">
            Already confirmed?{" "}
            <Link href="/auth/login" className="apple-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
