"use client";
import axiosInstance from "@/api/axiosInstance";
import FormProducto from "@/components/FormProducto/FormProducto";
import { FormInputsProducto, ResultApiProducto } from "@/interface/inventory";
import { useState } from "react";

export const InventarioProductosView = () => {
  const [isLoading, setIsLoading] = useState(false);

  const buildPayload = (data: FormInputsProducto) => {
    return {
      nombre: data.nombre,
      descripcion: data.descripcion || null,
      codigo_barra: data.codigo_barra || null,
      precio_unitario: Number(data.precio_unitario),
      stock_actual: Number(data.stock_actual ?? 0),
      activo: data.activo ?? true,
      id_categoria: data.id_categoria?.value != null ? Number(data.id_categoria.value) : undefined,
      id_unidad_medida: data.id_unidad_medida?.value != null ? Number(data.id_unidad_medida.value) : undefined,
    };
  };

  const onSubmit = async (data: FormInputsProducto): Promise<ResultApiProducto> => {
    setIsLoading(true);
    try {
      const payload = buildPayload(data);
      const { data: result } = await axiosInstance.post("/inventory/productos", payload);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProducto
      onSubmit={onSubmit}
      isLoadig={isLoading}
      title="Crear Producto"
    />
  );
};
