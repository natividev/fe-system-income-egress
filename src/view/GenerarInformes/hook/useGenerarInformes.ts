"use client";
import axiosInstance from "@/api/axiosInstance";
import { FormInputsInforme } from "@/interface/interfaces";
import {
  showAlertError,
  showAlertLoading,
  showAlertSuccess,
} from "@/utils/Alerts/Alerts";
import { obtenerFechaFormateada, obtenerFinDeMes } from "@/utils/Date/Date";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useGenerarInformes = (endpoint: string) => {
  const [isLoadig, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [urlPdf, setUrlPdf] = useState("");

  const { control, handleSubmit, reset, watch } = useForm<FormInputsInforme>({
    defaultValues: {
      desde: obtenerFechaFormateada(),
      hasta: obtenerFinDeMes(),
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

  return {
    isLoadig,
    isOpen,
    onClose,
    watch,
    urlPdf,
    setUrlPdf,
    control,
    handleSubmit,
    printReceipt,
  };
};
