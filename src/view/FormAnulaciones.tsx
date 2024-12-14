"use Client";

import axiosInstance from "@/api/axiosInstance";
import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { TextAreaController } from "@/components/ui/textareaControl/TextareaControl";
import { FormInputsAnulaciones } from "@/interface/interfaces";
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  id: number | null;
  onClose: () => void;
  isOpen: boolean;
  endpoint: string;
  reload: number;
  setReload: (data: number) => void;
}

export const FormAnulaciones = ({
  id,
  onClose,
  isOpen,
  endpoint,
  reload,
  setReload,
}: Props) => {
  const [isLoadig, setIsLoading] = useState(false);

  const { control, handleSubmit, reset, watch } =
    useForm<FormInputsAnulaciones>({
      defaultValues: {
        monto: 0,
        motivo: null,
      },
    });

  const buildPayload = (data: FormInputsAnulaciones) => {
    const payload = {
      id,
      monto: Number(data.monto),
      motivo: data.motivo,
    };

    return payload;
  };

  const onSubmit = async (data: FormInputsAnulaciones) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const payload = buildPayload(data);
      await axiosInstance.post(endpoint, payload);
    } catch (error) {
      console.log(error);
    } finally {
      reset({
        monto: 0,
        motivo: "",
      });
      setReload(reload + 1);
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ANULAR INGRESO</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="monto" isRequired>
            <InputController
              label={"Cantidad:"}
              disabledInput={isLoadig}
              name={"monto"}
              type="text"
              placeholder=""
              watch={watch}
              control={control}
              rules={{
                required: "Por favor ingrese una cantidad valida",
              }}
            />
          </FormControl>
          <FormControl id="motivo" isRequired>
            <TextAreaController
              label={"Motivo de la anulación:"}
              disabledInput={isLoadig}
              name="motivo"
              type="text"
              placeholder=""
              watch={watch}
              control={control}
              rules={{
                required: "Por favor ingrese el motivo de la anulación",
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            isDisabled={isLoadig}
            onClick={onClose}
          >
            Cerrar
          </Button>
          <BtnLoading
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoadig}
            text={"ANULAR"}
            textLoading={"ANULANDO"}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
