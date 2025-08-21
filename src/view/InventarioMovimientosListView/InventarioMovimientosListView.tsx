"use client";
import useSWR from "swr";
import axiosInstance from "@/api/axiosInstance";
import {
  Box, Button, Flex, HStack, Select, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text, Alert, AlertIcon
} from "@chakra-ui/react";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const fetcher = (url: string) => axiosInstance.get(url).then(r => r.data);

export const InventarioMovimientosListView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productoFromQuery = searchParams.get("producto");
  const [idProducto, setIdProducto] = useState<number | "">(productoFromQuery ? Number(productoFromQuery) : "");
  const [tipo, setTipo] = useState<string>(""); // entrada | salida | ajuste
  const [offset, setOffset] = useState(0);
  const limit = 10;

  // Traer productos (puede devolver { total, items } o un array)
  const { data: productosResp, isLoading: loadingProductos, error: errorProductos } =
    useSWR(`/inventory/productos?limit=100`, fetcher, { revalidateOnFocus: false });

  // 👇 Normalizamos a un array y garantizamos que cada item tenga { id, nombre }
  const productos: Array<{ id: number; nombre: string }> = useMemo(() => {
    const arr = Array.isArray(productosResp) ? productosResp : (productosResp?.items ?? []);
    return (arr as any[]).map((p) => ({
      id: Number(p.id_producto ?? p.id),     // ← usa id_producto si existe, si no usa id
      nombre: p.nombre,
    }));
  }, [productosResp]);

  // Si no hay ?producto en la URL, autoselecciona el primero disponible
  useEffect(() => {
    if (!productoFromQuery && productos.length > 0 && idProducto === "") {
      const firstId = productos[0].id;
      setIdProducto(firstId);
      router.replace(`/system/inventario/movimientos/listado?producto=${firstId}`);
    }
  }, [productoFromQuery, productos, idProducto, router]);

  // Construye la URL al endpoint correcto
  const query = useMemo(() => {
    if (!idProducto) return null;
    const params = new URLSearchParams();
    params.set("offset", String(offset));
    params.set("limit", String(limit));
    // ⬇️ usa el id normalizado
    return `/inventory/productos/${idProducto}/movimientos?${params.toString()}`;
  }, [idProducto, offset]);

  const { data, isLoading, error } = useSWR(query, fetcher, { revalidateOnFocus: false });

  const total: number = data?.total ?? 0;
  const items: any[] = (data?.items ?? []).filter((m: any) => (tipo ? m.tipo === tipo : true));

  return (
    <Box p={5} bg="white" minH="83vh" borderRadius="lg">
      <Text fontSize="3xl" as="b" mb={4}>Movimientos</Text>

      {errorProductos && (
        <Alert status="error" mb={3}><AlertIcon />No se pudieron cargar los productos.</Alert>
      )}

      <HStack mb={4} spacing={3}>
        <Select
          placeholder={loadingProductos ? "Cargando..." : "Producto"}
          value={idProducto === "" ? "" : String(idProducto)}
          onChange={(e) => {
            const v = e.target.value ? Number(e.target.value) : "";
            setIdProducto(v);
            setOffset(0);
            if (v) router.replace(`/system/inventario/movimientos/listado?producto=${v}`);
            else router.replace(`/system/inventario/movimientos/listado`);
          }}
          width="260px"
          isDisabled={loadingProductos || productos.length === 0}
        >
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </Select>

        {/* <Select
          placeholder="Tipo"
          value={tipo}
          onChange={(e) => { setTipo(e.target.value); setOffset(0); }}
          width="180px"
        >
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
          <option value="ajuste">Ajuste</option>
        </Select> */}
      </HStack>

      {!idProducto ? (
        <Text color="gray.500">Seleccione un producto para ver sus movimientos.</Text>
      ) : error ? (
        <Alert status="error"><AlertIcon />No se pudieron cargar los movimientos.</Alert>
      ) : isLoading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <Text color="gray.500">Sin movimientos registrados.</Text>
      ) : (
        <>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Tipo</Th>
                <Th>Cantidad</Th>
                <Th>Referencia</Th>
                <Th>Fecha</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((m: any) => (
                <Tr key={m.id}>
                  <Td>{m.id}</Td>
                  <Td textTransform="capitalize">{m.tipo}</Td>
                  <Td>{m.cantidad}</Td>
                  <Td>{m.referencia ?? "-"}</Td>
                  <Td>{new Date(m.fecha).toLocaleString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Flex justify="space-between" mt={4}>
            <Text>Total: {total}</Text>
            <HStack>
              <Button
                size="sm"
                onClick={() => setOffset(Math.max(0, offset - limit))}
                isDisabled={offset === 0}
              >
                Anterior
              </Button>
              <Button
                size="sm"
                onClick={() => setOffset(offset + limit)}
                isDisabled={offset + limit >= total}
              >
                Siguiente
              </Button>
            </HStack>
          </Flex>
        </>
      )}
    </Box>
  );
};
