"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <section className="profile-page">
        <div className="profile-container">
          <h1>Profile</h1>

          <div className="message-card">
            <p>You need to sign in to view your profile.</p>
            <button
              type="button"
              className="login-btn"
              onClick={() => router.push("/authentication/login")}
            >
              Go to Login
            </button>
          </div>
        </div>

        <style jsx>{`
          .profile-page {
            min-height: calc(100vh - 10rem);
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f7fa;
            padding: 2rem 1rem;
          }

          .profile-container {
            width: 100%;
            max-width: 620px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .profile-container h1 {
            font-family: var(--font-heading), ui-sans-serif, system-ui, -apple-system,
              "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
            font-size: 2rem;
            margin-bottom: 20px;
            color: #2b6777;
          }

          .message-card {
            width: 100%;
            background: #ffffff;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 16px 36px rgba(15, 23, 42, 0.08);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .message-card p {
            font-size: 1.1rem;
            color: #4a5568;
            margin-bottom: 30px;
            line-height: 1.6;
          }

          .login-btn {
            background: #2b6777;
            color: #ffffff;
            padding: 12px 40px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: background 0.2s ease;
          }

          .login-btn:hover {
            background: #1f4e5a;
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-10rem)] w-full bg-[#f5f5f5] py-8 sm:py-12">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-center px-3 sm:px-5">
        <Card className="w-full rounded-[20px] border border-[#e2e8f0] bg-white shadow-xl shadow-black/10">
          <CardHeader className="pb-2 pt-7 sm:pt-8">
            <CardTitle className="font-heading text-3xl font-bold text-[#2b6777]">My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pb-7 sm:pb-8">
            <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Email</p>
              <p className="mt-1 font-heading text-base text-foreground">{user.email}</p>
            </div>
            <Button
              type="button"
              onClick={logout}
              className="h-11 rounded-xl bg-[#2b6777] px-6 font-heading font-semibold text-white hover:bg-[#1f4e5a]"
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
