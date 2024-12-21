"use client";
import {
  Avatar,
  Box,
  BoxProps,
  CloseButton,
  Flex,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { NavItem } from "../navItem/NavItem";
import { NavItems } from "@/interface/interfaces";
import { Dashboard } from "@/icons/dashboard";
import { Reportes } from "@/icons/reportes";
import { General } from "@/icons/general";
//import { FaRegUser } from "react-icons/fa";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<NavItems> = [
  { label: "Dashboard", url: "/system/dashboard", icon: Dashboard },
  { label: "Proyectos", url: "/system/proyectos", icon: General },
  { label: "Bitacora Proyectos", url: "/system/bitacora", icon: General },
  { label: "Afiliados", url: "/system/afiliados", icon: General },
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
        label: "Aportaciones por proyecto",
        href: "/system/reporte-aportaciones",
      },
    ],
  },
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
        <Flex alignItems={"center"}>
          <HStack>
            <Avatar
              size={"md"}
              src={
                "https://www.mundodeportivo.com/alfabeta/hero/2021/04/Kyojuro-Rengoku.jpeg?width=1200"
              }
            />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="md" style={{ color: "#24222066" }}>
                Administrador
              </Text>
              <Text fontSize="md" fontWeight="bold">
                Natividad
              </Text>
            </VStack>
          </HStack>
        </Flex>
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
