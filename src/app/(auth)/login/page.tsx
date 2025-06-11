"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: hook up to real auth provider (NextAuth, your API, etc.)
    console.log("login", { email, password });
    router.push("/dashboard");
  };

  return (
    <div className="login">
      <img
        src="/auth/login-bg.png"
        alt="background"
        className="login__bg"
      />
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Login</h1>

        <div className="login__inputs">
          <div className="login__box">
            <input
              type="email"
              placeholder="Email ID"
              required
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="fas fa-envelope" />
          </div>

          <div className="login__box">
            <input
              type="password"
              placeholder="Password"
              required
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fas fa-lock" />
          </div>
        </div>

        <div className="login__check">
          <div className="login__check-box">
            <input
              type="checkbox"
              className="login__check-input"
              id="user-check"
            />
            <label htmlFor="user-check" className="login__check-label">
              Remember me
            </label>
          </div>
          <Link href="/forgot-password" className="login__forgot">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="login__button">
          <i className="fas fa-sign-in-alt" /> Login
        </button>

        <div className="login__register">
          Don&apos;t have an account? <Link href="/signup">Register</Link>
        </div>
      </form>
    </div>
  );
}
