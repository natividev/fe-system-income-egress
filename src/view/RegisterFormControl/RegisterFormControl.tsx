"use client";
import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { SelectController } from "@/components/ui/selectControl/SelectControl";
import { TextAreaController } from "@/components/ui/textareaControl/TextareaControl";
import { FormInputs, resultApi } from "@/interface/interfaces";
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
import { useRegisterFormControl } from "./hook/useRegisterFormControl";

interface Props {
  onSubmit: (data: FormInputs) => Promise<resultApi>;
  isLoadig: boolean;
  title: string;
  isIngreso: boolean;
  defaultState: RootState;
}

export default function RegisterFormControl({
  onSubmit,
  isLoadig,
  title,
  isIngreso,
  defaultState,
}: Props) {
  const {
    afilidoId,
    control,
    handleSubmit,
    watch,
    setValue,
    handleCancela,
    onSubmitWithReset,
  } = useRegisterFormControl(isIngreso, defaultState, onSubmit);

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
      <SimpleGrid columns={{ sm: 1, md: 6, lg: 6 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 3, lg: 3 }}>
          <FormControl id="tipoAfiliado" isRequired>
            <SelectController
              label={"Tipo Afiliado:"}
              endpoint={"/afiliados"}
              disabledInput={isLoadig}
              name="tipoAfiliado"
              setValue={setValue}
              dataFilters={defaultState?.stateEgreso?.fk_tipo_afiliado}
              watch={watch}
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese el tipo documento",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 3, lg: 3 }}>
          <FormControl id="afiliado" isRequired>
            <SelectController
              label={"Afiliado:"}
              endpoint={`/afiliados/tipo-afiliados/${afilidoId}`}
              disabledInput={isLoadig}
              name="afiliado"
              setValue={setValue}
              watch={watch}
              placeholder=""
              dataFilters={defaultState?.stateEgreso?.id_registro_afiliado}
              control={control}
              isDefaultValue={false}
              rules={{
                required: "Por favor ingrese el tipo documento",
              }}
            />
          </FormControl>
        </GridItem>
      </SimpleGrid>

      <SimpleGrid columns={{ sm: 1, md: 6, lg: 6 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 3, lg: 3 }}>
          <FormControl id="firstName" isRequired>
            <InputController
              label={"Nombre de la actividad:"}
              disabledInput={isLoadig}
              name="actividadEconomica"
              type="text"
              placeholder=""
              control={control}
              watch={watch}
              rules={{
                required: "Por favor ingrese actividad economica",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 3, lg: 3 }}>
          <FormControl id="fechaActividad" isRequired>
            <InputController
              label={"Fecha Actividad:"}
              disabledInput={isLoadig}
              name="fechaActividad"
              type="date"
              placeholder=""
              control={control}
              watch={watch}
              rules={{
                required: "Por favor ingrese la fecha de la actividad",
              }}
            />
          </FormControl>
        </GridItem>
      </SimpleGrid>

      <SimpleGrid columns={{ sm: 1, md: 6, lg: 6 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 3, lg: 3 }}>
          <FormControl id="transaccion">
            <InputController
              label={"No. Transaccion:"}
              disabledInput={isLoadig}
              name="transaccion"
              type="text"
              placeholder=""
              control={control}
              watch={watch}
              rules={{
                required: "Por favor ingrese el no. transaccion",
              }}
            />
          </FormControl>
        </GridItem>
        {isIngreso && (
          <GridItem colSpan={{ sm: 1, md: 3, lg: 3 }}>
            <FormControl id="tipoIngreso" isRequired>
              <SelectController
                key={"ingreso"}
                label={"Tipo Ingreso:"}
                endpoint={"tipo-ingreso"}
                disabledInput={isLoadig}
                name="tipoIngreso"
                placeholder=""
                setValue={setValue}
                watch={watch}
                control={control}
                rules={{
                  required: "Por favor ingrese el no tipo ingreso",
                }}
              />
            </FormControl>
          </GridItem>
        )}
        <GridItem colSpan={{ sm: 1, md: 3, lg: 3 }}>
          <FormControl id="tipoControl" isRequired>
            <SelectController
              key={"control"}
              label={"Tipo Control:"}
              endpoint={"tipo-control"}
              disabledInput={isLoadig}
              name="tipoControl"
              placeholder=""
              control={control}
              dataFilters={defaultState?.stateEgreso?.fk_tipo_control}
              setValue={setValue}
              watch={watch}
              rules={{
                required: "Por favor ingrese el tipo control",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 3, lg: 3 }}>
          <FormControl id="tipoAportacion" isRequired>
            <SelectController
              key={"aprotacion"}
              label={"Tipo Aportacion:"}
              endpoint={"tipo-aportacion"}
              disabledInput={isLoadig}
              name="tipoAportacion"
              placeholder=""
              control={control}
              dataFilters={defaultState?.stateEgreso?.fk_tipo_aportacion}
              setValue={setValue}
              watch={watch}
              rules={{
                required: "Por favor ingrese el tipo de aprotacion",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 3, lg: 3 }}>
          <FormControl id="firstName" isRequired>
            <InputController
              label={"Cantidad:"}
              disabledInput={!!defaultState?.stateEgreso?.cantidad || isLoadig}
              name="cantidad"
              type="number"
              placeholder=""
              watch={watch}
              control={control}
              rules={{
                required: "Por favor ingrese la cantidad",
              }}
            />
          </FormControl>
        </GridItem>
      </SimpleGrid>
      <SimpleGrid columns={1} spacing={4} mb={5}>
        <GridItem colSpan={1}>
          <FormControl id="firstName" isRequired>
            <TextAreaController
              label={"Observaciones:"}
              disabledInput={isLoadig}
              name="observaciones"
              type="text"
              placeholder=""
              watch={watch}
              control={control}
              rules={{
                required: false,
              }}
            />
          </FormControl>
        </GridItem>
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
}
