import { ILogin } from "@/types/auth";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please input your email or username"),
  password: yup.string().required("Please input your password"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const toogleVisibility = () => setIsVisible(!isVisible);

  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (result?.error && result?.status === 401) {
      throw new Error("Email or username not match with your password");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: loginService,
    onError(error) {
      addToast({
        title: error.message,
        color: "danger",
        variant: "bordered",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
    onSuccess: () => {
      reset();
      addToast({
        title: "Login Successful",
        color: "success",
        variant: "bordered",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      router.push(callbackUrl);
    },
  });

  const handleLogin = (values: ILogin) => {
    mutate(values);
  };

  return {
    isVisible,
    toogleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPending,
    errors,
  };
};

export default useLogin;
