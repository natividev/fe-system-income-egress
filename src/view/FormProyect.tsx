"use client";

import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { SelectController } from "@/components/ui/selectControl/SelectControl";
import { TextAreaController } from "@/components/ui/textareaControl/TextareaControl";
import { FormInputsProyecto, resultApi } from "@/interface/interfaces";
import { Box, FormControl, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (data: FormInputsProyecto) => Promise<resultApi>;
  isLoadig: boolean;
}

export const FormProyect = ({ onSubmit, isLoadig }: Props) => {
  const { control, handleSubmit, reset, setValue, watch } =
    useForm<FormInputsProyecto>({
      defaultValues: {
        nombre: "",
        fecha: "",
        ubicacion: {},
        cantidad: 0,
        categoriaProyectoId: null,
        observacion: "",
        tipoParticipante: [],
      },
    });

  const onSubmitWithReset = async (data: FormInputsProyecto) => {
    const result = await onSubmit(data);
    if (result) reset();
  };
  console.log(watch("tipoParticipante"));

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
        CREAR PROYECTOS
      </Text>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 1 }}>
          <FormControl id="Nombre" isRequired>
            <InputController
              label={"Nombre:"}
              disabledInput={isLoadig}
              name={"nombre"}
              type="text"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese su nombre completo",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 1 }}>
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

        <GridItem colSpan={{ sm: 1, md: 2, lg: 1 }}>
          <FormControl id="cantidad" isRequired>
            <InputController
              label={"Cantidad:"}
              disabledInput={isLoadig}
              name={"cantidad"}
              type="number"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese una cantidad",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 1 }}>
          <FormControl id="categoriaProyectoId" isRequired>
            <SelectController
              label={"Categoria:"}
              endpoint={"/categoria-proyecto"}
              disabledInput={isLoadig}
              name="categoriaProyectoId"
              placeholder=""
              control={control}
              setValue={setValue}
              isDefaultValue={false}
              watch={watch}
              rules={{
                required: "Por favor seleccione una categoria",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 1 }}>
          <FormControl id="tipoParticipante" isRequired>
            <SelectController
              isMulti={true}
              label={"Tipo de Participante:"}
              endpoint={"/tipo-participante"}
              disabledInput={isLoadig}
              name="tipoParticipante"
              placeholder=""
              control={control}
              setValue={setValue}
              isDefaultValue={false}
              watch={watch}
              rules={{
                required: "Por favor ingrese el tipo participante",
              }}
            />
          </FormControl>
        </GridItem>
        <SimpleGrid columns={1} spacing={4} mb={5}>
          <GridItem colSpan={1}>
            <FormControl id="observacion">
              <TextAreaController
                label={"Observaciones:"}
                disabledInput={isLoadig}
                name="observacion"
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
