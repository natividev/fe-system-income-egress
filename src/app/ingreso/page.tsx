"use client";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  GridItem,
  Textarea,
  Text,
  Button,
} from "@chakra-ui/react";

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
      <Text fontSize="4xl" mb={10} as="b">
        Crear Ingreso
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 5, lg: 5 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 5, lg: 3 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Razon</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 1 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Tipo Documento</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 3, lg: 1 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Número Documento</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
      </SimpleGrid>

      <SimpleGrid columns={{ sm: 1, md: 6, lg: 6 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Nombre de la actividad</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Numero Telefono</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Fecha Actividad</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
      </SimpleGrid>

      <SimpleGrid columns={{ sm: 1, md: 8, lg: 8 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>No. Transaccion</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Tipo Ingreso</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Tipo Control</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Tipo Aprotacion</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
      </SimpleGrid>
      <SimpleGrid columns={{ sm: 1, md: 8, lg: 8 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Cantidad</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
      </SimpleGrid>
      <SimpleGrid columns={1} spacing={4} mb={5}>
        <GridItem colSpan={1}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Observaciones</FormLabel>
            <Textarea placeholder="Here is a sample placeholder" />
          </FormControl>
        </GridItem>
      </SimpleGrid>
      <Button colorScheme="blue" mt={5} size="lg">
        Guardar
      </Button>
    </Box>
  );
}
