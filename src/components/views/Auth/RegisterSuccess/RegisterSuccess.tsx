import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const RegisterSuccess = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/evently-logo.png"
          alt="logo"
          width={200}
          height={200}
        />
        <Image
          src="/images/illustrations/mail-send.svg"
          alt="register-success"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-[#006DE6]">
          Create Account Success
        </h1>
        <p className="text-default-500 text-xl font-bold">
          check your email for account activation
        </p>
        <Button
          className="mt-4 w-fit border-[#006DE6] text-[#006DE6]"
          variant="bordered"
          onClick={() => router.push("/")}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
