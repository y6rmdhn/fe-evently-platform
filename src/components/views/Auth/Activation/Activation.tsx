import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface PropTypes {
  status: "success" | "failed";
}

const ActivationAccount = (props: PropTypes) => {
  const router = useRouter();
  const { status } = props;

  console.log(status);

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
          src={
            status === "success"
              ? "/images/illustrations/activation-success.svg"
              : "/images/illustrations/activation-failed.svg"
          }
          alt="register-success"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-[#006DE6]">
          {status === "success" ? "Activation Success" : "Activation Failed"}
        </h1>
        <p className="text-default-500 text-xl font-bold">
          {status === "success"
            ? "Thank you for register account in Evently"
            : "Confirmation code is invalid"}
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

export default ActivationAccount;
