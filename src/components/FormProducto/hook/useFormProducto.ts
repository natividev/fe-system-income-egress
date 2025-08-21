// components/FormProducto/hook/useFormProducto.ts
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormInputsProducto, ResultApiProducto } from "@/interface/inventory";

export const useFormProducto = (
  onSubmit: (data: FormInputsProducto) => Promise<ResultApiProducto>,
  initialValues?: Partial<FormInputsProducto>               // <-- NUEVO
) => {
  const { control, handleSubmit, reset, setValue, watch } =
    useForm<FormInputsProducto>({
      defaultValues: {
        nombre: "",
        descripcion: "",
        codigo_barra: "",
        // importantes para inputs controlados:
        precio_unitario: undefined as unknown as number,
        stock_actual: 0,
        activo: true,
        id_categoria: null,       // {label, value} o null
        id_unidad_medida: null,   // {label, value} o null
      },
    });

  // 🚀 Al llegar el producto, seteamos el formulario
  useEffect(() => {
    if (!initialValues) return;
    reset({
      ...initialValues,
      // asegúrate que number no sea undefined
      precio_unitario:
        initialValues.precio_unitario !== undefined
          ? Number(initialValues.precio_unitario)
          : (undefined as unknown as number),
      stock_actual:
        initialValues.stock_actual !== undefined ? Number(initialValues.stock_actual) : 0,
    });
  }, [initialValues, reset]);

  const onSubmitWithReset = async (data: FormInputsProducto) => {
    const result = await onSubmit(data);
    if (result) reset(initialValues ?? undefined);
  };

  return { control, handleSubmit, setValue, watch, onSubmitWithReset };
};
