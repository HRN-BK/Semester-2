"use client";
import Link from "next/link";

export default function EmailSentPage() {
  const handleResend = () => {
    alert("A new password reset link has been sent to your email.");
  };
  return (
    <div className="login email-sent">
      <img src="/auth/login-bg.png" alt="background" className="login__bg" />
      <div className="login__form">
        <div className="status-icon">
          <i className="fas fa-envelope-open-text" />
        </div>
        <h1 className="login__title">Check Your Email</h1>
        <p className="login__description">
          We&apos;ve sent a password reset link to your email address.
        </p>
        <div className="login__info">
          <p>Didn&apos;t receive the email?</p>
          <ul>
            <li>Check your spam or junk folder</li>
            <li>Make sure the email address is correct</li>
            <li>Try again in a few minutes</li>
          </ul>
        </div>
        <div className="login__footer">
          <p>
            Back to <Link href="/login">Login</Link>
          </p>
          <p className="resend">
            Didn&apos;t get the email? <a onClick={handleResend}>Resend</a>
          </p>
        </div>
      </div>
    </div>
  );
}
