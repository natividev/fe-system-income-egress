"use client";
import axiosInstance from "@/api/axiosInstance";
import FormMovimiento from "@/components/FormMovimiento/FormMovimiento";
import { FormInputsMovimiento, ResultApiMovimiento } from "@/interface/inventory";
import { useState } from "react";

export const InventarioMovimientosView = () => {
  const [isLoading, setIsLoading] = useState(false);

  const buildPayload = (data: FormInputsMovimiento) => {
    return {
      tipo: data.tipo?.value, // entrada | salida | ajuste
      cantidad: Number(data.cantidad),
      referencia: data.referencia || null,
      observacion: data.observacion || null,
      id_producto: data.id_producto?.value,
      id_usuario: Number(data.id_usuario), // o toma del contexto auth
    };
  };

  const onSubmit = async (data: FormInputsMovimiento): Promise<ResultApiMovimiento> => {
    setIsLoading(true);
    try {
      const payload = buildPayload(data);
      const { data: result } = await axiosInstance.post("/inventory/movimientos", payload);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormMovimiento
      onSubmit={onSubmit}
      isLoading={isLoading}
      title="Registrar Movimiento"
    />
  );
};
