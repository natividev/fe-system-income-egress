"use client";
import { TablePagination } from "@/components/ui/tablePagination/TablePagination";
import { resetStateEgrego, setStateEgreso } from "@/features/egreso/egreso";
import { columnType } from "@/interface/interfaces";
import { FormAnulaciones } from "@/view/FormAnulaciones";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Item, ItemParams, Menu, useContextMenu } from "react-contexify";
import { useDispatch } from "react-redux";

export default function EgresoPage() {
  const [idAnulacion, setAnulacion] = useState(null);
  const [reload, setReload] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const router = useRouter();
  const columns = useMemo<ColumnDef<columnType>[]>(
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
    router.push("/crear-egreso");
  };

  const handleIntemAnular = ({ props }: ItemParams) => {
    const { id } = props?.original;
    setAnulacion(id);
    onOpen();
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
          EGRESOS
        </Text>
        <Button
          colorScheme="blue"
          type="button"
          onClick={() => {
            dispatch(resetStateEgrego({}));
            router.push("/crear-egreso");
          }}
        >
          AGREGAR EGRESO
        </Button>
      </Flex>

      <TablePagination rowEvent={show} columns={columns} endpoint={"egreso"} />

      <Menu id={MENU_ID}>
        <Item onClick={handleItemActualizar}>ACTUALIZAR</Item>
        <Item onClick={handleIntemAnular}>ANULAR EGREGO</Item>
      </Menu>

      <FormAnulaciones
        id={idAnulacion}
        onClose={onClose}
        isOpen={isOpen}
        endpoint="/anulacion/egreso"
        reload={reload}
        setReload={setReload}
      />
    </Box>
  );
}
