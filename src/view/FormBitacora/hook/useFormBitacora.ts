"use client";
import { resetState } from "@/features/bitacora/bitacora";
import { FormInputsBitacora, resultApi } from "@/interface/interfaces";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export const useFormBitacora = (
  onSubmit: (data: FormInputsBitacora) => Promise<resultApi>,
  defaultState: RootState
) => {
  const { stateBitacora } = defaultState;
  const dispatch = useDispatch();
  const router = useRouter();

  const { control, handleSubmit, reset, setValue, watch } =
    useForm<FormInputsBitacora>({
      defaultValues: {
        fecha: stateBitacora?.fecha?.split("T")[0] || "",
        nombrePersona: stateBitacora?.nombre_persona || "",
        proyectoId: null,
        tipoAporteId: null,
        cantidad: stateBitacora?.cantidad || "",
        observaciones: stateBitacora?.observaciones || "",
      },
    });

  const onSubmitWithReset = async (data: FormInputsBitacora) => {
    const result = await onSubmit(data);
    if (result)
      reset({
        fecha: "",
        nombrePersona: "",
        proyectoId: null,
        tipoAporteId: null,
        cantidad: "",
        observaciones: "",
      });
  };

  const handleCancela = () => {
    dispatch(resetState({}));
    router.push("/system/bitacora");
  };

  return {
    control,
    handleSubmit,
    setValue,
    watch,
    stateBitacora,
    onSubmitWithReset,
    handleCancela,
  };
};
