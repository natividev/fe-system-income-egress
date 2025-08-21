"use client";
import useSWR from "swr";
import axiosInstance from "@/api/axiosInstance";
import {
  Box, Button, Flex, HStack, Select, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text, Alert, AlertIcon
} from "@chakra-ui/react";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const fetcher = (url: string) => axiosInstance.get(url).then(r => r.data);

// Componente de fecha seguro para hidratación
function ClientDate({ value }: { value: string }) {
  const [formatted, setFormatted] = useState<string>("");
  useEffect(() => {
    setFormatted(new Date(value).toLocaleString());
  }, [value]);
  // Evita mismatch entre SSR y cliente
  return <span suppressHydrationWarning>{formatted}</span>;
}

export const InventarioMovimientosListView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Montaje: útil para decisiones que cambian la URL o la UI
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // NO leemos el query param en el render inicial.
  const [productoFromQuery, setProductoFromQuery] = useState<string | null>(null);
  useEffect(() => {
    // Se actualiza cuando cambian los params del URL
    setProductoFromQuery(searchParams.get("producto"));
  }, [searchParams]);

  // Estados de filtro/paginación
  const [idProducto, setIdProducto] = useState<number | "">("");
  const [tipo, setTipo] = useState<string>(""); // entrada | salida | ajuste
  const [offset, setOffset] = useState(0);
  const limit = 10;

  // Traer productos
  const { data: productosResp, isLoading: loadingProductos, error: errorProductos } =
    useSWR(`/inventory/productos?limit=100`, fetcher, { revalidateOnFocus: false });

  // Normalizar a { id, nombre }
  const productos: Array<{ id: number; nombre: string }> = useMemo(() => {
    const arr = Array.isArray(productosResp) ? productosResp : (productosResp?.items ?? []);
    return (arr as any[]).map((p) => ({
      id: Number(p.id_producto ?? p.id),
      nombre: p.nombre,
    }));
  }, [productosResp]);

  // Sincronizar estado con el query param SOLO después de montar
  useEffect(() => {
    if (!mounted) return;

    // 1) Si viene ?producto, úsalo
    if (productoFromQuery) {
      const num = Number(productoFromQuery);
      if (!Number.isNaN(num) && num > 0 && num !== idProducto) {
        setIdProducto(num);
        setOffset(0);
      }
      return;
    }

    // 2) Si NO viene ?producto y hay productos, autoselecciona el primero y corrige URL
    if (!productoFromQuery && productos.length > 0 && idProducto === "") {
      const firstId = productos[0].id;
      setIdProducto(firstId);
      setOffset(0);
      // Cambiar URL SOLO tras montar evita desincronías de SSR
      router.replace(`/system/inventario/movimientos/listado?producto=${firstId}`);
    }
  }, [mounted, productoFromQuery, productos, idProducto, router]);

  // URL del endpoint (no dispares fetch si no hay producto)
  const query = useMemo(() => {
    if (!idProducto) return null;
    const params = new URLSearchParams();
    params.set("offset", String(offset));
    params.set("limit", String(limit));
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
            setIdProducto(v as any);
            setOffset(0);
            if (mounted) {
              if (v) router.replace(`/system/inventario/movimientos/listado?producto=${v}`);
              else router.replace(`/system/inventario/movimientos/listado`);
            }
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

        {/* Si activas filtro por tipo, no afecta hidratación */}
        {/* 
        <Select
          placeholder="Tipo"
          value={tipo}
          onChange={(e) => { setTipo(e.target.value); setOffset(0); }}
          width="180px"
        >
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
          <option value="ajuste">Ajuste</option>
        </Select>
        */}
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
                  <Td style={{ textTransform: "capitalize" }}>{m.tipo}</Td>
                  <Td>{m.cantidad}</Td>
                  <Td>{m.referencia ?? "-"}</Td>
                  {/* Formateo solo en cliente para evitar mismatch */}
                  <Td><ClientDate value={m.fecha} /></Td>
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
