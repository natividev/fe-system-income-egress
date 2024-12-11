"use client";
import axiosInstance from "@/api/axiosInstance";
import { FormInputsBitacora } from "@/interface/interfaces";
import { FormBitacora } from "@/view/FormBitacora";
import { useState } from "react";

export default function BitacoraPage() {
  const [isLoadig, setIsLoading] = useState<boolean>(false);

  const buildPayload = (data: FormInputsBitacora) => {
    const payload = {
      fecha: data.fecha,
      nombrePersona: data.nombrePersona,
      proyectoId: data.proyectoId?.value,
      tipoAporteId: data.tipoAporteId?.value,
      cantidad: data.cantidad,
      observaciones: data.observaciones,
    };

    return payload;
  };

  const onSubmit = async (data: FormInputsBitacora) => {
    setIsLoading(true);
    const payload = buildPayload(data);

    const { data: result } = await axiosInstance.post(
      "/bitacora-aportacion",
      payload
    );
    setIsLoading(false);
    return result;
  };

  return <FormBitacora isLoadig={isLoadig} onSubmit={onSubmit} />;
}
