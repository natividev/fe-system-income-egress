"use client";

import axiosInstance from "@/api/axiosInstance";
import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { FormCrearUser } from "@/interface/interfaces";
import { Box, FormControl, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const CrearUserView = () => {
  const [isLoadig, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit, watch, reset } = useForm<FormCrearUser>({
    defaultValues: {
      nombre: "",
      usuario: "",
      password: "",
    },
  });

  const buildPayload = (data: FormCrearUser) => {
    const payload = {
      nombre: data.nombre,
      usuario: data.usuario,
      password: data.password,
    };

    return payload;
  };

  const onSubmit = async (data: FormCrearUser) => {
    setIsLoading(true);
    try {
      const payload = buildPayload(data);
      await axiosInstance.post("/auth/register", payload);
      reset({
        nombre: "",
        usuario: "",
        password: "",
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
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
        CREAR USUARIO
      </Text>

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

      <FormControl id="Nombre" isRequired>
        <InputController
          label={"Usuario:"}
          watch={watch}
          disabledInput={isLoadig}
          name={"usuario"}
          type="text"
          placeholder=""
          control={control}
          rules={{
            required: "Por favor ingrese su nombre completo",
          }}
        />
      </FormControl>

      <FormControl id="Nombre" mb={5} isRequired>
        <InputController
          label={"Contraseña:"}
          watch={watch}
          disabledInput={isLoadig}
          name={"password"}
          type="password"
          placeholder=""
          control={control}
          rules={{
            required: "Por favor ingrese su nombre completo",
          }}
        />
      </FormControl>

      <BtnLoading
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isLoadig}
        text={"Guardar"}
        textLoading={"Guardando"}
        w={"100%"}
      />
    </Box>
  );
};
