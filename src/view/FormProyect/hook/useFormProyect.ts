"use client";
import { resetState } from "@/features/protects/proyects";
import { FormInputsProyecto, resultApi } from "@/interface/interfaces";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export const useFormProyect = (
  onSubmit: (data: FormInputsProyecto) => Promise<resultApi>,
  defaultState: RootState
) => {
  const { stateProyects } = defaultState;
  const router = useRouter();
  const dispatch = useDispatch();

  const { control, handleSubmit, reset, setValue, watch } =
    useForm<FormInputsProyecto>({
      defaultValues: {
        nombre: stateProyects?.nombre || "",
        fecha: stateProyects?.fecha?.split("T")[0] || "",
        ubicacion: stateProyects?.ubicacion || "",
        cantidad: stateProyects?.cantidad || 0,
        categoriaProyectoId: null,
        observacion: stateProyects?.observacion || "",
        tipoParticipante: [],
      },
    });

  const handleCancela = () => {
    dispatch(resetState({}));
    router.push("/system/proyectos");
  };

  const onSubmitWithReset = async (data: FormInputsProyecto) => {
    const result = await onSubmit(data);
    if (result) {
      reset({
        nombre: "",
        fecha: "",
        ubicacion: {},
        cantidad: 0,
        categoriaProyectoId: null,
        observacion: "",
        tipoParticipante: [],
      });
    }
  };

  return {
    control,
    handleSubmit,
    setValue,
    watch,
    stateProyects,
    onSubmitWithReset,
    handleCancela,
  };
};
