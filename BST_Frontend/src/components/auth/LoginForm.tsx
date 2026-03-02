"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    router.push("/");
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="welcome-section">
          <div className="welcome-content">
            <h1>Welcome to the Kingdom of Bhutan</h1>
            <p>
              Immerse yourself in ancient traditions, colorful tsechus, and unparalleled Himalayan hospitality.
            </p>
            <button type="button" className="discover-btn">Discover Culture</button>
          </div>

          <div className="footer-text">
            Preserving heritage, inspiring journeys
          </div>
        </div>

        <div className="login-section">
          <h2>USER LOGIN</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Username</label>
              <input
                id="email"
                type="text"
                placeholder="Enter username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="remember-row">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <Link href="#" className="forgot-link">Forgot Password?</Link>
            </div>

            <button type="submit" className="login-btn">Login</button>

            <div className="register-link">
              Don&apos;t have an account? <Link href="/authentication/register">Register Now</Link>
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

        .login-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
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
          font-size: 2.5rem;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .welcome-content p {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .discover-btn {
          background: transparent;
          border: 2px solid white;
          color: white;
          padding: 15px 40px;
          font-size: 1.1rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 600;
        }

        .discover-btn:hover {
          background: white;
          color: #2b6777;
        }

        .footer-text {
          font-size: 0.9rem;
          opacity: 0.7;
          margin-top: 40px;
        }

        .login-section {
          padding: 60px 40px;
          background: white;
        }

        .login-section h2 {
          color: #333;
          margin-bottom: 30px;
          font-size: 1.8rem;
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
          transition: border 0.3s;
        }

        .form-group input::placeholder {
          color: #a0aec0;
        }

        .form-group input:focus {
          outline: none;
          border-color: #52ab98;
          box-shadow: 0 0 0 2px rgba(82,171,152,0.2);
        }

        .remember-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 20px 0;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
        }

        .remember-me input {
          accent-color: #2b6777;
        }

        .forgot-link {
          color: #52ab98;
          text-decoration: none;
        }

        .forgot-link:hover {
          color: #3e8a7a;
          text-decoration: underline;
        }

        .login-btn {
          width: 100%;
          background: #2b6777;
          color: white;
          border: none;
          padding: 14px;
          font-size: 1.1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s;
          margin: 20px 0;
        }

        .login-btn:hover {
          background: #1f4e5a;
        }

        .register-link {
          text-align: center;
          color: #666;
        }

        .register-link a {
          color: #52ab98;
          text-decoration: none;
          font-weight: 600;
        }

        .register-link a:hover {
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

          .login-section {
            padding: 40px 30px;
          }

          .welcome-content h1 {
            font-size: 2rem;
          }
        }

        @media screen and (max-width: 480px) {
          .remember-row {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }

          .welcome-content h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
}
