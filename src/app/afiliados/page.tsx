"use client";
import axiosInstance from "@/api/axiosInstance";
import { FormInputsAfiliados } from "@/interface/interfaces";
import FormAfiliados from "@/view/FormAfiliados";
import { useState } from "react";

export default function AfiliadosPage() {
  const [isLoadig, setIsLoading] = useState<boolean>(false);

  const buildPayload = (data: FormInputsAfiliados) => {
    const payload = {
      nombre: data.nombre,
      tipoDocumento: data.tipoDocumento?.value,
      numeroDocumento: data.numDocumento,
      fecha: data.fecha,
      idAfiliado: data.tipoAfiliado?.value,
      correo: data.correo,
      telefono: data.telefono,
      observaciones: data.observaciones,
    };

    return payload;
  };

  const onSubmit = async (data: FormInputsAfiliados) => {
    setIsLoading(true);
    const payload = buildPayload(data);

    const { data: result } = await axiosInstance.post("/afiliados", payload);
    setIsLoading(false);
    return result;
  };

  return (
    <FormAfiliados
      onSubmit={onSubmit}
      isLoadig={isLoadig}
      title={"Crear Afiliado"}
    />
  );
}
