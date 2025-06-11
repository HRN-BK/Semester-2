"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("send reset link", email);
    router.push("/email-sent");
  };

  return (
    <div className="login forgot-password">
      <img src="/auth/login-bg.png" alt="background" className="login__bg" />
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__back">
          <Link href="/login" className="login__back-link">
            <i className="fas fa-arrow-left" /> Back to Login
          </Link>
        </div>

        <h1 className="login__title">Reset Password</h1>
        <p className="login__description">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>

        <div className="login__inputs">
          <div className="login__box">
            <input
              type="email"
              placeholder="Email Address"
              required
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="fas fa-envelope" />
          </div>
        </div>

        <button type="submit" className="login__button">
          <i className="fas fa-paper-plane" /> Send Reset Link
        </button>

        <div className="login__register">
          Remember your password? <Link href="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
}
