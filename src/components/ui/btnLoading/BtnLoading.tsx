import {
  Button,
  Spinner,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

interface BtnLoadingProps extends ChakraButtonProps {
  onSubmit: () => void;
  isLoading: boolean;
  text: string;
  textLoading: string;
}

export default function BtnLoading({
  onSubmit,
  isLoading,
  text,
  textLoading,
  ...rest
}: BtnLoadingProps) {
  return (
    <Button
      bg="blue.400"
      color="white"
      _hover={{ bg: "blue.500" }}
      onClick={onSubmit}
      isDisabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <Spinner thickness="2px" speed="0.65s" mr="2" size="sm" />{" "}
          {textLoading}
        </>
      ) : (
        text
      )}
    </Button>
  );
}
