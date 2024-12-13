"use client";
import { TablePagination } from "@/components/ui/tablePagination/TablePagination";
import { resetStateEgrego, setStateEgreso } from "@/features/egreso/egreso";
import {
  ColApiAporte,
  ColApiEgreso,
  ColApiProyecto,
} from "@/interface/interfaces";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Item, ItemParams, Menu, useContextMenu } from "react-contexify";
import { useDispatch } from "react-redux";

export default function IngresoPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const columns = useMemo<
    ColumnDef<ColApiProyecto | ColApiAporte | ColApiEgreso>[]
  >(
    () => [
      {
        header: "Nombre de Actividad",
        accessorKey: "nombre_actividad",
        cell: (info) => info.getValue() as string,
      },
      {
        header: "Fecha de Actividad",
        accessorKey: "fecha_actividad",
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        header: "Cantidad",
        accessorKey: "cantidad",
        cell: (info) => `${info.getValue() as number}`,
      },
      {
        header: "ID de Registro Afiliado",
        accessorKey: "id_registro_afiliado",
        cell: (info) => info.getValue() as number,
      },
      {
        header: "No. de Transacción",
        accessorKey: "no_transaccion",
        cell: (info) => info.getValue() as string,
      },
      {
        header: "Observaciones",
        accessorKey: "observaciones",
        cell: (info) => (info.getValue() as string) || "Sin observación",
      },
      {
        header: "Tipo de Aportación",
        accessorKey: "fk_tipo_aportacion",
        cell: (info) => info.getValue() as number,
      },
      {
        header: "Tipo de Control",
        accessorKey: "fk_tipo_control",
        cell: (info) => info.getValue() as number,
      },
    ],
    []
  );

  const MENU_ID = "factura_context_menu";
  const { show } = useContextMenu({ id: MENU_ID });

  const handleItemActualizar = ({ props }: ItemParams) => {
    dispatch(setStateEgreso(props?.original));
    router.push("/crear-ingreso");
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
          INGRESO
        </Text>
        <Button
          colorScheme="blue"
          type="button"
          onClick={() => {
            dispatch(resetStateEgrego({}));
            router.push("/crear-ingreso");
          }}
        >
          AGREGAR EGRESO
        </Button>
      </Flex>
      <TablePagination rowEvent={show} columns={columns} endpoint={"ingreso"} />
      <Menu id={MENU_ID}>
        <Item onClick={handleItemActualizar}>ACTUALIZAR</Item>
        <Item>ELIMINAR</Item>
      </Menu>
    </Box>
  );
}
