"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validate = () => newPassword === confirmPassword && newPassword.length >= 8;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      alert("Passwords must match and be at least 8 characters.");
      return;
    }
    console.log("update password", newPassword);
    alert("Your password has been reset successfully!");
    router.push("/login");
  };

  return (
    <div className="login reset-password">
      <img src="/auth/login-bg.png" alt="background" className="login__bg" />
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__back">
          <Link href="/login" className="login__back-link">
            <i className="fas fa-arrow-left" /> Back to Login
          </Link>
        </div>

        <h1 className="login__title">Reset Password</h1>
        <p className="login__description">Create a new password for your account</p>

        <div className="login__inputs">
          <div className="login__box">
            <input
              type="password"
              placeholder="New Password"
              required
              className="login__input"
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <i className="fas fa-lock" />
          </div>
          <div className="login__box">
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              className="login__input"
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <i className="fas fa-lock" />
          </div>
        </div>

        <button type="submit" className="login__button">
          <i className="fas fa-save" /> Update Password
        </button>
      </form>
    </div>
  );
}
