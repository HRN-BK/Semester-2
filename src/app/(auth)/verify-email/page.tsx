"use client";
import { useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [sending, setSending] = useState(false);

  const handleResend = async () => {
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    alert("A new verification link has been sent to your email.");
    setSending(false);
  };

  return (
    <div className="login verify-email">
      <img src="/auth/login-bg.png" alt="background" className="login__bg" />
      <div className="login__form">
        <div className="status-icon">
          <i className="fas fa-envelope" />
        </div>
        <h1 className="login__title">Verify Your Email</h1>
        <p className="login__description">
          We&apos;ve sent a verification link to <strong>user@example.com</strong>
        </p>
        <div className="login__info">
          <p>Please check your email and click the verification link to activate your account.</p>
          <div className="tip">
            <i className="fas fa-lightbulb" />
            <span>Can&apos;t find the email? Check your spam or junk folder.</span>
          </div>
        </div>
        <div className="login__actions">
          <button
            onClick={handleResend}
            disabled={sending}
            className="login__button"
          >
            {sending ? (
              <>
                <i className="fas fa-spinner fa-spin" /> Sending...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane" /> Resend Verification Email
              </>
            )}
          </button>
          <p className="email-change">
            Wrong email? <Link href="/signup">Update email address</Link>
          </p>
        </div>
        <div className="login__footer">
          <p>
            Already verified? <Link href="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
