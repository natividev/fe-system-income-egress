"use client";

import { FormInputs } from "@/interface/interfaces";
import axiosInstance from "@/api/axiosInstance";
import RegisterFormControl from "@/view/RegisterFormControl";
import { useState } from "react";

export default function IngresoPage() {
  const [isLoadig, setIsLoading] = useState<boolean>(false);

  const buildPayload = (data: FormInputs) => {
    const payload = {
      nombreActividad: data.actividadEconomica,
      fechaActividad: data.fechaActividad,
      cantidad: data.cantidad,
      idAfiliado: data.afiliado?.value,
      noTransaccion: data.transaccion,
      observaciones: data.observaciones,
      fkTipoIngreso: data.tipoIngreso?.value,
      fkTipoControl: data.tipoControl?.value,
      fkTipoAportacion: data.tipoAportacion?.value,
    };

    return payload;
  };

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const payload = buildPayload(data);

    const { data: result } = await axiosInstance.post("/ingreso", payload);
    setIsLoading(false);
    return result;
  };

  return (
    <RegisterFormControl
      onSubmit={onSubmit}
      isLoadig={isLoadig}
      title="Crear Ingreso"
      isIngreso={true}
    />
  );
}
