"use client";
import axiosInstance from "@/api/axiosInstance";
import { resetState } from "@/features/protects/proyects";
import { FormInputsProyecto, ItemSelect } from "@/interface/interfaces";
import { RootState } from "@/store/store";
import { FormProyect } from "@/view/FormProyect";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CrearProyectosPage() {
  const defaultState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [isLoadig, setIsLoading] = useState<boolean>(false);

  const buildPayload = (data: FormInputsProyecto) => {
    const { tipoParticipante: tipoPar } = data;

    const tipoParticipante = (tipoPar as ItemSelect[]).map(
      (element) => element.label
    );

    const payload = {
      nombre: data.nombre,
      fecha: data.fecha,
      ubicacion: {
        latitud: 13.68935,
        longitud: -89.18718,
      },
      cantidad: data.cantidad,
      observacion: data.observacion,
      tipoParticipante,
      categoriaProyectoId: data.categoriaProyectoId?.value,
    };

    return payload;
  };

  const onSubmit = async (data: FormInputsProyecto) => {
    setIsLoading(true);
    try {
      const payload = buildPayload(data);

      if (defaultState?.state?.id) {
        const { id } = defaultState?.state;
        const endpoint = `/proyecto?id=${id}`;
        const { data: result } = await axiosInstance.patch(endpoint, payload);
        dispatch(resetState({}));
        return result;
      }
      const { data: result } = await axiosInstance.post("/proyecto", payload);
      return result;
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProyect
      defaultState={defaultState}
      onSubmit={onSubmit}
      isLoadig={isLoadig}
      title={
        defaultState?.state?.id ? "ACTUALIZAR PROYECTOS" : "CREAR PROYECTOS"
      }
    />
  );
}
