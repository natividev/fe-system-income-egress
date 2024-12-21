import { FormInputsAfiliados, resultApi } from "@/interface/interfaces";
import { useForm } from "react-hook-form";

export const useFormAfiliados = (
  onSubmit: (data: FormInputsAfiliados) => Promise<resultApi>
) => {
  const { control, handleSubmit, reset, setValue, watch } =
    useForm<FormInputsAfiliados>({
      defaultValues: {
        nombre: "",
        tipoDocumento: null,
        numDocumento: "",
        fecha: "",
        tipoAfiliado: null,
        correo: "",
        telefono: "",
        observaciones: "",
      },
    });

  const onSubmitWithReset = async (data: FormInputsAfiliados) => {
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
