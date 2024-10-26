import { NavItems } from "@/interface/interfaces";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link"; // Cambiado a 'next/link'

export const NavItem = ({ icon, url, label, children }: NavItems) => {
  const { isOpen, onToggle } = useDisclosure();

  const hasChildren = children && children.length > 0;

  return (
    <Stack spacing={4} onClick={hasChildren ? onToggle : undefined}>
      <Link href={url ?? ""} passHref>
        <Flex
          p={4}
          mx={3}
          as="div" // Cambiado de "p" a "div" por semántica correcta
          bg="rgba(36, 34, 32, 0.04)"
          color="#242220"
          borderRadius="lg"
          justifyContent="space-between"
          alignItems="center"
          _hover={{
            bg: "rgba(36, 34, 32, 0.08)",
          }}
        >
          <Flex align="center">
            {icon && <Icon w={5} h={5} as={icon} />}
            <Text fontWeight={600} ml={1}>
              {label}
            </Text>
          </Flex>
          {hasChildren && (
            <Icon
              as={ChevronDownIcon}
              transition="all .25s ease-in-out"
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Flex>
      </Link>

      {hasChildren && (
        <Collapse in={isOpen} animateOpacity>
          <Stack pl={4} mt={1}>
            {children.map((child) => (
              <Link key={child.label} href={child.href ?? "#"} passHref>
                <Box
                  as="div"
                  p={2}
                  mx={2}
                  w="auto"
                  borderRadius="lg"
                  color="#2422208F"
                  cursor="pointer"
                  _hover={{
                    bg: "rgba(36, 34, 32, 0.08)",
                    color: "#242220",
                  }}
                >
                  {child.label}
                </Box>
              </Link>
            ))}
          </Stack>
        </Collapse>
      )}
    </Stack>
  );
};
