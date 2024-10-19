"use client";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  useColorModeValue,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

export default function IngresoPage() {
  return (
    <Box
      p={5}
      bg={"white"}
      minHeight={"83vh"}
      width={"100%"}
      borderRadius="lg"
      display={"block"}
    >
      <SimpleGrid columns={{ sm: 2, md: 5, lg: 5 }} spacing={4}>
        <GridItem rowSpan={{ sm: 2, md: 3, lg: 3 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Razon</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
        <GridItem rowSpan={{ base: 1 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Tipo Documento</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
        <GridItem rowSpan={{ base: 1 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Número Documento</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
      </SimpleGrid>{" "}
    </Box>
  );
}
