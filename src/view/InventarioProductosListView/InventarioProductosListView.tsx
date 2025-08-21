"use client";
import useSWR from "swr";
import axiosInstance from "@/api/axiosInstance";
import {
  Box, Button, Flex, HStack, Input, Select, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import Link from "next/link";

const fetcher = (url: string) => axiosInstance.get(url).then(r => r.data);

export const InventarioProductosListView = () => {
  const [q, setQ] = useState("");
  const [activo, setActivo] = useState<string>("todos"); // todos | true | false
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (activo !== "todos") params.set("activo", activo);
    params.set("offset", String(offset));
    params.set("limit", String(limit));
    return `/inventory/productos?${params.toString()}`;
  }, [q, activo, offset]);

  const { data, isLoading, mutate } = useSWR(query, fetcher, { revalidateOnFocus: false });
  const total: number = data?.total ?? 0;
  const items: any[] = data?.items ?? [];

  const desactivar = async (id_producto: number) => {
    await axiosInstance.patch(`/inventory/productos/${id_producto}/desactivar`);
    await mutate();
  };

  return (
    <Box p={5} bg="white" minH="83vh" borderRadius="lg">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="3xl" as="b">Productos</Text>
        <HStack>
          <Link href="/system/inventario/productos">
            <Button colorScheme="blue">Crear producto</Button>
          </Link>
        </HStack>
      </Flex>

      <HStack mb={4} spacing={3}>
        <Input
          placeholder="Buscar por nombre o código de barras"
          value={q}
          onChange={(e) => { setOffset(0); setQ(e.target.value); }}
        />
        <Select
          width="200px"
          value={activo}
          onChange={(e) => { setOffset(0); setActivo(e.target.value); }}
        >
          <option value="todos">Todos</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </Select>
      </HStack>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nombre</Th>
                <Th>Precio</Th>
                <Th>Stock</Th>
                <Th>Activo</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((p) => (
                <Tr key={p.id}>
                  <Td>{p.id}</Td>
                  <Td>{p.nombre}</Td>
                  <Td>${Number(p.precio_unitario).toFixed(2)}</Td>
                  <Td>{p.stock_actual}</Td>
                  <Td>{p.activo ? "Sí" : "No"}</Td>
                  <Td>
                    <HStack>
                      <Link href={`/system/inventario/productos/${p.id}/editar`}>
                        <Button size="xs" colorScheme="yellow">Editar</Button>
                      </Link>
                      {p.activo && (
                        <Button
                          size="xs"
                          colorScheme="red"
                          onClick={() => desactivar(p.id)}
                        >
                          Desactivar
                        </Button>
                      )}
                      <Link href={`/system/inventario/movimientos/listado?producto=${p.id}`}>
                        <Button size="xs" colorScheme="purple">Movimientos</Button>
                      </Link>
                    </HStack>
                  </Td>
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
