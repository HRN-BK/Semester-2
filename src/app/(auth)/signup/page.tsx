"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!agree) {
      alert("You must agree to the terms & conditions.");
      return;
    }
    console.log({ fullname, email, password });
    router.push("/verify-email");
  };

  return (
    <div className="login signup-form">
      <img src="/auth/login-bg.png" alt="background" className="login__bg" />
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Sign Up</h1>

        <div className="login__inputs">
          <div className="login__box">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="login__input"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <i className="fas fa-user" />
          </div>
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
          <div className="login__box">
            <input
              type="password"
              placeholder="Create Password"
              required
              className="login__input"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fas fa-lock" />
          </div>
          <div className="login__box">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="login__input"
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <i className="fas fa-lock" />
          </div>
        </div>

        <div className="login__check">
          <div className="login__check-box">
            <input
              type="checkbox"
              className="login__check-input"
              id="terms-check"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label htmlFor="terms-check" className="login__check-label">
              I agree to the <a className="login__terms">Terms & Conditions</a>
            </label>
          </div>
        </div>

        <button type="submit" className="login__button">
          <i className="fas fa-user-plus" /> Create Account
        </button>

        <div className="login__register">
          Already have an account? <Link href="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
}
