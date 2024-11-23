"use client";
import axiosInstance from "@/api/axiosInstance";
import { FormInputs } from "@/interface/interfaces";
import RegisterFormControl from "@/view/RegisterFormControl";
import { useState } from "react";

export default function EgresoPage() {
  const [isLoadig, setIsLoading] = useState<boolean>(false);

  const buildPayload = (data: FormInputs) => {
    const payload = {
      nombreActividad: data.actividadEconomica,
      fechaActividad: data.fechaActividad,
      cantidad: data.cantidad,
      razon: data.razon,
      dui: data.numDocumento,
      noTransaccion: data.transaccion,
      observaciones: data.observaciones,
      fkTipoControl: data.tipoControl?.value,
      fkTipoAportacion: data.tipoAportacion?.value,
    };

    return payload;
  };

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const payload = buildPayload(data);

    const { data: result } = await axiosInstance.post("/egreso", payload);
    setIsLoading(false);
    return result;
  };

  return (
    <RegisterFormControl
      onSubmit={onSubmit}
      isLoadig={isLoadig}
      title="Crear Egreso"
      isIngreso={false}
    />
  );
}
