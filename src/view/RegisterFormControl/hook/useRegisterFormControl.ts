"use client";
import { resetStateEgrego } from "@/features/egreso/egreso";
import { FormInputs, resultApi } from "@/interface/interfaces";
import { RootState } from "@/store/store";
import { obtenerFechaFormateada } from "@/utils/Date/Date";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export const useRegisterFormControl = (
  isIngreso: boolean,
  defaultState: RootState,
  onSubmit: (data: FormInputs) => Promise<resultApi>
) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { control, handleSubmit, reset, watch, setValue } = useForm<FormInputs>(
    {
      defaultValues: {
        tipoAfiliado: null,
        afiliado: null,
        tipoDocumento: null,
        actividadEconomica: defaultState?.stateEgreso?.nombre_actividad || "",
        fechaActividad:
          defaultState?.stateEgreso?.fecha_actividad?.split("T")[0] ||
          obtenerFechaFormateada(),
        transaccion: defaultState?.stateEgreso?.no_transaccion || "",
        tipoIngreso: null,
        tipoControl: null,
        tipoAportacion: null,
        cantidad: defaultState?.stateEgreso?.cantidad || "",
        observaciones: defaultState?.stateEgreso?.observaciones || "",
      },
    }
  );

  const [afilidoId, setAfiliadoId] = useState(2);
  const onSubmitWithReset = async (data: FormInputs) => {
    const result = await onSubmit(data);
    if (result)
      reset({
        tipoAfiliado: null,
        afiliado: null,
        tipoDocumento: null,
        actividadEconomica: "",
        telefono: "",
        fechaActividad: "",
        transaccion: "",
        tipoIngreso: null,
        tipoControl: null,
        tipoAportacion: null,
        cantidad: "",
        observaciones: "",
      });
  };

  const handleCancela = () => {
    dispatch(resetStateEgrego({}));
    const ruta = isIngreso ? "/system/ingreso" : "/system/egreso";
    router.push(ruta);
  };

  useEffect(() => {
    const afil = watch("tipoAfiliado");
    setAfiliadoId(afil?.value ?? 1);
  }, [watch("tipoAfiliado")]); //eslint-disable-line

  return {
    afilidoId,
    control,
    handleSubmit,
    watch,
    setValue,
    handleCancela,
    onSubmitWithReset,
  };
};
