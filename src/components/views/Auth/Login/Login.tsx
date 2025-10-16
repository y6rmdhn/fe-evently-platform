import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import useLogin from "./useLogin";

const Login = () => {
  const {
    isVisible,
    toogleVisibility,
    control,
    errors,
    handleLogin,
    handleSubmit,
    isPending,
  } = useLogin();

  console.log(errors);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-20 lg:flex-row lg:gap-20">
      <div className="flex w-1/3 flex-col items-center justify-center gap-6">
        <Image
          src="/images/general/evently-logo.png"
          alt="logo"
          width={200}
          height={200}
        />
        <Image
          src="/images/illustrations/login.svg"
          alt="login"
          width={430}
          height={430}
        />
      </div>

      <Card className="p-5">
        <CardHeader>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#006DE6]">Login</h2>
            <p className="mt-2">
              Do not have an account?{" "}
              <Link
                href="/auth/register"
                className="mb-10 font-semibold text-[#006DE6]"
              >
                Register here
              </Link>
            </p>
            {errors.root && (
              <p className="mb-2 font-medium text-red-500">
                {errors?.root?.message}
              </p>
            )}
          </div>
        </CardHeader>
        <CardBody>
          <form
            className="flex w-90 flex-col gap-5"
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  variant="flat"
                  label="Email / Username"
                  autoComplete="off"
                  isInvalid={!!errors.identifier}
                  errorMessage={errors.identifier?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={isVisible ? "text" : "password"}
                  variant="flat"
                  label="Password"
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline:none"
                      type="button"
                      onClick={toogleVisibility}
                    >
                      {isVisible ? (
                        <FaEye className="text-default-400 text-xl" />
                      ) : (
                        <FaEyeSlash className="text-default-400 text-xl" />
                      )}
                    </button>
                  }
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button
              type="submit"
              className="text-large bg-[#006DE6] font-medium text-white"
            >
              {isPending ? <Spinner color="white" size="sm" /> : "Login"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
