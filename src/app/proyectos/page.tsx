"use client";
import axiosInstance from "@/api/axiosInstance";
import { FormInputsProyecto, ItemSelect } from "@/interface/interfaces";
import { FormProyect } from "@/view/FormProyect";
import { useState } from "react";

export default function ProyectosPage() {
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
    const payload = buildPayload(data);

    const { data: result } = await axiosInstance.post("/proyecto", payload);
    setIsLoading(false);
    return result;
  };

  return <FormProyect onSubmit={onSubmit} isLoadig={isLoadig} />;
}
