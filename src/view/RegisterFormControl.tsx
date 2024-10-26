import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { SelectController } from "@/components/ui/selectControl/SelectControl";
import { TextAreaController } from "@/components/ui/textareaControl/TextareaControl";
import { FormInputs, resultApi } from "@/interface/interfaces";
import { Box, FormControl, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (data: FormInputs) => Promise<resultApi>;
  isLoadig: boolean;
  title: string;
  isIngreso: boolean;
}

export default function RegisterFormControl({
  onSubmit,
  isLoadig,
  title,
  isIngreso,
}: Props) {
  const { control, handleSubmit, reset } = useForm<FormInputs>({
    defaultValues: {
      razon: "",
      tipoDocumento: null,
      numDocumento: "",
      actividadEconomica: "",
      telefono: "",
      fechaActividad: "",
      transaccion: "",
      tipoIngreso: null,
      tipoControl: null,
      tipoAportacion: null,
      cantidad: "",
      observaciones: "",
    },
  });

  const onSubmitWithReset = async (data: FormInputs) => {
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
      <Text fontSize="4xl" mb={10} as="b">
        {title}
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 5, lg: 5 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 5, lg: 3 }}>
          <FormControl id="razon" isRequired>
            <InputController
              label={"Razon:"}
              disabledInput={isLoadig}
              name={"razon"}
              type="text"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese la razon",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 1 }}>
          <FormControl id="firstName" isRequired>
            <SelectController
              label={"Tipo Documento:"}
              endpoint={"generales/tipo-documento"}
              disabledInput={isLoadig}
              name="tipoDocumento"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese el tipo documento",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 3, lg: 1 }}>
          <FormControl id="firstName" isRequired>
            <InputController
              label={"Número Documento:"}
              disabledInput={isLoadig}
              name="numDocumento"
              type="number"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese el número de documento",
              }}
            />
          </FormControl>
        </GridItem>
      </SimpleGrid>

      <SimpleGrid columns={{ sm: 1, md: 6, lg: 6 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <InputController
              label={"Nombre de la actividad:"}
              disabledInput={isLoadig}
              name="actividadEconomica"
              type="text"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese actividad economica",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <InputController
              label={"Numero Telefono:"}
              disabledInput={isLoadig}
              name="telefono"
              type="text"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese el número de telefono",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <InputController
              label={"Fecha Actividad:"}
              disabledInput={isLoadig}
              name="fechaActividad"
              type="date"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese la fecha de la actividad",
              }}
            />
          </FormControl>
        </GridItem>
      </SimpleGrid>

      <SimpleGrid columns={{ sm: 1, md: 8, lg: 8 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName">
            <InputController
              label={"No. Transaccion:"}
              disabledInput={isLoadig}
              name="transaccion"
              type="text"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese el no. transaccion",
              }}
            />
          </FormControl>
        </GridItem>
        {isIngreso && (
          <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
            <FormControl id="firstName" isRequired>
              <SelectController
                key={"ingreso"}
                label={"Tipo Ingreso:"}
                endpoint={"tipo-ingreso"}
                disabledInput={isLoadig}
                name="tipoIngreso"
                placeholder=""
                control={control}
                rules={{
                  required: "Por favor ingrese el no tipo ingreso",
                }}
              />
            </FormControl>
          </GridItem>
        )}
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <SelectController
              key={"control"}
              label={"Tipo Control:"}
              endpoint={"tipo-control"}
              disabledInput={isLoadig}
              name="tipoControl"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese el tipo control",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <SelectController
              key={"aprotacion"}
              label={"Tipo Aportacion:"}
              endpoint={"tipo-aportacion"}
              disabledInput={isLoadig}
              name="tipoAportacion"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese el tipo de aprotacion",
              }}
            />
          </FormControl>
        </GridItem>
      </SimpleGrid>
      <SimpleGrid columns={{ sm: 1, md: 8, lg: 8 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <FormControl id="firstName" isRequired>
            <InputController
              label={"Cantidad:"}
              disabledInput={isLoadig}
              name="cantidad"
              type="number"
              placeholder=""
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
              control={control}
              rules={{
                required: "Por favor ingrese la observaciones",
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
}
