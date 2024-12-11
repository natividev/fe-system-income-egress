"use client";
import { TablePagination } from "@/components/ui/tablePagination/TablePagination";
import { ColApiProyecto } from "@/interface/interfaces";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function ProyectosPage() {
  const router = useRouter();
  const columns = useMemo<ColumnDef<ColApiProyecto>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell: (info) => info.getValue() as number,
      },
      {
        header: "Nombre del Proyecto",
        accessorKey: "nombre",
        cell: (info) => info.getValue() as string,
      },
      {
        header: "Fecha",
        accessorKey: "fecha",
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        header: "Ubicación (Latitud)",
        accessorKey: "ubicacion.latitud",
        cell: (info) => (info.getValue() as number).toFixed(5),
      },
      {
        header: "Ubicación (Longitud)",
        accessorKey: "ubicacion.longitud",
        cell: (info) => (info.getValue() as number).toFixed(5),
      },
      {
        header: "Cantidad",
        accessorKey: "cantidad",
        cell: (info) => `${info.getValue() as number}`,
      },
      {
        header: "Observación",
        accessorKey: "observacion",
        cell: (info) => (info.getValue() as string) || "Sin observación",
      },
      {
        header: "Tipo de Participante",
        accessorKey: "tipo_participante",
        cell: (info) => (info.getValue() as string[]).join(", "),
      },
      {
        header: "ID de Categoría de Proyecto",
        accessorKey: "fk_categoria_proyecto_id",
        cell: (info) => info.getValue() as number,
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
          PROYECTOS
        </Text>
        <Button
          colorScheme="blue"
          type="button"
          onClick={() => router.push("/crear-proyectos")}
        >
          AGREGAR NUEVO
        </Button>
      </Flex>
      <TablePagination columns={columns} endpoint={"proyecto"} />
    </Box>
  );
}
