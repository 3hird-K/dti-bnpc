import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="apple-auth-page">
      <div className="apple-auth-bg" />
      <div className="w-full max-w-sm relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
