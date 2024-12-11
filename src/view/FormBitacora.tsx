"use client";

import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { SelectController } from "@/components/ui/selectControl/SelectControl";
import { TextAreaController } from "@/components/ui/textareaControl/TextareaControl";
import { FormInputsBitacora, resultApi } from "@/interface/interfaces";
import { Box, FormControl, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (data: FormInputsBitacora) => Promise<resultApi>;
  isLoadig: boolean;
}

const COLSPAN = { sm: 1, md: 2, lg: 1 };

export const FormBitacora = ({ isLoadig, onSubmit }: Props) => {
  const { control, handleSubmit, reset, setValue, watch } =
    useForm<FormInputsBitacora>({
      defaultValues: {
        fecha: "",
        nombrePersona: "",
        proyectoId: null,
        tipoAporteId: null,
        cantidad: "",
        observaciones: "",
      },
    });

  const onSubmitWithReset = async (data: FormInputsBitacora) => {
    const result = await onSubmit(data);
    if (result) reset();
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
      <Text fontSize="2xl" mb={10} as="b">
        BITACORA DE APORTACIONES A PROYECTO
      </Text>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={4} mb={5}>
        <GridItem colSpan={COLSPAN}>
          <FormControl id="fecha" isRequired>
            <InputController
              label={"Fecha:"}
              disabledInput={isLoadig}
              name={"fecha"}
              type="date"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese una fecha valida",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={COLSPAN}>
          <FormControl id="nombrePersona" isRequired>
            <InputController
              label={"Nombre:"}
              disabledInput={isLoadig}
              name={"nombrePersona"}
              type="text"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese el nombre completo",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={COLSPAN}>
          <FormControl id="proyectoId" isRequired>
            <SelectController
              isDefaultValue={false}
              label={"Proyecto:"}
              endpoint={"/proyecto/nombre"}
              disabledInput={isLoadig}
              name="proyectoId"
              placeholder=""
              control={control}
              setValue={setValue}
              watch={watch}
              rules={{
                required: "Por favor ingrese el tipo documento",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={COLSPAN}>
          <FormControl id="tipoAporteId" isRequired>
            <SelectController
              isDefaultValue={false}
              label={"Tipo Aportacion:"}
              endpoint={"/proyecto/tipo-aportacion-proyecto"}
              disabledInput={isLoadig}
              name="tipoAporteId"
              placeholder=""
              control={control}
              setValue={setValue}
              watch={watch}
              rules={{
                required: "Por favor ingrese el tipo de aprotacion",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={COLSPAN}>
          <FormControl id="cantidad" isRequired>
            <InputController
              label={"Cantidad:"}
              disabledInput={isLoadig}
              name={"cantidad"}
              type="text"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese una cantidad",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={COLSPAN}>
          <FormControl id="observaciones" isRequired>
            <TextAreaController
              label={"Observaciones:"}
              disabledInput={isLoadig}
              name="observaciones"
              type="text"
              placeholder=""
              control={control}
              rules={{
                required: false,
              }}
            />
          </FormControl>
        </GridItem>
      </SimpleGrid>
      <BtnLoading
        onSubmit={handleSubmit(onSubmitWithReset)}
        isLoading={isLoadig}
        text={"Guardar"}
        textLoading={"Guardando"}
      />
    </Box>
  );
};
