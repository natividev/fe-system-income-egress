import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormInputsMovimiento, ResultApiMovimiento } from "@/interface/inventory";

export const useFormMovimiento = (
  onSubmit: (data: FormInputsMovimiento) => Promise<ResultApiMovimiento>,
  initialValues?: Partial<FormInputsMovimiento>,
) => {
  const { control, handleSubmit, reset, setValue, watch } =
    useForm<FormInputsMovimiento>({
      defaultValues: {
        tipo: null,
        cantidad: undefined as any,
        referencia: "",
        observacion: "",
        id: null,  // {label,value}
        id_usuario: undefined as any,
      },
    });

  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

  const onSubmitWithReset = async (data: FormInputsMovimiento) => {
    const result = await onSubmit(data);
    if (result) reset(initialValues ?? undefined);
  };

  return { control, handleSubmit, setValue, watch, onSubmitWithReset };
};
