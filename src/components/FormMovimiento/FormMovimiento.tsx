"use client";
import { Box, FormControl, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { SelectController } from "@/components/ui/selectControl/SelectControl";
import { TextAreaController } from "@/components/ui/textareaControl/TextareaControl";
import { useFormMovimiento } from "./hook/useFormMovimiento";
import { FormInputsMovimiento, ResultApiMovimiento } from "@/interface/inventory";

const COLSPAN = { sm: 1, md: 2, lg: 1 };

interface Props {
  onSubmit: (data: FormInputsMovimiento) => Promise<ResultApiMovimiento>;
  isLoading: boolean;
  title: string;
  initialValues?: Partial<FormInputsMovimiento>;   // 👈
}

const MOV_TIPO_OPTIONS_ENDPOINT = "/generales/tipo-movimiento";

export default function FormMovimiento({ onSubmit, isLoading, title, initialValues }: Props) {
  const { control, handleSubmit, setValue, watch, onSubmitWithReset } =
    useFormMovimiento(onSubmit, initialValues);     // 👈

  return (
    <Box p={5} bg="white" minHeight="83vh" width="100%" borderRadius="lg">
      <Text fontSize="4xl" mb={10} as="b">{title}</Text>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={4} mb={5}>
        <GridItem colSpan={COLSPAN}>
          <FormControl id="tipo" isRequired>
            <SelectController
              label="Tipo de movimiento:"
              endpoint={MOV_TIPO_OPTIONS_ENDPOINT}
              disabledInput={isLoading}
              name="tipo"
              placeholder=""
              control={control}
              setValue={setValue}
              watch={watch}
              rules={{ required: "Seleccione el tipo de movimiento" }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={COLSPAN}>
          <FormControl id="cantidad" isRequired>
            <InputController
              label="Cantidad:"
              disabledInput={isLoading}
              name="cantidad"
              type="number"
              placeholder=""
              control={control}
              watch={watch}
              rules={{ required: "Ingrese la cantidad" }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={COLSPAN}>
          <FormControl id="referencia">
            <InputController
              label="Referencia:"
              disabledInput={isLoading}
              name="referencia"
              type="text"
              placeholder=""
              control={control}
              watch={watch}
              rules={{ required: false }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={COLSPAN}>
          <FormControl id="id_producto" isRequired>
            <SelectController
              label="Producto:"
              endpoint=""
              disabledInput={isLoading}
              name="id" 
              placeholder=""
              control={control}
              setValue={setValue}
              watch={watch}
              rules={{ required: "Seleccione el producto" }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={COLSPAN}>
          <FormControl id="id_usuario" isRequired>
            <InputController
              label="ID Usuario (ejecutor):"
              disabledInput={isLoading}
              name="id_usuario"
              type="number"
              placeholder=""
              control={control}
              watch={watch}
              rules={{ required: "Ingrese el usuario que registra" }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="observacion">
            <TextAreaController
              label="Observación:"
              disabledInput={isLoading}
              name="observacion"
              type="text"
              placeholder=""
              watch={watch}
              control={control}
              rules={{ required: false }}
            />
          </FormControl>
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
