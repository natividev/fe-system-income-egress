"use client";
import axiosInstance from "@/api/axiosInstance";
import {
  showAlertError,
  showAlertLoading,
  showAlertSuccess,
} from "@/util/Alerts/Alerts";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  endpoint: string;
  title: string;
  btnTitle: string;
}
export default function GenerarInformes({ endpoint, title, btnTitle }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [urlPdf, setUrlPdf] = useState("");

  const printReceipt = async () => {
    const textAlert = "Generando el comprobante, por favor espera";
    showAlertLoading(textAlert, true);
    try {
      const { data } = await axiosInstance.get(endpoint, {
        responseType: "arraybuffer",
      });
      if (data) {
        const urlBlob = window.URL.createObjectURL(
          new Blob([data], { type: "application/pdf" })
        );
        setUrlPdf(urlBlob);
        onOpen();
        showAlertSuccess("Comprobante generado exitosamente", false);
      }
    } catch (error) {
      showAlertError(
        "Hubo un problema al generar el comprobante, error: " + error
      );
    } finally {
      showAlertLoading(textAlert, false);
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
      <Button colorScheme="teal" size="lg" onClick={printReceipt}>
        GENERAR INFORME {btnTitle}
      </Button>
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
