"use client";
import axiosInstance from "@/api/axiosInstance";
import FormMovimiento from "@/components/FormMovimiento/FormMovimiento";
import { FormInputsMovimiento, ResultApiMovimiento } from "@/interface/inventory";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";   // 👈
import { useToast } from "@chakra-ui/react";                     // 👈
import useSWR from "swr";

const fetcher = (url: string) => axiosInstance.get(url).then(r => r.data);

export const InventarioMovimientosView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<Partial<FormInputsMovimiento>>({});
  const searchParams = useSearchParams();
  const productoQS = searchParams.get("producto");
  const router = useRouter();             // 👈
  const toast = useToast();               // 👈

  const { data: lista } = useSWR("/inventory/productos-lista", fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (!lista || !productoQS) return;
    const id = Number(productoQS);
    if (!id || Number.isNaN(id)) return;

    const arr: any[] = Array.isArray(lista) ? lista : [];
    const p = arr.find((x) => Number(x.id) === id);
    if (p) {
      setInitialValues({
        id: { label: p.nombre, value: String(p.id) },
      });
    }
  }, [lista, productoQS]);

  const buildPayload = (data: FormInputsMovimiento) => ({
    tipo: data.tipo?.value,
    cantidad: Number(data.cantidad),
    referencia: data.referencia || null,
    observacion: data.observacion || null,
    id: Number(data.id?.value),
    id_usuario: Number(data.id_usuario),
  });

  const onSubmit = async (data: FormInputsMovimiento): Promise<ResultApiMovimiento> => {
    setIsLoading(true);
    try {
      const payload = buildPayload(data);
      const { data: result } = await axiosInstance.post("/inventory/movimientos", payload);

      toast({ title: "Movimiento registrado", status: "success" });
      router.push(`/system/inventario/movimientos/listado?producto=${payload.id}`);

      return result;
    } catch (e: any) {
      toast({
        title: "No se pudo registrar el movimiento",
        description: e?.response?.data?.message ?? "Inténtalo de nuevo",
        status: "error",
      });
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormMovimiento
      onSubmit={onSubmit}
      isLoading={isLoading}
      title="Registrar Movimiento"
      initialValues={initialValues}
    />
  );
};
