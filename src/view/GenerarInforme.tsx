"use client";
import axiosInstance from "@/api/axiosInstance";
import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { FormInputsInforme } from "@/interface/interfaces";
import {
  showAlertError,
  showAlertLoading,
  showAlertSuccess,
} from "@/util/Alerts/Alerts";
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
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  endpoint: string;
  title: string;
  btnTitle: string;
}
export default function GenerarInformes({ endpoint, title, btnTitle }: Props) {
  const [isLoadig, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [urlPdf, setUrlPdf] = useState("");

  const { control, handleSubmit, reset, watch } = useForm<FormInputsInforme>({
    defaultValues: {
      desde: "",
      hasta: "",
    },
  });

  const printReceipt = async () => {
    const textAlert = "Generando el comprobante, por favor espera";
    setIsLoading(true);
    showAlertLoading(textAlert, true);
    try {
      const param = `desde=${watch("desde")}&hasta=${watch("hasta")}`;
      const { data } = await axiosInstance.get(`${endpoint}?${param}`, {
        responseType: "arraybuffer",
      });
      if (data) {
        const urlBlob = window.URL.createObjectURL(
          new Blob([data], { type: "application/pdf" })
        );
        setUrlPdf(urlBlob);
        onOpen();
        showAlertSuccess("Comprobante generado exitosamente", false);
        reset();
      }
    } catch (error) {
      showAlertError(
        "Hubo un problema al generar el comprobante, error: " + error
      );
    } finally {
      showAlertLoading(textAlert, false);
      setIsLoading(false);
      reset();
    }
  };

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
          <FormControl id="firstName" isRequired>
            <InputController
              label={"Nombre de la actividad:"}
              disabledInput={isLoadig}
              name="desde"
              type="date"
              placeholder=""
              control={control}
              rules={{
                required: "Por favor ingrese la fecha de inicio",
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 4, lg: 4 }}>
          <FormControl id="firstName" isRequired>
            <InputController
              label={"Nombre de la actividad:"}
              disabledInput={isLoadig}
              name="hasta"
              type="date"
              placeholder=""
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
