"use client";
import { Box, FormControl, GridItem, SimpleGrid, Text, Switch, HStack } from "@chakra-ui/react";
import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { SelectController } from "@/components/ui/selectControl/SelectControl";
import { TextAreaController } from "@/components/ui/textareaControl/TextareaControl";
import { useFormProducto } from "./hook/useFormProducto";
import { FormInputsProducto, ResultApiProducto } from "@/interface/inventory";

const COLSPAN = { sm: 1, md: 2, lg: 1 };

interface Props {
  onSubmit: (data: FormInputsProducto) => Promise<ResultApiProducto>;
  isLoading: boolean;
  title: string;
}

export default function FormProducto({ onSubmit, isLoading, title }: Props) {
  const { control, handleSubmit, setValue, watch, onSubmitWithReset } =
    useFormProducto(onSubmit);

  return (
    <Box p={5} bg="white" minHeight="83vh" width="100%" borderRadius="lg">
      <Text fontSize="4xl" mb={10} as="b">{title}</Text>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={4} mb={5}>
        <GridItem colSpan={COLSPAN}>
          <FormControl isRequired>
            <InputController
              label="Nombre:"
              disabledInput={isLoading}
              name="nombre"
              type="text"
              placeholder=""
              control={control}
              watch={watch}
              rules={{ required: "Por favor ingrese el nombre" }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={COLSPAN}>
          <FormControl>
            <InputController
              label="Código de barra:"
              disabledInput={isLoading}
              name="codigo_barra"
              type="text"
              placeholder=""
              control={control}
              watch={watch}
              rules={{ required: false }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={COLSPAN}>
          <FormControl isRequired>
            <InputController
              label="Precio unitario:"
              disabledInput={isLoading}
              name="precio_unitario"
              type="number"
              placeholder=""
              control={control}
              watch={watch}
              rules={{ required: "Ingrese el precio unitario" }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={COLSPAN}>
          <FormControl>
            <InputController
              label="Stock inicial:"
              disabledInput={isLoading}
              name="stock_actual"
              type="number"
              placeholder=""
              control={control}
              watch={watch}
              rules={{ required: false }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={COLSPAN}>
          <FormControl isRequired>
            <SelectController
              label="Categoría:"
              endpoint="/categorias"              // AJUSTA A TU API
              disabledInput={isLoading}
              name="id_categoria"
              placeholder=""
              control={control}
              setValue={setValue}
              watch={watch}
              rules={{ required: "Seleccione la categoría" }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={COLSPAN}>
          <FormControl isRequired>
            <SelectController
              label="Unidad de medida:"
              endpoint="/unidades-medida"        // AJUSTA A TU API
              disabledInput={isLoading}
              name="id_unidad_medida"
              placeholder=""
              control={control}
              setValue={setValue}
              watch={watch}
              rules={{ required: "Seleccione unidad de medida" }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl>
            <TextAreaController
              label="Descripción:"
              disabledInput={isLoading}
              name="descripcion"
              type="text"
              placeholder=""
              watch={watch}
              control={control}
              rules={{ required: false }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <HStack>
            <Text as="b">Activo:</Text>
            <Switch
              isDisabled={isLoading}
              defaultChecked
              onChange={(e) => setValue("activo", e.target.checked)}
            />
          </HStack>
        </GridItem>
      </SimpleGrid>

      <BtnLoading
        onSubmit={handleSubmit(onSubmitWithReset)}
        isLoading={isLoading}
        text="Guardar"
        textLoading="Guardando"
      />
    </Box>
  );
}
