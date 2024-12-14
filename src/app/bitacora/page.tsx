"use client";
import { TablePagination } from "@/components/ui/tablePagination/TablePagination";
import { resetState, setState } from "@/features/bitacora/bitacora";
import {  columnType } from "@/interface/interfaces";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Item, ItemParams, Menu, useContextMenu } from "react-contexify";
import { useDispatch } from "react-redux";

export default function BitacoraPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const columns = useMemo<ColumnDef<columnType>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell: (info) => info.getValue() as number,
      },
      {
        header: "Fecha",
        accessorKey: "fecha",
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        header: "Nombre de la Persona",
        accessorKey: "nombre_persona",
        cell: (info) => info.getValue() as string,
      },
      {
        header: "ID de Proyecto",
        accessorKey: "fk_proyecto_id",
        cell: (info) => info.getValue() as number,
      },
      {
        header: "ID de Tipo de Aporte",
        accessorKey: "fk_tipo_aporte_id",
        cell: (info) => info.getValue() as number,
      },
      {
        header: "Cantidad",
        accessorKey: "cantidad",
        cell: (info) => info.getValue() as string, // Puede ser un número o texto con unidades
      },
      {
        header: "Observaciones",
        accessorKey: "observaciones",
        cell: (info) =>
          info.getValue() === null
            ? "No especificada"
            : (info.getValue() as string),
      },
      {
        header: "Activo",
        accessorKey: "active",
        cell: (info) => (info.getValue() ? "Sí" : "No"),
      },
      {
        header: "Fecha de Creación",
        accessorKey: "fecha_creacion",
        cell: (info) => new Date(info.getValue() as string).toLocaleString(),
      },
      {
        header: "Fecha de Actualización",
        accessorKey: "fecha_actualizacion",
        cell: (info) => new Date(info.getValue() as string).toLocaleString(),
      },
    ],
    []
  );

  const MENU_ID = "factura_context_menu";
  const { show } = useContextMenu({ id: MENU_ID });

  const handleItemActualizar = ({ props }: ItemParams) => {
    dispatch(setState(props?.original));
    router.push("/crear-bitacora");
  };

  return (
    <Box
      p={5}
      bg={"white"}
      minHeight={"83vh"}
      width={"100%"}
      borderRadius="lg"
      display={"block"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize="4xl" mb={10} as="b">
          BITACORA
        </Text>
        <Button
          colorScheme="blue"
          type="button"
          onClick={() => {
            dispatch(resetState({}));
            router.push("/crear-bitacora");
          }}
        >
          AGREGAR BITACORA
        </Button>
      </Flex>
      <TablePagination
        rowEvent={show}
        columns={columns}
        endpoint={"bitacora-aportacion"}
      />
      <Menu id={MENU_ID}>
        <Item onClick={handleItemActualizar}>ACTUALIZAR</Item>
        <Item>ELIMINAR</Item>
      </Menu>
    </Box>
  );
}
