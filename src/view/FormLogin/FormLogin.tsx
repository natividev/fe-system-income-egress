"use client";
import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { Box, Flex, FormControl } from "@chakra-ui/react";
import { useFormLogin } from "./hook/useFormLogin";

export const FormLogin = () => {
  const { control, handleSubmit, watch, onSubmit, isLoadig } = useFormLogin();
  return (
    <Flex
      width={"100%"}
      height={"100%"}
      p={5}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        bg={"white"}
        width={"500px"}
        maxWidth={"90%"}
        px={"2rem"}
        py={"3rem"}
        height={"350px"}
        borderRadius="lg"
      >
        <FormControl id="Usuario" isRequired>
          <InputController
            label={"Usuario:"}
            watch={watch}
            disabledInput={isLoadig}
            name={"usuario"}
            type="text"
            placeholder=""
            control={control}
            rules={{
              required: "Por favor ingrese su usuario.",
            }}
          />
        </FormControl>
        <FormControl id="Contraseña" isRequired>
          <InputController
            label={"Contraseña:"}
            watch={watch}
            disabledInput={isLoadig}
            name={"password"}
            type="password"
            placeholder=""
            control={control}
            rules={{
              required: "Por favor ingrese su clave.",
            }}
          />
        </FormControl>
        <BtnLoading
          onSubmit={handleSubmit(onSubmit)}
          isLoading={isLoadig}
          text={"INICIANDO SESION"}
          marginTop={"1rem"}
          width={"100%"}
          textLoading={"VALIDANDO"}
        />
      </Box>
    </Flex>
  );
};
