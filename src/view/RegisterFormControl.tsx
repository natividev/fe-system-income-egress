import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { SelectController } from "@/components/ui/selectControl/SelectControl";
import { TextAreaController } from "@/components/ui/textareaControl/TextareaControl";
import { resetStateEgrego } from "@/features/egreso/egreso";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

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
  ///const { stateEgreso } = defaultState;
  const router = useRouter();
  const dispatch = useDispatch();

  const { control, handleSubmit, reset, watch, setValue } = useForm<FormInputs>(
    {
      defaultValues: {
        tipoAfiliado: null,
        afiliado: null,
        tipoDocumento: null,
        actividadEconomica: defaultState?.stateEgreso?.nombre_actividad || "",
        fechaActividad:
          defaultState?.stateEgreso?.fecha_actividad?.split("T")[0] || "",
        transaccion: defaultState?.stateEgreso?.no_transaccion || "",
        tipoIngreso: null,
        tipoControl: null,
        tipoAportacion: null,
        cantidad: defaultState?.stateEgreso?.cantidad || "",
        observaciones: defaultState?.stateEgreso?.observaciones || "",
      },
    }
  );

  const [afilidoId, setAfiliadoId] = useState(2);
  const onSubmitWithReset = async (data: FormInputs) => {
    const result = await onSubmit(data);
    if (result)
      reset({
        tipoAfiliado: null,
        afiliado: null,
        tipoDocumento: null,
        actividadEconomica: "",
        telefono: "",
        fechaActividad: "",
        transaccion: "",
        tipoIngreso: null,
        tipoControl: null,
        tipoAportacion: null,
        cantidad: "",
        observaciones: "",
      });
  };

  const handleCancela = () => {
    dispatch(resetStateEgrego({}));
    router.push("/egreso");
  };

  useEffect(() => {
    const afil = watch("tipoAfiliado");
    setAfiliadoId(afil?.value ?? 1);
  }, [watch("tipoAfiliado")]); //eslint-disable-line

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
          <FormControl id="firstName" isRequired>
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
          <FormControl id="firstName">
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
            <FormControl id="firstName" isRequired>
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
