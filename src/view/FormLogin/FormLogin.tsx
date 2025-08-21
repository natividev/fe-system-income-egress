"use client";
import { Box, Flex, FormControl, Text, Checkbox, Link, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { useFormLogin } from "./hook/useFormLogin";

const MotionBox = motion(Box);

export const FormLogin = () => {
  const { control, handleSubmit, watch, setValue, onSubmit, isLoadig } = useFormLogin();
  const [showPwd, setShowPwd] = useState(false);

  const cardBg   = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const borderCol= useColorModeValue("blackAlpha.100", "whiteAlpha.300");

  return (
    <Flex w="100%" h="100dvh" align="center" justify="center" position="relative" overflow="hidden" px={4}>
      {/* Rejilla muy sutil */}
      <Box
        position="absolute"
        inset="0"
        bgSize="24px 24px"
        opacity={0.25}
        bgImage={`linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`}
        _dark={{ opacity: 0.2, bgImage: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
                                         linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)` }}
      />

      {/* Blobs de color animados */}
      <MotionBox
        position="absolute"
        top="-10%"
        left="-10%"
        w="40vmax"
        h="40vmax"
        borderRadius="full"
        filter="blur(60px)"
        bgGradient="radial(rgba(99,102,241,0.35), transparent 60%)"
        animate={{ x: [0, 20, -10, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
      />
      <MotionBox
        position="absolute"
        bottom="-12%"
        right="-8%"
        w="42vmax"
        h="42vmax"
        borderRadius="full"
        filter="blur(60px)"
        bgGradient="radial(rgba(45,212,191,0.30), transparent 60%)"
        animate={{ x: [0, -15, 10, 0], y: [0, 10, -8, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
      />

      {/* Tarjeta */}
      <MotionBox
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        bg={cardBg}
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor={borderCol}
        boxShadow="0 20px 40px rgba(0,0,0,0.08)"
        w="420px"
        maxW="94%"
        px={{ base: 6, md: 8 }}
        py={{ base: 8, md: 10 }}
        borderRadius="2xl"
        zIndex={1}
      >
        <Box mb={6}>
          <Text fontSize="2xl" fontWeight="black" letterSpacing="wide">Inicia sesión</Text>
          <Text fontSize="sm" color="gray.500">Accede al panel de control</Text>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="Usuario" isRequired mb={4}>
            <InputController
              label="Usuario"
              name="usuario"
              type="text"
              placeholder="Tu usuario"
              control={control}
              watch={watch}
              disabledInput={isLoadig}
              rules={{ required: "Por favor ingrese su usuario." }}
            />
          </FormControl>

          <FormControl id="Contraseña" isRequired mb={2}>
            <InputController
              label="Contraseña"
              name="password"
              type={showPwd ? "text" : "password"}
              placeholder="Tu contraseña"
              control={control}
              watch={watch}
              disabledInput={isLoadig}
              rules={{ required: "Por favor ingrese su clave." }}
            />
            <Flex justify="flex-end" mt={2}>
              <Link
                as="button"
                type="button"
                fontSize="sm"
                color={useColorModeValue("blue.600", "blue.300")}
                onClick={() => setShowPwd((v) => !v)}
                display="inline-flex" alignItems="center" gap={2}
              >
                {showPwd ? <FiEyeOff /> : <FiEye />} {showPwd ? "Ocultar" : "Mostrar"} contraseña
              </Link>
            </Flex>
          </FormControl>

          <Flex align="center" justify="space-between" mt={4} mb={6}>
            <Checkbox
              isChecked={!!watch("remember")}
              onChange={(e) => setValue("remember", e.target.checked)}
              isDisabled={isLoadig}
              colorScheme="blue"
            >
              Recordarme
            </Checkbox>
            <Link as="button" type="button" fontSize="sm" color="gray.500" _hover={{ color: "gray.700" }}>
              ¿Olvidaste tu clave?
            </Link>
          </Flex>

          <BtnLoading
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoadig}
            text="INICIAR SESIÓN"
            textLoading="VALIDANDO"
            width="100%"
          />
        </form>
      </MotionBox>
    </Flex>
  );
};
