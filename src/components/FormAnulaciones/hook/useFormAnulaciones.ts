import axiosInstance from "@/api/axiosInstance";
import { FormInputsAnulaciones } from "@/interface/interfaces";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useFormAnulaciones = (
  id: number | null,
  endpoint: string,
  reload: number,
  setReload: (data: number) => void,
  onClose: () => void
) => {
  const [isLoadig, setIsLoading] = useState(false);

  const { control, handleSubmit, reset, watch } =
    useForm<FormInputsAnulaciones>({
      defaultValues: {
        monto: 0,
        motivo: null,
      },
    });

  const buildPayload = (data: FormInputsAnulaciones) => {
    const payload = {
      id,
      monto: Number(data.monto),
      motivo: data.motivo,
    };

    return payload;
  };

  const onSubmit = async (data: FormInputsAnulaciones) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const payload = buildPayload(data);
      await axiosInstance.post(endpoint, payload);
    } catch (error) {
      console.log(error);
    } finally {
      reset({
        monto: 0,
        motivo: "",
      });
      setReload(reload + 1);
      setIsLoading(false);
      onClose();
    }
  };

  return {
    isLoadig,
    control,
    handleSubmit,
    watch,
    onSubmit,
  };
};
