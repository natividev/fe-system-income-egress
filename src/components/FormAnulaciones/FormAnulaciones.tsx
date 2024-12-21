"use Client";
import BtnLoading from "@/components/ui/btnLoading/BtnLoading";
import { InputController } from "@/components/ui/inputControl/InputControl";
import { TextAreaController } from "@/components/ui/textareaControl/TextareaControl";
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
import { useFormAnulaciones } from "./hook/useFormAnulaciones";

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
  const { isLoadig, control, handleSubmit, watch, onSubmit } =
    useFormAnulaciones(id, endpoint, reload, setReload, onClose);

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
