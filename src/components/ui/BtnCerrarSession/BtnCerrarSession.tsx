import { signOut } from "next-auth/react";
import { Button } from "@chakra-ui/react";

export const BtnCerrarSession = () => {
  const handleSignOut = () => {
    signOut();
  };
  return (
    <Button
      display={"inline-flex"}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"pink.400"}
      _hover={{
        bg: "pink.300",
      }}
      onClick={handleSignOut}
    >
      Cerrar Sesión
    </Button>
  );
};
