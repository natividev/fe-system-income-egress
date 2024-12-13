"use client";

import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { SelectController } from "@/components/ui/selectControl/SelectControl";
import { TextAreaController } from "@/components/ui/textareaControl/TextareaControl";
import { resetState } from "@/features/protects/proyects";
import { FormInputsProyecto, resultApi } from "@/interface/interfaces";
import { RootState } from "@/store/store";
import {
  Box,
  Button,
  Flex,
  FormControl,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

interface Props {
  defaultState: RootState;
  onSubmit: (data: FormInputsProyecto) => Promise<resultApi>;
  isLoadig: boolean;
  title: string;
}

export const FormProyect = ({
  onSubmit,
  isLoadig,
  defaultState,
  title,
}: Props) => {
  const { stateProyects } = defaultState;
  const router = useRouter();
  const dispatch = useDispatch();

  const { control, handleSubmit, reset, setValue, watch } =
    useForm<FormInputsProyecto>({
      defaultValues: {
        nombre: stateProyects?.nombre || "",
        fecha: stateProyects?.fecha?.split("T")[0] || "",
        ubicacion: stateProyects?.ubicacion || "",
        cantidad: stateProyects?.cantidad || 0,
        categoriaProyectoId: null,
        observacion: stateProyects?.observacion || "",
        tipoParticipante: [],
      },
    });

  const handleCancela = () => {
    dispatch(resetState({}));
    router.push("/proyectos");
  };

  const onSubmitWithReset = async (data: FormInputsProyecto) => {
    const result = await onSubmit(data);
    if (result) {
      reset({
        nombre: "",
        fecha: "",
        ubicacion: {},
        cantidad: 0,
        categoriaProyectoId: null,
        observacion: "",
        tipoParticipante: [],
      });
    }
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
      <Text fontSize="4xl" mb={10} as="b">
        {title}
      </Text>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 1 }}>
          <FormControl id="Nombre" isRequired>
            <InputController
              label={"Nombre:"}
              watch={watch}
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
              watch={watch}
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
              watch={watch}
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
              dataFilters={stateProyects?.fk_categoria_proyecto_id}
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
              dataFilters={stateProyects?.tipo_participante}
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
                watch={watch}
                rules={{
                  required: false,
                }}
              />
            </FormControl>
          </GridItem>
        </SimpleGrid>
      </SimpleGrid>
      <Flex justifyContent={"space-between"}>
        <Button colorScheme="red" onClick={handleCancela}>
          CANCELAR
        </Button>
        <BtnLoading
          onSubmit={handleSubmit(onSubmitWithReset)}
          isLoading={isLoadig}
          text={"Guardar"}
          textLoading={"Guardando"}
        />
      </Flex>
    </Box>
  );
};
