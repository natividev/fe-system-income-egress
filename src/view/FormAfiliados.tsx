import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { SelectController } from "@/components/ui/selectControl/SelectControl";
import { TextAreaController } from "@/components/ui/textareaControl/TextareaControl";
import { FormInputsAfiliados, resultApi } from "@/interface/interfaces";
import { Box, FormControl, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const COLSPAN = { sm: 1, md: 2, lg: 1 };

interface Props {
  onSubmit: (data: FormInputsAfiliados) => Promise<resultApi>;
  isLoadig: boolean;
  title: string;
}

export default function FormAfiliados({ onSubmit, isLoadig, title }: Props) {
  const { control, handleSubmit, reset } = useForm<FormInputsAfiliados>({
    defaultValues: {
      nombre: "",
      tipoDocumento: null,
      numDocumento: "",
      fecha: "",
      tipoAfiliado: null,
      correo: "",
      telefono: "",
      observaciones: "",
    },
  });

  const onSubmitWithReset = async (data: FormInputsAfiliados) => {
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

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={4} mb={5}>
        <GridItem colSpan={COLSPAN}>
          <FormControl id="razon" isRequired>
            <InputController
              label={"Nombre:"}
              disabledInput={isLoadig}
              name={"nombre"}
              type="text"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese el nombre",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={COLSPAN}>
          <FormControl id="firstName" isRequired>
            <SelectController
              label={"Tipo Afiliado:"}
              endpoint={"afiliados"}
              disabledInput={isLoadig}
              name="tipoAfiliado"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese el tipo documento",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={COLSPAN}>
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
        <GridItem colSpan={COLSPAN}>
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
        <GridItem colSpan={COLSPAN}>
          <FormControl id="firstName" isRequired>
            <InputController
              label={"Fecha:"}
              disabledInput={isLoadig}
              name="fecha"
              type="date"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese la fecha",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={COLSPAN}>
          <FormControl id="correo" isRequired>
            <InputController
              label={"Correo:"}
              disabledInput={isLoadig}
              name="correo"
              type="email"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese la correo",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={COLSPAN}>
          <FormControl id="telefono" isRequired>
            <InputController
              label={"Telefono:"}
              disabledInput={isLoadig}
              name="telefono"
              type="number"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese el numero de telefono",
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
