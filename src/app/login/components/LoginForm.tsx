"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Image from "next/image";
import Link from "next/link";
import { useLoginForm } from "../hooks/LoginForm.hook";

const LoginForm = () => {
  const { emailRef, passwordRef, isLogging, onSubmit } = useLoginForm();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col justify-center items-center space-y-6 bg-tertiary rounded-xl p-9 shadow-lg max-w-md w-full">
        <Image src="/icons/BigLogo.svg" alt="Logo" width={96} height={96} />
        <form
          className="flex flex-col gap-6 w-full"
          id="login"
          onSubmit={onSubmit}
        >
          <Input
            placeholder="Email"
            id="email"
            type="email"
            autocomplete={true}
            ref={emailRef}
          />
          <Input
            placeholder="Password"
            id="password"
            type="password"
            ref={passwordRef}
          />
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="self-center w-1/2"
              text="Login"
              style={"PRIMARY"}
              disabled={isLogging}
            />

            <span className="text-center text-foreground-secondary">
              Don’t have an account?{" "}
              <Link href={"/register"} className="text-accent">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
