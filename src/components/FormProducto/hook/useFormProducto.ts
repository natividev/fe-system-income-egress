import { FormInputsProducto, ResultApiProducto } from "@/interface/inventory";
import { useForm } from "react-hook-form";

export const useFormProducto = (
  onSubmit: (data: FormInputsProducto) => Promise<ResultApiProducto>
) => {
  const { control, handleSubmit, reset, setValue, watch } =
    useForm<FormInputsProducto>({
      defaultValues: {
        nombre: "",
        descripcion: "",
        codigo_barra: "",
        precio_unitario: undefined as unknown as number,
        stock_actual: 0,
        activo: true,
        id_categoria: null,
        id_unidad_medida: null,
      },
    });

  const onSubmitWithReset = async (data: FormInputsProducto) => {
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
