"use client";
import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavItem } from "../navItem/NavItem";
import { NavItems } from "@/interface/interfaces";
import { Dashboard } from "@/icons/dashboard";
import { Reportes } from "@/icons/reportes";
import { PerfilUser } from "../Menu/Menu";
import { General } from "@/icons/general";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<NavItems> = [
  { label: "Dashboard", url: "/system/dashboard", icon: Dashboard },
  { label: "Proyectos", url: "/system/proyectos", icon: General },
  { label: "Bitacora Proyectos", url: "/system/bitacora", icon: General },
  { label: "Afiliados", url: "/system/afiliados", icon: General },
  {
    label: "Inventario",
    icon: General, // puedes cambiar a un ícono específico si lo tienes
    children: [
         {
      label: "Productos",
      href: "/system/inventario/productos/listado", // -> muestra InventarioProductosListView
    },
      // Opcional: catálogos
      // { label: "Categorías", href: "/system/inventario/categorias" },
      // { label: "Unidades de medida", href: "/system/inventario/unidades-medida" },
    ],
  },
  {
    label: "Ingreso/Egreso",
    icon: Dashboard,
    children: [
      {
        label: "Ingreso",
        href: "/system/ingreso",
      },
      {
        label: "Egreso",
        href: "/system/egreso",
      },
    ],
  },
  {
    label: "Reportes",
    icon: Reportes,
    children: [
      {
        label: "Reporte de ingreso",
        href: "/system/reporte-ingreso",
      },
      {
        label: "Reporte de egreso",
        href: "/system/reporte-egreso",
      },
      {
        label: "Reporte general",
        href: "/system/reporte-general",
      },
      {
        label: "Aportaciones por proyectos",
        href: "/system/reporte-aportaciones",
      },
    ],
  },
  { label: "Crear Usuarios", url: "/system/crear-user", icon: General },
];

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      pt={"6"}
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <PerfilUser />

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <Stack bg={useColorModeValue("white", "gray.800")} p={4}>
        {LinkItems.map((navItem) => (
          <NavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    </Box>
  );
};
