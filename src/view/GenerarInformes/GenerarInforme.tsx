"use client";
import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import {
  Button,
  Flex,
  FormControl,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useGenerarInformes } from "./hook/useGenerarInformes";

interface Props {
  endpoint: string;
  title: string;
  btnTitle: string;
}
export default function GenerarInformes({ endpoint, title, btnTitle }: Props) {
  const {
    isLoadig,
    isOpen,
    onClose,
    watch,
    urlPdf,
    setUrlPdf,
    control,
    handleSubmit,
    printReceipt,
  } = useGenerarInformes(endpoint);

  return (
    <Flex
      p={5}
      bg={"white"}
      minHeight={"83vh"}
      width={"100%"}
      borderRadius="lg"
      display={"block"}
    >
      <Text fontSize="4xl" as="b">
        INFORME {btnTitle}
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 12, lg: 12 }} spacing={4} mb={5}>
        <GridItem colSpan={{ sm: 1, md: 4, lg: 4 }}>
          <FormControl id="desde" isRequired>
            <InputController
              label={"Desde:"}
              disabledInput={isLoadig}
              name="desde"
              type="date"
              placeholder=""
              watch={watch}
              control={control}
              rules={{
                required: "Por favor ingrese la fecha de inicio",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 4, lg: 4 }}>
          <FormControl id="hasta" isRequired>
            <InputController
              label={"Hasta:"}
              disabledInput={isLoadig}
              name="hasta"
              type="date"
              placeholder=""
              watch={watch}
              control={control}
              rules={{
                required: "Por favor la fecha final",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 4, lg: 4 }} alignContent={"end"}>
          <BtnLoading
            isLoading={isLoadig}
            onSubmit={handleSubmit(printReceipt)}
            text={"GENERAR INFORME"}
            textLoading={"GENERANDO INFORME..."}
            w={"100%"}
          />
        </GridItem>
      </SimpleGrid>

      <Modal
        isCentered
        onClose={() => {
          setUrlPdf("");
          onClose();
        }}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent width={"90%"} height={"90vh"}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <iframe
              title="COMPROBANTE"
              src={urlPdf}
              height="100%"
              width="100%"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setUrlPdf("");
                onClose();
              }}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
