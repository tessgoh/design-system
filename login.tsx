"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5Z" fill="currentColor" />
      <path
        d="M2 17l10 5 10-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12l10 5 10-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.8 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5z"
        fill="#4285F4"
      />
      <path
        d="M10 20c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H1v2.6A10 10 0 0 0 10 20z"
        fill="#34A853"
      />
      <path
        d="M4.4 11.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V5.5H1A10 10 0 0 0 0 10c0 1.6.4 3.1 1 4.5l3.4-2.6z"
        fill="#FBBC05"
      />
      <path
        d="M10 4c1.5 0 2.8.5 3.9 1.5L17 2.3A10 10 0 0 0 10 0 10 10 0 0 0 1 5.5l3.4 2.6C5.2 5.8 7.4 4 10 4z"
        fill="#EA4335"
      />
    </svg>
  );
}

function MicrosoftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="8.5" height="8.5" fill="#F25022" />
      <rect x="10.5" y="1" width="8.5" height="8.5" fill="#7FBA00" />
      <rect x="1" y="10.5" width="8.5" height="8.5" fill="#00A4EF" />
      <rect x="10.5" y="10.5" width="8.5" height="8.5" fill="#FFB900" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.9 17.9A10.1 10.1 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.1-5.9M9.9 4.2A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.2 3.2" />
      <path d="M14.1 14.1a3 3 0 1 1-4.2-4.2" />
      <path d="M1 1l22 22" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Login Page                                                         */
/* ------------------------------------------------------------------ */

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onLogin();
  }

  function handleGoogleLogin() {
    onLogin();
  }

  function handleMicrosoftLogin() {
    onLogin();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-gray-25)] p-4">
      <Card className="w-full max-w-[400px] shadow-xl border-[var(--color-gray-100)]">
        {/* ---- Header ---- */}
        <CardHeader className="items-center text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[var(--color-brand-500)]">
            <LogoIcon className="size-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight text-[var(--color-gray-950)]">
            로그인
          </CardTitle>
          <CardDescription className="text-sm text-[var(--color-gray-600)]">
            계정에 로그인하여 서비스를 이용하세요.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* ---- OAuth Buttons ---- */}
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full gap-3 font-medium"
              onClick={handleGoogleLogin}
            >
              <GoogleIcon className="size-5" />
              Google로 계속하기
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full gap-3 font-medium"
              onClick={handleMicrosoftLogin}
            >
              <MicrosoftIcon className="size-5" />
              Microsoft로 계속하기
            </Button>
          </div>

          {/* ---- Divider ---- */}
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-[var(--color-gray-500)]">또는</span>
            <Separator className="flex-1" />
          </div>

          {/* ---- Email / Password Form ---- */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
                <a
                  href="#"
                  className="text-sm font-medium text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)] transition-colors"
                >
                  비밀번호 찾기
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요"
                  autoComplete="current-password"
                  className="pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-gray-500)] hover:text-[var(--color-gray-700)] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-5" />
                  ) : (
                    <EyeIcon className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-[var(--color-brand-500)] hover:bg-[var(--color-brand-600)] active:bg-[var(--color-brand-700)] text-white font-semibold"
            >
              로그인
            </Button>
          </form>
        </CardContent>

        {/* ---- Footer ---- */}
        <CardFooter className="justify-center">
          <p className="text-sm text-[var(--color-gray-600)]">
            계정이 없으신가요?{" "}
            <a
              href="#"
              className="font-semibold text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)] transition-colors"
            >
              회원가입
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
