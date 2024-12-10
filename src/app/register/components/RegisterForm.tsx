"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Image from "next/image";
import Link from "next/link";
import { useRegisterForm } from "../hooks/RegisterForm.hook";

const RegisterForm = () => {
  const { fullnameRef, emailRef, passwordRef, isRegistering, onSubmit } =
    useRegisterForm();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col justify-center items-center space-y-6 bg-tertiary rounded-xl p-9 shadow-lg max-w-md w-full">
        <Image src="/icons/BigLogo.svg" alt="Logo" width={96} height={96} />
        <form
          className="flex flex-col gap-6 w-full"
          id="register"
          onSubmit={onSubmit}
        >
          <Input
            placeholder="Full Name"
            id="fullname"
            name="fullname"
            type="text"
            autocomplete={true}
            ref={fullnameRef}
          />
          <Input
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            autocomplete={true}
            ref={emailRef}
          />
          <Input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            ref={passwordRef}
          />
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="self-center w-1/2"
              text="Register"
              style={"PRIMARY"}
              disabled={isRegistering}
            />

            <span className="text-center text-foreground-secondary">
              Already have an account?{" "}
              <Link href={"/login"} className="text-accent">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
