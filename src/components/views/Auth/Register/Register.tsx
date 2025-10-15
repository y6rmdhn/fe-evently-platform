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
import useRegister from "./useRegister";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";

const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    errors,
    handleRegister,
    handleSubmit,
    isPending,
  } = useRegister();

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
          src="/images/illustrations/register.svg"
          alt="login"
          width={430}
          height={430}
        />
      </div>

      <Card className="p-5">
        <CardHeader>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#006DE6]">
              Create an account
            </h2>
            <p>
              Have an account?{" "}
              <Link
                href="/auth/login"
                className="mb-10 font-semibold text-[#006DE6]"
              >
                Login here
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
            onSubmit={handleSubmit(handleRegister)}
          >
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  variant="flat"
                  label="Fullname"
                  autoComplete="off"
                  isInvalid={!!errors.fullname}
                  errorMessage={errors.fullname?.message}
                />
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  variant="flat"
                  label="Username"
                  autoComplete="off"
                  isInvalid={!!errors.username}
                  errorMessage={errors.username?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  variant="flat"
                  label="Email"
                  autoComplete="off"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.password ? "text" : "password"}
                  variant="flat"
                  label="Password"
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline:none"
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {visiblePassword.password ? (
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

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={
                    visiblePassword.passwordConfirmation ? "text" : "password"
                  }
                  variant="flat"
                  label="Password Confirmation"
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline:none"
                      type="button"
                      onClick={() =>
                        handleVisiblePassword("passwordConfirmation")
                      }
                    >
                      {visiblePassword.passwordConfirmation ? (
                        <FaEye className="text-default-400 text-xl" />
                      ) : (
                        <FaEyeSlash className="text-default-400 text-xl" />
                      )}
                    </button>
                  }
                  isInvalid={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />

            <Button
              type="submit"
              className="text-large bg-[#006DE6] font-medium text-white"
            >
              {isPending ? <Spinner color="white" size="sm" /> : "Register"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
