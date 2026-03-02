"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <section className="register-page">
      <div className="container">
        <div className="welcome-section">
          <div className="welcome-content">
            <h1>BHUTAN SMART TOURISM</h1>
            <h2>Join the journey</h2>
            <p>
              Create your account to personalize travel plans, save places, and start exploring Bhutan with ease.
            </p>
          </div>

          <div className="footer-text">Discover the Soul of Bhutan.</div>
        </div>

        <div className="register-section">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="*********"
                required
              />
            </div>

            <button type="submit" className="create-btn">Create Account</button>

            <div className="login-link">
              Already have an account? <Link href="/authentication/login">Login</Link>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .register-page {
          min-height: calc(100vh - 10rem);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          padding: 24px 0;
        }

        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1200px;
          width: 90%;
          margin: 20px;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .welcome-section {
          background: #2b6777;
          color: white;
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 600px;
        }

        .welcome-content h1 {
          font-family: var(--font-heading), ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
          font-size: 2.5rem;
          margin-bottom: 18px;
          line-height: 1.2;
          font-weight: 700;
        }

        .welcome-content h2 {
          font-size: 1.3rem;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .welcome-content p {
          font-size: 1.05rem;
          line-height: 1.6;
          opacity: 0.95;
        }

        .footer-text {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 40px;
        }

        .register-section {
          padding: 60px 40px;
          background: white;
        }

        .register-section h2 {
          color: #1e3c4a;
          margin-bottom: 28px;
          font-size: 1.9rem;
          font-family: var(--font-heading), ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #4a5568;
          font-weight: 500;
        }

        .form-group input {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border 0.2s, box-shadow 0.2s;
        }

        .form-group input::placeholder {
          color: #a0aec0;
        }

        .form-group input:focus {
          outline: none;
          border-color: #52ab98;
          box-shadow: 0 0 0 2px rgba(82,171,152,0.18);
        }

        .create-btn {
          width: 100%;
          background: #2b6777;
          color: white;
          border: none;
          padding: 14px;
          font-size: 1.05rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
          margin: 8px 0 0;
        }

        .create-btn:hover {
          background: #1f4e5a;
        }

        .login-link {
          margin-top: 20px;
          text-align: center;
          color: #4a5568;
        }

        .login-link a {
          color: #52ab98;
          text-decoration: none;
          font-weight: 600;
        }

        .login-link a:hover {
          color: #3e8a7a;
          text-decoration: underline;
        }

        @media screen and (max-width: 768px) {
          .container {
            grid-template-columns: 1fr;
            width: 95%;
          }

          .welcome-section {
            min-height: auto;
            padding: 40px 30px;
          }

          .register-section {
            padding: 40px 30px;
          }

          .welcome-content h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
