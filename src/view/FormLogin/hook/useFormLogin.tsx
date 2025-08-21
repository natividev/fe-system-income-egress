"use client";
import { FormInputLogin } from "@/interface/interfaces";
import { showAlertError } from "@/utils/Alerts/Alerts";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useFormLogin = () => {
  const router = useRouter();
  const [isLoadig, setIsLoadin] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,         
    formState: { isSubmitting },
  } = useForm<FormInputLogin>({
    defaultValues: {
      usuario: "",
      password: "",
      remember: true, 
    },
  });

  const onSubmit = async (data: FormInputLogin) => {
    setIsLoadin(true);
    const res = await signIn("credentials", {
      usuario: data.usuario,
      password: data.password,
      redirect: false,
    });
    setIsLoadin(false);
    if (!res?.ok) {
      showAlertError("Error en la autenticación");
      return;
    }

    router.push("/system/dashboard");
  };

  return {
    control,
    handleSubmit,
    watch,
    setValue,
    onSubmit,
    isLoadig: isSubmitting,
  };
};
