"use client";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="login error-page">
      <img src="/auth/login-bg.png" alt="background" className="login__bg" />
      <div className="login__form">
        <div className="status-icon error">
          <i className="fas fa-exclamation-circle" />
        </div>
        <h1 className="login__title">Link Expired</h1>
        <p className="login__description">
          This password reset link has expired or is invalid.
        </p>
        <div className="login__info">
          <p>Possible reasons:</p>
          <ul>
            <li>The link has expired (valid for 1 hour)</li>
            <li>The link has already been used</li>
            <li>Invalid or malformed link</li>
          </ul>
        </div>
        <div className="login__actions">
          <Link href="/forgot-password" className="login__button">
            <i className="fas fa-redo" /> Request New Link
          </Link>
          <p className="back-to-home">
            or <Link href="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
