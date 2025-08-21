"use client";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import axiosInstance from "@/api/axiosInstance";
import { Box, Spinner, useToast } from "@chakra-ui/react";
import FormProducto from "@/components/FormProducto/FormProducto";
import { FormInputsProducto, ResultApiProducto } from "@/interface/inventory";

const fetcher = (url: string) => axiosInstance.get(url).then(r => r.data);

export const InventarioProductoEditView = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);
  const toast = useToast();
  const router = useRouter();

  const { data: producto, isLoading } = useSWR(
    id ? `/inventory/productos/${id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const onSubmit = async (form: FormInputsProducto): Promise<ResultApiProducto> => {
    // construye payload igual que en crear:
    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion || null,
      codigo_barra: form.codigo_barra || null,
      precio_unitario: Number(form.precio_unitario),
      stock_actual: Number(form.stock_actual ?? 0),
      activo: form.activo ?? true,
      id_categoria: form.id_categoria?.value != null ? Number(form.id_categoria.value) : undefined,
      id_unidad_medida: form.id_unidad_medida?.value != null ? Number(form.id_unidad_medida.value) : undefined,
    };

    const { data } = await axiosInstance.patch(`/inventory/productos/${id}`, payload);
    toast({ title: "Producto actualizado", status: "success" });
    router.push("/system/inventario/productos/listado");
    return data;
  };

  if (isLoading || !producto) return <Box p={5}><Spinner /></Box>;

  // mapear producto API -> defaultValues del form
  const initialValues: Partial<FormInputsProducto> = {
    nombre: producto.nombre,
    descripcion: producto.descripcion ?? "",
    codigo_barra: producto.codigo_barra ?? "",
    precio_unitario: Number(producto.precio_unitario),
    stock_actual: producto.stock_actual,
    activo: producto.activo,
    id_categoria: producto.categoria
      ? { label: producto.categoria.nombre, value: producto.id_categoria }
      : null,
    id_unidad_medida: producto.unidad_medida
      ? { label: producto.unidad_medida.nombre, value: producto.id_unidad_medida }
      : null,
  };

  // return (
  //   <FormProducto
  //     onSubmit={onSubmit}
  //     isLoadig={false}
  //     title={`Editar Producto #${id}`}
  //     // Si tu FormProducto soporta setear defaults por props, pásalos;
  //     // si no, agrega soporte en useFormProducto para recibir defaultValues externos.
  //   />
  // );
  return (
  <FormProducto
    onSubmit={onSubmit}
    isLoading={false}              // <-- corregido (antes isLoadig)
    title={`Editar Producto #${id}`}
    initialValues={initialValues}  // <-- NUEVO
  />
);
};
