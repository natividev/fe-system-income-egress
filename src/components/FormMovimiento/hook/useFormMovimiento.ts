import { FormInputsMovimiento, ResultApiMovimiento } from "@/interface/inventory";
import { useForm } from "react-hook-form";

export const useFormMovimiento = (
  onSubmit: (data: FormInputsMovimiento) => Promise<ResultApiMovimiento>
) => {
  const { control, handleSubmit, reset, setValue, watch } =
    useForm<FormInputsMovimiento>({
      defaultValues: {
        tipo: null,           // { label, value }
        cantidad: undefined as unknown as number,
        referencia: "",
        observacion: "",
        id: null,    // { label, value }
        id_usuario: undefined as unknown as number,
      },
    });

  const onSubmitWithReset = async (data: FormInputsMovimiento) => {
    const result = await onSubmit(data);
    if (result) reset();
  };

  return {
    control,
    handleSubmit,
    setValue,
    watch,
    onSubmitWithReset,
  };
};
